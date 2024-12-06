'use client'

import React from 'react'
import { CircularProgress } from '@mui/material'
const Loader = ({color}) => {
  return (
    <div className=' fixed  top-40 z-50 ' >
        <CircularProgress color={color}  />
    </div>
  )
}

export default Loader