import { BASE_URL, joinees } from 'src/assets/constants'
import axios from 'axios'

export const addJoineeTrackerAPI = async (payload) => {
  try {
    let token = JSON.parse(sessionStorage.getItem('token'))
    // const { category, value, addedBy } = payload
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-auth-token': `${token}` },
    }
    const body = JSON.stringify({ ...payload })
    const response = await axios.post(`${BASE_URL}/${joinees}`, body, requestOptions)
    return response
  } catch (error) {
    return error
  }
}

export const updateJoineeTrackerAPI = async (payload) => {
  try {
    let token = JSON.parse(sessionStorage.getItem('token'))
    const { id } = payload
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-auth-token': `${token}` },
    }
    const body = JSON.stringify({ ...payload })
    const response = await axios.patch(`${BASE_URL}/${joinees}/${id}`, body, requestOptions)
    return response
  } catch (error) {
    return error
  }
}

export const deleteJoineeTrackerAPI = async (payload) => {
  try {
    let token = JSON.parse(sessionStorage.getItem('token'))
    const { id } = payload
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'x-auth-token': `${token}` },
    }
    // const body = JSON.stringify({ id })
    const response = await axios.delete(`${BASE_URL}/${joinees}/${id}`, requestOptions)
    return response
  } catch (error) {
    return error
  }
}

export const getJoineeTrackerAPI = async () => {
  try {
    let token = JSON.parse(sessionStorage.getItem('token'))
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'x-auth-token': `${token}` },
    }
    const response = await axios.get(`${BASE_URL}/${joinees}`, requestOptions)
    return response
  } catch (error) {
    return error
  }
}
