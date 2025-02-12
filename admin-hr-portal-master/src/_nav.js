import React from 'react'
import store from 'src/store'
import CIcon from '@coreui/icons-react'
import {
  cilFolderOpen,
  cilCalculator,
  cilGroup,
  cilCalendar,
  cilBriefcase,
  cilLayers,
  cilSpeech,
  cilAddressBook,
  cilUserPlus,
  cilChartLine,
  cilChart,
} from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'
import { headingText, links } from 'src/assets/constants'
import { SET_TITLE } from 'src/actionTypes'

const userRole = sessionStorage.getItem('role')

const _nav = [
  // {
  //   component: CNavItem,
  //   name: 'Dashboard',
  //   to: '/dashboard',
  //   icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  //   badge: {
  //     color: 'info',
  //     text: 'NEW',
  //   },
  // },
  {
    component: CNavTitle,
    name: headingText.dashboard,
  },
  {
    component: CNavItem,
    name: headingText.executiveDashboard,
    to: '/dashboard',
    onClick: () =>
      store.dispatch({
        type: SET_TITLE,
        value: 'executiveDashboard',
      }),
    icon: <CIcon icon={cilChart} customClassName="nav-icon" />,
  },

  // {
  //   component: CNavGroup,
  //   name: 'Base',
  //   to: '/base',
  //   icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Accordion',
  //       to: '/base/accordion',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Breadcrumb',
  //       to: '/base/breadcrumbs',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Cards',
  //       to: '/base/cards',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Carousel',
  //       to: '/base/carousels',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Collapse',
  //       to: '/base/collapses',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'List group',
  //       to: '/base/list-groups',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Navs & Tabs',
  //       to: '/base/navs',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Pagination',
  //       to: '/base/paginations',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Placeholders',
  //       to: '/base/placeholders',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Popovers',
  //       to: '/base/popovers',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Progress',
  //       to: '/base/progress',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Spinners',
  //       to: '/base/spinners',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Tables',
  //       to: '/base/tables',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Tooltips',
  //       to: '/base/tooltips',
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Buttons',
  //   to: '/buttons',
  //   icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Buttons',
  //       to: '/buttons/buttons',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Buttons groups',
  //       to: '/buttons/button-groups',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Dropdowns',
  //       to: '/buttons/dropdowns',
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Forms',
  //   icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Form Control',
  //       to: '/forms/form-control',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Select',
  //       to: '/forms/select',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Checks & Radios',
  //       to: '/forms/checks-radios',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Range',
  //       to: '/forms/range',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Input Group',
  //       to: '/forms/input-group',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Floating Labels',
  //       to: '/forms/floating-labels',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Layout',
  //       to: '/forms/layout',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Validation',
  //       to: '/forms/validation',
  //     },
  //   ],
  // },
  // {
  //   component: CNavItem,
  //   name: headingText.recruitmentStatus,
  //   to: '/charts',
  //   icon: <CIcon icon={cilTag} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Icons',
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'CoreUI Free',
  //       to: '/icons/coreui-icons',
  //       badge: {
  //         color: 'success',
  //         text: 'NEW',
  //       },
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'CoreUI Flags',
  //       to: '/icons/flags',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'CoreUI Brands',
  //       to: '/icons/brands',
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Notifications',
  //   icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Alerts',
  //       to: '/notifications/alerts',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Badges',
  //       to: '/notifications/badges',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Modal',
  //       to: '/notifications/modals',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Toasts',
  //       to: '/notifications/toasts',
  //     },
  //   ],
  // },
  // {
  //   component: CNavItem,
  //   name: 'Widgets',
  //   to: '/dashboard/widgets',
  //   icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  //   badge: {
  //     color: 'info',
  //     text: 'NEW',
  //   },
  // },
  // {
  //   component: CNavTitle,
  //   name: 'Extras',
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Pages',
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Login',
  //       to: '/login',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Register',
  //       to: '/register',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Error 404',
  //       to: '/404',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Error 500',
  //       to: '/500',
  //     },
  //   ],
  // },
  // {
  //   component: CNavItem,
  //   name: 'Docs',
  //   href: 'https://coreui.io/react/docs/templates/installation/',
  //   icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  // },
]

