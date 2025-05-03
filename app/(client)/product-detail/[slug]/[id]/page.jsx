'use client'
import React from 'react'
import { useParams } from 'next/navigation';
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
import CommentBox from '@/components/CommentBox';
import Fancybox from '@/components/Fancybox';
import Carousel from '@/components/Carousel';
import { useRouter } from 'next/navigation';
import JoditViewer from '@/components/JoditViewer';

const ProductDetail = () => {
    const router = useRouter()
    const [loginRecommendPopup, setLoginRecommendPopup] = useState(false)
    const [commentSuccess, setCommentSuccess] = useState(false)
    const [notifyChooseSize, setNotifyChooseSize] = useState(false)
    const [notifyFailure, setNotifyFailure] = useState(false)
    const [notifyPopup, setNotifyPopup] = useState(false)
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
    const [reloadGetReportComment, setReloadGetReportComment] = useState(false)
    //  add to wishlistArray
    wishlist?.products?.map((item)=> wishlistArray.push(item._id)) 
    // const [isFirstRender, setIsFirstRender] = useState(true);
    const [comments, setComments] = useState([])
    const [hasNextComment, setHasNextComment] = useState(false)
    const [reportCommentsId, setReportCommentsId] = useState([])
    const [reload, setReload] = useState(false)
    const [page, setPage] = useState(2)
    const limit = 5
  
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
    // useEffect (() => {
    //   if(isFirstRender){
    //     setIsFirstRender(false);
    //     return;
    //   } 

    //   setLoading(true)
    //   const getProduct = async () => {
    //     try {
    //       const res = await publicRequest.get(`/product/find/${product.name}?color=${color}`)
    //       if(res.data){
    //         setCurrentProduct(res.data.products[0])
    //         setProduct(res.data.products[0])           
    //       }

    //     } catch(err){
    //       console.log('err while fetching colorOptions',err)
    //     } finally {
    //       setLoading(false)
    //     }
    //   }
    //   getProduct()
    // }, [reload])

  // fetch comments first time
  useEffect (() => {
    const getComment = async () => {
      try {
        const res = await publicRequest.get(`/comment/${productId}?type=thread&limit=${limit}&page=1`)
        if(res.data){
          setComments(res.data.replyData)
          setHasNextComment(res.data.hasNext)
        }
      } catch(err) {
        console.log('error while fetch comments type thread',err)
      } finally {
        
      }
    }
    getComment()
  }, [reload])

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

  // fetch more comments when user click on 'see more comments' button
  const fetchMoreComment = async () => {
      try {
        setLoading(true)
        const res = await publicRequest.get(`/comment/${productId}?type=thread&limit=${limit}&page=${page}`) 
        if(res.data){
          res.data.replyData.map((c)=>{
            comments.push(c)
          })  
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

  const handleColorClick = (p) => {
    // setCurrentProduct(p)
    // setColor(p.color[0])
    // setReload(!reload)
    router.push(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/product-detail/${p.name.trim().split(' ').join('-')}/${p._id}`)
  }
  // close the popup
  const handleClosePopup = () => {
    setNotifyPopup(false)
    setCommentSuccess(false)
  }

  const handleCloseFailurePopup =  () => {
    setNotifyFailure(false)
    setNotifyChooseSize(false)
  }


  return (
    <>
      {/* if user not logged in , this will popup to recommend they go register  */}
        {loginRecommendPopup &&        
            <>
                <div className={`fixed w-screen h-screen bg-black opacity-70  left-0 top-0 z-20 `}>      
                </div>
        
                <div className=' flex justify-center items-center  ' >
                  <div className='bg-white fixed flex flex-col rounded-lg z-30 w-5/6 md:w-2/3 xl:w-1/3  h-auto top-1/4   p-4 gap-5 ' >          
                    <div className='flex justify-end'>
                      <CloseIcon className='hover:cursor-pointer text-gray-400  hover:text-red-500' fontSize='large' onClick={()=>setLoginRecommendPopup(false)} />
                    </div>
                    <div  className='text-center font-bold text-2xl' >
                      Đăng nhập để bình luận !
                    </div>
                    <div className='flex justify-center  space-x-5 mt-4 ' >
                      <a href='/login' className='rounded-lg p-4 border-2 md:text-2xl bg-black text-white hover:bg-gray-600  transition font-semibold' >
                        Đăng nhập
                      </a>
                      <a href='/register'  className='rounded-lg p-4 border-2 md:text-2xl hover:bg-gray-500 hover:text-white transition font-semibold'>
                        Đăng kí
                      </a>
                    </div>
                      
                  </div>
                </div>
            </>
            }

      {/* content of page */}
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
        
        <div className='flex flex-col  xl:flex-row  mt-20  ' >
          {/* product image gallery */}
            {/* <div className='w-full h-full xl:w-3/6 2xl:w-3/6  ' > 
              <SwiperGallery  product_images={product?.imgGallery} />
          
            </div> */}

          {/* product image gallery with fancybox library */}
          <div className='w-full h-full xl:w-3/6 2xl:w-3/6  ' > 
            <Fancybox
              options={{
                Carousel: {
                  infinite: false,
                },
              }}
            >
              <Carousel
                options={{ infinite: false }}
              >
                {product?.imgGallery?.map((img,index)=>(
                  <div
                    key={index}
                    className="f-carousel__slide"
                    data-fancybox="gallery"
                    data-src={img}
                    data-thumb-src={img}                
                  >
                    <Image
                      className='object-cover w-full '
                      alt="image"
                      src={img}
                      width={400}
                      height={400}
                    />
                  </div>
                ))}
              </Carousel>
            </Fancybox>
          </div>

          {/* product short desciption */}
          <div className='w-full  xl:w-2/5 2xl:w-3/6 xl:px-8   py-5  space-y-4' >
            <div className='text-4xl font-bold' > {product?.name}</div>
            <div className='text-2xl font-bold' > {FormatCurrency(product?.price)} đ </div>
            <JoditViewer data={currentProduct?.desc.split(/\s+/).slice(0, 100).join(' ')}  />
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
                <div className='flex flex-col ml-1 mt-1 hover:cursor-pointer' key={index}>
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

        <JoditViewer data={currentProduct?.desc}  />
      
        {/* Comment box */}
        <CommentBox user={user} productId={productId} setCommentSuccess={setCommentSuccess} commentSuccess={commentSuccess} loading={loading} setLoading={setLoading}
                    handleClosePopup={handleClosePopup} setLoginRecommendPopup={setLoginRecommendPopup} reload={reload} 
                    setReload={setReload} reportCommentsId={reportCommentsId} setReloadGetReportComment={setReloadGetReportComment}
                    reloadGetReportComment={reloadGetReportComment} />
           
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
              setLoginRecommendPopup={setLoginRecommendPopup}
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
    </>
  )
}

export default ProductDetail