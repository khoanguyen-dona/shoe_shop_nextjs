'use client'

import React from 'react'
import { useState } from 'react'
const profileAccount = () => {
    const [username, setUsername]= useState('')
    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')
    const [img, setImg]= useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
    }

  return (
    <div className='px-2 md:px-4 lg:px-16 xl:px-24 2xl:px-48  text-center mt-10 mb-20' >
        <p className='font-bold text-4xl' > Account</p>
    
        <form action="" className='flex flex-col space-y-4 mt-8  '  onSubmit={handleSubmit} >

            <div>
                <p className='text-sm text-gray-500' >Username</p>
                <input  className='border-2 p-2 w-full md:w-2/3 ' type="text" placeholder='Tên sản phẩm' 
                        onChange={(e)=>setUsername(e.target.value)}   />
            </div>


            <div>
                <p className='text-sm text-gray-500' >Email</p>
                <input  className='border-2 p-2 w-full md:w-2/3 ' type="text" placeholder='' 
                    onChange={(e)=>setEmail(e.target.value)}   />
            </div>

            <div>
            <p className='text-sm text-gray-500' >Password</p>
                <input  className='border-2 p-2 w-full md:w-2/3 ' type="text" placeholder='' 
                    onChange={(e)=>setPassword(e.target.value)}   />
            </div>

            <div>
                <p className='text-sm text-gray-500' >Image</p>
                <input  className='border-2 p-2 w-full md:w-2/3' type="file" placeholder='' 
                    onChange={(e)=>setImg(e.target.value)}   />
            </div>

            <div>
                <button className=' bg-black text-white hover:text-gray-500 p-4 font-bold' >OK</button>
            </div>
            

        </form>
    </div>
  )
}

export default profileAccount