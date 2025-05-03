'use client'
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { userRequest } from '@/requestMethod'
import { FormatCurrency } from '@/utils/FormatCurrency'
import moment from "moment";
import Loader from '@/components/Loader'


const OrderDetail = () => {
    const [loading, setLoading] = useState(true)
    const order_id = useParams().order_id
    const [order, setOrder] = useState('')
    const products = order?.products

    useEffect(() => {
        
        try{
            const getOrder = async () => {
                const res = await userRequest.get(`/order/${order_id}`)
                if(res.data)
                setOrder(res.data)
                setLoading(false)
            }
            getOrder()
        } catch(err){
            console.log(err)
        }
    }, [])

  
  return (
    <div className={`px-2 md:px-4 lg:px-16 xl:px-24 2xl:px-48  text-center mt-10 mb-20 ${loading ?'bg-white opacity-50':''}   `} >
        {loading ?  <div className='flex justify-center  ' >  <Loader  color={'inherit'} />  </div> : ''}
        <p className='mt-20 font-bold text-4xl text-center' >Order detail </p>
        <div className='flex flex-col' >
            <p className='font-bold text-2xl mt-10 text-center' >Sản phẩm </p>
            <div className='flex flex-col justify-center' >
            {products?.map((product, index) => 
                <div key={index} className='flex flext-row border-2 p-4 mb-2 gap-2 ' >
                    <div className='w-auto ' >
                        <img  className='object-cover w-[250px]     ' src={product.thumbnail} alt="" />
                    </div>
                    <div className=' w-full text-left  ' >
                        <div>
                            <p className='font-semibold' >{product.name} </p>
                        </div>
                        <div>
                            <p>Color:
                                 <span className='font-semibold' >{product.color}</span>
                            </p>
                        </div>
                        <div>
                            <p>Size: <span className='font-semibold' >{product.size}</span> </p>
                        </div>
                        <div>
                            <p>Số lượng: <span className='font-semibold' >{product.quantity}</span>  </p>
                        </div>
                        <div>
                            <p>Price: <span className='font-semibold' >{FormatCurrency(product.price)} đ</span></p>
                        </div>
                        <div>
                            <p>Subtotal: 
                                <span className='font-semibold' >
                                    {FormatCurrency(product.quantity*product.price)} đ
                                </span>
                            </p>
                        </div>
                    </div>
                </div> 
             )}
             </div>
             <div className='font-bold text-2xl text-right' >Total : {FormatCurrency(order.total)} đ</div>
             <div className='flex justify-center' >
                 <hr  className='k w-4/6    ' />
             </div>
            <div className='font-semibold text-xl  mt-10' >Thông tin chi tiết</div>
             <div className='flex flex-col text-left    border-2 p-2' >
                    <p><span className='font-bold'> Mã đơn hàng : </span> {order._id}  </p>
                    <p><span className='font-bold'>Ngày đặt hàng : </span>{moment(order.createdAt).format("YYYY-MMM-d h:mm:ss A")}</p>
                    <p><span className='font-bold'>Họ tên khách hàng : </span> {order.clientName} </p>
                    <p><span className='font-bold'>Email : </span> {order.email}</p>
                    <p><span className='font-bold'>Số điện thoại :  </span>{order.phoneNumber}</p>
                    <p><span className='font-bold'>Status : </span> 
                    <span className={`font-bold ${order.status==='success'?'text-green-500':''}
                        ${order.status==='on delivery'?'text-blue-500':''} 
                        ${order.status==='cancel'?'text-red-500':''}  
                        ${order.status==='processing'?'text-gray-500':''} `} >{order.status} 
                    </span>
                    </p>
                    <p><span className='font-bold'>Lời nhắn : </span> {order.message}</p>
                    <p><span className='font-bold'>Phương thức thanh toán : </span> {order.paymentMethod}</p>
                    <p><span className='font-bold'>Địa chỉ thanh toán : </span> {order.address}</p>

             </div> 
        </div>
    </div>
  )
}

export default OrderDetail