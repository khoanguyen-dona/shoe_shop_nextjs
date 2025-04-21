"use client"

import React from 'react'
import { useState } from 'react'

import SendIcon from '@mui/icons-material/Send';
import FlagIcon from '@mui/icons-material/Flag';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import { publicRequest, userRequest } from '@/requestMethod';
import CommentGallery from './CommentGallery';
import ReactTimeAgoUtil from '@/utils/ReactTimeAgoUtil';
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from '@/firebase'

const Reply = ({loading, setLoading, reply, user, replyData, setCommentSuccess, productId, comment }) => {

    const storage = getStorage(app);
    const [replyBox, setReplyBox] = useState(false)
    const [userComment, setUserComment] = useState('')
    const [imageGallery , setImageGallery] = useState([])
    const [imageGalleryFile, setImageGalleryFile] = useState([])
    const [limitImageNotify, setLimitImageNotify] = useState(false)
    const [limitFileSizeNotify, setLimitFileSizeNotify] = useState(false)
    const maxImagesInput = 3
    var imageGalleryUrl = []
    console.log(userComment)


    const handleLike = () => {
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

    const handleSendReply = async () => {
      setLoading(true)
      await uploadGallery()
          try {
            const res = await userRequest.post(`/comment`, {
              productId: productId,
              userId: user._id,
              content: userComment,
              imgGallery: imageGalleryUrl ,
              avatarUrl: user.img,
              userName: user.username,
              type: "comment",
              refCommentId: comment._id,
              refCommentUserId: comment.userId,
              refCommentUsername: reply.userName,
              isReplied: false
            })
            if (res.data){
              setUserComment('')
              setImageGallery([])
              setImageGalleryFile([])
              setLimitFileSizeNotify(false)
              setLimitImageNotify(false)
              setCommentSuccess(true)
              setReplyBox(false)
              setTimeout(()=> {
                setCommentSuccess(false)
              }, 5000)
            }
          } catch(err){
            console.log('error while send comment')
          } finally {
            setLoading(false)
          }
      }

    // handle choose image gallery
    const handleImageGallery = (e) => {
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
      const imgs=imageGallery.filter((_, i) => i !== index)
      const files = imageGalleryFile.filter((_, i)=> i !==index)
      setImageGallery(imgs)
      setImageGalleryFile(files)
  }
console.log(imageGallery)
console.log(imageGalleryFile)
console.log(reply)
  return (
    <div  className=' ml-10  md:ml-14 border-l-2 p-2 ' >
        <div className=' gap-2 h-auto  flex '  >
            { reply.avatarUrl!=='' ? 
                <Image 
                src={reply.avatarUrl} width={50} height={50} 
                className='w-8 h-8 md:w-12 md:h-12 object-cover rounded-full hover:cursor-pointer' alt="" 
                /> 
                : 
                <Image 
                alt='user avatar'
                src='/icon-user.jpg'  width={50} height={50}    
                className='rounded-full  object-cover w-8 h-8 md:w-12 md:h-12 hover:cursor-pointer' 
                />
            }
            <div className='flex flex-col bg-gray-100 p-4 w-full rounded-md '>
                <div  className='flex gap-5 '>
                    <p className='text-blue-500 font-bold hover:cursor-pointer ' >{reply.userName}</p>
                    {/* <p className='text-gray-500' >{moment(comment.createdAt).format("YYYY-MMM-DD, h:mm:ss A")}</p> */}
                    <p className='text-gray-500' >
                    <ReactTimeAgoUtil date={reply.createdAt} locale="vi-VN"/>
                    </p>

                </div>
                <div className=' h-auto mt-4  gap-2 '>
                    <span className='text-blue-500  font-medium mr-2' >
                        @{reply.refCommentUsername}
                    </span>
                    {reply.content}
                </div>

                {/* display comment imgGallery */}
                {reply.imgGallery.length !== 0 &&
                  <div className='mt-2 ' > 
                    <CommentGallery product_images={reply?.imgGallery}  />
                  </div>
                }
            </div>

        </div>

        <div  className='flex  gap-5 ml-10  md:ml-12 mt-2 items-center p-2 '>

            <div class="relative group inline-block cursor-pointer ">
                <p onClick={handleLike} class="hover:text-red-500 ">Thích</p>

                <div class="flex absolute gap-2 left-20 -top-12 -translate-x-1/2 mt-2 w-max px-3 py-1 bg-white shadow-lg  text-white text-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <img title='Thích' onClick={handleLike} src='/icon-like.svg' className='w-6 h-6 hover:scale-150 transition ' />
                    <img title='Yêu' onClick={handleLike} src='/icon-love.svg' className='w-6 h-6 hover:scale-150 transition  ' />
                    <img title='Vui' onClick={handleLike} src='/icon-haha.svg' className='w-6 h-6 hover:scale-150 transition ' />
                    <img title='Buồn' onClick={handleLike} src='/icon-sad.svg'  className='w-6 h-6 hover:scale-150 transition '/>
                    <img title='Wow' onClick={handleLike} src='/icon-wow.svg'  className='w-6 h-6 hover:scale-150 transition '/>
                </div>
            </div>

            <span 
                className='flex hover:cursor-pointer   items-center  hover:text-red-500 rounded-lg px-2   ' >
                    <img onClick={handleLike} src='/icon-like.svg' className='w-6 h-6'/>
                    <span className='ml-1' >16</span>
            </span>

            <p 
                className='hover:cursor-pointer hover:text-red-500 ' 
                onClick={()=>setReplyBox(!replyBox)}
            >    
                Trả lời
            </p>

            <span title='báo xấu' >
                <FlagIcon className='text-gray-400 hover:text-red-500 hover:cursor-pointer transition' />
            </span>

        </div>
          
        {/* reply box */}
        {replyBox &&
                <div className='h-auto flex flex-row gap-2 ml-6 md:ml-12  p-4 mr-4 ' >
                        {user?.img ? 
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
                              onChange={(e)=>setUserComment(e.target.value)}
                              value={userComment}
                              className='flex-1 bg-gray-100 p-2 rounded-md h-48'
                              placeholder='Bạn đang nghĩ gì ?' >
                            </textarea> 
                     
                          </div>

                          {/* display images after choose  */}
                            {imageGallery.length >0 &&
                                <div className='flex flex-wrap gap-2 mt-2' >
                                    {imageGallery.map((img, index)=> (
                                        <div className='relative' key={index}>
                                            <img src={img} className='w-28 h-28 md:w-32 md:h-32 object-cover rounded-xl border-2' alt="" />
                                            <CloseIcon  
                                                fontSize='large'
                                                onClick={()=>handleRemoveImageGallery(index)}
                                                className='hover:text-red-500 text-gray-400 bg-black  rounded-md  transition absolute top-1 right-1 z-20 ' 
                                            />
                                        </div> 
                                    ))}
                                </div>
                          }

                          {/*  */}
                          { limitImageNotify &&
                            <span className='text-red-500 font-semibold' >
                              Upload tối đa 3 ảnh
                            </span>
                          }
                          { limitFileSizeNotify &&
                            <span className='text-red-500 font-semibold' >
                              Upload ảnh có dung lượng nhỏ hơn 5 MB
                            </span>
                          }

                          <div className='flex justify-end gap-4' >                       
                            {/* add images */}
                            <div className='text-left flex gap-2' >
                              <label 
                                  title='Thêm ảnh'
                                  className='hover:text-blue-500  transition ' 
                                  htmlFor="imageGallery2"
                              >
                                  <img  
                                      src='/gallery.png'
                                      alt='Thêm ảnh'
                                      className=' h-12 mt-2 hover:cursor-pointer hover:bg-blue-200 px-2 rounded-lg '
                                      fontSize='large' 
                                  />
                                  <input  className='hidden' type="file" multiple onChange={handleImageGallery} id='imageGallery2' />                               
                              </label>                    
                            </div>
                            
                            {/* send comment button */}
                            <button 
                                disabled={userComment.trim()===''}
                                title='Gửi bình luận'
                                onClick={handleSendReply}
                                className={`text-white flex gap-2 h-[50px] bg-blue-500 mt-2 justify-center items-center transition p-3 md:p-5 rounded-md
                                  ${userComment.trim()===''?'bg-gray-500 hover:bg-gray-500':'hover:bg-blue-600'}  `} 
                              >
                                <SendIcon/>    
                                Send
                              </button>                        
                          </div>

                        </div>
                        
                </div>
        }
     
    </div>
  )
}

export default Reply