import { BASE_URL, login } from 'src/assets/constants'
import axios from 'axios'

export const loginAPI = async (payload) => {
  try {
    const { email, password } = payload
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }
    const body = JSON.stringify({ email, password })
    const response = await axios.post(`${BASE_URL}/${login}`, body, requestOptions)
    return response
  } catch (error) {
    return error
  }
}
