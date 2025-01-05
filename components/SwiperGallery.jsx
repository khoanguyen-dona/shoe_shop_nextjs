'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import CloseIcon from '@mui/icons-material/Close';
import { useRef } from 'react';


export default function SwiperGallery({ product_images}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
 const  [currentIndex,setCurrentIndex] = useState()
 const swiperRef = useRef(null);
  
    console.log('curr index',currentIndex)

    // Open the lightbox on image click
  const handleImageClick = (index) => {
    setCurrentIndex(index);
    setIsLightboxOpen(true);
  };
  //close lightbox
  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);

  }
  // handle images thumb in lightbox when clicked
  const handleThumbClick = (index) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  return (
    <>     
            <div className="image-carousel">
            {/* Main Carousel */}
            <Swiper    
                modules={[Navigation, Thumbs]}
                navigation
                thumbs={{ swiper: thumbsSwiper }}
                className="main-swiper  "
                spaceBetween={5}
                slidesPerView={1}
                loop
                // onSlideChange={(swiper) => setCurrentImageIndex(swiper.activeIndex)}
            >   
                {product_images?.map((image, index) => (
                <SwiperSlide className='relative w-auto h-screen '  key={index}>
                    <img  onClick={() => handleImageClick(index)}
                        className='object-cover hover:cursor-pointer' src={image} alt={`Slide ${index + 1}`} />
                    <p className='absolute top-0 right-2 z-20 '>{index +1} of {product_images.length} </p>
                </SwiperSlide>
                ))}        
            </Swiper>

            {/* Thumbnails Carousel */}
            <Swiper
                onSwiper={setThumbsSwiper}
                modules={[Thumbs]}
                spaceBetween={10}
                slidesPerView={6.4}
                watchSlidesProgress
                className="thumbs-swiper mt-2"
            
            >
                {product_images?.map((image, index) => (
                    <SwiperSlide  key={index} className={`hover:border-[1px] hover:border-black hover:opacity-100 hover:rounded-lg transition`}  >
                        <img   src={image} alt={`Thumbnail ${index + 1}`} />
                    </SwiperSlide>
                ))}
            </Swiper>  
            
            </div>
       
        {/* light box */}
        { isLightboxOpen &&
            <div  >
                <p className='fixed top-5 left-5 text-gray-500 z-50 '>{currentIndex+1} of {product_images.length} </p>
                <div className='fixed top-0 left-0 z-20 bg-black w-screen h-screen  ' >
                    {/* Main Carousel */}
                    <Swiper  
                       
                        modules={[Navigation, Thumbs]}
                        navigation
                        thumbs={{ swiper: thumbsSwiper }}
                        className="main-swiper w-full md:w-5/5 lg:w-5/5 xl:w-2/5 2xl:w-2/5   h-auto mt-[100px] md:mt-[50px] xl:mt-0 mx-2 text-center  z-40   "
                        spaceBetween={500}
                        slidesPerView={1}
                        onSwiper={(swiper) => (swiperRef.current = swiper)}    
                        initialSlide={currentIndex}
                        onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
                    >   

                    <CloseIcon onClick={handleCloseLightbox} 
                                fontSize='large'  
                                className='absolute top-5  z-40 right-5  text-gray-500 hover:text-black transition ' />

                    {product_images?.map((image, index) => (
                    <SwiperSlide className=' z-40 '  key={index}>
                
                        <img  onClick={() => handleImageClick(index)}
                            className=' hover:cursor-pointer  ' src={image} alt={`Slide ${index + 1}`} />    
                        
                                
                    </SwiperSlide>
                    ))}        
                    </Swiper>
                    {/* images thumb */}
                    <div className='flex flex-wrap  mt-2     z-40' >
                        {product_images.map((image, index)=>
                        <div key={index}>
                            <img  
                                onClick={() => handleThumbClick(index)}                         
                                className={`w-24 lg:w-32  h-24 lg:h-32 hover:opacity-100   ${currentIndex===index?'opacity-100':'opacity-50'} `} 
                                src={image} alt="" 
                            />
                        </div>
                        )}
                    </div>        
                </div>           
            </div>
        }   
    </>
  );
}
