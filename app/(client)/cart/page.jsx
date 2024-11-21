import React from 'react'
import { FormatCurrency } from '@/utils/FormatCurrency'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';

const Cart = () => {
  return (
    <div className='flex flex-col sm:flex-col md:flex-row   sm:px-4 lg:px-24 2xl:px-96   mt-20  ' >
      {/* left col */}
      <div className=' sm:w-full lg:w-3/5 p-4 flex   flex-col ' >
        <h1 className='font-bold text-4xl' >GIỎ HÀNG CỦA BẠN</h1>
        <p className=' text-xl mt-3' >TỔNG CỘNG (2 sản phẩm) <span className='font-bold' > {FormatCurrency(5200000)} đ  </span>   </p>
        {/* product card */}
        <div className='w-full h-2/9 sm:h-3/9  md:h-5/9  border-[1px] border-gray-500 flex ' >
          <div className='w-2/5  ' >
            <img  className='object-cover w-full p-4' src="https://adidas.donawebs.com/wp-content/uploads/2024/11/ADIZERO_SL_trang_IG5941_HM3_hover.avif" alt="" />
          </div>

          <div className='w-2/3 p-5 relative' >
            <p>ADIZERO SL</p>
            <p className='font-bold' >{FormatCurrency(2600000)} đ </p>
            <p>SIZE : 8 US</p>
            <div className='flex mt-0  sm:mt-10  ' >
              <div className='hover:bg-black hover:text-white transition  ' >
                <RemoveIcon sx={{fontSize:40}} />
              </div> 
              <p className='font-bold text-4xl border-[1px] w-12 text-center border-black ' >1</p>
              <div className='hover:bg-black hover:text-white transition ' >
                <AddIcon sx={{fontSize:40}} />
              </div>
            </div>

            <div className='absolute top-0 right-0 hover:bg-black hover:text-white transition ' >
              <ClearIcon/>
            </div>
          </div>
        </div>

         <div className='w-full h-5/9 border-[1px] border-gray-500 flex mt-1' >
          <div className='w-2/5  ' >
            <img  className='object-cover w-full p-4' src="https://adidas.donawebs.com/wp-content/uploads/2024/11/ADIZERO_SL_trang_IG5941_HM3_hover.avif" alt="" />
          </div>

          <div className='w-2/3 p-5 relative' >
            <p>ADIZERO SL</p>
            <p className='font-bold' >{FormatCurrency(2600000)} đ </p>
            <p>SIZE : 8 US</p>
            <div className='flex mt-0 sm:mt-10  ' >
              <div className='hover:bg-black hover:text-white transition ' >
                <RemoveIcon sx={{fontSize:40}} />
              </div> 
              <p className='font-bold text-4xl border-[1px] w-12 text-center border-black ' >1</p>
              <div className='hover:bg-black hover:text-white transition ' >
                <AddIcon sx={{fontSize:40}} />
              </div>
            </div>

            <div className='absolute top-0 right-0 hover:bg-black hover:text-white transition ' >
              <ClearIcon/>
            </div>
          </div>
        </div>

      </div>

      {/* right col */}
      <div className='sm:w-full lg:w-2/5  p-2  flex flex-col ' >

          <div className='flex bg-black text-white hover:text-gray-500 ' >
            <a  href='/checkout' className='  font-bold p-4 w-full flex  justify-start hover:text-gray-500 transition ' >THANH TOÁN</a>
            <span  className=' ' > <ArrowRightAltIcon sx={{fontSize:50 }} /> </span>
          </div>

          <div  className='flex flex-col mt-10 ' >
            <div>
              <h1 className='font-bold text-2xl ' >TÓM TẮT ĐƠN HÀNG</h1>
            </div>   

            <div className='flex justify-between mt-5 ' >
              <div  >
                2 sản phẩm
              </div>
              <div>
                {FormatCurrency(5200000) } đ
              </div>
            </div>

            <div className='flex justify-between' >
              <div  >
                Giao hàng
              </div>
              <div>
                Miễn phí
              </div>
            </div>

            <div className='flex justify-between font-bold  mt-5' >
              <div  >
                Tổng
              </div>
              <div>
                {FormatCurrency(5200000) } đ
              </div>
            </div>

            <span className='font-bold py-4 w-56 mt-5 hover:bg-black hover:text-white transition' >  SỬ DỤNG MÃ KHUYẾN MÃI</span>

            <div className='text-xs mt-10 ' >
                PHƯƠNG THỨC THANH TOÁN ĐƯỢC CHẤP NHẬN
            </div>

            <div className='flex mt-2 ' >
              <img  className='w-16  ' src="https://www.adidas.com.vn/static/checkout/react/5ab9320/assets/img/accepted-payment-methods/icon-adidas-cash_on_delivery.svg" alt="" />
              <img  className='w-16 ml-2 ' src="https://www.adidas.com.vn/static/checkout/react/5ab9320/assets/img/accepted-payment-methods/icon-adidas-mastercard.svg" alt="" />
              <img  className='w-20 ml-2 ' src="https://www.adidas.com.vn/static/checkout/react/5ab9320/assets/img/accepted-payment-methods/icon-adidas-visa.svg" alt="" />
            </div>

          </div>
      </div>

    </div>
  )
}

export default Cart