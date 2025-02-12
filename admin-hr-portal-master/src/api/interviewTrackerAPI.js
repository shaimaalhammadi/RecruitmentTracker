import { BASE_URL, interviews } from 'src/assets/constants'
import axios from 'axios'

export const addInterviewTrackerAPI = async (payload) => {
  try {
    let token = JSON.parse(sessionStorage.getItem('token'))
    // const {
    //   agency,
    //   name,
    //   first_interview_date,
    //   second_interview_dat,
    //   candidate_status,
    //   recruiter,
    //   job_title_arabic,
    //   job_title_english,
    //   sector,
    //   division,
    //   section,
    //   comments,
    // } = payload
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-auth-token': `${token}` },
    }
    const body = JSON.stringify({ ...payload })
    const response = await axios.post(`${BASE_URL}/${interviews}`, body, requestOptions)
    return response
  } catch (error) {
    return error
  }
}

export const updateInterviewTrackerAPI = async (payload) => {
  try {
    let token = JSON.parse(sessionStorage.getItem('token'))
    const { id } = payload
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-auth-token': `${token}` },
    }
    const body = JSON.stringify({ ...payload })
    const response = await axios.patch(`${BASE_URL}/${interviews}/${id}`, body, requestOptions)
    return response
  } catch (error) {
    return error
  }
}

export const deleteInterviewTrackerAPI = async (payload) => {
  try {
    let token = JSON.parse(sessionStorage.getItem('token'))
    const { id } = payload
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'x-auth-token': `${token}` },
    }
    // const body = JSON.stringify({ id })
    const response = await axios.delete(`${BASE_URL}/${interviews}/${id}`, requestOptions)
    return response
  } catch (error) {
    return error
  }
}

export const getInterviewTrackerAPI = async () => {
  try {
    let token = JSON.parse(sessionStorage.getItem('token'))
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'x-auth-token': `${token}` },
    }
    const response = await axios.get(`${BASE_URL}/${interviews}`, requestOptions)
    return response
  } catch (error) {
    return error
  }
}
