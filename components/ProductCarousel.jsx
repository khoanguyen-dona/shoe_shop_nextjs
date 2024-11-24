import React from 'react'
import { useRouter } from 'next/navigation';
import { FormatCurrency } from '@/utils/FormatCurrency';

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
            slidesPerView={2}
            breakpoints={{
                480: { slidesPerView: 2, spaceBetween: 30 },
                768: { slidesPerView: 3, spaceBetween: 30 },
                1024: { slidesPerView: 4, spaceBetween: 30 },
              }}
            loop={false}
            pagination={{ clickable: true }}
            navigation={true}
            scrollbar = {false}
            modules={[Navigation, Pagination,Scrollbar]}
        >
            {data.map((d)=>(
                <SwiperSlide key={d.id} >
                    <a href={`/product-detail/${d.id}`}>
                        <img className='flex object-cover  items-center justify-center' src={d.thumbnail} alt="Slide 1" />
                        <div className='text-center' >
                            <p className='font-semibold'>{d.productName}</p>
                            <p>{FormatCurrency(d.price)} đ</p>
                        </div>
                    </a>               
                </SwiperSlide>
            ))}
            
        </Swiper>
        </div>
    )
}

export default ProductCarousel