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
  Grid,
  DetailRow,
  ExcelExport,
  // NewRowPosition,
} from '@syncfusion/ej2-react-grids'
import {
  CCard,
  CCardBody,
  // CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'
import {
  getJoineeTrackerAPI,
  deleteJoineeTrackerAPI,
  addJoineeTrackerAPI,
  updateJoineeTrackerAPI,
} from 'src/api/joineeTrackerAPI'
import { SUCCESS, UNAUTHORIZED, INTERNAL_SERVER_ERROR, categoryTypes } from 'src/assets/constants'
import { clearUserCreds } from 'src/common/logoutFunc'
import { headingText } from 'src/assets/constants'
import { DialogFormTemplate } from './wizardTemplate'

const CandidateTracker = () => {
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
  const pageSettings = { pageCount: 10 }
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
        args.requestType === 'beginEdit'
          ? 'Edit Record of ' + args.rowData['candidate_name']
          : 'New Record'
    }

    // CRUD API begin
    if (args.action === 'add' && args.requestType === 'save') {
      let obj = {
        candidate_name: args.data?.candidate_name,
        role_position: args.data?.role_position,
        grade: args.data?.grade,
        status: args.data?.status,
        start_date: args.data?.start_date,
        application_to_resignation: args.data?.application_to_resignation,
        application_to_joining: args.data?.application_to_joining,
        open_application: args.data?.open_application,
        date_request_to_resign: args.data?.date_request_to_resign,
        joining_date: args.data?.joining_date,
        salary_offered: args.data?.salary_offered,
        notice_period: args.data?.notice_period,
        division: args.data?.division,
        jobcategory: args.data?.jobcategory,
        joblevel: args.data?.joblevel,
        year: args?.data?.start_date.split('-')[0],
      }
      if (args.data?.required_documents) {
        obj.required_documents = {}
        obj.required_documents.who = args.data.required_documents?.who
        obj.required_documents.done = args.data.required_documents?.done
        obj.required_documents.date_sent = args.data.required_documents?.date_sent
        obj.required_documents.date_received = args.data.required_documents?.date_received
      }
      if (args.data?.initial_offer) {
        obj.initial_offer = {}
        obj.initial_offer.who = args.data.initial_offer?.who
        obj.initial_offer.done = args.data.initial_offer?.done
        obj.initial_offer.date_sent = args.data.initial_offer?.date_sent
        obj.initial_offer.date_received = args.data.initial_offer?.date_received
      }
      if (args.data?.hrc) {
        obj.hrc = {}
        obj.hrc.who = args.data.hrc?.who
        obj.hrc.done = args.data.hrc?.done
        obj.hrc.date_completed = args.data.hrc?.date_completed
      }
      if (args.data?.offical_offer_letter) {
        obj.offical_offer_letter = {}
        obj.offical_offer_letter.who = args.data.offical_offer_letter?.who
        obj.offical_offer_letter.done = args.data.offical_offer_letter?.done
        obj.offical_offer_letter.date_completed = args.data.offical_offer_letter?.date_completed
      }
      if (args.data?.tarasul) {
        obj.tarasul = {}
        obj.tarasul.who = args.data.tarasul?.who
        obj.tarasul.done = args.data.tarasul?.done
        obj.tarasul.date_submitted = args.data.tarasul?.date_submitted
        obj.tarasul.date_completed = args.data.tarasul?.date_completed
        obj.tarasul.days_in_tarasul = args.data.tarasul?.days_in_tarasul
      }
      if (args.data?.medical_assesment) {
        obj.medical_assesment = {}
        obj.medical_assesment.who = args.data.medical_assesment?.who
        obj.medical_assesment.done = args.data.medical_assesment?.done
        obj.medical_assesment.date_completed = args.data.medical_assesment?.date_completed
      }
      if (args.data?.adsg) {
        obj.adsg = {}
        obj.adsg.who = args.data.adsg?.who
        obj.adsg.done = args.data.adsg?.done
        obj.adsg.date_requested = args.data.adsg?.date_requested
        obj.adsg.date_completed = args.data.adsg?.date_completed
      }
      if (args.data?.reference_check) {
        obj.reference_check = {}
        obj.reference_check.who = args.data.reference_check?.who
        obj.reference_check.done = args.data.reference_check?.done
        obj.reference_check.date_completed = args.data.reference_check?.date_completed
      }
      if (args.data?.resignation_requested) {
        obj.resignation_requested = {}
        obj.resignation_requested.who = args.data.resignation_requested?.who
        obj.resignation_requested.done = args.data.resignation_requested?.done
        obj.resignation_requested.date_completed = args.data.resignation_requested?.date_completed
      }
      if (args.data?.employment_contract) {
        obj.employment_contract = {}
        obj.employment_contract.who = args.data.employment_contract?.who
        obj.employment_contract.done = args.data.employment_contract?.done
        obj.employment_contract.date_completed = args.data.employment_contract?.date_completed
      }
      if (args.data?.joining_forms) {
        obj.joining_forms = {}
        obj.joining_forms.who = args.data.joining_forms?.who
        obj.joining_forms.done = args.data.joining_forms?.done
        obj.joining_forms.date_completed = args.data.joining_forms?.date_completed
      }
      if (args.data?.new_joiner_checklist) {
        obj.new_joiner_checklist = {}
        obj.new_joiner_checklist.who = args.data.new_joiner_checklist?.who
        obj.new_joiner_checklist.done = args.data.new_joiner_checklist?.done
        obj.new_joiner_checklist.date_completed = args.data.new_joiner_checklist?.date_completed
      }
      if (args.data?.new_joiner_bio) {
        obj.new_joiner_bio = {}
        obj.new_joiner_bio.who = args.data.new_joiner_bio?.who
        obj.new_joiner_bio.done = args.data.new_joiner_bio?.done
        obj.new_joiner_bio.date_completed = args.data.new_joiner_bio?.date_completed
      }
      await addJoineeTrackerAPI(obj)
      fetchData()
    } else if (args.action === 'edit' && args.requestType === 'save') {
      let obj = {
        candidate_name: args.data?.candidate_name,
        role_position: args.data?.role_position,
        grade: args.data?.grade,
        status: args.data?.status,
        start_date: args.data?.start_date,
        application_to_resignation: args.data?.application_to_resignation,
        application_to_joining: args.data?.application_to_joining,
        open_application: args.data?.open_application,
        date_request_to_resign: args.data?.date_request_to_resign,
        joining_date: args.data?.joining_date,
        salary_offered: args.data?.salary_offered,
        division: args.data?.division,
        jobcategory: args.data?.jobcategory,
        joblevel: args.data?.joblevel,
        notice_period: args.data?.notice_period,
        id: args.data?._id,
        year: args?.data?.start_date.split('-')[0],
      }
      if (args.data?.required_documents) {
        obj.required_documents = {}
        obj.required_documents.who = args.data.required_documents?.who
        obj.required_documents.done = args.data.required_documents?.done
        obj.required_documents.date_sent = args.data.required_documents?.date_sent
        obj.required_documents.date_received = args.data.required_documents?.date_received
      }
      if (args.data?.initial_offer) {
        obj.initial_offer = {}
        obj.initial_offer.who = args.data.initial_offer?.who
        obj.initial_offer.done = args.data.initial_offer?.done
        obj.initial_offer.date_sent = args.data.initial_offer?.date_sent
        obj.initial_offer.date_received = args.data.initial_offer?.date_received
      }
      if (args.data?.hrc) {
        obj.hrc = {}
        obj.hrc.who = args.data.hrc?.who
        obj.hrc.done = args.data.hrc?.done
        obj.hrc.date_completed = args.data.hrc?.date_completed
      }
      if (args.data?.offical_offer_letter) {
        obj.offical_offer_letter = {}
        obj.offical_offer_letter.who = args.data.offical_offer_letter?.who
        obj.offical_offer_letter.done = args.data.offical_offer_letter?.done
        obj.offical_offer_letter.date_completed = args.data.offical_offer_letter?.date_completed
      }
      if (args.data?.tarasul) {
        obj.tarasul = {}
        obj.tarasul.who = args.data.tarasul?.who
        obj.tarasul.done = args.data.tarasul?.done
        obj.tarasul.date_submitted = args.data.tarasul?.date_submitted
        obj.tarasul.date_completed = args.data.tarasul?.date_completed
        obj.tarasul.days_in_tarasul = args.data.tarasul?.days_in_tarasul
      }
      if (args.data?.medical_assesment) {
        obj.medical_assesment = {}
        obj.medical_assesment.who = args.data.medical_assesment?.who
        obj.medical_assesment.done = args.data.medical_assesment?.done
        obj.medical_assesment.date_completed = args.data.medical_assesment?.date_completed
      }
      if (args.data?.adsg) {
        obj.adsg = {}
        obj.adsg.who = args.data.adsg?.who
        obj.adsg.done = args.data.adsg?.done
        obj.adsg.date_requested = args.data.adsg?.date_requested
        obj.adsg.date_completed = args.data.adsg?.date_completed
      }
      if (args.data?.reference_check) {
        obj.reference_check = {}
        obj.reference_check.who = args.data.reference_check?.who
        obj.reference_check.done = args.data.reference_check?.done
        obj.reference_check.date_completed = args.data.reference_check?.date_completed
      }
      if (args.data?.resignation_requested) {
        obj.resignation_requested = {}
        obj.resignation_requested.who = args.data.resignation_requested?.who
        obj.resignation_requested.done = args.data.resignation_requested?.done
        obj.resignation_requested.date_completed = args.data.resignation_requested?.date_completed
      }
      if (args.data?.employment_contract) {
        obj.employment_contract = {}
        obj.employment_contract.who = args.data.employment_contract?.who
        obj.employment_contract.done = args.data.employment_contract?.done
        obj.employment_contract.date_completed = args.data.employment_contract?.date_completed
      }
      if (args.data?.joining_forms) {
        obj.joining_forms = {}
        obj.joining_forms.who = args.data.joining_forms?.who
        obj.joining_forms.done = args.data.joining_forms?.done
        obj.joining_forms.date_completed = args.data.joining_forms?.date_completed
      }
      if (args.data?.new_joiner_checklist) {
        obj.new_joiner_checklist = {}
        obj.new_joiner_checklist.who = args.data.new_joiner_checklist?.who
        obj.new_joiner_checklist.done = args.data.new_joiner_checklist?.done
        obj.new_joiner_checklist.date_completed = args.data.new_joiner_checklist?.date_completed
      }
      if (args.data?.new_joiner_bio) {
        obj.new_joiner_bio = {}
        obj.new_joiner_bio.who = args.data.new_joiner_bio?.who
        obj.new_joiner_bio.done = args.data.new_joiner_bio?.done
        obj.new_joiner_bio.date_completed = args.data.new_joiner_bio?.date_completed
      }
      let res = await updateJoineeTrackerAPI(obj)
      console.log(res)
      fetchData()
    }
    if (args.requestType === 'delete') {
      await deleteJoineeTrackerAPI({ id: args.data[0]._id })
    }
  }

  function ddChange() {
    gridInstance.editSettings.newRowPosition = dropDownInstance.value
  }

  let orderDataSource = []

  // const payload = { category: categoryTypes.CANDIDATE_STATUS?.alias }

  async function fetchData() {
    const response = await getJoineeTrackerAPI()
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

  function gridTemplate(props) {
    return (
      <div className="row">
        {props?.required_documents && (
          <div className="card m-3" style={{ width: '25rem' }}>
            <div className="card-header">Required Documents</div>
            <ul className="list-group list-group-flush">
              {/* <li className="list-group-item">Who: {props.required_documents.who}</li>
              <li className="list-group-item">Done: {props.required_documents.done}</li> */}
              <li className="list-group-item">Date Sent: {props?.required_documents?.date_sent}</li>
              <li className="list-group-item">
                Date Received: {props?.required_documents?.date_received}
              </li>
            </ul>
          </div>
        )}
        {props?.initial_offer && (
          <div className="card m-3" style={{ width: '25rem' }}>
            <div className="card-header">Initial Offer</div>
            <ul className="list-group list-group-flush">
              {/* <li className="list-group-item">Who: {props.initial_offer.who}</li>
              <li className="list-group-item">Done: {props.initial_offer.done}</li> */}
              <li className="list-group-item">Date Sent: {props?.initial_offer?.date_sent}</li>
              <li className="list-group-item">
                Date Received: {props?.initial_offer?.date_received}
              </li>
            </ul>
          </div>
        )}
        {props?.hrc && (
          <div className="card m-3" style={{ width: '25rem' }}>
            <div className="card-header">HRC</div>
            <ul className="list-group list-group-flush">
              {/* <li className="list-group-item">Who: {props.hrc.who}</li>
              <li className="list-group-item">Done: {props.hrc.done}</li> */}
              <li className="list-group-item">Date Completed: {props?.hrc?.date_completed}</li>
            </ul>
          </div>
        )}
        {props?.offical_offer_letter && (
          <div className="card m-3" style={{ width: '25rem' }}>
            <div className="card-header">Offical Offer Letter</div>
            <ul className="list-group list-group-flush">
              {/* <li className="list-group-item">Who: {props.offical_offer_letter.who}</li>
              <li className="list-group-item">Done: {props.offical_offer_letter.done}</li> */}
              <li className="list-group-item">
                Date Completed: {props?.offical_offer_letter?.date_completed}
              </li>
            </ul>
          </div>
        )}
        {props?.tarasul && (
          <div className="card m-3" style={{ width: '25rem' }}>
            <div className="card-header">Tarasul</div>
            <ul className="list-group list-group-flush">
              {/* <li className="list-group-item">Who: {props.tarasul.who}</li>
              <li className="list-group-item">Done: {props.tarasul.done}</li> */}
              <li className="list-group-item">Date Submitted: {props?.tarasul?.date_submitted}</li>
              <li className="list-group-item">Date Completed: {props?.tarasul?.date_completed}</li>
              <li className="list-group-item">
                Days in Tarasul: {props?.tarasul?.days_in_tarasul}
              </li>
            </ul>
          </div>
        )}
        {props?.medical_assesment && (
          <div className="card m-3" style={{ width: '25rem' }}>
            <div className="card-header">Medical Assesment</div>
            <ul className="list-group list-group-flush">
              {/* <li className="list-group-item">Who: {props.medical_assesment.who}</li>
              <li className="list-group-item">Done: {props.medical_assesment.done}</li> */}
              <li className="list-group-item">
                Date Completed: {props?.medical_assesment?.date_completed}
              </li>
            </ul>
          </div>
        )}
        {props?.adsg && (
          <div className="card m-3" style={{ width: '25rem' }}>
            <div className="card-header">ADSG</div>
            <ul className="list-group list-group-flush">
              {/* <li className="list-group-item">Who: {props.adsg.who}</li>
              <li className="list-group-item">Done: {props.adsg.done}</li> */}
              <li className="list-group-item">Date Requested: {props?.adsg?.date_requested}</li>
              <li className="list-group-item">Date Completed: {props?.adsg?.date_completed}</li>
            </ul>
          </div>
        )}
        {props?.reference_check && (
          <div className="card m-3" style={{ width: '25rem' }}>
            <div className="card-header">Reference Check</div>
            <ul className="list-group list-group-flush">
              {/* <li className="list-group-item">Who: {props.reference_check.who}</li>
              <li className="list-group-item">Done: {props.reference_check.done}</li> */}
              <li className="list-group-item">
                Date Completed: {props?.reference_check?.date_completed}
              </li>
            </ul>
          </div>
        )}
        {props?.resignation_requested && (
          <div className="card m-3" style={{ width: '25rem' }}>
            <div className="card-header">Resignation Requested</div>
            <ul className="list-group list-group-flush">
              {/* <li className="list-group-item">Who: {props.resignation_requested.who}</li>
              <li className="list-group-item">Done: {props.resignation_requested.done}</li> */}
              <li className="list-group-item">
                Date Completed: {props?.resignation_requested?.date_completed}
              </li>
            </ul>
          </div>
        )}
        {props?.employment_contract && (
          <div className="card m-3" style={{ width: '25rem' }}>
            <div className="card-header">Employment Contract</div>
            <ul className="list-group list-group-flush">
              {/* <li className="list-group-item">Who: {props.employment_contract.who}</li>
              <li className="list-group-item">Done: {props.employment_contract.done}</li> */}
              <li className="list-group-item">
                Date Completed: {props?.employment_contract?.date_completed}
              </li>
            </ul>
          </div>
        )}
        {props?.joining_forms && (
          <div className="card m-3" style={{ width: '25rem' }}>
            <div className="card-header">Joining Forms</div>
            <ul className="list-group list-group-flush">
              {/* <li className="list-group-item">Who: {props.joining_forms.who}</li>
              <li className="list-group-item">Done: {props.joining_forms.done}</li> */}
              <li className="list-group-item">
                Date Completed: {props?.joining_forms?.date_completed}
              </li>
            </ul>
          </div>
        )}
        {props?.new_joiner_checklist && (
          <div className="card m-3" style={{ width: '25rem' }}>
            <div className="card-header">New Joiner Checklist</div>
            <ul className="list-group list-group-flush">
              {/* <li className="list-group-item">Who: {props.new_joiner_checklist.who}</li>
              <li className="list-group-item">Done: {props.new_joiner_checklist.done}</li> */}
              <li className="list-group-item">
                Date Completed: {props?.new_joiner_checklist?.date_completed}
              </li>
            </ul>
          </div>
        )}
        {props?.new_joiner_bio && (
          <div className="card m-3" style={{ width: '25rem' }}>
            <div className="card-header">New Joiner Bio</div>
            <ul className="list-group list-group-flush">
              {/* <li className="list-group-item">Who: {props.new_joiner_bio.who}</li>
              <li className="list-group-item">Done: {props.new_joiner_bio.done}</li> */}
              <li className="list-group-item">
                Date Completed: {props?.new_joiner_bio?.date_completed}
              </li>
            </ul>
          </div>
        )}
      </div>
    )
  }
  // const gridTemplate = (props) => {
  //   return <div className="custom-grid"></div>
  // }
  // const detailDataBound = (e) => {
  //   debugger
  //   // e.data
  //   let detail = new Grid({
  //     dataSource: orderDataSource,
  //     columns: [
  //       { field: 'OrderID', headerText: 'Order ID', width: 110 },
  //       { field: 'CustomerID', headerText: 'Customer Name', width: 140 },
  //       { field: 'ShipCountry', headerText: 'Ship Country', width: 150 },
  //     ],
  //   })
  //   detail.appendTo(e.detailElement.querySelector('.custom-grid'))
  // }

  const template = gridTemplate
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
                    detailTemplate={template.bind(this)}
                    allowExcelExport={true}
                    toolbarClick={toolbarClick}
                  >
                    <ColumnsDirective>
                      <ColumnDirective
                        field="candidate_name"
                        headerText={headingText?.candidateName}
                        textAlign="Center"
                        isPrimaryKey={true}
                      ></ColumnDirective>
                      <ColumnDirective
                        field="role_position"
                        headerText={headingText?.role_position}
                        textAlign="Center"
                        isPrimaryKey={true}
                      ></ColumnDirective>
                      <ColumnDirective
                        field="grade"
                        headerText={headingText?.grade}
                        textAlign="Center"
                      ></ColumnDirective>
                      <ColumnDirective
                        field="status"
                        headerText={headingText?.status}
                        textAlign="Center"
                      ></ColumnDirective>
                      <ColumnDirective
                        field="start_date"
                        headerText={headingText?.start_date}
                        textAlign="Center"
                      ></ColumnDirective>
                      <ColumnDirective
                        field="application_to_resignation"
                        headerText={headingText?.application_to_resignation}
                        textAlign="Center"
                      ></ColumnDirective>
                      <ColumnDirective
                        field="application_to_joining"
                        headerText={headingText?.application_to_joining}
                        textAlign="Center"
                      ></ColumnDirective>
                      <ColumnDirective
                        field="open_application"
                        headerText={headingText?.open_application}
                        textAlign="Center"
                      ></ColumnDirective>
                      <ColumnDirective
                        field="date_request_to_resign"
                        headerText={headingText?.date_request_to_resign}
                        textAlign="Center"
                      ></ColumnDirective>
                      <ColumnDirective
                        field="division"
                        headerText={headingText?.division}
                        textAlign="Center"
                      ></ColumnDirective>
                      <ColumnDirective
                        field="jobcategory"
                        headerText={headingText?.jobCategory}
                        textAlign="Center"
                      ></ColumnDirective>
                      <ColumnDirective
                        field="joblevel"
                        headerText={headingText?.jobLevel}
                        textAlign="Center"
                      ></ColumnDirective>
                      <ColumnDirective
                        field="notice_period"
                        headerText={headingText?.noticePeriod}
                        textAlign="Center"
                      ></ColumnDirective>
                      <ColumnDirective
                        field="salary_offered"
                        headerText={headingText?.salary_offered}
                        textAlign="Center"
                      ></ColumnDirective>
                    </ColumnsDirective>
                    <Inject
                      services={[Page, Toolbar, Edit, ColumnChooser, DetailRow, ExcelExport]}
                    />
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

export default CandidateTracker
