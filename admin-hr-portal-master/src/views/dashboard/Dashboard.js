import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import 'react-calendar/dist/Calendar.css'
import { CButton } from '@coreui/react'
import Calendar from 'react-calendar'
import moment from 'moment'

import DistinctSector from './charts/DistinctSector'
import DistinctSource from './charts/DistinctSource'
import DistinctSelectedSector from './charts/DistinctSelectedSector'
import JobLevelSector from './charts/JobLevelSector'
import DistinctHiredSector from './charts/DistinctHiredSector'

import { dashboard } from 'src/api/dashboard'
import { clearUserCreds } from 'src/common/logoutFunc'
import { SUCCESS, UNAUTHORIZED, INTERNAL_SERVER_ERROR } from 'src/assets/constants'

const Dashboard = () => {
  const [obj, setObj] = useState({})
  const [showFilter, setShowFilter] = useState(false)
  const [filterRecordStatus, setFilterRecordStatus] = useState(true)
  const [value, onChange] = useState(new Date())

  const logout = () => {
    clearUserCreds()
    navigate('/login', { replace: true })
  }

  const onChangeDate = (value) => {
    onChange(value)
    const year = moment(value, 'DD/MM/YYYY').year()
    fetchData(year)
    setShowFilter(false)
  }

  const onReset = () => {
    onChange(new Date())
    setFilterRecordStatus(true)
    setShowFilter(false)
    fetchData()
  }

  async function fetchData(filter = '') {
    if (sessionStorage.getItem('token')) {
      let obje = {}
      const response = await dashboard(filter)
      if (response && response.status === SUCCESS && response?.data) {
        obje.total_applicant = response.data.total_applicant
        obje.time_to_hire = response.data.time_to_hire
        obje.shortlisted_candidate = response.data.shortlisted_candidate
        obje.rejected_candidate = response.data.rejected_candidate
        obje.hired_candidate = response.data.hired_candidate
        obje.resigned_candidate = response.data.resigned_candidate
        obje.on_boarding_candidates = response.data.on_boarding_candidates
        obje.in_process_candidates = response.data.in_process_candidates
        obje.cost_per_hire = response.data.cost_per_hire
        obje.distinct_hired_sector = response.data.distinct_hired_sector
        obje.distinct_resigned_sector = response.data.distinct_resigned_sector
        obje.distinct_sector = response.data.distinct_sector
        obje.distinct_selected_sector = response.data.distinct_selected_sector
        obje.candidates_per_joblevel = response.data.candidates_per_joblevel
        obje.distinct_source = response.data.distinct_source
        if (response.data.distinct_sector_by_year) {
          delete obje.distinct_sector
          obje.distinct_sector_by_year = response.data.distinct_sector_by_year
        }
        if (response.data.distinct_source_by_year) {
          delete obje.distinct_source
          obje.distinct_source_by_year = response.data.distinct_source_by_year
        }
        if (response.data.distinct_selected_sector_by_year) {
          delete obje.distinct_selected_sector
          obje.distinct_selected_sector_by_year = response.data.distinct_selected_sector_by_year
        }
        if (response.data.distinct_hired_sector_by_year) {
          delete obje.distinct_hired_sector
          obje.distinct_hired_sector_by_year = response.data.distinct_hired_sector_by_year
        }
        if (response.data.distinct_resigned_sector_by_year) {
          delete obje.distinct_resigned_sector
          obje.distinct_resigned_sector_by_year = response.data.distinct_resigned_sector_by_year
        }
        if (response.data.candidates_per_joblevel_by_year) {
          delete obje.candidates_per_joblevel
          obje.candidates_per_joblevel_by_year = response.data.candidates_per_joblevel_by_year
        }
        setObj({ ...obje })

        // no record found for filters
        if (
          response.data.distinct_sector_by_year &&
          response.data.distinct_source_by_year &&
          response.data.distinct_selected_sector_by_year &&
          response.data.distinct_hired_sector_by_year &&
          response.data.distinct_resigned_sector_by_year &&
          response.data.candidates_per_joblevel_by_year
        ) {
          response?.data?.distinct_sector_by_year.length === 0 &&
          response?.data?.distinct_source_by_year.length === 0 &&
          response?.data?.distinct_selected_sector_by_year.length === 0 &&
          response?.data?.distinct_hired_sector_by_year.length === 0 &&
          response?.data?.distinct_resigned_sector_by_year.length === 0 &&
          response?.data?.candidates_per_joblevel_by_year.length === 0
            ? setFilterRecordStatus(false)
            : setFilterRecordStatus(true)
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
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const navigate = useNavigate()

  return (
    <>
      <div className="row">
        <div className="col-md-3">
          <h6 className="dash_sub_header">Total Applicants</h6>
          <div className="dash_sub_detail">{obj.total_applicant ? obj.total_applicant : 0}</div>
        </div>
        <div className="col-md-3">
          <h6 className="dash_sub_header">Shortlisted Candidate</h6>
          <div className="dash_sub_detail">
            {obj.shortlisted_candidate ? obj.shortlisted_candidate : 0}
          </div>
        </div>
        <div className="col-md-3">
          <h6 className="dash_sub_header">Hired Candidate</h6>
          <div className="dash_sub_detail">{obj.hired_candidate ? obj.hired_candidate : 0}</div>
        </div>
        <div className="col-md-3">
          <h6 className="dash_sub_header">Rejected Candidate</h6>
          <div className="dash_sub_detail">
            {obj.rejected_candidate ? obj.rejected_candidate : 0}
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-3">
          <h6 className="dash_sub_header">Resigned Employees</h6>
          <div className="dash_sub_detail">
            {obj.resigned_candidate ? obj.resigned_candidate : 0}
          </div>
        </div>
        <div className="col-md-3">
          <h6 className="dash_sub_header">On Boarding Candidates</h6>
          <div className="dash_sub_detail">
            {obj.on_boarding_candidates ? obj.on_boarding_candidates : 0}
          </div>
        </div>
        <div className="col-md-3">
          <h6 className="dash_sub_header">In Process Candidates</h6>
          <div className="dash_sub_detail">
            {obj.in_process_candidates ? obj.in_process_candidates : 0}
          </div>
        </div>
        {/* <div className="col-md-2">
          <h6 className="dash_sub_header">Total Applicants</h6>
          <div className="dash_sub_detail">{obj.total_applicant ? obj.total_applicant : 0}</div>
        </div> */}
      </div>
      <div className="row">
        <div className="col-12">
          <CButton
            type="button"
            color="primary"
            id="button-addon2"
            variant="ghost"
            onClick={onReset}
            style={{ float: 'right' }}
          >
            Reset
          </CButton>
          <CButton
            type="button"
            color="primary"
            id="button-addon1"
            onClick={() => setShowFilter(!showFilter)}
            style={{ float: 'right' }}
          >
            Filter By Year
          </CButton>
        </div>
        {showFilter && (
          <div className="filterContainer">
            <Calendar
              style={{ marginLeft: 'auto' }}
              onChange={onChange}
              onClickYear={onChangeDate}
              value={value}
              view="decade"
              maxDate={new Date()}
            />
          </div>
        )}
      </div>
      {!filterRecordStatus && (
        <div className="row mt-5">
          <h5 style={{ width: 'fit-content', margin: '0 auto' }}>No Record Found</h5>
        </div>
      )}
      {filterRecordStatus && (
        <>
          <hr />
          <div className="row mt-2">
            <h5>Candidates Data</h5>
            {/* Numbers of interviews per Sector */}
            {obj.distinct_sector && obj.distinct_sector.length > 0 && (
              <div className="col-md-8 p-5">
                <DistinctSector chartData={obj.distinct_sector}></DistinctSector>
              </div>
            )}
            {obj.distinct_sector_by_year && obj.distinct_sector_by_year.length > 0 && (
              <div className="col-md-8 p-5">
                <DistinctSector chartData={obj.distinct_sector_by_year}></DistinctSector>
              </div>
            )}
            {/* Numbers of interviews per Application Source */}
            {obj.distinct_source && obj.distinct_source.length > 0 && (
              <div className="col-md-4 p-5">
                <DistinctSource chartData={obj.distinct_source}></DistinctSource>
              </div>
            )}
            {obj.distinct_source_by_year && obj.distinct_source_by_year.length > 0 && (
              <div className="col-md-4 p-5">
                <DistinctSource chartData={obj.distinct_source_by_year}></DistinctSource>
              </div>
            )}
            {/* Numbers of shortlisted candidates per Sector */}
            {obj.distinct_selected_sector && obj.distinct_selected_sector.length > 0 && (
              <div className="col-md-4 p-5">
                <DistinctSelectedSector
                  chartData={obj.distinct_selected_sector}
                ></DistinctSelectedSector>
              </div>
            )}
            {obj.distinct_selected_sector_by_year &&
              obj.distinct_selected_sector_by_year.length > 0 && (
                <div className="col-md-4 p-5">
                  <DistinctSelectedSector
                    chartData={obj.distinct_selected_sector_by_year}
                  ></DistinctSelectedSector>
                </div>
              )}
            {/* Numbers of candidates per Job Level */}
            {obj.candidates_per_joblevel && obj.candidates_per_joblevel.length > 0 && (
              <div className="col-md-4 p-5">
                <JobLevelSector chartData={obj.candidates_per_joblevel}></JobLevelSector>
              </div>
            )}
            {obj.candidates_per_joblevel_by_year &&
              obj.candidates_per_joblevel_by_year.length > 0 && (
                <div className="col-md-4 p-5">
                  <JobLevelSector chartData={obj.candidates_per_joblevel_by_year}></JobLevelSector>
                </div>
              )}
          </div>
          <hr />
          <div className="row mt-2">
            <h5>Employees Data</h5>
            {/* Status of candidates per Sector */}
            {obj.distinct_hired_sector && obj.distinct_hired_sector.length > 0 && (
              <div className="col-md-8 p-5">
                <DistinctHiredSector
                  chartData={{
                    hired: [...obj.distinct_hired_sector],
                    resigned: [...obj.distinct_resigned_sector],
                  }}
                ></DistinctHiredSector>
              </div>
            )}
            {obj.distinct_hired_sector_by_year && obj.distinct_hired_sector_by_year.length > 0 && (
              <div className="col-md-8 p-5">
                <DistinctHiredSector
                  chartData={{
                    hired: [...obj.distinct_hired_sector_by_year],
                    resigned: [...obj.distinct_resigned_sector_by_year],
                  }}
                ></DistinctHiredSector>
              </div>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default Dashboard
