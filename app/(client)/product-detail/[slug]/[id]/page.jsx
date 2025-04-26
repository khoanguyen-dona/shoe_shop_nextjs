'use client'
import React from 'react'
import { useParams } from 'next/navigation';

import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

import Image from 'next/image';
import { useState  } from 'react';
import { useEffect } from 'react';
import { FormatCurrency } from '@/utils/FormatCurrency';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { publicRequest } from '@/requestMethod';
import { useDispatch, useSelector } from 'react-redux';
import { setWishlist } from '@/redux/wishlistRedux';
import { userRequest } from '@/requestMethod';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { setCart, addCartItem } from '@/redux/cartRedux';
import Loader from '@/components/Loader';
import SuccessPopup from '@/components/Popup/SuccessPopup';
import FailurePopup from '@/components/Popup/FailurePopup';
import SwiperGallery from '@/components/SwiperGallery';
import Comment from '@/components/Comment';
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from '@/firebase'


const ProductDetail = () => {

    const storage = getStorage(app);
    const [notifyChooseSize, setNotifyChooseSize] = useState(false)
    const [notifyFailure, setNotifyFailure] = useState(false)
    const [notifyPopup, setNotifyPopup] = useState(false)
    const [commentSuccess, setCommentSuccess] = useState(false)

    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.currentUser)
    const user_cart = useSelector((state) => state.cart.userCart)
    const wishlist = useSelector((state) => state.wishlist.userWishlist)
    const wishlistArray = []
    const productId = useParams().id
    
    const [size, setSize]=useState("")
    const [color, setColor]=useState("")
    const [currentProduct, setCurrentProduct] = useState()
    const [product, setProduct]=useState({})

    const [relatedProducts, setRelatedProducts] = useState()
    const [reload, setReload] = useState(false)
    const [reloadGetReportComment, setReloadGetReportComment] = useState(false)
   
    //  add to wishlistArray
    wishlist?.products?.map((item)=> wishlistArray.push(item._id)) 
    const [isFirstRender, setIsFirstRender] = useState(true);

    const [imageGallery , setImageGallery] = useState([])
    const [imageGalleryFile, setImageGalleryFile] = useState([])
    var imageGalleryUrl = []

    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])
    const [hasNextComment, setHasNextComment] = useState(true)
    const [reportCommentsId, setReportCommentsId] = useState([])
    const [limitFileSizeNotify, setLimitFileSizeNotify]= useState(false)
    const [limitImageNotify, setLimitImageNotify] = useState(false)
    const [page, setPage] = useState(2)
    const limit = 5
    const maxImagesInput = 3

    console.log(product.imgGallery)
  const addToWishlist = async (e) => {
    setLoading(true)
    if(user === null ){
      setNotifyFailure(true)
      setLoading(false)
      setTimeout(()=> {
        setNotifyFailure(false)
      }, 3000)

    } else {
    e.preventDefault()
    try {
      const res = await userRequest.post(`/wishlist/${user._id}`, {
        productId: currentProduct._id
      })
      if(res.data){
        dispatch(setWishlist(res.data.wishlist))
        setLoading(false)
        
      }

    } catch(err) {
      console.log(err)
    }
    }
}

