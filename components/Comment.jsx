'use client'

import React, { useState, useEffect } from 'react'
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
import CommentGallery from './CommentGallery';
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from '@/firebase'
import { emotionsArray } from '@/constants';

const Comment = ({loading, setLoading, comment,  user, productId, setCommentSuccess, reportCommentsId, 
  setReloadGetReportComment,reloadGetReportComment }) => {

  const storage = getStorage(app);
  
  const [reply, setReply] = useState(false)
  const [userComment, setUserComment] = useState('')
  const [imageGallery , setImageGallery] = useState([])
  const [imageGalleryFile, setImageGalleryFile] = useState([])
  const [page, setPage] = useState(1)
  const limit = 4 
  const [replyData, setReplyData] = useState([])
  const [hasNextReply, setHasNextReply] = useState(true)
  const [seeMoreReply, setSeeMoreReply] = useState(false)
  const [limitImageNotify, setLimitImageNotify] = useState(false)
  const [limitFileSizeNotify, setLimitFileSizeNotify]= useState(false)
  const maxImagesInput = 3
  var imageGalleryUrl = []
  const [emotions, setEmotions] = useState([])
  const [userEmotions, setUserEmotions] = useState([])
  const [reload, setReload] = useState(false)
  const [emotionsOfComment, setEmotionsOfComment] = useState([])
  const [emotionsPopup, setEmotionsPopup] = useState(false)
  const [currentEmotions, setCurrentEmotions] = useState([])
  const [currentEmotionsType, setCurrentEmotionsType] = useState('all')
  const [likeCount, setLikeCount] = useState()
  const [loveCount, setLoveCount] = useState()
  const [funCount, setFunCount] = useState()
  const [sadCount, setSadCount] = useState()
  const [wowCount, setWowCount] = useState()

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
          imgGallery: imageGalleryUrl,
          avatarUrl: user.img,
          userName: user.username,
          type: "comment",
          refCommentId: comment._id,
          refCommentUserId: comment.userId,
          refCommentUsername: comment.userName,
          isReplied: false
        })
        if (res.data){
          setUserComment('')
          setImageGallery([])
          setImageGalleryFile([])
          setLimitFileSizeNotify(false)
          setLimitImageNotify(false)
          setCommentSuccess(true)
          setReply(false)
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

  // fetch reply data
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
  
  // fetch report comment
  const handleReportComment = async () =>{
    try {
      setLoading(true)
      const res = await userRequest.post(`/report-comment`,{
        commentId: comment._id,
        productId: productId,
        userId: user._id,
      })
      if(res.data){
        setReloadGetReportComment(!reloadGetReportComment)
      }
    } catch(err) {
      console.log('error while handle report comment',err)
    } finally{
      setLoading(false)
    }
  }
   
  // fetch emotion by commentId
  useEffect(()=>{
    const getEmotions = async () =>{
      try {
          const tempEmotions = []
          const res = await publicRequest.get(`/emotion/${comment._id}?userId=`)
          if(res.data){
            setEmotions(res.data.data)
            setCurrentEmotions(res.data.data)
            res.data.data.map((emo)=>{
              emotionsArray.includes(emo.type) ? tempEmotions.push(emo.type) : ''
            })
            setEmotionsOfComment(tempEmotions)
            
          }
      } catch(err){
        console.log('err while loading emotion',err)
      }
    }
    getEmotions()
  },[reload])

  // fetch emotions by userId and commentId
  useEffect(()=>{
    const getEmotions = async () =>{
      try {
          const res = await publicRequest.get(`/emotion/${comment._id}?userId=${user._id}`)
          if(res.data){
            setUserEmotions(res.data.data)
          }
      } catch(err){
        console.log('err while loading emotion',err)
      }
    }
    getEmotions()
  },[reload])

  //fetch currentEmotions
  useEffect(()=>{
    const getEmotions = async () => {
      const tempArray = []

      try {
        if(currentEmotionsType==='all'){
          setCurrentEmotions(emotions)
        } else {    
          emotions.map((emo)=>(
            emo.type===currentEmotionsType ? tempArray.push(emo):''
          ))
          setCurrentEmotions(tempArray)
        }
      } catch(err){
        console.log('err while fetching current emotions',err)
      } 
    }
    getEmotions()
  },[currentEmotionsType])

  console.log(emotionsOfComment)
  // 
  const handleLike = async (type) =>{
      setLoading(true)
      try {
        const res = await userRequest.post(`/emotion`,{
          commentId: comment._id,
          userId: user._id,
          type: type,
        })
        if (res.data){
          setReload(!reload)
          setLoading(false)
        }
      } catch(err){
        console.log('err while handle like',err)
      }
  }

  const handleEmotionsPopup = async () => {
    setEmotionsPopup(true)
    let tempLikeCount=0
    let tempLoveCount=0
    let tempFunCount=0
    let tempSadCount=0
    let tempWowCount=0

    emotions.map((emo)=>(
      emo.type==='like'? tempLikeCount+=1 :
      emo.type==='love'? tempLoveCount+=1 :
      emo.type==='fun'? tempFunCount+=1 :
      emo.type==='sad'? tempSadCount+=1 :
      emo.type==='wow'? tempWowCount+=1 :''
    ))
    setLikeCount(tempLikeCount)
    setLoveCount(tempLoveCount)
    setFunCount(tempFunCount)
    setSadCount(tempSadCount)
    setWowCount(tempWowCount)
  }
  console.log(likeCount)
  console.log(emotions)
  console.log(userEmotions)
  return (
  <>
    {emotionsPopup &&
      <>

        <div className={`fixed w-screen h-screen bg-black opacity-70  left-0 top-0 z-20 `}>      
        </div>

        <div className=' flex justify-center items-center ' >
          <div className='bg-white fixed  rounded-lg z-30 w-5/6 md:w-2/3 xl:w-1/3  h-1/2 top-1/4     ' >
            <div className='flex justify-between p-2'>
              <div className='flex gap-5 justify-center items-center ' >
                <p 
                  onClick={()=>setCurrentEmotionsType('all')}
                  className={` py-[2px]  hover:cursor-pointer border-blue-500 transition ${currentEmotionsType==='all'?'text-blue-500 border-b-4':''} `} >
                  Tất cả ({emotions?.length})
                </p>
                
                {emotionsArray?.map((emoType,index)=>(
                    emotionsOfComment?.includes(emoType) && 
                    <div 
                      onClick={()=>setCurrentEmotionsType(emoType)}
                      key={index} 
                      className={`gap-1 flex py-[2px] justify-center items-center hover:cursor-pointer font-semibold ${currentEmotionsType===emoType&&'border-b-4 border-blue-500 text-blue-500'} `}
                    >
                      <img  src={`/icon-${emoType}.svg`}  className='w-6 h-6 ' />
                      {
                        emoType==='like' ? likeCount :
                        emoType==='love' ? loveCount :
                        emoType==='fun' ? funCount :
                        emoType==='sad' ? sadCount :
                        emoType==='wow' ? wowCount : ''
                      }
                    </div>  
                ))}
                
              </div>
              <div>
                <CloseIcon className='hover:cursor-pointer text-gray-400  hover:text-red-500' fontSize='large' onClick={()=>setEmotionsPopup(false)} />
              </div>
            </div>

            <hr className='border-b-2' />

            <div className=' flex flex-col gap-2 p-2 overflow-y-auto bg-white h-full md:h-full rounded-lg '>
              {currentEmotions?.map((emotion, index)=>(
                <div key={index} className='flex justify-start items-center gap-5 relative' >
                  <Image width={50} height={50} className='w-12 h-12 rounded-full object-cover ' src={emotion?.userId?.img} alt="" />
                  {
                    emotionsArray.map((emo,index)=>(
                      emo===emotion.type && <img key={index} src={`/icon-${emotion.type}.svg`} className='w-6 h-6 absolute -bottom-1 left-7 '  />
                    ))
                  }

                  <p className='text-blue-500 font-semibold' >
                    {emotion?.userId?.username}
                  </p> 
                </div>  
              ) )}
            </div>

          </div>
        </div>
      </>
    }

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
                <div className='flex flex-col bg-gray-100 p-4 w-full rounded-md relative '>
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

                  {/* display comment imgGallery */}
                  {comment.imgGallery.length !== 0 &&
                    <div className='mt-2 ' > 
                      <CommentGallery product_images={comment?.imgGallery}  />
                    </div>
                  }

                  {/* emotion that comment have */}
                  {emotions.length > 0 &&
                    <div 
                      onClick={handleEmotionsPopup}
                      title='Cảm xúc'
                      className='absolute flex items-center justify-center -bottom-4 right-5 shadow-md w-auto  hover:cursor-pointer bg-white    hover:text-red-500 rounded-full  px-2 py-1   z-10 ' 
                    >
                      {
                        emotionsArray.map((emoType,index)=>(
                          emotionsOfComment.includes(emoType) && <img key={index} src={`/icon-${emoType}.svg`} className='w-6 h-6  '/>
                        ))
                      }
                        <div className='ml-2  text-lg  ' >{emotions.length}</div>
                    </div>
                  }
           
                </div>
              </div>
    
              <div  className='flex gap-5  ml-10  md:ml-12 mt-2 items-center p-2 '>
    
                <div class="relative group inline-block cursor-pointer ">
                    <p onClick={()=>handleLike('like')} class={`hover:text-red-500   `}>
                      {userEmotions[0]?.type==='like' ? <span className='text-red-500 font-semibold' >
                        Thích 
                      </span> :
                       userEmotions[0]?.type==='love' ? <span className='text-red-500 font-semibold' >
                        Yêu 
                      </span> :
                      userEmotions[0]?.type==='fun' ? <span className='text-red-500 font-semibold' >
                        Vui
                      </span> :
                      userEmotions[0]?.type==='sad' ? <span className='text-red-500 font-semibold' >
                        Buồn 
                      </span> :
                      userEmotions[0]?.type==='wow' ? <span className='text-red-500 font-semibold' >
                        Wow
                      </span> : 'Thích' }
                    </p>
                    
                    {/* popup emotions for user choose from */}
                    <div class="flex absolute gap-2 left-20 -top-12 -translate-x-1/2 mt-2 w-max px-3 py-1 bg-white shadow-lg  text-white text-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <img title='Thích' onClick={()=>handleLike('like')} src='/icon-like.svg' className='w-6 h-6 hover:scale-150 transition  ' />
                      <img title='Yêu' onClick={()=>handleLike('love')} src='/icon-love.svg' className='w-6 h-6 hover:scale-150 transition  ' />
                      <img title='Vui' onClick={()=>handleLike('fun')} src='/icon-fun.svg' className='w-6 h-6 hover:scale-150 transition ' />
                      <img title='Buồn' onClick={()=>handleLike('sad')} src='/icon-sad.svg'  className='w-6 h-6 hover:scale-150 transition '/>
                      <img title='Wow' onClick={()=>handleLike('wow')} src='/icon-wow.svg'  className='w-6 h-6 hover:scale-150 transition '/>
                    </div>
                </div>
    
                
    
                <p 
                  className='hover:cursor-pointer hover:text-red-500 ' 
                  onClick={()=>setReply(!reply)}
                >    
                  Trả lời
                </p>
    
                <span title='báo xấu' >
                  <FlagIcon 
                      onClick={handleReportComment}
                      className={`text-gray-400 hover:text-red-500 hover:cursor-pointer transition ${reportCommentsId?.includes(comment?._id)? 'text-red-500':''}  `} />
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
                            <div className='flex flex-wrap gap-2 mt-4' >
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

                      
                          { limitImageNotify &&
                            <span className='text-red-500 font-semibold' >
                              Upload tối đa 3 ảnh
                            </span>
                          }
                          { limitFileSizeNotify &&
                            <span className='text-red-500 font-semibold' >
                              Vui lòng dùng ảnh có dung lượng thấp hơn 5 MB
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
            setCommentSuccess={setCommentSuccess}
            productId={productId}
            comment={comment}
            reloadGetReportComment={reloadGetReportComment}
            setReloadGetReportComment={setReloadGetReportComment}
            reportCommentsId={reportCommentsId}
            
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