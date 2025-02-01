'use client'
import { useState } from 'react'
import React from 'react'
import { useRouter } from 'next/navigation'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { publicRequest } from '@/requestMethod';
import { useDispatch }  from 'react-redux'
import { setUser } from '@/redux/userRedux';
import Loader from '@/components/Loader';
import { setCart } from '@/redux/cartRedux';
import { setWishlist } from '@/redux/wishlistRedux';
import SuccessPopup from '@/components/Popup/SuccessPopup';


const Login = () => { 
  const [notifyPopup, setNotifyPopup] = useState(false)
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try{
      const res = await publicRequest.post('/auth/login', {
        email: email ,
        password: password
      })

      if (res.data) {
        dispatch(setUser(res.data))
        dispatch(setCart(res.data.cart))
        dispatch(setWishlist(res.data.wishlist)) 
       
        router.push('/')
        setLoading(false)
        setNotifyPopup(true)
      }
    
    } catch(err){
      console.log(err)
      setError(true)
      setLoading(false)
    }   
    
  }
  const handleClosePopup = () => {
    setNotifyPopup(false)
  }

  const handleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`
  }

  return (
    
    <div       
      className={`px-4 sm:px-24 lg:px-48  py-16   flex justify-center  ${loading ?'bg-white opacity-50':''}
      h-screen bg-cover bg-center bg-no-repeat bg-[url('https://firebasestorage.googleapis.com/v0/b/adidas-shop-d0636.appspot.com/o/upload%2F1735961275535Giay_Ultraboost_5_trang_ID8810_HM3_hover.avif?alt=media&token=0390b6f6-2c45-47eb-9183-fd45b4741974')] `} 
    >
      {notifyPopup &&
        <SuccessPopup message={'Redirecting... Please wait !'} handleClosePopup={handleClosePopup} />
      }
      <div className='w-full 2xl:w-3/6  h-[550px] z-20 shadow-2xl rounded-md flex flex-col p-4  bg-white  '>
      {loading ? 
         <div className='flex justify-center' >  <Loader  color={'inherit'} />  </div> 
         : ''}
        <p className='font-extrabold text-2xl text-center mt-4' >Đăng nhập</p>
        <form action="" onSubmit={handleSubmit} className='space-y-4 mt-8 ' >
          <input className='w-full p-4 flex justify-center border-2  '  type="email" value={email} required
                  placeholder='Email' name='email' onChange={(e)=>setEmail(e.target.value)} />
          <input className='w-full p-4 flex justify-center border-2  '  type="password" value={password} required 
                  placeholder='Password' name='password' onChange={(e)=>setPassword(e.target.value)} />
        
            <button className={`bg-black p-4 text-center text-white font-bold hover:text-gray-500 w-full transition 
                '  type='submit'  ${loading ?"cursor-not-allowed":""}  `}>
              Đăng nhập  
            </button>
            <div className='flex justify-center' >
            <button 
                onClick = {handleLogin}
                className='border-[2px] p-2  hover:bg-black hover:text-white transition border-gray-300 w-2/5  ' >
                <span className=' text-md mr-4 ' >
                  Đăng nhập với 
                </span>
                <span className='font-bold text-3xl' >
                  <span className='text-blue-500' >G</span>
                  <span className='text-red-500' >O</span>
                  <span className='text-yellow-500' >O</span>
                  <span className='text-blue-500' >G</span>
                  <span className='text-green-500' >L</span>
                  <span className='text-red-500' >E</span>
                  </span>
              </button>
            </div>
        
        </form>

        {err ? (<span className='text-red-500 text-md mt-4  z-20' > Sai username hoặc password </span>) : ''
        }

        <div className='flex justify-between mt-4' >
          <a href='/register' className='hover:bg-black p-3 hover:text-white   transition' >Đăng kí tài khoản </a>
          <p className='p-3 hover:scale-110 transition '  >Quên mật khẩu ?</p>
        </div>
        <div className='flex justify-start  p-4 ' >
          <span className=' border-black  hover:scale-110  transition ' > 
            <a href="/">
              <KeyboardBackspaceIcon/> Tiếp tục mua sắm 
            </a>
          </span>
        
        </div>
  
      </div>
    </div>
   
  )

}


export default Login