'use client'
import { FormatCurrency } from '@/utils/FormatCurrency'
import React from 'react'

import { useState } from 'react';
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRouter } from 'next/navigation';
import { useSelector,useDispatch } from 'react-redux';
import { userRequest, publicRequest } from '@/requestMethod';
import { setCart } from '@/redux/cartRedux';
import Loader from '@/components/Loader';
import SuccessPopup from '@/components/Popup/SuccessPopup';
import axios from 'axios';
import FailurePopup from '@/components/Popup/FailurePopup';

const Checkout = () => {
  const [notifyFailure, setNotifyFailure] = useState(false)
  const [redirectPopup, setRedirectPopup] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector((state)=>state.user.currentUser)
  const cart = useSelector((state)=>state.cart.userCart)
  const [loading, setLoading]=useState(false)
 
  const products = cart?.products
  const router = useRouter()
  const [error, setError]=useState('')
  const errorMessage = ' Please try again'
  const [messageOption, setMessageOption]= useState(false)
  // calculate total price
  const totalPrice = products?.reduce((total, item) => {
    const { price, quantity } = item;
    
    return total + price * quantity;
  }, 0);

  const[firstName, setFirstName]=useState('')
  const[lastName, setLastName]=useState('')
  const[email, setEmail]=useState('')
  const[address, setAddress]=useState('')
  const[phoneNumber, setPhoneNumber]=useState('')
  const[paymentMethod, setPaymentMethod]=useState('')
  const[message,setMessage]=useState('')
console.log('cart--',cart)
  const handleSubmit = async (e) => { 
    e.preventDefault()
    if (cart?.products?.length===0 || cart===null){   
      setNotifyFailure(true)
      setTimeout(()=>{
        setNotifyFailure(false)
      }, 5000)
    }else {
      setLoading(true)

      if( user === null){
        try{
          const res = await publicRequest.post(`/order/null`, {
            clientName: firstName+' '+ lastName,
            products: products,
            phoneNumber: phoneNumber,
            address: address,
            email: email,
            paymentMethod: paymentMethod,
            message: message
          })
          if(res.data){
            setRedirectPopup(true)
            dispatch(setCart(null))
            router.push(`/checkout-success/${res.data.order._id}`);      
            setLoading(false)

            axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/send-email/send-order-verification`, {
              customerEmail: email,
              orderDetails: products
            }).then(()=>{
              console.log('send order email success')
            }).catch(()=>{
              console.log('fail to send order email')
            })
          } 
          else {
            setError(true)
          }
          
        }catch(err){console.log('err while create order',err)}

      } else {    
        
        try{
          const res = await userRequest.post(`/order/${user._id}`, {
            clientName: firstName+' '+ lastName,
            products: products,
            phoneNumber: phoneNumber,
            address: address,
            email: email,
            paymentMethod: paymentMethod,
            message: message
          })
          if(res.data){
            setRedirectPopup(true)
            userRequest.post(`/cart/${user._id}/reset-cart`,{});
            router.push(`/checkout-success/${res.data.order._id}`);      
            dispatch(setCart(null))
            setLoading(false)

            axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/send-email/send-order-verification`, {
              customerEmail: email,
              orderDetails: products
            }).then(()=>{
              console.log('send order email success')
            }).catch(()=>{
              console.log('fail to send order email')
            })
          } 
          else {
            setError(true)
          }
          
        }catch(err){
          console.log(err)
        }

      }
    }
  }


  const handleClickMessage = () => {
    setMessageOption(prev=>!prev)
  }

  const handleClosePopup = () => {
    setRedirectPopup(false)
  }
  const handleCloseFailurePopup =  () => {
    setNotifyFailure(false)
  }

  return (
    <>
    {notifyFailure &&
                <FailurePopup  message={'Giỏ hàng của bạn trống'} handleClosePopup = {handleCloseFailurePopup} />
     }
    {redirectPopup && 
      <SuccessPopup message={'Redirecting ... please wait'} handleClosePopup={handleClosePopup} />
    }
    {loading ?  <div className='flex justify-center  ' >  <Loader  color={'inherit'} />  </div> : ''}
    <div  className={` px-4 sm:px-4  xl:px-48 flex flex-col sm:flex-col lg:flex-row mt-20 mb-30 
      ${loading?'bg-white opacity-50':''}  `} >  

      {/* left col */}
      <div className=' w-full  lg:w-2/3  flex flex-col p-2 sm:p-20  ' >
        <p className='text-center font-bold text-3xl  ' >CHECKOUT</p>
        <form action="" className='space-y-10' onSubmit={handleSubmit} >
          <div className='space-y-2' >
            <p className='font-bold mt-10' >Thông tin liên lạc</p>
            <p className='text-sm' >Chúng tôi sẽ sử dụng email này để gửi cho bạn chi tiết và cập nhật về đơn hàng của bạn.</p>
            <input 
              className='border-2 w-full p-3'
              type="email" 
              placeholder='Địa chỉ email' 
              name='email' 
              required  
              onChange={(e)=>setEmail(e.target.value)}
            />
              
          </div>

          <div className='space-y-2' >
            <p className='font-bold ' >Địa chỉ thanh toán</p>
            <p>Nhập địa chỉ thanh toán khớp với phương thức thanh toán của bạn.</p>
            <div className='flex justify-between ' >       
              <input 
                className='border-2 w-full p-3'
                type="text" 
                placeholder='Tên' 
                name='firstName' 
                required  
                onChange={(e)=>setFirstName(e.target.value)}
              />
              <input 
                className='border-2 w-full p-3 ml-2'
                type="text" 
                placeholder='Họ' 
                name='lastName' 
                required 
                onChange={(e)=>setLastName(e.target.value)}
              />
            </div>

            <input 
                className='border-2 w-full p-3 '
                type="text" 
                placeholder='Địa chỉ' 
                name='address' 
                required  
                onChange={(e)=>setAddress(e.target.value)}
            />
            
            <input 
                className='border-2 w-full p-3 '
                type="number" 
                placeholder='Số điện thoại' 
                name='phoneNumber' 
                required  
                onChange={(e)=>setPhoneNumber(e.target.value)}
            />
          </div>

          <div className='space-y-2 flex flex-col ' >
            <p className='font-bold' >Tùy chọn thanh toán</p>
            <label>
              <input    
                type='radio' value="COD" name='paymentMethod' onChange={(e)=>setPaymentMethod(e.target.value)} 
              />
              <span className='ml-3' >COD (Thanh toán khi nhận hàng) </span>
            </label>
            <label>
              <input  
                type='radio' value="CARD" name='paymentMethod' onChange={(e)=>setPaymentMethod(e.target.value)} 
              />
              <span className='ml-3' >CARD (Thanh toán bằng thẻ) </span>
            </label>
            <p  className='text-red-500' >Lưu ý : Hiện tại cửa hàng chỉ hỗ trợ COD</p>
          </div>

          <input onClick={handleClickMessage}  className='mr-1' type="checkbox"  />Thêm ghi chú
          {messageOption && 
            <textarea  
              className='border-2 border-gray500 w-full h-[200px]'   
              name="message" id=""
              placeholder='  Nhập ghi chú'
              onChange={(e)=>setMessage(e.target.value)}
            >       
            </textarea>
              
          }
          <hr   />
          <p>Bằng cách tiến hành mua hàng, bạn đồng ý với Điều khoản và điều kiện và Chính sách bảo mật của chúng tôi</p>
          
          <button 
            type='submit'
            
            className={`  p-4  w-full bg-black text-white font-bold hover:text-gray-400 transition mt-2 
              ${loading ? 'cursor-not-allowed' : '' }`} 
          >                   
                Đặt hàng                             
          </button>
          {error ? 
          <span className='text-red-500'  >
          {errorMessage}  
          </span>
          : '' }
       
        </form>

      </div>
      {/* right col */}
      <div className='sticky top-0 w-full h-full mt-20 lg:w-1/3 p-2 border-gray-300 border-[1px] flex flex-col ' >
          <div className='font-bold text-center mb-5' >Tóm tắt đơn hàng</div>
          { products?.map((product, index) => 
          <div className='flex  mb-5 justify-between ' key={index} >
            <div className='w-1/5 mr-1 ' >
              <img className='object-cover' src={product.thumbnail} alt="" />
            </div> 
            <div className='w-3/5 flex flex-col ' >
              <p>{product.name}</p>
              <p>{FormatCurrency(product.price)} đ</p>
              <p>Size : {product.size} </p>
              <p>Số lượng : {product.quantity}</p>
            </div>
            <div className='font-bold' >
              <span> {FormatCurrency(product.quantity*product.price)}đ </span>
            </div>
          </div>
          )}
          
          
          <Accordion className='mt-5' sx={{boxShadow:'none'}}  >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <p>Voucher</p>
            </AccordionSummary>
            <AccordionDetails>
              <div className='flex ' >
                <input type="text" placeholder='Nhập mã voucher' className='w-2/3  border-2 border-gray-300 p-4'  />
                <button className='w-1/3 bg-black text-white ml-1 hover:text-gray-500 transition' >
                  OK
                </button>
              </div>
            </AccordionDetails>
          </Accordion>

          <hr  className='mb-5' />

          <div className='flex justify-between' >
            <div className='font-bold' >
              Tổng
            </div>           
            <div className='font-bold' >
              {FormatCurrency(totalPrice)} đ
            </div>
          </div>
         

      </div>
    </div>
  </>
  )
}
 


export default Checkout