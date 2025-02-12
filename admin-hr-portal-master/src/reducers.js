import { LOG_IN, LOG_OUT, SET_TITLE } from 'src/actionTypes'

const initialState = {
  sidebarUnfoldable: false,
}

const userReducer = (state = initialState, { type, value, ...rest }) => {
  switch (type) {
    case SET_TITLE:
      return { ...state, ...rest, title: value }
    case LOG_IN:
      return { isAuthenticated: true, user: value, ...state }
    case LOG_OUT:
      return { isAuthenticated: false, user: null, ...state }
    default:
      return state
  }
}

export default userReducer
