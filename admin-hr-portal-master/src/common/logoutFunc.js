export const clearUserCreds = () => {
  try {
    localStorage.clear()
    sessionStorage.clear()
    return;
  } catch (error) {
    return error
  }
}

export default clearUserCreds
