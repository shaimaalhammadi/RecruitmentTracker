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
    this.divisionsource = []
    this.jobcategorysource = []
    this.joblevelsource = []
    this.sectionsource = []
    this.candidatestatusArr = []
    this.noticeperiodArr = []
    this.candidatesourceArr = []
    this.divisionsourceArr = []
    this.jobcategorysourceArr = []
    this.joblevelsourceArr = []
    this.sectionsourceArr = []
    this.sectorsourceArr = []
    this.positionsourceArr = []
  }

  async componentDidMount() {
    this.candidatestatus = await getCategoryAPI({ category: 'candidatestatus' })
    this.candidatestatus = this.candidatestatus.data
    this.candidatestatus.forEach((item) => {
      this.candidatestatusArr.push(item.value)
    })

    this.noticeperiod = await getCategoryAPI({ category: 'noticeperiod' })
    this.noticeperiod = this.noticeperiod.data
    this.noticeperiod.forEach((item) => {
      this.noticeperiodArr.push(item.value)
    })

    this.candidatesource = await getCategoryAPI({ category: 'candidatesource' })
    this.candidatesource = this.candidatesource.data
    this.candidatesource.forEach((item) => {
      this.candidatesourceArr.push(item.value)
    })

    this.divisionsource = await getCategoryAPI({ category: 'division' })
    this.divisionsource = this.divisionsource.data
    this.divisionsource.forEach((item) => {
      this.divisionsourceArr.push(item.value)
    })

    this.jobcategorysource = await getCategoryAPI({ category: 'jobcategory' })
    this.jobcategorysource = this.jobcategorysource.data
    this.jobcategorysource.forEach((item) => {
      this.jobcategorysourceArr.push(item.value)
    })

    this.joblevelsource = await getCategoryAPI({ category: 'joblevel' })
    this.joblevelsource = this.joblevelsource.data
    this.joblevelsource.forEach((item) => {
      this.joblevelsourceArr.push(item.value)
    })

    this.sectionsource = await getCategoryAPI({ category: 'section' })
    this.sectionsource = this.sectionsource.data
    this.sectionsource.forEach((item) => {
      this.sectionsourceArr.push(item.value)
    })

    this.sectorsource = await getCategoryAPI({ category: 'sector' })
    this.sectorsource = this.sectorsource.data
    this.sectorsource.forEach((item) => {
      this.sectorsourceArr.push(item.value)
    })

    this.positionsource = await getCategoryAPI({ category: 'position' })
    this.positionsource = this.positionsource.data
    this.positionsource.forEach((item) => {
      this.positionsourceArr.push(item.value)
    })
  }

  onChange(args) {
    if (args.target.name === 'job_title_english') {
      this.setState({
        job_title_arabic: this.positionsource.filter((item) => item.value == args.target.value)[0]
          .arabicValue,
      })
    }
    this.setState({ [args.target.name]: args.target.value })
  }
  render() {
    this.onChange = this.onChange.bind(this)
    const data = this.state
    return (
      <div>
        <div className="row m-4">
          <div className="col-md-6">
            <label className="col-sm-3 col-form-label">{headingText?.candidateSource}</label>
            <div className="e-float-input e-control-wrapper">
              <DropDownListComponent
                id="ddlelement"
                dataSource={this.candidatesourceArr}
                name="agency"
                onChange={this.onChange}
                value={data.agency}
                text={data.agency}
                allowFiltering={true}
              />
              <span className="e-float-line" />
            </div>
          </div>
          <div className="col-md-6">
            <label className="col-sm-6 col-form-label">{headingText?.recruitmentStatus}</label>
            <div className="e-float-input e-control-wrapper">
              <DropDownListComponent
                id="ddlelement"
                dataSource={this.candidatestatusArr}
                name="candidate_status"
                onChange={this.onChange}
                value={data.candidate_status}
                text={data.candidate_status}
                allowFiltering={true}
              />
              <span className="e-float-line" />
            </div>
          </div>
        </div>
        <div className="row m-4">
          <div className="col-md-6">
            <div className="e-float-input e-control-wrapper">
              <input
                value={data.name}
                id="candidateName"
                name="name"
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
                value={data.recruiter}
                id="recruiter"
                name="recruiter"
                type="text"
                onChange={this.onChange}
              />
              <span className="e-float-line" />
              <label className="e-float-text e-label-top">{headingText?.recruiter}</label>
            </div>
          </div>
        </div>
        <div className="row m-4">
          <div className="form-group col-md-6">
            <div className="e-float-input e-control-wrapper">
              <input
                value={data.first_interview_date}
                id="interviewDateOne"
                name="first_interview_date"
                type="date"
                onChange={this.onChange}
              />
              <span className="e-float-line" />
              <label className="e-float-text e-label-top">{headingText?.interviewDateOne}</label>
            </div>
          </div>
          <div className="form-group col-md-6">
            <div className="e-float-input e-control-wrapper">
              <input
                value={data.second_interview_date}
                id="interviewDateTwo"
                name="second_interview_date"
                type="date"
                onChange={this.onChange}
              />
              <span className="e-float-line" />
              <label className="e-float-text e-label-top">{headingText?.interviewDateTwo}</label>
            </div>
          </div>
        </div>
        <div className="row m-4">
          <div className="form-group col-md-4">
            <div className="e-float-input e-control-wrapper">
              <input
                value={data.job_title_arabic}
                id="arabicTitle"
                name="job_title_arabic"
                type="text"
                onChange={this.onChange}
              />
              <span className="e-float-line" />
              <label className="e-float-text e-label-top">{headingText?.arabicTitle}</label>
            </div>
          </div>
          <div className="form-group col-md-4">
            <label className="col-form-label">{headingText?.englishTitle}</label>
            <div className="e-float-input e-control-wrapper">
              <DropDownListComponent
                id="ddlelement"
                dataSource={this.positionsourceArr}
                name="job_title_english"
                onChange={this.onChange}
                value={data.job_title_english}
                text={data.job_title_english}
                allowFiltering={true}
              />
              <span className="e-float-line" />
            </div>
          </div>
          <div className="col-md-4">
            <label className="col-sm-3 col-form-label">{headingText?.sector}</label>
            <div className="e-float-input e-control-wrapper">
              <DropDownListComponent
                id="ddlelement"
                dataSource={this.sectorsourceArr}
                name="sector"
                onChange={this.onChange}
                value={data.sector}
                text={data.sector}
                allowFiltering={true}
              />
              <span className="e-float-line" />
            </div>
          </div>
        </div>
        <div className="row m-4">
          <div className="col-md-6">
            <label className="col-sm-3 col-form-label">{headingText?.division}</label>
            <div className="e-float-input e-control-wrapper">
              <DropDownListComponent
                id="ddlelement"
                dataSource={this.divisionsourceArr}
                name="division"
                onChange={this.onChange}
                value={data.division}
                text={data.division}
                allowFiltering={true}
              />
              <span className="e-float-line" />
            </div>
          </div>
          <div className="col-md-6">
            <label className="col-sm-3 col-form-label">{headingText?.section}</label>
            <div className="e-float-input e-control-wrapper">
              <DropDownListComponent
                id="ddlelement"
                dataSource={this.sectionsourceArr}
                name="section"
                onChange={this.onChange}
                value={data.section}
                text={data.section}
                allowFiltering={true}
              />
              <span className="e-float-line" />
            </div>
          </div>
        </div>
        <div className="row m-4">
          <div className="col-md-6">
            <label className="col-sm-3 col-form-label">{headingText?.jobCategory}</label>
            <div className="e-float-input e-control-wrapper">
              <DropDownListComponent
                id="ddlelement"
                dataSource={this.jobcategorysourceArr}
                name="jobcategory"
                onChange={this.onChange}
                value={data.jobcategory}
                text={data.jobcategory}
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
                value={data.joblevel}
                text={data.joblevel}
                allowFiltering={true}
              />
              <span className="e-float-line" />
            </div>
          </div>
        </div>
        <div className="row m-4">
          <div className="form-group col-md-12">
            <div className="e-float-input e-control-wrapper">
              <textarea
                value={data.comments}
                id="comments"
                name="comments"
                rows="2"
                onChange={this.onChange}
              />
              <span className="e-float-line" />
              <label className="e-float-text e-label-top">{headingText?.comments}</label>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
