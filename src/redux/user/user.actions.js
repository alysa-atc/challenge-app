import { userActionTypes } from './user.types'

const { SET_ALL_USERS, UPDATE_USER } = userActionTypes

export const setAllUsers = allUsers => ({
  type: SET_ALL_USERS,
  payload: allUsers
})

export const updateUser = user => ({
  type: UPDATE_USER,
  payload: user
})
