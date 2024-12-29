'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Loader from '@/components/Loader'
import { userRequest } from '@/requestMethod'
import moment from 'moment'
import SuccessPopup from '@/components/Popup/SuccessPopup'
import { FormatCurrency } from '@/utils/FormatCurrency'

const OrderDetail = () => {
    const order_id = useParams().id
    const [loading, setLoading] = useState(true)
    const [notifySuccess, setNotifySuccess] = useState(false)

    const [clientName, setClientName] = useState('')
    const [products, setProducts] = useState([])
    const [phoneNumber, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [total, setTotal] = useState('')
    const [status, setStatus] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('')
    const [message, setMessage] = useState('')
    const [createdAt, setCreatedAt] = useState('')

    //get order 
    useEffect(() => {
        const getOrder = async () => {
            try {
                const res = await userRequest.get(`/order/${order_id}`)
                if(res.data){
                    setClientName(res.data.clientName)
                    setProducts(res.data.products)
                    setPhoneNumber(res.data.phoneNumber)
                    setAddress(res.data.address)
                    setEmail(res.data.email)
                    setTotal(res.data.total)
                    setStatus(res.data.status)
                    setPaymentMethod(res.data.paymentMethod)
                    setMessage(res.data.message)
                    setCreatedAt(res.data.createdAt)
                }
                setLoading(false)

            } catch(err) {
                console.log('Error get order',err)
            }
        }
        getOrder()
    }, [])

     // close the popup
     const handleClosePopup = () => {
        setNotifySuccess(false)
    }

  
    const handleSubmit = async () => {
        try {
            const res = await userRequest.put(`/admin/order/${order_id}`,{
                clientName: clientName,
                phoneNumber: phoneNumber,
                address: address,
                email: email,
                total: total,
                status: status,
                paymentMethod: paymentMethod,
                message: message
            })
            console.log('-->',res.data)
            if(res) {
                setNotifySuccess(true)
                setTimeout(()=> {
                    setNotifySuccess(false)
                })
                console.log('res data',res.data)
            }

        } catch(err) {
            console.log('submit error',err)
        }
        
    }

  return (
    <div className={`mt-20  flex flex-col   ${loading?'bg-white opacity-50':''} `} >
        <div className='text-3xl font-bold  '>
            Order Detail  
        </div>
        {loading ?  <div className='flex justify-center  ' >  <Loader  color={'inherit'} />  </div> : ''}
        {notifySuccess ? 
            <div  className='flex justify-center p-4' > 
                <SuccessPopup  message={'Update Successfully!'}  handleClosePopup={handleClosePopup}   /> 
            </div>  : '' }
        <form action="" className='space-y-4 flex flex-col mt-10  ' >
            <div>           
                <p className='text-sm text-gray-500 '>Order ID</p>
                <input  className='w-2/3 border-2 p-2 bg-gray-200'  type="text" value={order_id} 
                    disabled  />
            </div>

            <div>
                <p className='text-sm text-gray-500 '>Tên khách hàng </p>
                <input  className='w-2/3 border-2 p-2 '  type="text" value={clientName} 
                    onChange={(e)=>setClientName(e.target.value)}  />
            </div>

            <div>
            <p className='text-sm text-gray-500'>Ngày đặt hàng</p>
                <input  className='w-2/3 border-2 p-2 bg-gray-200'  type="text" value={moment(createdAt).format("YYYY-MMM-d h:mm:ss A")} 
                    disabled  />
            </div>

            <div>
                <p className='text-sm text-gray-500'>Trạng thái</p>
                <select name="" id="" value={status} 
                        onChange={(e)=>setStatus(e.target.value)}  
                        className={` font-bold border-2 p-1 rounded-lg  ${status==='success'?'text-green-500':''}
                            ${status==='on delivery'?'text-blue-500':''} ${status==='processing'?'text-gray-500':''} `} >
                    <option value='processing' className='text-gray-500' >Processing</option>
                    <option value="on delivery" className='text-blue-500' >On delivery</option>
                    <option value="success" className='text-green-500' >Success</option>
                </select> 
            </div>

            <div>
            <p className='text-sm text-gray-500'>Tổng cộng(Vnđ) </p>
                <input  className='w-2/3 border-2 p-2 '  type="number" value={total} 
                    onChange={(e)=>setTotal(e.target.value)}  />
                
            </div>

            <div>
                <p className='text-sm text-gray-500'>Phương thức thanh toán</p>
                <select  className='rounded-lg border-2 p-1 '  type="text" value={paymentMethod} 
                    onChange={(e)=>setPaymentMethod(e.target.value)}  >
                    <option value="COD">COD</option>
                    <option value="CARD">CARD</option>

                </select>
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
                <textarea  className='w-2/3 border-2 p-2 '  type="text" value={message || ''} 
                    onChange={(e)=>setMessage(e.target.value)}  />
            </div>

            <p  className='text-sm text-gray-500' >Sản phẩm</p>
            <div className={`w-2/3  ${products.length>0?'border-2':''}  `} >    
                {products?.map((product, index) => 
                    <div key={index}  className='flex p-2 '  >
                        <img className='w-32 object-cover' src={product.thumbnail} alt="" />
                        <div className='flex flex-col p-2' >
                            <span className='font-bold text-xl ' >{product.name}</span>
                            <span>Price: <span className='font-semibold' > {FormatCurrency(product.price)} đ </span>  </span>
                            <span>Color: <span className='font-semibold' > {product.color}  </span>   </span>
                            <span>Size: <span className='font-semibold' >  {product.size} </span>    </span>
                            <span>Quantity: <span className='font-semibold' > {product.quantity} </span>   </span>
                        </div>
                    </div>
                )

                }
            </div>


            <button 
                    onClick={handleSubmit}
                    className='font-bold bg-black text-white hover:text-gray-500 p-4 w-[520px] transition' >
                Update
            </button>

           
        </form>

    </div>
  )
}

export default OrderDetail