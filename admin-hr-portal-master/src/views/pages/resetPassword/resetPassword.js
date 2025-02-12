import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
import { resetPasswordAPI } from 'src/api/resetPasswordAPI'
import { SUCCESS, errors } from 'src/assets/constants'

const ResetPassword = (props) => {
  const [username, setUsername] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [alertMsg, setAlertMsg] = useState('')
  const [alert, setAlert] = useState(false)
  const navigate = useNavigate()

  const onChangeUsername = (event) => {
    setUsername(event.target.value)
  }
  const onChangeOldPassword = (event) => {
    setOldPassword(event.target.value)
  }
  const onChangeNewPassword = (event) => {
    setNewPassword(event.target.value)
  }
  const onChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value)
  }

  const onResetPassword = async (event) => {
    if (newPassword === '' || confirmPassword === '') return

    if (newPassword !== confirmPassword) {
      setAlert(true)
      setAlertMsg(errors.PASSWORD_MISMATCH)
      return
    }

    const payload = {
      email: username,
      oldPassword,
      newPassword,
      confirmPassword,
    }
    const response = await resetPasswordAPI(payload)
    if (response?.status === SUCCESS) {
      // check if session is valid
      //   if (sessionStorage.getItem('token')) navigate('/dashboard', { replace: true })
      sessionStorage.clear()
      navigate('/login', { replace: true })
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
                    <h1>Reset Password</h1>
                    <p className="text-medium-emphasis">Reset your account password</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        autoComplete="email"
                        onChange={onChangeUsername}
                        value={username}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Old Password"
                        autoComplete="old-password"
                        onChange={onChangeOldPassword}
                        value={oldPassword}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="New Password"
                        autoComplete="new-password"
                        onChange={onChangeNewPassword}
                        value={newPassword}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Confirm Password"
                        autoComplete="confirm-password"
                        onChange={onChangeConfirmPassword}
                        value={confirmPassword}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={onResetPassword}>
                          Reset
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <Link to="/login">
                          <CButton color="link" className="px-0">
                            Login?
                          </CButton>
                        </Link>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default ResetPassword
