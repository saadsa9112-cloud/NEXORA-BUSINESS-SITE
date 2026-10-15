// Theme Manager for Nexora Digital (Light / Dark Mode)
const THEME_KEY = 'nexora_theme'

export const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'light'
  const saved = localStorage.getItem(THEME_KEY)
  if (saved === 'dark' || saved === 'light') return saved
  // Always default strictly to 'light' mode
  return 'light'
}

export const applyTheme = (theme) => {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  if (theme === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
  localStorage.setItem(THEME_KEY, theme)
}

export const toggleTheme = (currentTheme) => {
  const next = currentTheme === 'dark' ? 'light' : 'dark'
  applyTheme(next)
  return next
}
