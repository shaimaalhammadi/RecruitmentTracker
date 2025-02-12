import React from 'react'
import { AppSidebar, AppFooter, AppHeader } from '../components/index'
const Dashboard = React.lazy(() => import('../views/dashboard/Dashboard'))
const ExecutiveDashboard = React.lazy(() => import('../views/executiveDashboard/Dashboard'))
const InterviewTracker = React.lazy(() =>
  import('../views/base/interview-tracker/interview-tracker'),
)
const CandidateTracker = React.lazy(() =>
  import('../views/base/candidate-tracker/candidate-tracker'),
)
const CandidateStatus = React.lazy(() => import('../views/base/candidate-status/candidate-status'))
const NoticePeriod = React.lazy(() => import('../views/base/notice-period/notice-period'))
const CandidateSource = React.lazy(() => import('../views/base/candidate-source/candidate-source'))
const Division = React.lazy(() => import('../views/base/division/division'))
const Section = React.lazy(() => import('../views/base/section/section'))
const Position = React.lazy(() => import('../views/base/position/position'))
const Grade = React.lazy(() => import('../views/base/grade/grade'))
const Sector = React.lazy(() => import('../views/base/sector/sector'))
const JobCategory = React.lazy(() => import('../views/base/job-category/job-category'))
const JobLevel = React.lazy(() => import('../views/base/job-level/job-level'))

// eslint-disable-next-line react/prop-types
const DefaultLayout = ({ page }) => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          {page === 'dashboard' && <ExecutiveDashboard />}
          {page === 'detailed-dashboard' && <Dashboard />}
          {page === 'interview-tracker' && <InterviewTracker />}
          {page === 'candidate-tracker' && <CandidateTracker />}
          {page === 'candidate-status' && <CandidateStatus />}
          {page === 'notice-period' && <NoticePeriod />}
          {page === 'candidate-source' && <CandidateSource />}
          {page === 'division' && <Division />}
          {page === 'section' && <Section />}
          {page === 'position' && <Position />}
          {page === 'grade' && <Grade />}
          {page === 'sector' && <Sector />}
          {page === 'job-category' && <JobCategory />}
          {page === 'job-level' && <JobLevel />}
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
