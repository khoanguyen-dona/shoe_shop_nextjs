'use client'
import { useState } from 'react'
import React from 'react'
import { useRouter } from 'next/navigation'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { publicRequest } from '@/requestMethod';
import { useDispatch }  from 'react-redux'
import { setLogin } from '@/redux/userRedux';
import Loader from '@/components/Loader';
import { setCart } from '@/redux/cartRedux';
import { setWishlist } from '@/redux/wishlistRedux';

const Login = () => { 
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
        dispatch(setLogin(res.data))
        dispatch(setCart(res.data.cart))
        dispatch(setWishlist(res.data.wishlist)) 
        console.log('-->res.data',res.data)
        router.push('/')
      }
    
    } catch(err){
      console.log(err)
      setError(true)
    }   
    setLoading(false)
  }

  return (
    
    <div       
      className="px-4 sm:px-24 lg:px-48  py-16   flex justify-center  
      h-screen bg-cover bg-center bg-no-repeat bg-[url('https://adidas.donawebs.com/wp-content/uploads/2024/11/Giay_Ultraboost_Light_trang_GY9350_HM3_hover-600x600.avif')]" 
    >
      <div className='w-full 2xl:w-3/6  h-[550px] z-20 shadow-2xl rounded-md flex flex-col p-4  bg-white  '>
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
        { loading ? (<Loader   className='fixed top-0  p-8 text-secondary z-20 ' />) :''  }
      </div>
    </div>
   
  )

}


export default Login