import { DataUtil } from '@syncfusion/ej2-data'
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns'
import * as React from 'react'
import { headingText } from 'src/assets/constants'
import { getCategoryAPI } from 'src/api/categoryAPI.js'

export class DialogFormTemplate extends React.Component {
  shipCountryDistinctData = DataUtil.distinct(['a', 'b'], 'ShipCountry', true)

  constructor(props) {
    super(props)
    this.state = Object.assign({}, props)
    this.candidatestatus = []
    this.noticeperiod = []
    this.candidatesource = []
    this.positionsource = []
    this.divisionsource = []
    this.jobcategorysource = []
    this.joblevelsource = []
    this.gradesource = []
    this.candidatestatusArr = []
    this.noticeperiodArr = []
    this.candidatesourceArr = []
    this.positionsourceArr = []
    this.divisionsourceArr = []
    this.jobcategorysourceArr = []
    this.joblevelsourceArr = []
    this.gradesourceArr = []
  }

  async componentDidMount() {
    this.candidatestatus = await getCategoryAPI({ category: 'candidatestatus' })
    this.candidatestatus = this.candidatestatus?.data
    this.candidatestatus.forEach((item) => {
      this.candidatestatusArr.push(item?.value)
    })

    this.noticeperiod = await getCategoryAPI({ category: 'noticeperiod' })
    this.noticeperiod = this.noticeperiod?.data
    this.noticeperiod.forEach((item) => {
      this.noticeperiodArr.push(item?.value)
    })

    this.candidatesource = await getCategoryAPI({ category: 'candidatesource' })
    this.candidatesource = this.candidatesource?.data
    this.candidatesource.forEach((item) => {
      this.candidatesourceArr.push(item?.value)
    })

    this.positionsource = await getCategoryAPI({ category: 'position' })
    this.positionsource = this.positionsource?.data
    this.positionsource.forEach((item) => {
      this.positionsourceArr.push(item?.value)
    })

    this.divisionsource = await getCategoryAPI({ category: 'division' })
    this.divisionsource = this.divisionsource?.data
    this.divisionsource.forEach((item) => {
      this.divisionsourceArr.push(item?.value)
    })

    this.jobcategorysource = await getCategoryAPI({ category: 'jobcategory' })
    this.jobcategorysource = this.jobcategorysource?.data
    this.jobcategorysource.forEach((item) => {
      this.jobcategorysourceArr.push(item?.value)
    })

    this.joblevelsource = await getCategoryAPI({ category: 'joblevel' })
    this.joblevelsource = this.joblevelsource?.data
    this.joblevelsource.forEach((item) => {
      this.joblevelsourceArr.push(item?.value)
    })

    this.gradesource = await getCategoryAPI({ category: 'grade' })
    this.gradesource = this.gradesource?.data
    this.gradesource.forEach((item) => {
      this.gradesourceArr.push(item?.value)
    })
  }

