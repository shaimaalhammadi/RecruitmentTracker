import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
// const Register = React.lazy(() => import('./views/pages/register/Register'))
const ResetPassword = React.lazy(() => import('./views/pages/resetPassword/resetPassword'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

class App extends Component {
  render() {
    const { isAuthenticated } = this.props.user
    let token = null
    let role = null
    if (sessionStorage.getItem('token')) token = JSON.parse(sessionStorage.getItem('token'))
    if (sessionStorage.getItem('role')) role = sessionStorage.getItem('role')
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            {!isAuthenticated || !token ? (
              <>
                <Route exact path="/login" name="Login Page" element={<Login />} />
                {/* <Route exact path="/register" name="Register Page" element={<Register />} /> */}
              </>
            ) : (
              <Route path="*" element={<Navigate to="dashboard" replace />} />
            )}
            {isAuthenticated && token ? (
              <>
                <Route exact path="/404" name="Page 404" element={<Page404 />} />
                <Route exact path="/500" name="Page 500" element={<Page500 />} />
                <Route
                  exact
                  path="/dashboard"
                  name="Home"
                  element={<DefaultLayout page="dashboard" />}
                />
                {role !== 'admin' && ( 
                  <>
                    <Route
                      exact
                      path="/detailed-dashboard"
                      name="Home"
                      element={<DefaultLayout page="detailed-dashboard" />}
                    />
                    <Route
                      exact
                      path="/interview-tracker"
                      name="Interview Tracker"
                      element={<DefaultLayout page="interview-tracker" />}
                    />
                    <Route
                      exact
                      path="/candidate-tracker"
                      name="Candidate Tracker"
                      element={<DefaultLayout page="candidate-tracker" />}
                    />
                    <Route
                      exact
                      path="/candidate-status"
                      name="Candidate Status"
                      element={<DefaultLayout page="candidate-status" />}
                    />
                    <Route
                      exact
                      path="/notice-period"
                      name="Notice Period"
                      element={<DefaultLayout page="notice-period" />}
                    />
                    <Route
                      exact
                      path="/candidate-source"
                      name="Candidate Source"
                      element={<DefaultLayout page="candidate-source" />}
                    />
                    <Route
                      exact
                      path="/division"
                      name="Division"
                      element={<DefaultLayout page="division" />}
                    />
                    <Route
                      exact
                      path="/section"
                      name="Section"
                      element={<DefaultLayout page="section" />}
                    />
                    <Route
                      exact
                      path="/position"
                      name="Position"
                      element={<DefaultLayout page="position" />}
                    />
                    <Route
                      exact
                      path="/grade"
                      name="Grade"
                      element={<DefaultLayout page="grade" />}
                    />
                    <Route
                      exact
                      path="/sector"
                      name="Sector"
                      element={<DefaultLayout page="sector" />}
                    />
                    <Route
                      exact
                      path="/job-category"
                      name="Job Category"
                      element={<DefaultLayout page="job-category" />}
                    />
                    <Route
                      exact
                      path="/job-level"
                      name="Job Level"
                      element={<DefaultLayout page="job-level" />}
                    />
                    <Route
                      exact
                      path="/survey-results"
                      name="Survey Results"
                      element={<DefaultLayout page="survey-results" />}
                    />
                  </>
                )}
              </>
            ) : (
              <Route path="*" element={<Navigate to="login" replace />} />
            )}
            {/* <Route path="/dashboard" element={<Navigate to="dashboard" replace />} /> */}
            <Route
              exact
              path="/reset-password"
              name="Reset Password Page"
              element={<ResetPassword />}
            />
            <Route path="*" element={<Navigate to="login" replace />} />
          </Routes>
        </Suspense>
      </HashRouter>
    )
  }
}

App.propTypes = {
  user: PropTypes.object,
}

const mapStateToProps = (state) => ({
  user: state.userData,
})

export default connect(mapStateToProps)(App)
