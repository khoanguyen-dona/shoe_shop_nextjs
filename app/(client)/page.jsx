'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules'
import axios from 'axios';
// import { giayData,quanAoData, phuKienData } from '@/Data/data';
import ProductCarousel from '@/components/ProductCarousel';
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import React, { useEffect } from 'react'
import { publicRequest } from '@/requestMethod';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/redux/userRedux';
import { setCart } from '@/redux/cartRedux';
import { setWishlist } from '@/redux/wishlistRedux';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'
import SuccessPopup from '@/components/Popup/SuccessPopup';

const Home = () => {
  const router = useRouter();
  const [notifyLogoutSuccess, setNotifyLogoutSuccess] = useState(false)
  const [notifyLoginSuccess, setNotifyLoginSuccess] = useState(false)
  const [giayData,setGiayData] = useState([])
  const [aoData,setAoData] = useState([])
  const [phukienData,setPhukienData] = useState([])
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.currentUser)
  const searchParams = useSearchParams()
  const logout = searchParams.get('logout')
  const googleAuth = searchParams.get('googleAuth')
  //fetch user after google auth
  
  useEffect(() => {

    if(logout==='true'){
      // Remove the query param from the URL after setting message
      router.replace("/", undefined, { shallow: true });
      setNotifyLogoutSuccess(true)
      setTimeout(()=>{
        setNotifyLogoutSuccess(false)
      },3000)
    }
    if(googleAuth==='true'){
      // Remove the query param from the URL after setting message
      router.replace("/", undefined, { shallow: true });
      setNotifyLoginSuccess(true)
      setTimeout(()=>{
        setNotifyLoginSuccess(false)
      },3000)
    }
    

  }, [])

 //get data of user when redirect by googleAuth
  useEffect(()=> {
    if(user === null  ){
     
      axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user`, {withCredentials: true})
      .then((res) => {
        dispatch(setUser(res.data))
        dispatch(setCart(res.data.cart))
        dispatch(setWishlist(res.data.wishlist))
  
      })
      .catch(() => dispatch(setUser(null)) );
  }
  }, [])

  // get data
  useEffect(() => {
    const getGiayData = async () => {
      try{
        const res = await publicRequest.get('/product?category=Giày&color=&size=&page=1&limit=8&minPrice')
        setGiayData(res.data.products);
      } catch {     
      }
    }
    getGiayData();
  }, [])

  //get data
  useEffect(() => {
    const getAoData = async () => {
      try{
        const res = await publicRequest.get('/product?category=Áo&color=&size=&page=1&limit=8&minPrice')
        setAoData(res.data.products)
      } catch(err) {
        console.log(err)
      }
    }
    getAoData();
  }, [])

  //get data
  useEffect(() => {
    const getPhukienData = async () => {
      try{
        const res = await publicRequest.get('/product?category=Phụ kiện&color=&size=&page=1&limit=8&minPrice')
        setPhukienData(res.data.products)
      } catch(err) {
        console.log(err)
      }
    }
    getPhukienData();
  }, [])

  const handleClosePopup = () => {
    setNotifyLogoutSuccess(false)
    setNotifyLoginSuccess(false)
  }
  

  return (
    <>
      {/* Notify when user logout successfully*/}
    {notifyLogoutSuccess ? 
            <div  className='absolute flex justify-center p-4  ' > 
                <SuccessPopup  message={'Log out Successfully!'}  handleClosePopup={handleClosePopup}   /> 
            </div>  : '' 
    }
    {/* Notify when login successfully */}
    {notifyLoginSuccess ? 
            <div  className='absolute flex justify-center p-4  ' > 
                <SuccessPopup  message={'Log in Successfully!'}  handleClosePopup={handleClosePopup}   /> 
            </div>  : '' 
    }
      {/* Banner  */}
      <div>
        <Swiper
          className='w-full h-2/4 items-center justify-center mb-5'
          spaceBetween={0}
          slidesPerView={3}
          loop={false}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Navigation, Pagination]}
        >
          <SwiperSlide>
            <img className='flex object-cover  items-center justify-center' src="https://adidas.donawebs.com/wp-content/uploads/2024/11/Mu_Nam_Mui_Rolling_Links_trang_JE6720_HM7-768x768.avif" alt="Slide 1" />
          </SwiperSlide>
          <SwiperSlide>
            <img className='flex object-cover items-center justify-center' src="https://adidas.donawebs.com/wp-content/uploads/2024/11/Mu_Nam_Mui_Rolling_Links_trang_JE6720_HM6.avif" alt="Slide 2" />
          </SwiperSlide>
          <SwiperSlide>
            <img className='flex object-cover  items-center justify-center ' src="https://adidas.donawebs.com/wp-content/uploads/2024/11/Mu_Nam_Mui_Rolling_Links_trang_JE6720_HM3_hover.avif" alt="Slide 3" />
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Giày carousel */}
      <div className='text-center text-5xl md:text-6xl  xl:text-7xl font-bold mb-5 mt-10' >
        <h1>Giày</h1>
      </div>
      <div className='mb-10'  >
        <ProductCarousel data={giayData} />
      </div>

      {/* Quần áo carousel */}
      <div className='text-center text-5xl md:text-6xl  xl:text-7xl font-bold mb-5' >
        <h1>Quần áo</h1>
      </div>
      <div className='mb-10'>
        <ProductCarousel data={aoData} />
      </div>

      {/* Phụ kiện carousel */}
      <div className='text-center text-5xl md:text-6xl  xl:text-7xl font-bold mb-5' >
        <h1>Phụ kiện</h1>
      </div>
      <div>
        <ProductCarousel data={phukienData} />
      </div>

   

      {/* Thông tin về ShoeShop */}
      <div className=' mt-20 bg-black text-white py-10 px-4  md:px-10 lg:px-20 xl:px-80  flex flex-col '  >
        <h1 className='text-4xl text-center ' >Thông tin về <strong> DonaStore </strong> </h1>
        <p className='mt-10 text-left' >Donastore là công ty chuyên cung cấp giày thể thao chất lượng cao, được thành lập với sứ mệnh mang lại sự kết hợp hoàn hảo giữa phong cách và hiệu suất cho mọi vận động viên và tín đồ thể thao. Chúng tôi cung cấp một bộ sưu tập đa dạng, từ giày chạy bộ, giày bóng rổ đến giày tập gym, phù hợp với nhu cầu của từng khách hàng.

        Với đội ngũ thiết kế tài năng, Donastore không ngừng cập nhật xu hướng mới nhất và ứng dụng công nghệ tiên tiến trong sản xuất để tạo ra những đôi giày không chỉ thời trang mà còn bảo vệ sức khỏe cho đôi chân. Mỗi sản phẩm đều được kiểm tra chất lượng nghiêm ngặt trước khi đến tay người tiêu dùng, đảm bảo sự thoải mái và độ bền cao.

        Chúng tôi hiểu rằng mỗi vận động viên đều có phong cách riêng, vì vậy Donastore cam kết mang đến nhiều lựa chọn về kiểu dáng và màu sắc. Ngoài ra, dịch vụ chăm sóc khách hàng tận tâm của chúng tôi sẽ giúp bạn có được trải nghiệm mua sắm tốt nhất. Hãy đến với Donastore và khám phá những bước đi mạnh mẽ, đầy tự tin trong thể thao!</p>
      </div>

      
      
    </>
  )
}

export default Home