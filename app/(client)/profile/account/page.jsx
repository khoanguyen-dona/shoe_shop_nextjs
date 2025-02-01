'use client'

import React from 'react'
import { useState } from 'react'
import { userRequest } from '@/requestMethod'
import { useSelector, useDispatch } from 'react-redux'
import Image from 'next/image'
import Loader from '@/components/Loader'

import { setUser } from '@/redux/userRedux'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import {
    getStorage,
    ref,
    uploadBytes,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage";
import app from '@/firebase'
import SuccessPopup from '@/components/Popup/SuccessPopup'



const profileAccount = () => {
    const storage = getStorage(app);
    const dispatch= useDispatch()
    const user = useSelector((state)=>state.user?.currentUser)

    const [username, setUsername]= useState(user?.username)
    const [email, setEmail]= useState(user?.email)
    const [password, setPassword]= useState('')
    const [newPassword1, setNewPassword1] = useState('')
    const [newPassword2, setNewPassword2] = useState('')
    const [previewImage, setPreviewImage]= useState(user?.img)
    const [file, setFile] = useState('')
    
    const [loading, setLoading]= useState(false)
    const [notifySuccess, setNotifySuccess] = useState(false)
    const [passwordButton, setPasswordButton]= useState(false)
    const [seePassword, setSeePassword]= useState(false)
    const [error, setError]= useState(false)
    
    const handleSeePassword = () => {
        setSeePassword(prev => !prev)
    }

    const handleAvatar =  (e) => {
        const file = e.target.files[0]
        setFile(file)
      
        if(file){
            const imageURL = URL.createObjectURL(file)
            setPreviewImage(imageURL)
        }
    }

    const handleExpandPasswordChange = () => {
        setPasswordButton(prev => !prev)
    }

    const handleClosePopup = () => {
        setNotifySuccess(false)
    }

    const handleUpdatePassword = async (e) => {
        e.preventDefault()
        setLoading(true)
        try{
            const res = await userRequest.put(`/user/${user._id}/update-password`,{
                oldPassword: password,
                newPassword: newPassword1
            })
            if(res.data){
                
                setLoading(false)
                setNotifySuccess(true)
                setTimeout(() => {
                    setNotifySuccess(false)
                  }, 3000);
            } 
       
        }catch(err) {
            setError(true)
            setTimeout(() => {
                setError(false)
              }, 5000);
        }
        setLoading(false)
    }

    const uploadAvatar = async () =>{
        
        if(file !==''){
            let imageName = new Date().getTime() + file.name
            let imageRef = ref(storage, `upload/avatar/${imageName}`)
            try{
                await uploadBytes(imageRef, file)
                const downloadURL = await getDownloadURL(imageRef)
                handleUpdateUser(downloadURL)
            } catch (err){
                console.log('error uploading avatar to firebase', err)
            }
          } 
          else {
            try{
              handleUpdateUser(previewImage)
            } catch(err){
              console.log('error uploading avatar to firebase', err)
            }
          }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        await uploadAvatar()    
        setLoading(false)
        setNotifySuccess(true)
        setTimeout(()=> {
            setNotifySuccess(false)
        }, 3000)
    }

    const handleUpdateUser = async (downloadURL) => {
            try{          
                const res = await userRequest.put(`/user/${user._id}`,{
                    username: username,
                    email: email,
                    isAdmin: false,
                    img: downloadURL
                })
                
                if(res.data){
                    const { email, img, username, ...others} = user
                    dispatch(setUser({...others, 
                                        email: res.data.user.email, 
                                        img: res.data.user.img, 
                                        username: res.data.user.username }))
                 
                }
            }catch(err){
                console.log('err while handleUpdateUser',err)
            }
            
        }
       

  return (
    
    <div className={`px-2 md:px-4 lg:px-16 xl:px-24 2xl:px-48  text-center mt-10 mb-20 ${loading ?'bg-white opacity-50':''}   `} >
         {loading ?  <div className='flex justify-center  ' >  <Loader  color={'inherit'} />  </div> : ''}
         {notifySuccess ? 
            <div  className='flex justify-center p-4' > 
                <SuccessPopup  message={'Update Successfully!'}  handleClosePopup={handleClosePopup}   /> 
            </div>  : '' }

        <p className='font-bold text-4xl' > Account</p>
    
        <form action="" className='flex flex-col  space-y-4 mt-8  '   >

            <div>
                <p className='text-sm text-gray-500' >Username</p>
                <input  className='border-2 p-2 w-full md:w-2/3 ' type="text"  value={username}
                         
                        onChange={(e)=>setUsername(e.target.value)}   />
            </div>


            <div>
                <p className='text-sm text-gray-500' >Email</p>
                <input  className='border-2 p-2 w-full md:w-2/3 ' type="text" value={email}
                    onChange={(e)=>setEmail(e.target.value)}   />
            </div>
            

    
           
            <div>
                <p className='text-sm text-gray-500  mt-4 mb-2' >Ảnh đại diện </p>
                    <label className='hover:text-white  border-[1px] font-semibold hover:bg-black p-2 transition border-black ' 
                            htmlFor="thumbnail">
                        Chọn ảnh
                        <input  className='hidden' type="file" id='thumbnail' onChange={handleAvatar} />
                    </label>
                    
                    {previewImage  && 
                    <div className='relative flex justify-center  ' >       
                        {/* <Image width={100} height={100}  className=' mt-3 border-2 rounded-full  ' alt='avatar' src={previewImage}  /> */}
                        <img className='w-32 h-32 mt-3 border-2 rounded-full  object-cover  ' alt='avatar' src={previewImage}  />  

                                                   
                    </div>                                                      
                    } 
            </div>

            <div>
                <button 
                        onClick={handleSubmit}
                        className='w-full md:w-2/3 bg-black text-white hover:text-gray-500 p-4 font-bold transition ' >
                    Update 
                   
                </button>
            </div>


        </form>

        <div className='flex justify-center' >
                <p  className='w-full lg:w-1/3   p-4  text-black font-bold hover:text-gray-500 transition  cursor-pointer'
                    onClick={handleExpandPasswordChange} >
                        Đổi mật khẩu 
                        <ExpandLessIcon fontSize='large' className={`transform-gpu  ${passwordButton?'':'rotate-180'} `} /> 
                </p>
        </div>

        { passwordButton &&
        <div className='space-y-4' >
            <div>
            <p className='text-sm text-gray-500  ' >Password cũ </p>
                <input  className='border-2 p-2 w-full md:w-2/3 ' type={`${seePassword ? 'text':'password'}`}  
                    onChange={(e)=>setPassword(e.target.value)}   />
            </div>
            
            <div className='' >
            <p className='text-sm text-gray-500' >Password mới</p>
                <input  className='border-2 p-2 w-full md:w-2/3 ' type={`${seePassword ? 'text':'password'}`}
                    onChange={(e)=>setNewPassword1(e.target.value)}   />
            </div>

            <div>
            <p className='text-sm text-gray-500' >Nhập lại password mới</p>
                <input  className='border-2 p-2 w-full md:w-2/3 ' type={`${seePassword ? 'text':'password'}`}
                    onChange={(e)=>setNewPassword2(e.target.value)}   />
            </div>
            { newPassword1 !== newPassword2 ?

                <div className='text-red-500' >Password nhập lại phải giống Password mới ! </div> : ''
            }
            <div className='w-full p-4 font-bold  cursor-pointer ' onClick={handleSeePassword} >
                See password
                <span className=' text-center p-4' >
                {seePassword ? <VisibilityOffIcon fontSize='large' /> : <VisibilityIcon fontSize='large' /> }
                </span>
                </div>
            <div className='flex justify-center' >
                <p  className='w-1/3   p-4 bg-black text-white font-bold hover:text-gray-500 transition  cursor-pointer'
                    onClick={handleUpdatePassword}  >Update mật khẩu</p>
            </div>
            <div>
                {error ? <div className='text-red-500 font-bold' >Sai password!</div> : ''   }
            </div>
        </div>
        }

            
    </div>
  )
}

export default profileAccount