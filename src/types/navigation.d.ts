// src/types/navigation.d.ts
export interface NavLink {
  path: string
  label: string
  isSection?: boolean
}

export interface NavItem extends NavLink {
  id: string
  isPage?: boolean
  sections?: NavLink[]
}

export interface NavigationConfig {
  mainNav: NavItem[]
  sectionNav: NavLink[]
}
