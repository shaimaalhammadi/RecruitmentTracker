import { BASE_URL, register } from 'src/assets/constants'
import axios from 'axios'

export const registerAPI = async (payload) => {
  try {
    const { name, email, password, role } = payload
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }
    const body = JSON.stringify({ name, email, password, role })
    const response = await axios.post(`${BASE_URL}/${register}`, body, requestOptions)
    return response
  } catch (error) {
    return error
  }
}
