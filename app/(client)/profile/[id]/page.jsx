'use client'

import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { setLogout } from '@/redux/userRedux'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'


const Profile  = () => {
    const user_id = useParams().id
    const router = useRouter()
    const user = useSelector((state) => state.user.currentUser)
    const dispatch = useDispatch()

    const handleLogoutClick = (e) => {
        e.preventDefault();
        dispatch(setLogout())
        router.push('/')
    }
  return (
    <div className='px-4 md:px-8 xl:px-64 ' >
        <p className='font-bold text-3xl text-center mt-20' >Profile</p>{user_id}
        <button  onClick={handleLogoutClick} className='bg-red-500 text-white font-bold p-3 hover:bg-red-700' >Logout</button>
    </div>
  )
}

export default Profile 