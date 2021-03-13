import { userActionTypes } from './user.types'

const INITIAL_STATE = {
  allUsers: null
}

const { SET_ALL_USERS, UPDATE_USER } = userActionTypes

const userReducer = (state = INITIAL_STATE, action) => {  
  switch (action.type) {
    case SET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload
      }
    case UPDATE_USER:
      const updatedUsers = [...state.allUsers]
      return { ...state, allUsers: updatedUsers }
    default:
      return state
  }
}

export default userReducer