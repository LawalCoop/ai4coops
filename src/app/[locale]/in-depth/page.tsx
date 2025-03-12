import { useTranslations } from 'next-intl'

export default function InDepth() {
  const t = useTranslations('InDepth')

  return (
    <div>
      <h1>{t('title')}</h1>
    </div>
  )
}
