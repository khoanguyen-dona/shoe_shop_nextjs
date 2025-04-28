{userCommenteds && 
          userCommenteds.map((com,index)=>(
          <div className='' key={index}>
            <div className=' gap-2 h-auto  flex '  >
                { com.avatarUrl!=='' ? 
                    <Image 
                    src={com.avatarUrl} width={50} height={50} 
                    className='w-8 h-8 md:w-12 md:h-12 object-cover rounded-full hover:cursor-pointer' alt="" 
                    /> 
                    : 
                    <Image 
                    alt='user avatar'
                    src='/icon-user.jpg'  width={50} height={50}    
                    className='rounded-full  object-cover w-8 h-8 md:w-12 md:h-12 hover:cursor-pointer' 
                    />
                }
                <div className={`flex flex-col p-4 w-full rounded-md relative bg-red-100 `}>
                    <div  className='flex gap-5 '>
                        <p className='text-blue-500 font-bold hover:cursor-pointer ' >{com.userName}</p>
                        <p className='text-gray-500' >
                        <ReactTimeAgoUtil date={com.createdAt} locale="vi-VN"/>
                        </p>

                    </div>
                    <div className=' h-auto mt-4  gap-2 '>
                        <span className='text-blue-500  font-medium mr-2' >
                            @{com.refCommentUsername}
                        </span>
                        {com.content}
                    </div>

                    {/* display comment imgGallery */}
                      {com?.imgGallery.length !==0 &&
                      <Fancybox
                        options={{
                          Carousel: {
                            infinite: false,
                          },
                        }}
                      >
                        <div className='flex gap-2 mt-2'>
                        {
                          com?.imgGallery?.map((img,index)=>(
                            <a key={index} data-fancybox="gallery" href={img}>
                              <Image
                                className='rounded-lg object-cover w-28 h-28'
                                alt="image"
                                src={img}
                                width={100}
                                height={100}
                              />
                            </a>
                          ))
                        }
                        </div>
                      </Fancybox>
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

            <div  className='flex  gap-5 ml-10  md:ml-12 mt-2 items-center p-2 '>
                {/* emotion Popup to choose  */}
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

                    <div class="flex absolute gap-2 left-20 -top-12 -translate-x-1/2 mt-2 w-max px-3 py-1 bg-white shadow-lg  text-white text-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <img title='Thích' onClick={()=>handleLike('like')} src='/icon-like.svg' className='w-6 h-6 hover:scale-150 transition ' />
                        <img title='Yêu' onClick={()=>handleLike('love')} src='/icon-love.svg' className='w-6 h-6 hover:scale-150 transition  ' />
                        <img title='Vui' onClick={()=>handleLike('fun')} src='/icon-fun.svg' className='w-6 h-6 hover:scale-150 transition ' />
                        <img title='Buồn' onClick={()=>handleLike('sad')} src='/icon-sad.svg'  className='w-6 h-6 hover:scale-150 transition '/>
                        <img title='Wow' onClick={()=>handleLike('wow')} src='/icon-wow.svg'  className='w-6 h-6 hover:scale-150 transition '/>
                    </div>
                </div>

              
                {/* reply */}
                <p 
                    className='hover:cursor-pointer hover:text-red-500 ' 
                    onClick={()=>setReplyBox(!replyBox)}
                >    
                    Trả lời
                </p>
                
                {/* report comment */}
                <span title='báo xấu' >
                    <FlagIcon 
                        onClick={handleReportComment}
                        className={`text-gray-400 hover:text-red-500 hover:cursor-pointer transition ${reportCommentsId.includes(reply._id)? 'text-red-500':''}  `} />
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
          ))

        }