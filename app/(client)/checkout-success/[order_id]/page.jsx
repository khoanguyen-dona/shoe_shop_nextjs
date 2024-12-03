'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import { FormatCurrency } from '@/utils/FormatCurrency'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { userRequest } from '@/requestMethod';
import { useEffect, useState } from 'react';
import { format } from 'date-fns' 

const CheckoutSuccess = () => {

  const order_id = useParams().order_id
  const [order, setOrder] = useState({})

 


  const products = order?.products
  useEffect (()=> {
    const getOrder = async () => {
      try{
        const res = await userRequest.get(`/order/${order_id}`) 
        
        if(res.data) {
        
          setOrder(res.data)   
        }
      }catch(err){}  
    }
    getOrder();
  }, [])
  
  return (
    <div className='px-4 lg:px-24 2xl:px-96 flex flex-col mt-20 ' >
      <div className='font-extrabold text-3xl text-center' >
        Checkout
      </div>

      <div className='bg-green-300 p-4 rounded w-full mt-20 ' >
        <CheckCircleOutlineIcon fontSize='large'  className='text-green-500   mr-1 ' />Cảm ơn bạn. Đơn hàng của bạn đã được nhận .
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 p-4 border mt-4 '  >
        <div className='mb-0 lg:mb-4 ' >
          Mã đơn hàng: <span className='font-bold' >{order_id}</span>
        </div>
        <div>
          Ngày: <span className='font-bold' > 
         {format(Date(), "yyyy-MMMM-do-eeee-hh:mm:ss a")};</span> 
        </div>
        <div>
          Tổng cộng: <span className='font-bold' >{FormatCurrency(order.total)} đ</span>
        </div>
        <div>
          Phương thức thanh toán: <span className='font-bold' >{order.paymentMethod} </span>
        </div>
      </div>

      <div className='font-bold my-6 text-xl ' >
        Chi tiết đơn hàng
      </div>

      <div className='flex my-4 justify-between font-semibold ' >
        <div className='' >
          Sản phẩm
        </div>
        <div className='' >
          Tổng 
        </div>
      </div>

      <hr  className='border-[1px] border-black' />
      {/* product card */}
      { products?.map((item, index) => 
      <div className='flex justify-between py-2 ' key={index}  >
        <div className=' object-cover flex  ' >
          <img  className='mr-1 w-32' src={item.thumbnail} alt="" />
          <div className='' >
            <p>{item.name}</p>
            <p>Size : {item.size}</p>
          </div>
          <div className='ml-5 ' >
            X {item.quantity}
          </div>
        </div>
        <div className='' >
          {FormatCurrency(item.price*item.quantity)} đ
        </div>     
      </div>
      )}
      <hr />
      
      <hr />

      <div className='flex justify-between font-semibold my-4' >
        <p>Phương thức thanh toán</p>
        <p>{order.paymentMethod}</p>
      </div>

      <hr />

      <div className='flex justify-between font-extrabold my-4' > 
        <p>Tổng cộng :</p>
        <p>{FormatCurrency(order.total)} đ </p>
      </div>

      <div className='font-bold text-xl mt-4' >Địa chỉ thanh toán</div>
      <div className='border-2 border-dashed flex flex-col p-4 mt-4 rounded ' >
        <p>Họ tên: {order.clientName}</p>
        <p>Địa chỉ: {order.address}</p>
        <p>Sđt: {order.phoneNumber}</p>
        <p>Email : {order.email}</p>
      </div>
      <a href="/" className='w-64  p-2  bg-black text-white hover:text-gray-500 transition mt-2' >
        <KeyboardBackspaceIcon className='mr-4' fontSize='large' />Tiếp tục mua sắm</a>
    </div>

   
  )
}

export default CheckoutSuccess