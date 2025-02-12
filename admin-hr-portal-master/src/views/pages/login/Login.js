import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { LOG_IN } from 'src/actionTypes'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { loginAPI } from 'src/api/loginAPI'
import { getUserDataAPI } from 'src/api/getUserAPI'
import { SUCCESS } from 'src/assets/constants'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [alertMsg, setAlertMsg] = useState('')
  const [alert, setAlert] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onChangeUsername = (event) => {
    setUsername(event.target.value)
  }
  const onChangePassword = (event) => {
    setPassword(event.target.value)
  }
  const onLogin = async (event) => {
    const payload = {
      email: username,
      password,
    }

    const response = await loginAPI(payload)
    if (response?.status === SUCCESS && response.data) {
      sessionStorage.setItem('token', JSON.stringify(response.data?.token))
      const userData = await getUserDataAPI()
      if (userData?.status === SUCCESS && userData.data) {
        sessionStorage.setItem('role', userData.data?.role)
        dispatch({
          type: LOG_IN,
          value: userData?.data,
        })

        navigate('/dashboard', { replace: true })
      }
    } else {
      if (response?.code) {
        setAlert(true)
        setAlertMsg(response?.response?.data?.errors[0]?.msg)
      }
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        {alert && (
          <CAlert color="danger" dismissible onClose={() => setAlert(false)}>
            {alertMsg}
          </CAlert>
        )}
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        onChange={onChangeUsername}
                        value={username}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={onChangePassword}
                        value={password}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={onLogin}>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <Link to="/reset-password">
                          <CButton color="link" className="px-0">
                            Forgot password?
                          </CButton>
                        </Link>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Access and Manage resources using registered users only. Register Now !</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
