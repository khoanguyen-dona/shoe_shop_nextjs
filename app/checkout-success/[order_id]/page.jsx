'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import { FormatCurrency } from '@/utils/FormatCurrency'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const CheckoutSuccess = () => {

  const orderId = useParams().order_id

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
          Mã đơn hàng: <span className='font-bold' >2221</span>
        </div>
        <div>
          Ngày <span className='font-bold' >Tháng 11 ngày 17 năm 2024</span>
        </div>
        <div>
          Tổng cộng <span className='font-bold' >{FormatCurrency(5200000)} đ</span>
        </div>
        <div>
          Phương thức thanh toán : <span className='font-bold' >Cash on Delivery </span>
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
      <div className='flex justify-between py-2 ' >
        <div className=' object-cover flex  ' >
          <img  className='mr-1 w-32' src="https://adidas.donawebs.com/wp-content/uploads/2024/11/ADIZERO_SL_trang_IG5941_HM3_hover.avif" alt="" />
          <div className='' >
            <p>Adizero SL </p>
            <p>Size : 8 US</p>
          </div>
          <div className='ml-5 ' >
            X 1
          </div>
        </div>
        <div className='' >
          {FormatCurrency(2600000)} đ
        </div>     
      </div>

      <hr />
      {/* product card */}
      <div className='flex justify-between py-2 ' >
        <div className=' object-cover flex  ' >
          <img  className='mr-1 w-32' src="https://adidas.donawebs.com/wp-content/uploads/2024/11/ADIZERO_SL_trang_IG5941_HM3_hover.avif" alt="" />
          <div className='' >
            <p>Adizero SL </p>
            <p>Size : 8 US</p>
          </div>
          <div className='ml-5 ' >
            X 1
          </div>
        </div>
        <div className='' >
          {FormatCurrency(2600000)} đ
        </div>     
      </div>

      <hr />

      <div className='flex justify-between font-semibold my-4' >
        <p>Phương thức thanh toán</p>
        <p>Cost On Delivery</p>
      </div>

      <hr />

      <div className='flex justify-between font-extrabold my-4' > 
        <p>Tổng cộng :</p>
        <p>{FormatCurrency(5200000)} đ </p>
      </div>

      <div className='font-bold text-xl mt-4' >Địa chỉ thanh toán</div>
      <div className='border-2 border-dashed flex flex-col p-4 mt-4 rounded ' >
        <p>Họ tên: Nguyễn Anh Khoa</p>
        <p>Địa chỉ: 293 Bàu Cát, p12, q.Tân Bình, tp.HCM</p>
        <p>Sđt: 0129381203</p>
        <p>Email : khoa.nguyen.anh8796@gmail.com</p>
      </div>
      <a href="/" className='w-64  p-2  bg-black text-white hover:text-gray-500 transition mt-2' >
        <KeyboardBackspaceIcon className='mr-4' fontSize='large' />Tiếp tục mua sắm</a>
    </div>

   
  )
}

export default CheckoutSuccess