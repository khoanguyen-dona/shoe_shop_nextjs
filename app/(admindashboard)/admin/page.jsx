'use client'

import React  from 'react'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const page = () => {

  const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
  const currentUser = user && JSON.parse(user).currentUser
  const router = useRouter()


 
  return (
    <>
    { currentUser?.isAdmin === true ? 
    <p>admin page</p>
    : router.push('/admin-login')}
    </>
    
  )
}

export default page