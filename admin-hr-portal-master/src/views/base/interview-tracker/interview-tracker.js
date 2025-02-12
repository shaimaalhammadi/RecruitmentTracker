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
  ExcelExport,
  // NewRowPosition,
} from '@syncfusion/ej2-react-grids'
import {
  CCard,
  CCardBody,
  // CCardHeader,
  CCol,
  CRow,
  // CTable,
  // CTableBody,
  // CTableDataCell,
  // CTableHead,
  // CTableHeaderCell,
  // CTableRow,
  // CTooltip,
  // CAccordion,
  // CAccordionItem,
  // CAccordionHeader,
  // CAccordionBody,
} from '@coreui/react'
import {
  getInterviewTrackerAPI,
  deleteInterviewTrackerAPI,
  addInterviewTrackerAPI,
  updateInterviewTrackerAPI,
} from 'src/api/interviewTrackerAPI'
import { addJoineeTrackerAPI } from 'src/api/joineeTrackerAPI'
import { SUCCESS, UNAUTHORIZED, INTERNAL_SERVER_ERROR, categoryTypes } from 'src/assets/constants'
import { clearUserCreds } from 'src/common/logoutFunc'
import { headingText } from 'src/assets/constants'
import { DialogFormTemplate } from './wizardTemplate'

const InterviewTracker = () => {
  const dialogTemplate = (props) => {
    const a = props
    return <DialogFormTemplate {...a} />
  }

  // get the list of statuses from the API
  const navigate = useNavigate()
  const toolbarOptions = [
    'Add',
    'Edit',
    'Delete',
    'Update',
    'Cancel',
    'ColumnChooser',
    'ExcelExport',
  ]

  const editSettings = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: 'Dialog',
    template: dialogTemplate,
  }
  // const editparams = { params: { popupHeight: '300px' } }
  // const validationRule = { required: true }
  // const orderidRules = { required: true, number: true }
  const pageSettings = { pageCount: 10 }
  // const format = { type: 'dateTime', format: 'M/d/y hh:mm a' }

  let gridInstance
  let dropDownInstance

  const logout = () => {
    clearUserCreds()
    navigate('/login', { replace: true })
  }

  async function actionComplete(args) {
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      const dialog = args.dialog
      dialog.showCloseIcon = false
      dialog.height = 400
      // change the header of the dialog
      dialog.header =
        args.requestType === 'beginEdit' ? 'Edit Record of ' + args.rowData['name'] : 'New Record'
    }

    // CRUD API begin
    if (args.action === 'add' && args.requestType === 'save') {
      await addInterviewTrackerAPI({
        agency: args.data.agency,
        name: args.data.name,
        first_interview_date: args.data.first_interview_date,
        second_interview_date: args.data.second_interview_date,
        candidate_status: args.data.candidate_status,
        recruiter: args.data.recruiter,
        job_title_arabic: args.data.job_title_arabic,
        job_title_english: args.data.job_title_english,
        sector: args.data.sector,
        division: args.data.division,
        jobcategory: args.data.jobcategory,
        joblevel: args.data.joblevel,
        section: args.data.section,
        comments: args.data.comments,
        year: args?.data?.first_interview_date.split('-')[0],
      })
      fetchData()
    } else if (args.action === 'edit' && args.requestType === 'save') {
      await updateInterviewTrackerAPI({
        agency: args.data.agency,
        name: args.data.name,
        first_interview_date: args.data.first_interview_date,
        second_interview_date: args.data.second_interview_date,
        candidate_status: args.data.candidate_status,
        recruiter: args.data.recruiter,
        job_title_arabic: args.data.job_title_arabic,
        job_title_english: args.data.job_title_english,
        sector: args.data.sector,
        division: args.data.division,
        jobcategory: args.data.jobcategory,
        joblevel: args.data.joblevel,
        section: args.data.section,
        comments: args.data.comments,
        id: args.data._id,
        year: args?.data?.first_interview_date.split('-')[0],
      })
      if (args.data.candidate_status == 'Selected' || args.data.candidate_status == 'Joined') {
        // call add joinee api
        let obj = {
          candidate_name: args.data.name,
          role_position: args.data.job_title_english,
          grade: null,
          status: args.data.candidate_status,
          start_date: args.data.first_interview_date,
          application_to_resignation: null,
          application_to_joining: null,
          open_application: null,
          date_request_to_resign: null,
          joining_date: null,
          salary_offered: null,
          notice_period: null,
          division: args.data.division || null,
          jobcategory: args.data.jobcategory || null,
          joblevel: args.data.joblevel || null,
          sector: args.data.sector,
          year: args?.data?.first_interview_date.split('-')[0],
        }
        await addJoineeTrackerAPI(obj)
      }
      fetchData()
    }
    if (args.requestType === 'delete') {
      await deleteInterviewTrackerAPI({ id: args.data[0]._id })
    }
  }

  function ddChange() {
    gridInstance.editSettings.newRowPosition = dropDownInstance.value
  }

  let orderDataSource = []

  const payload = { category: categoryTypes.CANDIDATE_STATUS?.alias }

  async function fetchData() {
    const response = await getInterviewTrackerAPI(payload)
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

  const toolbarClick = (args) => {
    if (gridInstance && args.item.id.includes('_excelexport')) {
      const excelExportProperties = {
        dataSource: orderDataSource,
      }
      gridInstance.excelExport(excelExportProperties)
    }
  }

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
                    showColumnChooser={true}
                    toolbar={toolbarOptions}
                    allowPaging={true}
                    editSettings={editSettings}
                    pageSettings={pageSettings}
                    actionComplete={actionComplete}
                    allowExcelExport={true}
                    toolbarClick={toolbarClick}
                  >
                    <ColumnsDirective>
                      <ColumnDirective
                        field="agency"
                        headerText={headingText?.candidateSource}
                        textAlign="Center"
                      ></ColumnDirective>
                      <ColumnDirective
                        field="name"
                        headerText={headingText?.candidateName}
                        textAlign="Center"
                        isPrimaryKey={true}
                      ></ColumnDirective>
                      <ColumnDirective
                        field="job_title_arabic"
                        headerText={headingText?.arabicTitle}
                        textAlign="Center"
                        isPrimaryKey={true}
                      ></ColumnDirective>
                      <ColumnDirective
                        field="first_interview_date"
                        headerText={headingText?.interviewDateOne}
                        textAlign="Center"
                      ></ColumnDirective>
                      <ColumnDirective
                        field="second_interview_date"
                        headerText={headingText?.interviewDateTwo}
                        textAlign="Center"
                        isPrimaryKey={true}
                      ></ColumnDirective>
                      <ColumnDirective
                        field="candidate_status"
                        headerText={headingText?.joineeCandidateStatus}
                        textAlign="Center"
                        isPrimaryKey={true}
                      ></ColumnDirective>
                      <ColumnDirective
                        field="recruiter"
                        headerText={headingText?.recruiter}
                        textAlign="Center"
                        visible={false}
                      ></ColumnDirective>
                      <ColumnDirective
                        field="job_title_english"
                        headerText={headingText?.englishTitle}
                        textAlign="Center"
                        isPrimaryKey={true}
                        visible={false}
                      ></ColumnDirective>
                      <ColumnDirective
                        field="sector"
                        headerText={headingText?.sector}
                        textAlign="Center"
                        isPrimaryKey={true}
                        visible={false}
                      ></ColumnDirective>
                      <ColumnDirective
                        field="division"
                        headerText={headingText?.division}
                        textAlign="Center"
                        visible={false}
                      ></ColumnDirective>
                      <ColumnDirective
                        field="jobcategory"
                        headerText={headingText?.jobCategory}
                        textAlign="Center"
                        visible={false}
                      ></ColumnDirective>
                      <ColumnDirective
                        field="joblevel"
                        headerText={headingText?.jobLevel}
                        textAlign="Center"
                        visible={false}
                      ></ColumnDirective>
                      <ColumnDirective
                        field="section"
                        headerText={headingText?.section}
                        textAlign="Center"
                        isPrimaryKey={true}
                        visible={false}
                      ></ColumnDirective>
                      <ColumnDirective
                        field="comments"
                        headerText={headingText?.comments}
                        textAlign="Center"
                        isPrimaryKey={true}
                        visible={false}
                      ></ColumnDirective>
                    </ColumnsDirective>
                    <Inject services={[Page, Toolbar, Edit, ColumnChooser, ExcelExport]} />
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

export default InterviewTracker
