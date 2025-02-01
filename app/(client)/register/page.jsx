'use client'

import { useState } from 'react'
import React from 'react'
import { useRouter } from 'next/navigation'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Loader from '@/components/Loader';
import { publicRequest } from '@/requestMethod';
import SuccessPopup from '@/components/Popup/SuccessPopup';

const Register = () => { 
  const [registerSuccess, setRegisterSuccess] = useState(false)
  const [notifyPopup, setNotifyPopup] = useState(false)
  const router = useRouter()
  const[username,setUsername]=useState('')
  const [email,setEmail]=useState('')
  const [password1,setPassword1]=useState('')
  const [password2,setPassword2]=useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [emailError, setEmailError] = useState(false)
//test changes
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try{
      const res = await publicRequest.post('/auth/register',{
        username: username,
        email: email,
        password: password1
      })
      
      if(res.data) {
        setRegisterSuccess(true)
      
        // setNotifyPopup(true)
        // setTimeout(()=>{
        //   setNotifyPopup(false)
        //   router.push('/login')
        // }, 1500)
      }
    }catch(err){
      console.log('er',err)
      if(err.response.data.code === 11000){
        setEmailError(true)
      } else{
        setError(true)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleClosePopup = () => {
    setNotifyPopup(false)
  }

  return (
<>
    { registerSuccess === false ?
    <div       
      className={`px-4 sm:px-24 lg:px-48  py-16  flex justify-center h-screen bg-cover bg-center bg-no-repeat 
        bg-[url('https://firebasestorage.googleapis.com/v0/b/adidas-shop-d0636.appspot.com/o/upload%2F1735961275535Giay_Ultraboost_5_trang_ID8810_HM3_hover.avif?alt=media&token=0390b6f6-2c45-47eb-9183-fd45b4741974')]
        ${loading ? 'bg-white opacity-50' : '' } `} 
    > 
      {notifyPopup &&
        <SuccessPopup message={'Đăng kí thành công !'} handleClosePopup={handleClosePopup} />
      }
      <div className='w-full 2xl:w-3/6  h-[600px] z-20 shadow-2xl rounded-md flex flex-col p-4  bg-white'>
        {loading ?  <div className='flex justify-center ' >  <Loader  color={'inherit'} />  </div> : ''}
        
        <p className='font-extrabold text-2xl text-center mt-4' >Đăng kí  </p>
        <form action="" onSubmit={handleSubmit} className='space-y-4 mt-8 ' >
          <input className='w-full p-4 flex justify-center border-2  '  type="text" value={username} required
                  placeholder='Username' name='username' onChange={(e)=>setUsername(e.target.value)} />
          <input className='w-full p-4 flex justify-center border-2  '  type="email" value={email} required
                  placeholder='Email' name='email' onChange={(e)=>setEmail(e.target.value)} />
          <input className='w-full p-4 flex justify-center border-2  '  type="password" value={password1} required 
                  placeholder='Password' name='password' onChange={(e)=>setPassword1(e.target.value)} />
          <input className='w-full p-4 flex justify-center border-2  '  type="password" value={password2} required 
                  placeholder='Nhập lại Password' name='password' onChange={(e)=>setPassword2(e.target.value)} />
          {password1 !== password2 ? <div className='font-bold text-red-500 ' >Password phải giống nhau !</div> :''  }
          <button
                  disabled={password1 !== password2}
                  className={`bg-black p-4 text-center text-white font-bold  w-full transition 
                    ${password1!==password2?'bg-gray-400 hover:cursor-not-allowed text-white':'hover:text-gray-500'}`}  type='submit' >
            Đăng kí
          </button>
          {error && <div className='text-red-500 font-bold'  >Lỗi! Vui lòng thử lại ! </div>   }
          {emailError && <div className='text-red-500 font-bold'  >Email này đã được đăng kí, vui lòng sử dụng email khác !</div>   }
        </form>
        <div className='flex justify-between mt-2' >
          <a href='/login' className='hover:bg-black p-3 hover:text-white   transition' >Đăng nhập tài khoản </a>
          <p className='p-3 hover:scale-110 transition hover:cursor-pointer '  >Quên mật khẩu ?</p>
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
    :
    <div       
    className={`px-4 sm:px-24 lg:px-48  py-16  flex justify-center h-screen bg-cover bg-center bg-no-repeat 
      bg-[url('https://firebasestorage.googleapis.com/v0/b/adidas-shop-d0636.appspot.com/o/upload%2F1735961275535Giay_Ultraboost_5_trang_ID8810_HM3_hover.avif?alt=media&token=0390b6f6-2c45-47eb-9183-fd45b4741974')]
      ${loading ? 'bg-white opacity-50' : '' } `} 
    > 
    {notifyPopup &&
      <SuccessPopup message={'Đăng kí thành công !'} handleClosePopup={handleClosePopup} />
    }
    <div className='w-full 2xl:w-3/6  h-[600px] z-20 shadow-2xl rounded-md flex flex-col p-4  bg-white'>
      {loading ?  <div className='flex justify-center ' >  <Loader  color={'inherit'} />  </div> : ''}
      
      <p className='font-extrabold text-2xl text-center my-4 text-green-500 p-4 bg-green-200 rounded-md ' >Đăng kí thành công (Register successfully)  </p>
      <p className='mb-2' >Vui lòng xác thực email trong hộp thư của bạn trong vòng 24h để hoàn tất việc đăng kí. Nếu quá thời gian này tài khoản sẽ tự động xóa. Xác thực email bằng việc click vào đường link trong hộp thư. </p>
      <p className='mb-5' >Please verify your email address in your email. Unverified account will be deleted after 24 hours. Verifying your email address by clicking on the link we have sent you. </p>
      <div className='flex  justify-center' >
        <hr  className='w-2/5  border-1 ' />
      </div>
      <div className='flex justify-center mt-2' >
        <a href='/login' className=' p-3 hover:text-white text-xl  bg-black text-white hover:bg-gray-600 transition' >Đăng nhập tài khoản </a>
        
      </div>
      <div className='flex justify-between  p-4 ' >
        <span className=' border-black  hover:scale-110  transition ' > 
          <a href="/">
            <KeyboardBackspaceIcon/> Tiếp tục mua sắm 
          </a>
        </span>
        <p className=' hover:scale-110 transition hover:cursor-pointer '  >Quên mật khẩu ?</p>
      
      </div>
    </div>
    </div>
    }
</>
  )
}

export default Register