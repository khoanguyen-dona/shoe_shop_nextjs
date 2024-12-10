'use client'

import React from 'react'
import { useState } from 'react'



const OrderDetail = () => {

    const[clientName,setClientName]=useState('Nguyen Anh KHoa')
    const[date,setDate]=useState('22/11/2024 4:47pm')
    const[status,setStatus]=useState('processing')
    const[total,setTotal]=useState(9200000)
    const[paymentMethod,setPaymentMethod]=useState('COD')
    const[email,setEmail]=useState('khoa.nguyen.anh8796@gmail.com')
    const[phoneNumber,setPhoneNumber]=useState('0566548546')
    const[address,setAddress]=useState('293/19 bàu cát, p12, q.Tân Bình, tp.HCM')
    const[message,setMessage]=useState('Giao ban ngày,đừng giao ban đêm')

  return (
    <div className='mt-20  flex flex-col ' >
        <div className='text-3xl font-bold  '>
            Order Detail  
        </div>
        <form action="" className='space-y-4 flex flex-col mt-10  ' >
            <div>           
                <p className='text-sm text-gray-500 '>Order ID</p>
                <input  className='w-2/3 border-2 p-2 bg-gray-200'  type="text" value={'O-321312'} 
                    disabled  />
            </div>

            <div>
                <p className='text-sm text-gray-500 '>Tên khách hàng </p>
                <input  className='w-2/3 border-2 p-2 '  type="text" value={clientName} 
                    onChange={(e)=>setClientName(e.target.value)}  />
            </div>

            <div>
            <p className='text-sm text-gray-500'>Ngày đặt hàng</p>
                <input  className='w-2/3 border-2 p-2 '  type="text" value={date} 
                    onChange={(e)=>setDate(e.target.value)}  />
            </div>

            <div>
                <p className='text-sm text-gray-500'>Trạng thái</p>
                <select name="" id="" value={status} onChange={(e)=>setStatus(e.target.value)}  className='border-2 p-1 rounded-sm' >
                    <option value='Processing'>Processing</option>
                    <option value="On Delivery">On delivery</option>
                    <option value="Finish">Finish</option>
                </select> 
            </div>

            <div>
            <p className='text-sm text-gray-500'>Tổng cộng(Vnđ) </p>
                <input  className='w-2/3 border-2 p-2 '  type="text" value={total} 
                    onChange={(e)=>setTotal(e.target.value)}  />
                
            </div>

            <div>
                <p className='text-sm text-gray-500'>Phương thức thanh toán</p>
                <input  className='w-2/3 border-2 p-2 '  type="text" value={paymentMethod} 
                    onChange={(e)=>setPaymentMethod(e.target.value)}  />
            </div>

            <div>
            <p className='text-sm text-gray-500'>Email khách hảng</p>
                <input  className='w-2/3 border-2 p-2 '  type="email" value={email} 
                    onChange={(e)=>setEmail(e.target.value)}  />
            </div>

            <div>
            <p className='text-sm text-gray-500'>Số điện thoại liên hệ</p>
                <input  className='w-2/3 border-2 p-2 '  type="number" value={phoneNumber} 
                    onChange={(e)=>setPhoneNumber(e.target.value)}  />
            </div>
            
            <div>
            <p className='text-sm text-gray-500'>Địa chỉ</p>
                <textarea  className='w-2/3 border-2 p-2 '  type="text" value={address} 
                    onChange={(e)=>setAddress(e.target.value)}  />
            </div>

            <div>
            <p className='text-sm text-gray-500'>Ghi chú</p>
                <textarea  className='w-2/3 border-2 p-2 '  type="text" value={message} 
                    onChange={(e)=>setMessage(e.target.value)}  />
            </div>

            <button className='font-bold bg-black text-white hover:text-gray-500 p-4 w-[520px] transition' >
                Cập nhật
            </button>

           
        </form>

    </div>
  )
}

export default OrderDetail