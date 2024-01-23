import React from 'react'
import { Link } from 'react-router-dom'
import {IoIosAddCircle as AddIcon} from 'react-icons/io'

const Addbutton = () => {
  return (
    <Link to ='/notes/new' className='floating-button'>
      <AddIcon/>
    </Link>
  )
}

export default Addbutton
