import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CAlert,
  CFormCheck,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { registerAPI } from 'src/api/registerAPI'
import { getUserDataAPI } from 'src/api/getUserAPI'
import { SUCCESS } from 'src/assets/constants'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [role, setRole] = useState('user')
  const [alertMsg, setAlertMsg] = useState('')
  const [alert, setAlert] = useState(false)
  const navigate = useNavigate()

  const onChangeUsername = (event) => {
    setUsername(event.target.value)
  }
  const onChangeEmail = (event) => {
    setEmail(event.target.value)
  }
  const onChangePassword = (event) => {
    setPassword(event.target.value)
  }
  const onChangeRepeatPassword = (event) => {
    setRepeatPassword(event.target.value)
  }
  const onChangeRole = (event) => {
    setRole(event.target.id)
  }

  const onRegister = async (event) => {
    if (password === repeatPassword) {
      const payload = {
        name: username,
        email,
        password,
        role,
      }
      const response = await registerAPI(payload)
      if (response.status === SUCCESS && response.data?.token) {
        sessionStorage.setItem('token', JSON.stringify(response.data?.token))
        const userData = await getUserDataAPI()
        console.log('userData', userData)
        // save user data in state
        navigate('/interview-tracker', { replace: true })
      } else {
        if (response?.code) {
          setAlert(true)
          setAlertMsg(response?.response?.data?.error)
        }
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
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
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
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      onChange={onChangeEmail}
                      value={email}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      onChange={onChangePassword}
                      value={password}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      onChange={onChangeRepeatPassword}
                      value={repeatPassword}
                    />
                  </CInputGroup>
                  <CRow className="my-3">
                    <p className="text-medium-emphasis">Select User Role</p>
                    <CCol>
                      <CFormCheck
                        type="radio"
                        inline
                        name="role"
                        id="admin"
                        label="Admin"
                        onChange={onChangeRole}
                      />
                      <CFormCheck
                        type="radio"
                        inline
                        name="role"
                        id="user"
                        label="User"
                        onChange={onChangeRole}
                        defaultChecked
                      />
                    </CCol>
                  </CRow>
                  <div className="d-grid">
                    <CButton color="success" onClick={onRegister}>
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
