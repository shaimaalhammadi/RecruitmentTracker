import { BASE_URL, resetPassword } from 'src/assets/constants'
import axios from 'axios'

export const resetPasswordAPI = async (payload) => {
  try {
    const { email, oldPassword, newPassword, confirmPassword } = payload
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }
    const body = JSON.stringify({ email, oldPassword, newPassword, confirmPassword })
    const response = await axios.post(`${BASE_URL}/${resetPassword}`, body, requestOptions)
    return response
  } catch (error) {
    return error
  }
}