  onChange(args) {
    if (args.target.name.includes('required_documents')) {
      let key = args.target.name.substr(args.target.name.indexOf('.') + 1)
      let obj = { ...this.state.required_documents }
      obj[key] = args.target.value
      this.setState({ required_documents: obj })
    } else if (args.target.name.includes('initial_offer')) {
      let key = args.target.name.substr(args.target.name.indexOf('.') + 1)
      let obj = { ...this.state.initial_offer }
      obj[key] = args.target.value
      this.setState({ initial_offer: obj })
    } else if (args.target.name.includes('hrc')) {
      let key = args.target.name.substr(args.target.name.indexOf('.') + 1)
      let obj = { ...this.state.hrc }
      obj[key] = args.target.value
      this.setState({ hrc: obj })
    } else if (args.target.name.includes('offical_offer_letter')) {
      let key = args.target.name.substr(args.target.name.indexOf('.') + 1)
      let obj = { ...this.state.offical_offer_letter }
      obj[key] = args.target.value
      this.setState({ offical_offer_letter: obj })
    } else if (args.target.name.includes('tarasul')) {
      let key = args.target.name.substr(args.target.name.indexOf('.') + 1)
      let obj = { ...this.state.tarasul }
      obj[key] = args.target.value
      this.setState({ tarasul: obj })
    } else if (args.target.name.includes('medical_assesment')) {
      let key = args.target.name.substr(args.target.name.indexOf('.') + 1)
      let obj = { ...this.state.medical_assesment }
      obj[key] = args.target.value
      this.setState({ medical_assesment: obj })
    } else if (args.target.name.includes('adsg')) {
      let key = args.target.name.substr(args.target.name.indexOf('.') + 1)
      let obj = { ...this.state.adsg }
      obj[key] = args.target.value
      this.setState({ adsg: obj })
    } else if (args.target.name.includes('reference_check')) {
      let key = args.target.name.substr(args.target.name.indexOf('.') + 1)
      let obj = { ...this.state.reference_check }
      obj[key] = args.target.value
      this.setState({ reference_check: obj })
    } else if (args.target.name.includes('resignation_requested')) {
      let key = args.target.name.substr(args.target.name.indexOf('.') + 1)
      let obj = { ...this.state.resignation_requested }
      obj[key] = args.target.value
      this.setState({ resignation_requested: obj })
    } else if (args.target.name.includes('employment_contract')) {
      let key = args.target.name.substr(args.target.name.indexOf('.') + 1)
      let obj = { ...this.state.employment_contract }
      obj[key] = args.target.value
      this.setState({ employment_contract: obj })
    } else if (args.target.name.includes('joining_forms')) {
      let key = args.target.name.substr(args.target.name.indexOf('.') + 1)
      let obj = { ...this.state.joining_forms }
      obj[key] = args.target.value
      this.setState({ joining_forms: obj })
    } else if (args.target.name.includes('new_joiner_checklist')) {
      let key = args.target.name.substr(args.target.name.indexOf('.') + 1)
      let obj = { ...this.state.new_joiner_checklist }
      obj[key] = args.target.value
      this.setState({ new_joiner_checklist: obj })
    } else if (args.target.name.includes('new_joiner_bio')) {
      let key = args.target.name.substr(args.target.name.indexOf('.') + 1)
      let obj = { ...this.state.new_joiner_bio }
      obj[key] = args.target.value
      this.setState({ new_joiner_bio: obj })
    } else this.setState({ [args.target.name]: args.target.value })
  }
  render() {
    this.onChange = this.onChange.bind(this)
    const data = this.state
    return (
      <div>
        <div className="row m-4">
          <div className="col-md-6">
            <div className="e-float-input e-control-wrapper">
              <input
                value={data?.candidate_name}
                id="candidate_name"
                name="candidate_name"
                type="text"
                onChange={this.onChange}
              />
              <span className="e-float-line" />
              <label className="e-float-text e-label-top">{headingText?.candidateName}</label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="e-float-input e-control-wrapper">
              <input
                value={data?.application_to_resignation}
                id="application_to_resignation"
                name="application_to_resignation"
                type="text"
                onChange={this.onChange}
              />
              <span className="e-float-line" />
              <label className="e-float-text e-label-top">
                {headingText?.application_to_resignation}
              </label>
            </div>
          </div>
          <div className="col-md-6">
            {/* <div className="e-float-input e-control-wrapper">
              <input
                value={data.grade}
                id="grade"
                name="grade"
                type="text"
                onChange={this.onChange}
              />
              <span className="e-float-line" />
              <label className="e-float-text e-label-top">{headingText?.grade}</label>
            </div> */}
            <label className="col-sm-3 col-form-label">{headingText?.grade}</label>
            <div className="e-float-input e-control-wrapper">
              <DropDownListComponent
                id="ddlelement"
                dataSource={this.gradesourceArr}
                name="grade"
                onChange={this.onChange}
                value={data?.grade}
                text={data?.grade}
                allowFiltering={true}
              />
              <span className="e-float-line" />
            </div>
          </div>
          <div className="col-md-6">
            {/* <div className="e-float-input e-control-wrapper">
              <input
                value={data.role_position}
                id="role_position"
                name="role_position"
                type="text"
                onChange={this.onChange}
              />
              <span className="e-float-line" />
              <label className="e-float-text e-label-top">{headingText?.role_position}</label>
            </div> */}
            <label className="col-sm-3 col-form-label">{headingText?.role_position}</label>
            <div className="e-float-input e-control-wrapper">
              <DropDownListComponent
                id="ddlelement"
                dataSource={this.positionsourceArr}
                name="role_position"
                onChange={this.onChange}
                value={data?.role_position}
                text={data?.role_position}
                allowFiltering={true}
              />
              <span className="e-float-line" />
            </div>
          </div>
          <div className="col-md-6">
            <label className="col-sm-3 col-form-label">{headingText?.jobCategory}</label>
            <div className="e-float-input e-control-wrapper">
              <DropDownListComponent
                id="ddlelement"
                dataSource={this.jobcategorysourceArr}
                name="jobcategory"
                onChange={this.onChange}
                value={data?.jobcategory}
                text={data?.jobcategory}
                allowFiltering={true}
              />
              <span className="e-float-line" />
            </div>
          </div>
          <div className="col-md-6">
            <label className="col-sm-3 col-form-label">{headingText?.jobLevel}</label>
            <div className="e-float-input e-control-wrapper">
              <DropDownListComponent
                id="ddlelement"
                dataSource={this.joblevelsourceArr}
                name="joblevel"
                onChange={this.onChange}
                value={data?.joblevel}
                text={data?.joblevel}
                allowFiltering={true}
              />
              <span className="e-float-line" />
            </div>
          </div>
        </div>
        <div className="row m-4">
          <div className="col-md-4">
            <div className="e-float-input e-control-wrapper">
              <input
                value={data?.start_date}
                id="start_date"
                name="start_date"
                type="date"
                onChange={this.onChange}
              />
              <span className="e-float-line" />
              <label className="e-float-text e-label-top">{headingText?.start_date}</label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="e-float-input e-control-wrapper">
              <input
                value={data?.date_request_to_resign}
                id="date_request_to_resign"
                name="date_request_to_resign"
                type="date"
                onChange={this.onChange}
              />
              <span className="e-float-line" />
              <label className="e-float-text e-label-top">
                {headingText?.date_request_to_resign}
              </label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="e-float-input e-control-wrapper">
              <input
                value={data?.joining_date}
                id="joining_date"
                name="joining_date"
                type="date"
                onChange={this.onChange}
              />
              <span className="e-float-line" />
              <label className="e-float-text e-label-top">{headingText?.joining_date}</label>
            </div>
          </div>
        </div>

        <div className="row m-4">
          <div className="col-md-4">
            <label className="col-sm-3 col-form-label">{headingText?.status}</label>
            <div className="e-float-input e-control-wrapper">
              <DropDownListComponent
                id="ddlelement"
                dataSource={this.candidatestatusArr}
                name="status"
                onChange={this.onChange}
                value={data?.status}
                text={data?.status}
                allowFiltering={true}
              />
              <span className="e-float-line" />
            </div>
          </div>
          <div className="col-md-4">
            <label className="col-sm-3 col-form-label">{headingText?.noticePeriod}</label>
            <div className="e-float-input e-control-wrapper">
              <DropDownListComponent
                id="ddlelement"
                dataSource={this.noticeperiodArr}
                name="notice_period"
                onChange={this.onChange}
                value={data?.notice_period}
                text={data?.notice_period}
                allowFiltering={true}
              />
              <span className="e-float-line" />
            </div>
          </div>
          <div className="col-md-4">
            {/* <div className="e-float-input e-control-wrapper">
              <input
                value={data.division}
                id="division"
                name="division"
                type="text"
                onChange={this.onChange}
              />
              <span className="e-float-line" />
              <label className="e-float-text e-label-top">{headingText?.division}</label>
            </div> */}
            <label className="col-sm-3 col-form-label">{headingText?.division}</label>
            <div className="e-float-input e-control-wrapper">
              <DropDownListComponent
                id="ddlelement"
                dataSource={this.divisionsourceArr}
                name="division"
                onChange={this.onChange}
                value={data?.division}
                text={data?.division}
                allowFiltering={true}
              />
              <span className="e-float-line" />
            </div>
          </div>
        </div>
        <div className="row m-4 mt-5">
          <div className="col-md-4">
            <div className="e-float-input e-control-wrapper">
              <input
                value={data?.application_to_joining}
                id="application_to_joining"
                name="application_to_joining"
                type="text"
                onChange={this.onChange}
              />
              <span className="e-float-line" />
              <label className="e-float-text e-label-top">
                {headingText?.application_to_joining}
              </label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="e-float-input e-control-wrapper">
              <input
                value={data?.open_application}
                id="open_application"
                name="open_application"
                type="text"
                onChange={this.onChange}
              />
              <span className="e-float-line" />
              <label className="e-float-text e-label-top">{headingText?.open_application}</label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="e-float-input e-control-wrapper">
              <input
                value={data?.salary_offered}
                id="salary_offered"
                name="salary_offered"
                type="text"
                onChange={this.onChange}
              />
              <span className="e-float-line" />
              <label className="e-float-text e-label-top">{headingText?.salary_offered}</label>
            </div>
          </div>
        </div>
        {/* Detailed widgets */}
        <div className="row m-4">
          <div className="col-md-6">
            <h6 className="mt-5 mb-3">Required Documents</h6>
            {/* <div className="form-row">
              <div className="col-md-11">
                <div className="e-float-input e-control-wrapper">
                  <input
                    value={data.required_documents?.who}
                    id="required_documents.who"
                    name="required_documents.who"
                    type="text"
                    onChange={this.onChange}
                  />
                  <span className="e-float-line" />
                  <label className="e-float-text e-label-top">{headingText?.who}</label>
                </div>
              </div>
            </div> */}
            {/* <div className="form-row">
              <div className="col-md-11">
                <div className="e-float-input e-control-wrapper">
                  <input
                    value={data.required_documents?.done}
                    id="required_documents.done"
                    name="required_documents.done"
                    type="text"
                    onChange={this.onChange}
                  />
                  <span className="e-float-line" />
                  <label className="e-float-text e-label-top">{headingText?.done}</label>
                </div>
              </div>
            </div> */}
            <div className="form-row">
              <div className="col-md-11">
                <div className="e-float-input e-control-wrapper">
                  <input
                    value={data?.required_documents?.date_sent}
                    id="required_documents.date_sent"
                    name="required_documents.date_sent"
                    type="date"
                    onChange={this.onChange}
                  />
                  <span className="e-float-line" />
                  <label className="e-float-text e-label-top">{headingText?.date_sent}</label>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="col-md-11">
                <div className="e-float-input e-control-wrapper">
                  <input
                    value={data?.required_documents?.date_received}
                    id="required_documents.date_received"
                    name="required_documents.date_received"
                    type="date"
                    onChange={this.onChange}
                  />
                  <span className="e-float-line" />
                  <label className="e-float-text e-label-top">{headingText?.date_received}</label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h6 className="mt-5 mb-3">Initial Offer</h6>
            {/* <div className="form-row">
              <div className="col-md-11">
                <div className="e-float-input e-control-wrapper">
                  <input
                    value={data.initial_offer?.who}
                    id="initial_offer.who"
                    name="initial_offer.who"
                    type="text"
                    onChange={this.onChange}
                  />
                  <span className="e-float-line" />
                  <label className="e-float-text e-label-top">{headingText?.who}</label>
                </div>
              </div>
            </div> */}
            {/* <div className="form-row">
              <div className="col-md-11">
                <div className="e-float-input e-control-wrapper">
                  <input
                    value={data.initial_offer?.done}
                    id="initial_offer.done"
                    name="initial_offer.done"
                    type="text"
                    onChange={this.onChange}
                  />
                  <span className="e-float-line" />
                  <label className="e-float-text e-label-top">{headingText?.done}</label>
                </div>
              </div>
            </div> */}
            <div className="form-row">
              <div className="col-md-11">
                <div className="e-float-input e-control-wrapper">
                  <input
                    value={data?.initial_offer?.date_sent}
                    id="initial_offer.date_sent"
                    name="initial_offer.date_sent"
                    type="date"
                    onChange={this.onChange}
                  />
                  <span className="e-float-line" />
                  <label className="e-float-text e-label-top">{headingText?.date_sent}</label>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="col-md-11">
                <div className="e-float-input e-control-wrapper">
                  <input
                    value={data?.initial_offer?.date_received}
                    id="initial_offer.date_received"
                    name="initial_offer.date_received"
                    type="date"
                    onChange={this.onChange}
                  />
                  <span className="e-float-line" />
                  <label className="e-float-text e-label-top">{headingText?.date_received}</label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h6 className="mt-5 mb-3">HRC</h6>
            {/* <div className="form-row">
              <div className="col-md-11">
                <div className="e-float-input e-control-wrapper">
                  <input
                    value={data.hrc?.who}
                    id="hrc.who"
                    name="hrc.who"
                    type="text"
                    onChange={this.onChange}
                  />
                  <span className="e-float-line" />
                  <label className="e-float-text e-label-top">{headingText?.who}</label>
                </div>
              </div>
            </div> */}
            {/* <div className="form-row">
              <div className="col-md-11">
                <div className="e-float-input e-control-wrapper">
                  <input
                    value={data.hrc?.done}
                    id="hrc.done"
                    name="hrc.done"
                    type="text"
                    onChange={this.onChange}
                  />
                  <span className="e-float-line" />
                  <label className="e-float-text e-label-top">{headingText?.done}</label>
                </div>
              </div>
            </div> */}
            <div className="form-row">
              <div className="col-md-11">
                <div className="e-float-input e-control-wrapper">
                  <input
                    value={data?.hrc?.date_completed}
                    id="hrc.date_completed"
                    name="hrc.date_completed"
                    type="date"
                    onChange={this.onChange}
                  />
                  <span className="e-float-line" />
                  <label className="e-float-text e-label-top">{headingText?.date_completed}</label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h6 className="mt-5 mb-3">Offical Offer Letter</h6>
            {/* <div className="form-row">
              <div className="col-md-11">
                <div className="e-float-input e-control-wrapper">
                  <input
                    value={data.offical_offer_letter?.who}
                    id="offical_offer_letter.who"
                    name="offical_offer_letter.who"
                    type="text"
                    onChange={this.onChange}
                  />
                  <span className="e-float-line" />
                  <label className="e-float-text e-label-top">{headingText?.who}</label>
                </div>
              </div>
            </div> */}
            {/* <div className="form-row">
              <div className="col-md-11">
                <div className="e-float-input e-control-wrapper">
                  <input
                    value={data.offical_offer_letter?.done}
                    id="offical_offer_letter.done"
                    name="offical_offer_letter.done"
                    type="text"
                    onChange={this.onChange}
                  />
                  <span className="e-float-line" />
                  <label className="e-float-text e-label-top">{headingText?.done}</label>
                </div>
              </div>
            </div> */}
            <div className="form-row">
              <div className="col-md-11">
                <div className="e-float-input e-control-wrapper">
                  <input
                    value={data?.offical_offer_letter?.date_completed}
                    id="offical_offer_letter.date_completed"
                    name="offical_offer_letter.date_completed"
                    type="date"
                    onChange={this.onChange}
                  />
                  <span className="e-float-line" />
                  <label className="e-float-text e-label-top">{headingText?.date_completed}</label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h6 className="mt-5 mb-3">Tarasul</h6>
            {/* <div className="form-row">
              <div className="col-md-11">
                <div className="e-float-input e-control-wrapper">
                  <input
                    value={data.tarasul?.who}
                    id="tarasul.who"
                    name="tarasul.who"
                    type="text"
                    onChange={this.onChange}
                  />
                  <span className="e-float-line" />
                  <label className="e-float-text e-label-top">{headingText?.who}</label>
                </div>
              </div>
            </div> */}
            {/* <div className="form-row">
              <div className="col-md-11">
                <div className="e-float-input e-control-wrapper">
                  <input
                    value={data.tarasul?.done}
                    id="tarasul.done"
                    name="tarasul.done"
                    type="text"
                    onChange={this.onChange}
                  />
                  <span className="e-float-line" />
                  <label className="e-float-text e-label-top">{headingText?.done}</label>
                </div>
              </div>
            </div> */}
            <div className="form-row">
              <div className="col-md-11">
                <div className="e-float-input e-control-wrapper">
                  <input
                    value={data?.tarasul?.date_submitted}
                    id="tarasul.date_submitted"
                    name="tarasul.date_submitted"
                    type="date"
                    onChange={this.onChange}
                  />
                  <span className="e-float-line" />
                  <label className="e-float-text e-label-top">{headingText?.date_submitted}</label>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="col-md-11">
                <div className="e-float-input e-control-wrapper">
                  <input
                    value={data?.tarasul?.date_completed}
                    id="tarasul.date_completed"
                    name="tarasul.date_completed"
                    type="date"
                    onChange={this.onChange}
                  />
                  <span className="e-float-line" />
                  <label className="e-float-text e-label-top">{headingText?.date_completed}</label>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="col-md-11">
                <div className="e-float-input e-control-wrapper">
                  <input
                    value={data?.tarasul?.days_in_tarasul}
                    id="tarasul.days_in_tarasul"
                    name="tarasul.days_in_tarasul"
                    type="text"
                    onChange={this.onChange}
                  />
                  <span className="e-float-line" />
                  <label className="e-float-text e-label-top">{headingText?.days_in_tarasul}</label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h6 className="mt-5 mb-3">Medical Assesment</h6>
            {/* <div className="form-row">
              <div className="col-md-11">
                <div className="e-float-input e-control-wrapper">
                  <input
                    value={data.medical_assesment?.who}
                    id="medical_assesment.who"
                    name="medical_assesment.who"
                    type="text"
                    onChange={this.onChange}
                  />
                  <span className="e-float-line" />
                  <label className="e-float-text e-label-top">{headingText?.who}</label>
                </div>
              </div>
            </div> */}
            {/* <div className="form-row">
              <div className="col-md-11">
                <div className="e-float-input e-control-wrapper">
                  <input
                    value={data.medical_assesment?.done}
                    id="medical_assesment.done"
                    name="medical_assesment.done"
                    type="text"
                    onChange={this.onChange}
                  />
                  <span className="e-float-line" />
                  <label className="e-float-text e-label-top">{headingText?.done}</label>
                </div>
              </div>
            </div> */}
            <div className="form-row">
              <div className="col-md-11">
                <div className="e-float-input e-control-wrapper">
                  <input
                    value={data?.medical_assesment?.date_completed}
                    id="medical_assesment.date_completed"
                    name="medical_assesment.date_completed"
                    type="date"
                    onChange={this.onChange}
                  />
                  <span className="e-float-line" />
                  <label className="e-float-text e-label-top">{headingText?.date_completed}</label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h6 className="mt-5 mb-3">ADSG</h6>
            <div className="form-row">
              {/* <div className="col-md-11">
                <div className="e-float-input e-control-wrapper">
                  <input
                    value={data.adsg?.who}
                    id="adsg.who"
                    name="adsg.who"
                    type="text"
                    onChange={this.onChange}
                  />
                  <span className="e-float-line" />
                  <label className="e-float-text e-label-top">{headingText?.who}</label>
                </div>
              </div> */}
            </div>
            <div className="form-row">
              {/* <div className="col-md-11">
                <div className="e-float-input e-control-wrapper">
                  <input
                    value={data.adsg?.done}
                    id="adsg.done"
                    name="adsg.done"
                    type="text"
                    onChange={this.onChange}
                  />
                  <span className="e-float-line" />
                  <label className="e-float-text e-label-top">{headingText?.done}</label>
                </div>
              </div> */}
            </div>
            <div className="form-row">
              <div className="col-md-11">
                <div className="e-float-input e-control-wrapper">
                  <input
                    value={data?.adsg?.date_requested}
                    id="adsg.date_requested"
                    name="adsg.date_requested"
                    type="date"
                    onChange={this.onChange}
                  />
                  <span className="e-float-line" />
                  <label className="e-float-text e-label-top">{headingText?.date_requested}</label>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="col-md-11">
                <div className="e-float-input e-control-wrapper">
                  <input
                    value={data?.adsg?.date_completed}
                    id="adsg.date_completed"
                    name="adsg.date_completed"
                    type="date"
                    onChange={this.onChange}
                  />
                  <span className="e-float-line" />
                  <label className="e-float-text e-label-top">{headingText?.date_completed}</label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h6 className="mt-5 mb-3">Reference Check</h6>
            {/* <div className="form-row">
              <div className="col-md-11">
                <div className="e-float-input e-control-wrapper">
                  <input
                    value={data.reference_check?.who}
                    id="reference_check.who"
                    name="reference_check.who"
                    type="text"
                    onChange={this.onChange}
                  />
                  <span className="e-float-line" />
                  <label className="e-float-text e-label-top">{headingText?.who}</label>
                </div>
              </div>
            </div> */}
            {/* <div className="form-row">
              <div className="col-md-11">
                <div className="e-float-input e-control-wrapper">
                  <input
                    value={data.reference_check?.done}
                    id="reference_check.done"
                    name="reference_check.done"
                    type="text"
                    onChange={this.onChange}
                  />
                  <span className="e-float-line" />
                  <label className="e-float-text e-label-top">{headingText?.done}</label>
                </div>
              </div>
            </div> */}
            <div className="form-row">
              <div className="col-md-11">
                <div className="e-float-input e-control-wrapper">
                  <input
                    value={data?.reference_check?.date_completed}
                    id="reference_check.date_completed"
                    name="reference_check.date_completed"
                    type="date"
                    onChange={this.onChange}
                  />
                  <span className="e-float-line" />
                  <label className="e-float-text e-label-top">{headingText?.date_completed}</label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h6 className="mt-5 mb-3">Resignatio Requested</h6>
            {/* <div className="form-row">
              <div className="col-md-11">
                <div className="e-float-input e-control-wrapper">
                  <input
                    value={data.resignation_requested?.who}
                    id="resignation_requested.who"
                    name="resignation_requested.who"
                    type="text"
                    onChange={this.onChange}
                  />
                  <span className="e-float-line" />
                  <label className="e-float-text e-label-top">{headingText?.who}</label>
                </div>
              </div>
            </div> */}
            {/* <div className="form-row">
              <div className="col-md-11">
                <div className="e-float-input e-control-wrapper">
                  <input
                    value={data.resignation_requested?.done}
                    id="resignation_requested.done"
                    name="resignation_requested.done"
                    type="text"
                    onChange={this.onChange}
                  />
                  <span className="e-float-line" />
                  <label className="e-float-text e-label-top">{headingText?.done}</label>
                </div>
              </div>
            </div> */}
            <div className="form-row">
              <div className="col-md-11">
                <div className="e-float-input e-control-wrapper">
                  <input
                    value={data?.resignation_requested?.date_completed}
                    id="resignation_requested.date_completed"
                    name="resignation_requested.date_completed"
                    type="date"
                    onChange={this.onChange}
                  />
                  <span className="e-float-line" />
                  <label className="e-float-text e-label-top">{headingText?.date_completed}</label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h6 className="mt-5 mb-3">Employment Contract</h6>
            {/* <div className="form-row">
              <div className="col-md-11">
                <div className="e-float-input e-control-wrapper">
                  <input
                    value={data.employment_contract?.who}
                    id="employment_contract.who"
                    name="employment_contract.who"
                    type="text"
                    onChange={this.onChange}
                  />
                  <span className="e-float-line" />
                  <label className="e-float-text e-label-top">{headingText?.who}</label>
                </div>
              </div>
            </div> */}
            {/* <div className="form-row">
              <div className="col-md-11">
                <div className="e-float-input e-control-wrapper">
                  <input
                    value={data.employment_contract?.done}
                    id="employment_contract.done"
                    name="employment_contract.done"
                    type="text"
                    onChange={this.onChange}
                  />
                  <span className="e-float-line" />
                  <label className="e-float-text e-label-top">{headingText?.done}</label>
                </div>
              </div>
            </div> */}
            <div className="form-row">
              <div className="col-md-11">
                <div className="e-float-input e-control-wrapper">
                  <input
                    value={data?.employment_contract?.date_completed}
                    id="employment_contract.date_completed"
                    name="employment_contract.date_completed"
                    type="date"
                    onChange={this.onChange}
                  />
                  <span className="e-float-line" />
                  <label className="e-float-text e-label-top">{headingText?.date_completed}</label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <h6 className="mt-5 mb-3">Joining Forms</h6>
            {/* <div className="form-row">
              <div className="col-md-11">
                <div className="e-float-input e-control-wrapper">
                  <input
                    value={data.joining_forms?.who}
                    id="joining_forms.who"
                    name="joining_forms.who"
                    type="text"
                    onChange={this.onChange}
                  />
                  <span className="e-float-line" />
                  <label className="e-float-text e-label-top">{headingText?.who}</label>
                </div>
              </div>
            </div> */}
            {/* <div className="form-row">
              <div className="col-md-11">
                <div className="e-float-input e-control-wrapper">
                  <input
                    value={data.joining_forms?.done}
                    id="joining_forms.done"
                    name="joining_forms.done"
                    type="text"
                    onChange={this.onChange}
                  />
                  <span className="e-float-line" />
                  <label className="e-float-text e-label-top">{headingText?.done}</label>
                </div>
              </div>
            </div> */}
            <div className="form-row">
              <div className="col-md-11">
                <div className="e-float-input e-control-wrapper">
                  <input
                    value={data?.joining_forms?.date_completed}
                    id="joining_forms.date_completed"
                    name="joining_forms.date_completed"
                    type="date"
                    onChange={this.onChange}
                  />
                  <span className="e-float-line" />
                  <label className="e-float-text e-label-top">{headingText?.date_completed}</label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <h6 className="mt-5 mb-3">New Joiner Checklist</h6>
            {/* <div className="form-row">
              <div className="col-md-11">
                <div className="e-float-input e-control-wrapper">
                  <input
                    value={data.new_joiner_checklist?.who}
                    id="new_joiner_checklist.who"
                    name="new_joiner_checklist.who"
                    type="text"
                    onChange={this.onChange}
                  />
                  <span className="e-float-line" />
                  <label className="e-float-text e-label-top">{headingText?.who}</label>
                </div>
              </div>
            </div> */}
            {/* <div className="form-row">
              <div className="col-md-11">
                <div className="e-float-input e-control-wrapper">
                  <input
                    value={data.new_joiner_checklist?.done}
                    id="new_joiner_checklist.done"
                    name="new_joiner_checklist.done"
                    type="text"
                    onChange={this.onChange}
                  />
                  <span className="e-float-line" />
                  <label className="e-float-text e-label-top">{headingText?.done}</label>
                </div>
              </div>
            </div> */}
            <div className="form-row">
              <div className="col-md-11">
                <div className="e-float-input e-control-wrapper">
                  <input
                    value={data?.new_joiner_checklist?.date_completed}
                    id="new_joiner_checklist.date_completed"
                    name="new_joiner_checklist.date_completed"
                    type="date"
                    onChange={this.onChange}
                  />
                  <span className="e-float-line" />
                  <label className="e-float-text e-label-top">{headingText?.date_completed}</label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <h6 className="mt-5 mb-3">New Joiner Bio</h6>
            {/* <div className="form-row">
              <div className="col-md-11">
                <div className="e-float-input e-control-wrapper">
                  <input
                    value={data.new_joiner_bio?.who}
                    id="new_joiner_bio.who"
                    name="new_joiner_bio.who"
                    type="text"
                    onChange={this.onChange}
                  />
                  <span className="e-float-line" />
                  <label className="e-float-text e-label-top">{headingText?.who}</label>
                </div>
              </div>
            </div> */}
            {/* <div className="form-row">
              <div className="col-md-11">
                <div className="e-float-input e-control-wrapper">
                  <input
                    value={data.new_joiner_bio?.done}
                    id="new_joiner_bio.done"
                    name="new_joiner_bio.done"
                    type="text"
                    onChange={this.onChange}
                  />
                  <span className="e-float-line" />
                  <label className="e-float-text e-label-top">{headingText?.done}</label>
                </div>
              </div>
            </div> */}
            <div className="form-row">
              <div className="col-md-11">
                <div className="e-float-input e-control-wrapper">
                  <input
                    value={data?.new_joiner_bio?.date_completed}
                    id="new_joiner_bio.date_completed"
                    name="new_joiner_bio.date_completed"
                    type="date"
                    onChange={this.onChange}
                  />
                  <span className="e-float-line" />
                  <label className="e-float-text e-label-top">{headingText?.date_completed}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
