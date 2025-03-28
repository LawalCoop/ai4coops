import 'next-intl'

type NavbarLinks = {
  home: string
  inDepth: string
  projects: string
  about: string
  how: string
  who: string
  services: string
  contact: string
}

declare module 'next-intl' {
  interface IntlMessages {
    common: {
      navbar: {
        title: string
        links: NavbarLinks
      }
      contactButton: string
      closeMenu: string
      contactDialog: {
        title: string
        description: string
        name: string
        email: string
        message: string
      }
    }
    pages: {
      home: any
      inDepth: any
    }
  }
}
