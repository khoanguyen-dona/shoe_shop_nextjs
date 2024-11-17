import React from 'react'
import { useRouter } from 'next/navigation';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination ,Scrollbar} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProductCarousel = ({data}) => {
   
    return (
        <div>
        <Swiper
            className='w-full h-2/4 items-center justify-center '
            spaceBetween={5}
            slidesPerView={4}
            loop={false}
            pagination={{ clickable: true }}
            navigation={true}
            scrollbar = {true}
            modules={[Navigation, Pagination,Scrollbar]}
        >
            {data.map((d)=>(
                <SwiperSlide key={d.id} >
                    <a href={`/product-detail/${d.id}`}>
                        <img className='flex object-cover  items-center justify-center' src={d.thumbnail} alt="Slide 1" />
                        <div className='text-center' >
                            <p>{d.productName}</p>
                            <p>{d.price} đ</p>
                        </div>
                    </a>               
                </SwiperSlide>
            ))}
            
        </Swiper>
        </div>
    )
}

export default ProductCarousel