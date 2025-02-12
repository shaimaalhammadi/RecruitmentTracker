import { BASE_URL } from 'src/assets/constants'
import axios from 'axios'

export const dashboard = async (filter = '') => {
  try {
    let token = JSON.parse(sessionStorage.getItem('token'))
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'x-auth-token': `${token}` },
    }
    let axiosURL;
    if (!filter) axiosURL = axios.get(`${BASE_URL}/dashboard`, requestOptions)
    if (filter) axiosURL = axios.get(`${BASE_URL}/dashboard?year=${filter}`, requestOptions)
    const response = await axiosURL
    return response
  } catch (error) {
    return error
  }
}