if (userRole !== 'admin') {
  // insert HR dashboard at specific index
  _nav.splice(
    2,
    0,
    {
      component: CNavItem,
      name: headingText.hrdashboard,
      to: '/detailed-dashboard',
      onClick: () =>
        store.dispatch({
          type: SET_TITLE,
          value: 'hrdashboard',
        }),
       
      icon: <CIcon icon={cilChart} customClassName="nav-icon" />,
    },
    {
      component: CNavTitle,
      name: headingText.trackers,
    },
    {
      component: CNavItem,
      name: headingText.interviewTracker,
      to: '/interview-tracker',
      onClick: () =>
        store.dispatch({
          type: SET_TITLE,
          value: 'interviewTracker',
        }),
      icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: headingText.selectedCandidateTracker,
      to: '/candidate-tracker',
      onClick: () =>
        store.dispatch({
          type: SET_TITLE,
          value: 'selectedCandidateTracker',
        }),
      icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />,
    },
    {
      component: CNavTitle,
      name: headingText.lists,
    },
    {
      component: CNavItem,
      name: headingText.joineeCandidateStatus,
      to: '/candidate-status',
      onClick: () =>
        store.dispatch({
          type: SET_TITLE,
          value: 'joineeCandidateStatus',
        }),
      icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: headingText.noticePeriod,
      to: '/notice-period',
      onClick: () =>
        store.dispatch({
          type: SET_TITLE,
          value: 'noticePeriod',
        }),
      icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: headingText.candidateSource,
      to: '/candidate-source',
      onClick: () =>
        store.dispatch({
          type: SET_TITLE,
          value: 'candidateSource',
        }),
      icon: <CIcon icon={cilFolderOpen} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: headingText.division,
      to: '/division',
      onClick: () =>
        store.dispatch({
          type: SET_TITLE,
          value: 'division',
        }),
      icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: headingText.section,
      to: '/section',
      onClick: () =>
        store.dispatch({
          type: SET_TITLE,
          value: 'section',
        }),
      icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: headingText.position,
      to: '/position',
      onClick: () =>
        store.dispatch({
          type: SET_TITLE,
          value: 'position',
        }),
      icon: <CIcon icon={cilFolderOpen} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: headingText.grade,
      to: '/grade',
      onClick: () =>
        store.dispatch({
          type: SET_TITLE,
          value: 'grade',
        }),
      icon: <CIcon icon={cilFolderOpen} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: headingText.sector,
      to: '/sector',
      onClick: () =>
        store.dispatch({
          type: SET_TITLE,
          value: 'sector',
        }),
      icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: headingText.jobCategory,
      to: '/job-category',
      onClick: () =>
        store.dispatch({
          type: SET_TITLE,
          value: 'jobCategory',
        }),
      icon: <CIcon icon={cilLayers} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: headingText.jobLevel,
      to: '/job-level',
      onClick: () =>
        store.dispatch({
          type: SET_TITLE,
          value: 'jobLevel',
        }),
      icon: <CIcon icon={cilBriefcase} customClassName="nav-icon" />,
    },
    {
      component: CNavTitle,
      name: headingText.sharepoint,
    },
    {
      component: CNavItem,
      name: headingText.sharedfolder,
      to: links.sharepoint,
      target: '_blank',
      icon: <CIcon icon={cilFolderOpen} customClassName="nav-icon" />,
    },
    {
      component: CNavTitle,
      name: headingText.feedback,
    },
    {
      component: CNavItem,
      name: headingText.survey,
      to: links.survey,
      target: '_blank',
      icon: <CIcon icon={cilSpeech} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: headingText.surveyResults,
      to: links.surveyResults,
      target: '_blank',
      icon: <CIcon icon={cilChartLine} customClassName="nav-icon" />,
    },
    // {
    //   component: CNavItem,
    //   name: headingText.surveyResults,
    //   to: '/survey-results',
    //   onClick: () =>
    //     store.dispatch({
    //       type: SET_TITLE,
    //       value: 'surveyResults',
    //     }),
    //   icon: <CIcon icon={cilChartLine} customClassName="nav-icon" />,
    // },
  )
}

export default _nav
