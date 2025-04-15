'use client'

import React, { useState } from 'react'
import FlagIcon from '@mui/icons-material/Flag';
import Image from 'next/image';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import { publicRequest, userRequest } from '@/requestMethod';

import ReactTimeAgoUtil from '@/utils/ReactTimeAgoUtil';
import Reply from './Reply';

const Comment = ({loading, setLoading, comment, handleLike, user, productId, setCommentSuccess }) => {

 
  const [reply, setReply] = useState(false)
  const [userComment, setUserComment] = useState('')
  const [imageGallery , setImageGallery] = useState([])
  const [imageGalleryFile, setImageGalleryFile] = useState([])
  const [page, setPage] = useState(1)
  const limit = 2 
  const [replyData, setReplyData] = useState([])
  const [hasNextReply, setHasNextReply] = useState(true)
  const [seeMoreReply, setSeeMoreReply] = useState(false)
  const [limitImageNotify, setLimitImageNotify] = useState(false)
  

  const maxImages = 5
  console.log(userComment)
console.log(replyData)

  // handle choose image gallery
  const handleImageGallery = (e) => {
    const files = Array.from(e.target.files)

    if(files.length + imageGallery.length > maxImages) {
      setLimitImageNotify(true)
      return
    }

    files.map((f)=>{
      setImageGalleryFile((prev)=>[...prev,f])
    })
    const imgUrls = files.map(f=>URL.createObjectURL(f))
    imgUrls.map((img)=>{
      setImageGallery((prev)=>[...prev,img])
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


  const handleSendReply = async () => {
      try {
        setLoading(true)
        const res = await userRequest.post(`/comment`, {
          productId: productId,
          userId: user._id,
          content: userComment,
          imgGallery:[],
          avatarUrl: user.img,
          userName: user.username,
          type: "comment",
          refCommentId: comment._id,
          refCommentUserId: comment.userId,
          refCommentUsername: comment.userName,
          isReplied: false
        })
        if (res.data){
          console.log(res.data)
          replyData.push(res.data.comment)
          setUserComment('')
          setCommentSuccess(true)
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


  const handleFetchReply = async () => {
      try {
        setSeeMoreReply(true)
        setLoading(true)
        const res = await publicRequest.get(`/comment/refCommentId/${comment._id}?type=comment&limit=${limit}&page=${page}`)
        if( res.data) {
          console.log(res.data)
          res.data.replyData.map((r)=>{
            replyData.push(r)
          })

          if(res.data.hasNext===false){
            setHasNextReply(false)
          }
        }
      } catch(err) {
        console.log('error while fetch more reply', err)
      } finally {
        setPage(prev => prev+1)
        setLoading(false)
      }
    
  }
  
  return (
  <>
    <div  className='mt-4  h-auto w-auto  ' >
              <div className='w-full space-x-2 h-auto  flex '  >
                { comment.avatarUrl!=='' ? 
                  <Image 
                    src={comment.avatarUrl} width={50} height={50} 
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
                    <p className='text-blue-500  font-bold hover:cursor-pointer ' >{comment.userName}</p>
                    {/* <p className='text-gray-500' >{moment(comment.createdAt).format("YYYY-MMM-DD, h:mm:ss A")}</p> */}
                    <p className='text-gray-500' >
                    <ReactTimeAgoUtil date={comment.createdAt} locale="vi-VN"/>
                    </p>

                  </div>
                  <div className=' h-auto mt-4  '>
                    {comment.content}
                  </div>
                </div>
              </div>
    
              <div  className='flex gap-5  ml-10  md:ml-12 mt-2 items-center p-2 '>
    
                <div class="relative group inline-block cursor-pointer ">
                    <p onClick={handleLike} class="hover:text-red-500 ">Thích</p>
    
                    <div class="flex absolute gap-2 left-20 -top-12 -translate-x-1/2 mt-2 w-max px-3 py-1 bg-white shadow-2xl border-[1px] border-gray-100  text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <img title='Thích' onClick={handleLike} src='/icon-like.svg' className='w-6 h-6 hover:scale-150 transition  ' />
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
                  onClick={()=>setReply(!reply)}
                >    
                  Trả lời
                </p>
    
                <span title='báo xấu' >
                  <FlagIcon className='text-gray-400 hover:text-red-500 hover:cursor-pointer transition' />
                </span>
    
              </div>
              
              {/* Comment box */}
              {reply &&
                <div className='h-auto flex flex-row gap-2 mt-4  ml-10 md:ml-16 mb-6   ' >
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
                            <div className='flex flex-wrap mt-4' >
                              {imageGallery.map((img, index)=> (
                                  <div className='relative' key={index}>
                                    <img src={img} className='w-32 h-32 rounded-xl object-cover  border-2' alt="" />
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
                              Upload tối đa 5 ảnh
                            </span>
                          }

                          <div className='flex  justify-end gap-4' >
                            {/* add images */}
                            <div className='text-left flex p-2 gap-2' >
                              <label 
                                  title='Thêm ảnh'
                                  className='hover:text-blue-500  transition' 
                                  htmlFor="imageGalleryReply">
                                    <img
                                      src='/gallery.png'
                                      alt='Thêm ảnh'
                                      className='h-12 hover:cursor-pointer hover:bg-blue-200 rounded-lg px-2 '
                                      fontSize='large' 
                                    />
                                  <input  className='hidden' type="file" multiple onChange={handleImageGallery} id='imageGalleryReply' />
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
                         
              {/* display 'see more' button  */}
              {  comment.isReplied  &&         
                  <span 
                    onClick={handleFetchReply}        
                    className='text-sm text-blue-500  ml-10 md:ml-20  hover:cursor-pointer hover:bg-blue-100  rounded-full p-2    ' 
                  >
                      <ShortcutIcon className='scale-y-[-1] mr-2' />
                      xem phản hồi                    
                      <KeyboardArrowDownIcon />                                 
                  </span> 
              }
    </div>
    
    {/*  reply data  */}
    <div className='mt-4' >
    {
      seeMoreReply && replyData?.map((reply, index)=>(
         <Reply 
            key={index}  
            reply={reply}  
            user={user}
            loading={loading}
            setLoading={setLoading}
            replyData={replyData}
            setCommentSuccess={setCommentSuccess}
            productId={productId}
            comment={comment}
        /> 
      ))}
    </div>

    {/* xem thêm button */}
    {  seeMoreReply && hasNextReply &&
      <span
        onClick={handleFetchReply}
        className='text-sm text-blue-500 ml-28   hover:cursor-pointer p-2 rounded-full hover:bg-blue-100 ' >
        Xem thêm ...
      </span> 
    }

    {/* Rút gọn button */}
    {  seeMoreReply && !hasNextReply &&
        <span 
          onClick={()=>setSeeMoreReply(false)}        
          className='text-sm text-blue-500   ml-24  md:ml-32  hover:cursor-pointer hover:bg-blue-100 p-2   rounded-full' 
        >       
          Thu gọn           
          <KeyboardArrowUpIcon /> 
                    
      </span> 
    }  
  
  </>
  )
}

export default Comment