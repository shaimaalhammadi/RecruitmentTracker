import { createStore , applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import {thunk} from 'redux-thunk'
import userReducer from 'src/reducers'

const middleware = [thunk]

const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem('state', JSON.stringify(state))
  } catch (e) {
    console.error(e)
  }
}

const loadFromLocalStorage = () => {
  try {
    const stateStr = localStorage.getItem('state')
    return stateStr ? JSON.parse(stateStr) : undefined
  } catch (e) {
    console.error(e)
    return undefined
  }
}

const rootReducer = combineReducers({
  userData: userReducer,
})

const persistedStore = loadFromLocalStorage()

const store = createStore(
  rootReducer,
  persistedStore,
  composeWithDevTools(applyMiddleware(...middleware)),
)

store.subscribe(() => {
  saveToLocalStorage(store.getState())
})

export default store
