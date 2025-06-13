// src/config/navigation.ts
import { NavItem, NavLink } from '@/types/navigation'
import { useTranslations } from 'next-intl'

export const useNavigation = () => {
  const t = useTranslations()

  const mainNav: NavItem[] = [
    {
      id: 'home',
      path: '/',
      label: t('common.navbar.links.home'),
      sections: [
        { path: 'about', label: t('common.navbar.links.about'), isSection: true },
        { path: 'services', label: t('common.navbar.links.services'), isSection: true },
        { path: 'how', label: t('common.navbar.links.how'), isSection: true },
        { path: 'who', label: t('common.navbar.links.who'), isSection: true },
        { path: 'projects', label: t('common.navbar.links.projects'), isSection: true },
      ],
    },
    {
      id: 'inDepth',
      path: '/in-depth',
      label: t('common.navbar.links.inDepth'),
      isPage: true,
    },
  ]

  const sectionNav: NavLink[] = [
    { path: 'about', label: t('common.navbar.links.about'), isSection: true },
    { path: 'services', label: t('common.navbar.links.services'), isSection: true },
    { path: 'how', label: t('common.navbar.links.how'), isSection: true },
    { path: 'who', label: t('common.navbar.links.who'), isSection: true },
    { path: 'projects', label: t('common.navbar.links.projects'), isSection: true },
  ]

  return { mainNav, sectionNav }
}
