import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import TableHeader from './components/table-header/table-header.component'
import UsersTable from './components/users-table/users-table.component'

import Services from './services/users.services'
import { setAllUsers, updateUser } from './redux/user/user.actions'

import './App.scss'

const App = () => {
  const allUsers = useSelector(state => state.user.allUsers)

  const dispatch = useDispatch()

  const fetchAllUsers = useCallback(() => { 
    return dispatch => {
      Services.getAllUsers().then(res => {
        dispatch(setAllUsers(res.data))
      })
    }
  }, [])

  const handleUpdateUser = id => {
    let userUpdated = allUsers.find(user => user.id === id)
    userUpdated.active = !userUpdated.active

    Services.updateUser(id, userUpdated).then(() => {
      dispatch(updateUser(userUpdated))
    }) 
  }

  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [dispatch, fetchAllUsers])

  return (
    <div className='app'>
      <TableHeader />
      { allUsers ? (
        <UsersTable
          allUsers={allUsers}
          handleUpdateUser={handleUpdateUser}
        />
        ) 
        : <div>There are no users</div>
      }
    </div>
  )
}

export default App
