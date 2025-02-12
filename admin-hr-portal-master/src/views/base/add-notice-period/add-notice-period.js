import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CRow,
} from '@coreui/react'
import { headingText } from 'src/assets/constants'

const AddNoticePeriod = () => {
  return (
    <CRow>
      <CCol xs={12}>
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
              <div className="col-auto">
                {/* <CFormLabel htmlFor="staticEmail2" className="visually-hidden">
                    Email
                  </CFormLabel> */}
                <CFormInput
                  type="text"
                  id="staticEmail2"
                  defaultValue={headingText?.noticePeriod}
                  readOnly
                  plainText
                />
              </div>
              <div className="col-auto">
                {/* <CFormLabel htmlFor="inputPassword2" className="visually-hidden">
                  Password
                </CFormLabel> */}
                <CFormInput type="text" id="inputPassword2" placeholder={headingText?.title} />
              </div>
              <div className="col-auto">
                <CButton type="submit" className="mb-3">
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

export default AddNoticePeriod
