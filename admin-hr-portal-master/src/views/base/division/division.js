import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Toolbar,
  ColumnChooser,
  Inject,
  Edit,
  NewRowPosition,
} from '@syncfusion/ej2-react-grids'
import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
import {
  getCategoryAPI,
  deleteCategoryAPI,
  addCategoryAPI,
  updateCategoryAPI,
} from 'src/api/categoryAPI'
import { SUCCESS, UNAUTHORIZED, INTERNAL_SERVER_ERROR, categoryTypes } from 'src/assets/constants'
import { clearUserCreds } from 'src/common/logoutFunc'

const Division = () => {
  const navigate = useNavigate()
  const toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel']
  const editSettings = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    newRowPosition: 'Top',
  }
  const editparams = { params: { popupHeight: '300px' } }
  const validationRule = { required: true }
  const orderidRules = { required: true, number: true }
  const pageSettings = { pageCount: 10 }
  const format = { type: 'dateTime', format: 'M/d/y hh:mm a' }

  let gridInstance
  let dropDownInstance

  const logout = () => {
    clearUserCreds()
    navigate('/login', { replace: true })
  }

  async function actionBegin(args) {
    if (args.requestType === 'save') {
      if (
        // gridInstance.pageSettings.currentPage !== 1 &&
        gridInstance.editSettings.newRowPosition === 'Top'
      ) {
        args.index =
          gridInstance.pageSettings.currentPage * gridInstance.pageSettings.pageSize -
          gridInstance.pageSettings.pageSize
      } else if (gridInstance.editSettings.newRowPosition === 'Bottom') {
        args.index = gridInstance.pageSettings.currentPage * gridInstance.pageSettings.pageSize - 1
      }
    }

    // CRUD API begin
    if (args.action === 'add' && args.requestType === 'save') {
      await addCategoryAPI({
        category: 'Division',
        value: args.data.value,
        addedBy: args.data.addedBy,
      })
      fetchData()
    } else if (args.action === 'edit' && args.requestType === 'save') {
      await updateCategoryAPI({
        value: args.data.value,
        id: args.data._id,
      })
    }
    if (args.requestType === 'delete') {
      await deleteCategoryAPI({ id: args.data[0]._id })
    }
  }

  function ddChange() {
    gridInstance.editSettings.newRowPosition = dropDownInstance.value
  }

  let orderDataSource = []

  const payload = { category: categoryTypes.DIVISION?.alias }

  async function fetchData() {
    const response = await getCategoryAPI(payload)
    if (response.status === SUCCESS && response?.data) {
      orderDataSource = response.data
      if (gridInstance) {
        gridInstance.dataSource = orderDataSource
      }
    } else {
      switch (response.response.status) {
        case UNAUTHORIZED:
          logout()
          break
        case INTERNAL_SERVER_ERROR:
          navigate('/500', { replace: true })
          break
        default:
          navigate('/404', { replace: true })
      }
    }
    document.getElementsByTagName('body')[0].childNodes[
      document.getElementsByTagName('body')[0].childNodes.length - 1
    ].style.display = 'none'
  }

  useEffect(() => {
    fetchData()
  })

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            <div className="control-pane">
              <div className="control-section">
                <div>
                  <GridComponent
                    dataSource={orderDataSource}
                    ref={(grid) => (gridInstance = grid)}
                    toolbar={toolbarOptions}
                    allowPaging={true}
                    editSettings={editSettings}
                    pageSettings={pageSettings}
                    actionBegin={actionBegin.bind(this)}
                  >
                    <ColumnsDirective>
                      <ColumnDirective
                        field="value"
                        headerText="Options"
                        width="400"
                        textAlign="Center"
                      ></ColumnDirective>
                      <ColumnDirective
                        field="addedBy"
                        headerText="Added By"
                        textAlign="Center"
                        width="450"
                        isPrimaryKey={true}
                      ></ColumnDirective>
                    </ColumnsDirective>
                    <Inject services={[Page, Toolbar, Edit]} />
                  </GridComponent>
                </div>
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Division
