import React from 'react'
import Image from 'next/image'
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';
import { userRequest, publicRequest } from '@/requestMethod';
import SuccessPopup from './Popup/SuccessPopup';
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from '@/firebase'
import Comment from './Comment';
const CommentBox = ({user, productId, commentSuccess, setCommentSuccess, loading, setLoading, handleClosePopup, setLoginRecommendPopup, reload, setReload
  ,reportCommentsId, reloadGetReportComment, setReloadGetReportComment
}) => {

  const storage = getStorage(app);
  const [comment, setComment] = useState('')
  const [userCommenteds, setUserCommenteds] = useState([])
  const [imageGallery, setImageGallery] = useState([])
  const [imageGalleryFile, setImageGalleryFile] = useState([])
  var imageGalleryUrl = []
  const [limitFileSizeNotify, setLimitFileSizeNotify]= useState(false)
  const [limitImageNotify, setLimitImageNotify] = useState(false)
  const maxImagesInput = 3

   const handleSendComment = async () => {
      if(user===null){
        setLoginRecommendPopup(true)
      } else {
        setLoading(true)
        await uploadGallery()
        try {
          const res = await userRequest.post(`/comment`, {
            productId: productId,
            userId: user._id,
            content: comment,
            imgGallery: imageGalleryUrl,
            avatarUrl: user.img,
            userName: user.username,
            type: "thread",
            refCommentId:"",
            refCommentUserId:"",
            refCommentUsername:"",
            isReplied: false
          })
          if (res.data){
            userCommenteds.push(res.data.comment)
            // setReload(!reload)
            setComment('')
            setImageGallery([])
            setImageGalleryFile([])
            setLimitFileSizeNotify(false)
            setLimitImageNotify(false)
            setCommentSuccess(true)
            setTimeout(()=> {
              setCommentSuccess(false)
            }, 5000)
          }
        } catch(err){
          console.log('error while upload comment data to mongodb')
        } finally {
          setLoading(false)
        }
      }
    }

  const uploadGallery = async () => {
    for(let image_file of imageGalleryFile) {
        let imageName = new Date().getTime() +"_"+ image_file.name
        let imageRef = ref(storage, `comment-gallery/${imageName}`)
        try{
            await uploadBytes(imageRef, image_file)
            const imgGallery_URL = await getDownloadURL(imageRef)
            imageGalleryUrl.push(imgGallery_URL)
        } catch (err){
            console.log('error uploading file to firebase', err)
        }
    }
  }

  // handle choose image gallery
  const handleImageGallery = async (e) => {
    const files = Array.from(e.target.files)

    files.map((file)=>{
      if(file.size > 3000000){
        setLimitFileSizeNotify(true)
        return
      } else {
        if(files.length + imageGallery.length > maxImagesInput) {
          setLimitImageNotify(true)
          return
        }      
        setImageGalleryFile((prev)=>[...prev,file])
        const imgUrls = URL.createObjectURL(file)
        setImageGallery((prev)=>[...prev,imgUrls])    
      }
    }) 
  }

  // handle delete image gallery
  const handleRemoveImageGallery = (index) => {
      const imgs=imageGallery.filter((img, i) => i !== index)
      const files = imageGalleryFile.filter((img, i)=> i !==index)
      setImageGallery(imgs)
      setImageGalleryFile(files)
  }

  return (
    <>
      {/* notify when comment success or not */}
      {commentSuccess ?                 
                    <SuccessPopup  message={'Bình luận thành công!'}  handleClosePopup={handleClosePopup}   /> 
                : '' }

      

      {/*  page content */}
      <div className='h-auto flex flex-row gap-2 mt-4' >
                {user?.img && user!==null ? 
                  <Image 
                    class='rounded-full object-cover w-8 h-8  md:w-12 md:h-12 '
                    src={user?.img}
                    width={50}
                    height={50}
                    alt='avatar'
                  />
                  :
                  <Image 
                    alt='user avatar'
                    src='/icon-user.jpg'  width={50} height={50}    
                    className='rounded-full  object-cover w-8 h-8 md:w-12 md:h-12 hover:cursor-pointer' 
                  />
                }

                <div className='flex flex-col w-full  border-2 p-2 h-auto' >

                  <div className='flex  gap-2  '>

                    <textarea  
                      onChange={(e)=>setComment(e.target.value)}
                      value={comment}
                      className='flex-1 bg-gray-100 p-2 rounded-md h-48 '
                      placeholder='Bạn đang nghĩ gì ?' >
                    </textarea> 

                  </div>

                  

                  {/* display images after choose */}
                  {imageGallery.length >0 &&
                    <div className='flex flex-wrap gap-2  mt-2' >
                      {imageGallery.map((img, index)=> (
                          <div className='relative' key={index}>
                            <img src={img} className='w-32 h-32 border-2 object-cover rounded-xl ' alt="" />
                            <CloseIcon  
                              fontSize='large'
                              onClick={()=>handleRemoveImageGallery(index)}
                              className='hover:text-red-500 text-gray-400 hover:cursor-pointer bg-black  rounded-md  transition absolute top-1 right-1 z-20 ' 
                            />

                          </div> 
                      ))}
                    </div> 
                  }
                  { limitImageNotify ?
                    <span className='text-red-500 font-semibold' >
                      Upload tối đa 3 ảnh
                    </span> : ''
                  }
                  { limitFileSizeNotify ?
                    <span className='text-red-500 font-semibold' >
                      Vui lòng chọn ảnh nhỏ hơn 5 MB
                    </span> : ''
                  }

                  <div className='flex justify-end gap-4' >
                    {/* add images */}
                    <span className='text-left flex gap-2 p-2'>          
                      <label 
                          title='Thêm ảnh'
                          className='hover:text-blue-500   transition  ' 
                          htmlFor="imageGallery"
                      >
                            <img
                              src='/gallery.png'
                              alt='Thêm ảnh'
                              className='  h-12 hover:cursor-pointer hover:bg-blue-200 px-2  rounded-lg '
                              fontSize='large' 
                            />
                          <input  className='hidden' type="file" multiple accept='image/*' onChange={handleImageGallery} id='imageGallery' />
                      </label>
                    </span>

                    {/* send commetn */}
                    <button 
                        disabled={comment?.trim()===''}
                        title='Gửi bình luận'
                        onClick={handleSendComment}
                        className={`text-white flex gap-2 h-[50px]  justify-center mt-2 items-center transition p-3 md:p-5 rounded-md
                          ${comment?.trim()===''?'bg-gray-500 hover:bg-gray-500':'hover:bg-blue-600 bg-blue-500'}  `} 
                      >
                        <SendIcon/>    
                        Send
                    </button>
                  </div>

                </div>
                
      </div>
      {/* comment user've just commented */}
     
      {userCommenteds && userCommenteds?.map((c, index)=>(
            <Comment 
              key={index} 
              loading={loading}
              setLoading={setLoading}
              user={user}
              comment={c}  
              productId={productId}
              setCommentSuccess={setCommentSuccess}
              reportCommentsId = {reportCommentsId}
              setReloadGetReportComment={setReloadGetReportComment}
              reloadGetReportComment={reloadGetReportComment}
              setLoginRecommendPopup={setLoginRecommendPopup}
              redBackground={true}
              interaction={false}
            />
          ))}
    </> 
  )
}

export default CommentBox