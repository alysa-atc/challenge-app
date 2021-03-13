import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import './table-header.scss'

library.add(fas)

const TableHeader = () => (
  <div className='table-header'>
    <FontAwesomeIcon 
      icon={['fas', 'users']} 
      size='2x' 
    />
    <label>Users</label>
  </div>
)

export default TableHeader
