import { BASE_URL, categories } from 'src/assets/constants'
import axios from 'axios'

export const addCategoryAPI = async (payload) => {
  try {
    let token = JSON.parse(sessionStorage.getItem('token'))
    const { category, value, addedBy } = payload
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-auth-token': `${token}` },
    }
    const body = JSON.stringify({ category, value, addedBy })
    const response = await axios.post(`${BASE_URL}/${categories}`, body, requestOptions)
    return response
  } catch (error) {
    return error
  }
}

export const updateCategoryAPI = async (payload) => {
  try {
    let token = JSON.parse(sessionStorage.getItem('token'))
    const { id, value } = payload
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-auth-token': `${token}` },
    }
    const body = JSON.stringify({ value })
    const response = await axios.patch(`${BASE_URL}/${categories}/${id}`, body, requestOptions)
    return response
  } catch (error) {
    return error
  }
}

export const deleteCategoryAPI = async (payload) => {
  try {
    let token = JSON.parse(sessionStorage.getItem('token'))
    const { id } = payload
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'x-auth-token': `${token}` },
    }
    // const body = JSON.stringify({ id })
    const response = await axios.delete(`${BASE_URL}/${categories}/${id}`, requestOptions)
    return response
  } catch (error) {
    return error
  }
}

export const getCategoryAPI = async (payload) => {
  try {
    let token = JSON.parse(sessionStorage.getItem('token'))
    const { category } = payload
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'x-auth-token': `${token}` },
    }
    const response = await axios.get(`${BASE_URL}/${categories}/${category}`, requestOptions)
    return response
  } catch (error) {
    return error
  }
}

export const getAllCategoryAPI = async () => {
  try {
    let token = JSON.parse(sessionStorage.getItem('token'))
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'x-auth-token': `${token}` },
    }
    const response = await axios.get(`${BASE_URL}/${categories}`, requestOptions)
    return response
  } catch (error) {
    return error
  }
}