console.log(user)
  //handle add to cart
  const addToCart = async (e) => {
    if(size===''){
      setNotifyChooseSize(true)
      setTimeout(()=>{
        setNotifyChooseSize(false)
      }, 3000)
    } else {
      setLoading(true)
      //add to cart when user not logged in
      if( user === null) {
        if (user_cart === null ){  
          let cart = {
            userId: null,
            products:[{
              productId: currentProduct._id,
              name: currentProduct.name,
              thumbnail: currentProduct.thumbnail,
              price: currentProduct.price,
              size: size,
              color: currentProduct.color[0],
              quantity: 1
              }
            ]
          }
          dispatch(setCart(cart))   
          setLoading(false)
          setNotifyPopup(true)
              setTimeout(()=> {
                setNotifyPopup(false)
              }, 3000)
        } 
          
        else {     
          let prod = {
            productId: currentProduct._id,
            name: currentProduct.name,
            thumbnail: currentProduct.thumbnail,
            price: currentProduct.price,
            size: size,
            color: currentProduct.color[0],
            quantity: 1
          }
          dispatch(addCartItem(prod))
          setLoading(false)
          setNotifyPopup(true)
          setTimeout(()=> {
            setNotifyPopup(false)
          }, 3000)       
        }
        
      //add to cart when user logged in
      } else {
        e.preventDefault()
        try{
          const res = await userRequest.post(`/cart/${user._id}`, {
            productId: currentProduct._id,
            name: currentProduct.name,
            quantity: 1,
            color: currentProduct.color[0], 
            size: size         
          }) 
          if(res.data){
            dispatch(setCart(res.data.cart))
            setLoading(false)
            setNotifyPopup(true)
            setTimeout(()=> {
              setNotifyPopup(false)
            }, 3000)
          }

        }catch(err){
          console.log(err)
        }
      }
    }
      
  }

  //fetch product data by id
    useEffect(()=> {
      const getProduct = async () => {
      
        try {
          const res = await publicRequest.get(`/product/${productId}`)
          if(res.data) {  
            setProduct(res.data)
            setCurrentProduct(res.data)
            setColor(res.data.color[0])
            try {
              const res2 = await publicRequest.get(`/product/find/${res.data.name}?page=1&limit=30`)
              if(res2.data){
                setRelatedProducts(res2.data.products)                       
              }
    
            } catch(err){
              console.log('err while fetching colorOptions',err)
            }
            
            setLoading(false)
          }
        } catch(err) {
          console.log('err while fetch product data',err)
        }
      };
      getProduct();
      
    }, [])

  // fetch product data when click color
    useEffect (() => {
      if(isFirstRender){
        setIsFirstRender(false);
        return;
      } 

      setLoading(true)
      const getProduct = async () => {
        try {
          const res = await publicRequest.get(`/product/find/${product.name}?color=${color}`)
          if(res.data){
            setCurrentProduct(res.data.products[0])
            setProduct(res.data.products[0])           
          }

        } catch(err){
          console.log('err while fetching colorOptions',err)
        } finally {
          setLoading(false)
        }
      }
      getProduct()
    }, [reload])

  // fetch comments first time
  useEffect (() => {
    const getComment = async () => {
      try {
        const res = await publicRequest.get(`/comment/${productId}?type=thread&limit=${limit}&page=1`)
        if(res.data){
          console.log(res.data)
          setComments(res.data.replyData)
        }
      } catch(err) {
        console.log('error while fetch comments type thread',err)
      } finally {
        
      }
    }
    getComment()
  }, [])

  //fetch reportComments 
  useEffect (()=> {
    const getReportComments = async () =>{
      try {
        const reportCommentArray = []
        const res = await userRequest.get(`/report-comment/${user._id}?productId=${productId}`)
        if(res.data){
          res.data.reportComments.map((reportComment)=>{
            reportCommentArray.push(reportComment.commentId)
          })
          setReportCommentsId(reportCommentArray)

        }
      } catch(err){
        console.log('error loading reportComments',err)
      } finally {
        
      }
    }
    getReportComments()
  },[reloadGetReportComment])


  console.log(reportCommentsId)

  // fetch more comments when user click on 'see more comments' button
  const fetchMoreComment = async () => {
      try {
        setLoading(true)
        const res = await publicRequest.get(`/comment/${productId}?type=thread&limit=${limit}&page=${page}`) 
        if(res.data){
          res.data.replyData.map((c)=>{
            comments.push(c)
          })  
          console.log(res.data)
          if(res.data.hasNext===false){
            setHasNextComment(false)
          }
        }
      } catch(err) {
        console.log('error while fetch more comment type thread',err)
      } finally {
        setPage(prev => prev+1)
        setLoading(false)
      }
  
  }

  console.log(page)
   
  const handleColorClick = (p) => {
    setCurrentProduct(p)
    setColor(p.color[0])
    setReload(!reload)
  }
  // close the popup
  const handleClosePopup = () => {
    setNotifyPopup(false)
  }

  const handleCloseFailurePopup =  () => {
    setNotifyFailure(false)
    setNotifyChooseSize(false)
  }

  const handleSendComment = async () => {
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

  // const checkFileSize = async (files) =>{
      
  // }
  
  console.log(imageGallery)
  console.log(imageGalleryFile)

  // handle delete image gallery
  const handleRemoveImageGallery = (index) => {
      const imgs=imageGallery.filter((img, i) => i !== index)
      const files = imageGalleryFile.filter((img, i)=> i !==index)
      setImageGallery(imgs)
      setImageGalleryFile(files)
  }

 console.log(comments.length)

  return (

    <div className={` px-4 md:px-8  xl:px-32  mb-20 ${loading?'bg-white opacity-50':''} `} >
     {loading ?  <div className='flex justify-center  ' >  <Loader  color={'inherit'} />  </div> : ''}
     {notifyFailure &&
                <FailurePopup  message={'Đăng nhập để sử dụng chức năng này'} handleClosePopup = {handleCloseFailurePopup} />
     }
     {notifyChooseSize &&
                <FailurePopup  message={'Vui lòng chọn size'} handleClosePopup = {handleCloseFailurePopup} />
     }
     {notifyPopup ? 
            
                <SuccessPopup  message={'Thêm thành công!'}  handleClosePopup={handleClosePopup}   /> 
             : '' }
      {commentSuccess ? 
            
            <SuccessPopup  message={'Bình luận thành công!'}  handleClosePopup={handleClosePopup}   /> 
         : '' }
      <div className='flex flex-col  xl:flex-row  mt-20  ' >
        {/* product image gallery */}
        <div className='w-full h-full xl:w-3/6 2xl:w-3/6  ' > 
          <SwiperGallery  product_images={product?.imgGallery} />
       
        </div>

        {/* product short desciption */}
        <div className='w-full  xl:w-2/5 2xl:w-3/6 xl:px-8   py-5  space-y-4' >
          <div className='text-4xl font-bold' > {product?.name}</div>
          <div className='text-2xl font-bold' > {FormatCurrency(product?.price)} đ </div>
          <div> {product?.desc}</div>
          <hr className='border-2 border-gray-300' />
          {/* size */}
          <div className='font-bold' > 
            Size : {size} 
          </div>
          {/* product.size option */}
          {String(currentProduct?.size).length === 0  ? '' :
            <div className='  flex flex-wrap  '>
              
              {currentProduct?.size?.map((s,index)=>(
                  <span 
                    key={index}
                    onClick={()=>setSize(s)}
                    className = {` border-gray-400 border-4 font-bold  text-center transition rounded py-2 ml-1 mt-1 w-20 h-12 hover:border-gray-500
                      ${s===size?'bg-black  border-gray-900 text-white ':''} `} 
                  >
                    {s}
                  </span>
                )) 
              }
            </div> 
          }            

          {/* color  option */}
          <div className='font-bold' >
            Color : {color}
          </div>
          <div className='flex flex-swap  ' >       

              {relatedProducts?.map((product,index)=>(
              <div className='flex flex-col ml-1 mt-1' key={index}>
                <div>   
                  <Image 
                    width={80} height={80} 
                    onClick={()=>handleColorClick(product)}
                    
                    className={`object-cover   font-bold hover:border-gray-500 hover:border-4 transition rounded 
                      border-4  ${product.color[0]===color?'border-black border-4':'' } `}
                      
                    src={product.thumbnail} alt="" >       
                  </Image>
                  </div>
                  <div className='flex justify-center font-semibold ' >
                    <p>{product.color[0]}</p>
                  </div>
              </div>
            ))}
          </div>
          {/* add to cart */}
          <hr className='border-2 border-gray-300 '/>
          <div className='flex  ' >   
              <button 
                  onClick={addToCart}
                  className='bg-black text-white font-bold text-xl md:text-2xl p-4 md:p-4  w-full hover:text-gray-500 transition ' >
                    Thêm vào giỏ hàng
              </button>
        
          </div>
          
         
         <button  
              onClick = {addToWishlist}
              className='p-2 py-2 md:px-5 border-gray-400 ml border-4 hover:border-gray-black hover:border-black transition ' >
                 {wishlistArray.includes(currentProduct?._id) ? <FavoriteIcon sx={{fontSize:40}} />  : <FavoriteBorderIcon sx={{fontSize:40}} />}
           
            <span className='font-bold text-xl ml-2' >
            {wishlistArray.includes(currentProduct?._id) ? 'Đã thêm vào wishlist'  : 'Thêm vào wishlist' }
            </span> 
          </button> 
         
            
        </div>

      </div>

      <div className='border-b-4 mt-2 border-gray-300 mx-4 lg:mx-72 ' ></div>

      {/* Product description  */}
      <div className='mt-10' >
            <h1 className='text-4xl font-bold text-center' >  Mô tả</h1>
            <p>{currentProduct?.desc}</p>
      </div>

      <div className='border-b-4 mt-8 border-gray-300  mx-4 lg:mx-72  ' ></div>

      {/* Comment box */}
      <div className='h-auto flex flex-row gap-2 mt-4' >
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
                    disabled={comment.trim()===''}
                    title='Gửi bình luận'
                    onClick={handleSendComment}
                    className={`text-white flex gap-2 h-[50px] bg-blue-500 justify-center mt-2 items-center transition p-3 md:p-5 rounded-md
                      ${comment.trim()===''?'bg-gray-500 hover:bg-gray-500':'hover:bg-blue-600'}  `} 
                  >
                    <SendIcon/>    
                    Send
                </button>
              </div>

            </div>
            
      </div>

      {/* Comments of other */}
      
        {comments?.map((c, index)=>(
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
          />
        ))}
    

      {
        hasNextComment && comments.length!==0  ?
        <div 
          onClick={fetchMoreComment}
          className='p-4 text-lg bg-gray-200 text-black-500 mt-10 hover:bg-gray-300 hover:text-white  transition hover:cursor-pointer  flex font-semibold justify-center' >
          Xem thêm bình luận
        </div> : comments.length===0 ? 
        <div className='p-4 bg-gray-200 text-xl font-semibold mt-4 rounded-lg text-center' >Không có bình luận nào ! </div> : ''
      }
      
    
    </div>
 
  )
}

export default ProductDetail