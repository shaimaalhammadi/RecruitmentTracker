import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CRow,
  CAlert,
} from '@coreui/react'
import { headingText } from 'src/assets/constants'
import { addCategoryAPI } from 'src/api/categoryAPI'
import { SUCCESS, categoryTypes } from 'src/assets/constants'

const AddCandidateStatus = (state) => {
  const [category, setCategory] = useState('')
  const [alertMsg, setAlertMsg] = useState('')
  const [alert, setAlert] = useState(false)
  const navigate = useNavigate()

  const onChangeCategory = (event) => {
    setCategory(event.target.value)
  }

  const onAddCategory = async () => {
    const payload = {
      category: categoryTypes.CANDIDATE_STATUS?.text,
      value: category,
      addedBy: state.user?.name, // add user name from state
    }
    const response = await addCategoryAPI(payload)
    if (response.status === SUCCESS) {
      navigate('/candidate-status', { replace: true })
    } else {
      if (response?.code) {
        setAlert(true)
        setAlertMsg(response?.response?.data?.errors[0]?.msg)
      }
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        {alert && (
          <CAlert color="danger" dismissible onClose={() => setAlert(false)}>
            {alertMsg}
          </CAlert>
        )}
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Form Control</strong> <small>Readonly plain text</small>
          </CCardHeader>
          <CCardBody>
            {/* <p className="text-medium-emphasis small">
              If you want to have <code>&lt;input readonly&gt;</code> elements in your form styled
              as plain text, use the <code>plainText</code> boolean property to remove the default
              form field styling and preserve the correct margin and padding.
            </p> */}
            <CForm className="row g-3">
              <div className="col-3">
                {/* <CFormLabel htmlFor="staticEmail2" className="visually-hidden">
                    Email
                  </CFormLabel> */}
                <CFormInput
                  type="text"
                  id="staticEmail2"
                  defaultValue={headingText?.recruitmentStatus}
                  readOnly
                  plainText
                />
              </div>
              <div className="col-auto">
                {/* <CFormLabel htmlFor="inputPassword2" className="visually-hidden">
                  Password
                </CFormLabel> */}
                <CFormInput
                  type="text"
                  id="inputPassword2"
                  placeholder={headingText?.title}
                  onChange={onChangeCategory}
                  value={category}
                />
              </div>
              <div className="col-auto">
                <CButton type="submit" className="mb-3" onClick={onAddCategory}>
                  {headingText?.add}
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

AddCandidateStatus.propTypes = {
  user: PropTypes.object,
}

const mapStateToProps = (state) => ({
  user: state.userData.user,
})

export default connect(mapStateToProps)(AddCandidateStatus)
