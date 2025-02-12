import { headingText } from 'src/assets/constants'
export const getNavbarTitle = (title) => {
  if (title === 'executiveDashboard' || title === 'hrdashboard') return 'Recruitment Dashboard'
  return headingText[title] || 'Recruitment Dashboard'
}
