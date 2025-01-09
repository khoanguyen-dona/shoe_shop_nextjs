'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { userRequest } from '@/requestMethod'
import { DataGrid } from '@mui/x-data-grid';
import Loader from '@/components/Loader';
import { FormatCurrency } from '@/utils/FormatCurrency';
import moment from 'moment';
import { useParams } from 'next/navigation';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SuccessPopup from '@/components/Popup/SuccessPopup';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import app from '@/firebase'
import { useRouter } from 'next/navigation'

const UserDetail = () => {  

 
  const router = useRouter()
  const storage = getStorage(app)
  const [loading, setLoading] = useState(true)
  const [notifySuccess, setNotifySuccess] = useState(false)

  const user_id = useParams().id

  const [userId, setUserId] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState('')
  const [img, setImg] = useState('')
  const [createdAt, setCreatedAt] = useState('')

  const [avatarFile, setAvatarFile] = useState('')

  const handleClosePopup = () => {
    setNotifySuccess(false)
}


  useEffect(() => {
    const getUser = async () =>{
      try{
        const res = await userRequest.get(`/user/${user_id}`) 
        if(res.status === 200){
          setUserId(res.data.user._id)
          setUsername(res.data.user.username)
          setEmail(res.data.user.email)
          setIsAdmin(res.data.user.isAdmin)
          setImg(res.data.user.img)
          setCreatedAt(res.data.user.createdAt)

          setLoading(false)
        }
      }catch(err) {
        console.log(err)
      }
    }

  getUser();
}, [])
  console.log('img-->',img)
  console.log('file-',avatarFile)
  const handleAvatar = (e) => {
      const file = e.target.files[0]
      setAvatarFile(file)
      if(file){
        const imageUrl = URL.createObjectURL(file)
        setImg(imageUrl) 
      }
  }

  const handleUploadAvatar = async () => {
      if(avatarFile !==''){
        let imageName = new Date().getTime() + avatarFile.name
        let imageRef = ref(storage, `upload/avatar/${imageName}`)
        try{
            await uploadBytes(imageRef, avatarFile)
            const downloadURL = await getDownloadURL(imageRef)
            handleUpdateToMongoDB(downloadURL)
        } catch (err){
            console.log('error uploading avatar to firebase', err)
        }
      } 
      else {
        try{
          handleUpdateToMongoDB(img)
        } catch(err){
          console.log('error uploading avatar to firebase', err)
        }
      }
        
    }

  const handleUpdateToMongoDB = async (downloadURL) => {
      try {
        const res = await userRequest.put(`/user/${user_id}`,{
          username: username,
          email: email,
          isAdmin: isAdmin,
          img: downloadURL
        })
        if(res.data){
          console.log('Update user successfully', res.data)
        }
      } catch(err) {
        console.log('error update to mongo db',err)
      }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)
    //upload avatar to firebase 
    await handleUploadAvatar()
    // update to mongo db
    setLoading(false)
    setNotifySuccess(true)
    setTimeout(()=>{
      setNotifySuccess(false)
    }, 3000)
  }
 


  return (

    <div className='flex flex-col w-2/3' >
      {loading ?  <div className='flex justify-center  ' >  <Loader  color={'inherit'} />  </div> : ''}
        {notifySuccess ? 
            <div  className='flex justify-center p-4' > 
                <SuccessPopup  message={'Update Successfully!'}  handleClosePopup={handleClosePopup}   /> 
            </div>  : '' }

      <p className='font-bold text-3xl ' >Chỉnh sửa user</p>

      <div className='flex flex-col' >
        <form action="" className='flex flex-col space-y-4 mt-8' >

             
              <div className='space-y-4' >
                <div>
                  <p className='text-sm text-gray-500' >Avatar</p>
                  {img  &&    
                     <img  className='w-32 mt-3 border-2 rounded-full ' src={img}  />                                
                      }
                </div>
                <div className='' >
                  <label className='hover:text-white  rounded-lg border-[1px] px-7  font-bold hover:bg-black p-2 transition border-black ' 
                            htmlFor="thumbnail">
                        Chọn ảnh
                        <input  className='hidden  ' type="file" id='thumbnail' onChange={handleAvatar} />
                    </label>
                </div>
              </div>

              <div  >
                  <p className='text-sm text-gray-500' >User Id</p>
                  <input  className='border-2 p-2 w-full bg-gray-200 opacity-70 ' type="text" disabled 
                          value={userId}   />
              </div>
              
              <div>
                  <p className='text-sm text-gray-500' >Username</p>
                  <input  className='border-2 p-2 w-full ' type="text" 
                      onChange={(e)=>setUsername(e.target.value)} value={username}  />
              </div>

              <div>
                  <p className='text-sm text-gray-500' >Email</p>
                  <input  className='border-2 p-2 w-full ' type="text" 
                      onChange={(e)=>setEmail(e.target.value)} value={email}  />
              </div>

              <div>
                  <p className='text-sm text-gray-500' >Is admin</p>
                  <select  className={`font-bold border-2 p-2 rounded-lg  ${String(isAdmin)==='true'?'text-green-500':'text-red-500'}  `} type="text" 
                      onChange={(e)=>setIsAdmin(e.target.value)}  value={isAdmin}  disabled>
                        {/* <option className='text-green-500 '  value="true">True</option> */}
                        <option className='text-red-500'  value="false">False</option>
                  </select>
              </div>
  
              <div  >
                  <p className='text-sm text-gray-500 mb-2 '  >Created at:</p>
                  <span  className='border-2 p-2 w-full opacity-70 '  > 
                    {moment(createdAt).format("YYYY-MMM-d, h:mm:ss A")}
                  </span>
          
              </div>

              <button 
                  onClick={handleUpdate}
                  className='w-full bg-black text-white font-bold p-4 hover:text-gray-500 transition' >
                  Update
              </button>  
        </form>        
      </div>
    </div>
  
  )
}

export default UserDetail