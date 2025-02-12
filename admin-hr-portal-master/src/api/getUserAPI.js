import { BASE_URL, getUserData } from 'src/assets/constants'
import axios from 'axios'

export const getUserDataAPI = async () => {
  try {
    let token = JSON.parse(sessionStorage.getItem('token'))
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'x-auth-token': `${token}` },
    }
    const response = await axios.get(`${BASE_URL}/${getUserData}`, requestOptions)
    return response
  } catch (error) {
    return error
  }
}
