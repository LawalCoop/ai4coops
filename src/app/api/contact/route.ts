import { NextResponse } from 'next/server'
import { Resend } from 'resend'

interface ContactBody {
  name?: string
  email?: string
  message?: string
  captchaToken?: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

async function verifyCaptcha(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret) {
    console.error('RECAPTCHA_SECRET_KEY no está configurada')
    return false
  }

  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret, response: token }),
  })

  const data = (await res.json()) as { success: boolean }
  return data.success === true
}

export async function POST(request: Request) {
  let body: ContactBody
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { name, email, message, captchaToken } = body

  // Validación de campos
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }
  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
  }

  // Validación del captcha server-side
  if (!captchaToken || !(await verifyCaptcha(captchaToken))) {
    return NextResponse.json({ error: 'Captcha verification failed' }, { status: 403 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY no está configurada')
    return NextResponse.json({ error: 'Email service is not configured' }, { status: 500 })
  }

  const from = process.env.RESEND_FROM || 'AI4Coops <onboarding@resend.dev>'
  const to = process.env.CONTACT_TO_EMAIL || 'ai@lawal.com.ar'

  const resend = new Resend(apiKey)

  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Nuevo contacto de ${name} — AI4Coops`,
      text: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Failed to send message' }, { status: 502 })
    }

    return NextResponse.json({ success: true, id: data?.id }, { status: 200 })
  } catch (err) {
    console.error('Resend exception:', err)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
