'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules'
import { giayData,quanAoData, phuKienData } from '@/Data/data';
import ProductCarousel from '@/components/ProductCarousel';
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import React from 'react'
import Footer from '@/components/Footer';

const Home = () => {
  return (
    <>
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
      <div className='text-center text-7xl font-bold mb-5 mt-10' >
        <h1>Giày</h1>
      </div>
      <div className='mb-10'  >
        <ProductCarousel data={giayData} />
      </div>

      {/* Quần áo carousel */}
      <div className='text-center text-7xl font-bold mb-5' >
        <h1>Quần áo</h1>
      </div>
      <div className='mb-10'>
        <ProductCarousel data={quanAoData} />
      </div>

      {/* Phụ kiện carousel */}
      <div className='text-center text-7xl font-bold mb-5' >
        <h1>Phụ kiện</h1>
      </div>
      <div>
        <ProductCarousel data={phuKienData} />
      </div>

   

      {/* Thông tin về ShoeShop */}
      <div className=' mt-20 bg-black text-white py-10 px-80 '  >
        <h1 className='text-4xl text-center ' >Thông tin về <strong> DonaStore </strong> </h1>
        <p className='mt-10 items-center' >Donastore là công ty chuyên cung cấp giày thể thao chất lượng cao, được thành lập với sứ mệnh mang lại sự kết hợp hoàn hảo giữa phong cách và hiệu suất cho mọi vận động viên và tín đồ thể thao. Chúng tôi cung cấp một bộ sưu tập đa dạng, từ giày chạy bộ, giày bóng rổ đến giày tập gym, phù hợp với nhu cầu của từng khách hàng.

        Với đội ngũ thiết kế tài năng, Donastore không ngừng cập nhật xu hướng mới nhất và ứng dụng công nghệ tiên tiến trong sản xuất để tạo ra những đôi giày không chỉ thời trang mà còn bảo vệ sức khỏe cho đôi chân. Mỗi sản phẩm đều được kiểm tra chất lượng nghiêm ngặt trước khi đến tay người tiêu dùng, đảm bảo sự thoải mái và độ bền cao.

        Chúng tôi hiểu rằng mỗi vận động viên đều có phong cách riêng, vì vậy Donastore cam kết mang đến nhiều lựa chọn về kiểu dáng và màu sắc. Ngoài ra, dịch vụ chăm sóc khách hàng tận tâm của chúng tôi sẽ giúp bạn có được trải nghiệm mua sắm tốt nhất. Hãy đến với Donastore và khám phá những bước đi mạnh mẽ, đầy tự tin trong thể thao!</p>
      </div>

      
      <Footer/>
    </>
  )
}

export default Home