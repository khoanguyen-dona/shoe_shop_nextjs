'use client'

import React from 'react'
import { CircularProgress } from '@mui/material'
const Loader = ({color}) => {
  return (
    <div className='text-center ' >
        <CircularProgress color={color}  />
    </div>
  )
}

export default Loader