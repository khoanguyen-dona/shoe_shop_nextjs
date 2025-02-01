'use client'

import React, { useState } from 'react'
import { FormatCurrency } from '@/utils/FormatCurrency'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import { useSelector, useDispatch } from 'react-redux';
import { userRequest } from '@/requestMethod';
import { setCart, addCartItem, decreaseCartItem, deleteCartItem } from '@/redux/cartRedux';
import Loader from '@/components/Loader';


const Cart = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const user = useSelector((state)=>state.user.currentUser)
  const cart = useSelector((state)=>state.cart.userCart)
  const products = cart?.products
  
 
  // calculate total price
  const totalPrice = products?.reduce((total, item) => {
    const { price, quantity } = item;
    
    return total + price * quantity;
  }, 0);
 
  const decreaseItem = async (product) => {
    setLoading(true)
    if( user !== null){   
      try{
        const res = await userRequest.post(`/cart/${user._id}/decrease-item`,{
          productId: product.productId,
          color: product.color,
          size: product.size
        })
        if(res.data){
          dispatch(setCart(res.data.cart))
          setLoading(false)
        }
      }catch(err){}
    } else {
      let prod = {
        productId: product.productId,
        color: product.color,
        size: product.size
      }
      dispatch(decreaseCartItem(prod))
      setLoading(false)
    }

  }

  const addItem = async (product) => {
    setLoading(true)
    if (user !== null){
      try{
        const res = await userRequest.post(`/cart/${user._id}`,{
          productId: product.productId,
          name: product.name,
          quantity: 1,
          color: product.color,
          size: product.size
        })
        if(res.data){
          dispatch(setCart(res.data.cart))
          setLoading(false)
        }
      }catch(err){}
    } else {
      let prod = {
        productId : product.productId,
        color: product.color,
        size: product.size
      }
      dispatch(addCartItem(prod))
      setLoading(false)
    }
  }

  const removeItem = async (product) => {
    setLoading(true)
    if(user !== null){  
      try{
        const res = await userRequest.post(`/cart/${user._id}/delete-item`,{
          productId: product.productId,
          color: product.color,
          size: product.size
        })
        if(res.data){
          dispatch(setCart(res.data.cart))
          setLoading(false)
        }
      }catch(err){}
    } else {
      let prod = {
        productId : product.productId,
        color: product.color,
        size: product.size
      }
      dispatch(deleteCartItem(prod))
      setLoading(false)
    }
  }


  
  return (
    <>
    {loading ?  <div className='flex justify-center  ' >  <Loader  color={'inherit'} />  </div> : ''}
    <div className={` flex flex-col sm:flex-col md:flex-row   sm:px-4 lg:px-24 2xl:px-96   mt-20 ${loading?'bg-white opacity-50':''}  `} >
      
      {/* left col */}
      <div className=' sm:w-full lg:w-3/5 p-4 flex   flex-col ' >
        <h1 className='font-bold text-4xl' >GIỎ HÀNG CỦA BẠN</h1>
        <p className=' text-xl mt-3' >TỔNG CỘNG ({products?.length} SẢN PHẨM)  :<span className='font-bold' >
           {FormatCurrency(totalPrice)} đ  </span>   </p>
        {/* product card */}
        { products?.map((product, index)=> 
       
        <div className='w-full h-2/9 sm:h-3/9  md:h-5/9  border-[1px] border-gray-500 flex ' key={index} >
          <div className='w-2/5  ' >
            <img  className='object-cover w-full p-4' src={product.thumbnail} alt="" />
          </div>

          <div className='w-2/3 p-5 relative' >
            <p className='font-extrabold text-xl ' >{product.name}</p>
            <p className='font-semibold' >{FormatCurrency(product.price)} đ </p>
            <p>SIZE : <span className='font-bold' > {product.size} </span>  </p>
            <p>COLOR : <span className='font-bold' > {product.color} </span>  </p>
            <div className='flex mt-0  sm:mt-10  ' >
              <div className='hover:bg-black hover:text-white transition  ' >
                <RemoveIcon onClick={() => decreaseItem(product)}  sx={{fontSize:40}} />
              </div> 
              <p className='font-bold text-4xl border-[1px] w-12 text-center border-black ' >{product.quantity}</p>
              <div className='hover:bg-black hover:text-white transition ' >
                <AddIcon  onClick={() => addItem(product)} sx={{fontSize:40}} />
              </div>
            </div>

            <div className='absolute top-0 right-0 hover:bg-black hover:text-white transition ' >
              <ClearIcon  onClick={()=> removeItem(product)}  />
            </div>
          </div>
        </div>
        )}
       

      </div>

      {/* right col */}
      <div className='sm:w-full lg:w-2/5  p-2  flex flex-col ' >

          <div className='flex bg-black text-white hover:text-gray-500 ' >
            <a  onClick={()=>setLoading(true)} href='/checkout' className='  font-bold p-4 w-full flex  justify-start hover:text-gray-500 transition ' >THANH TOÁN</a>
            <span  className=' ' > <ArrowRightAltIcon sx={{fontSize:50 }} /> </span>
          </div>

          <div  className='flex flex-col mt-10 ' >
            <div>
              <h1 className='font-bold text-2xl ' >TÓM TẮT ĐƠN HÀNG</h1>
            </div>   

            <div className='flex justify-between mt-5 ' >
              <div  >
                {products?.length} sản phẩm
              </div>
              <div>
                {FormatCurrency(totalPrice) } đ
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
                {FormatCurrency(totalPrice) } đ
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
    </>
  )
}

export default Cart