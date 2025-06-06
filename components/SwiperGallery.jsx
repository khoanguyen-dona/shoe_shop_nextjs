'use client';

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, Zoom, Keyboard, Controller } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';
import 'swiper/css/keyboard';
import 'swiper/css/controller';
import CloseIcon from '@mui/icons-material/Close';
import { useRef } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Image from 'next/image';
export default function SwiperGallery({ product_images}) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const  [currentIndex,setCurrentIndex] = useState(0)
    const swiperRef = useRef(null);
    const lastIndex = product_images?.length-1
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
      // Update screen width when the window is resized
      const handleResize = () => {
        setScreenWidth(window.innerWidth);
      };
  
      // Add event listener
      window.addEventListener('resize', handleResize);
  
      // Cleanup event listener on unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

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

  const handleNext = () => {
    if(swiperRef.current){
        swiperRef.current.slideTo(currentIndex+1)
        setCurrentIndex(currentIndex+1)
    }
  }
  
  const handlePrev = () => {
    if(swiperRef.current){
        swiperRef.current.slideTo(currentIndex-1)
        setCurrentIndex(currentIndex-1)
    }
  }
  
  return (
    <>     
        <div className="image-carousel z-10 ">
            {/* Main Carousel */}
            <Swiper    
                lazy={true}
                modules={[Navigation, Thumbs, Zoom, Keyboard]}
                navigation={true}
                zoom
                keyboard
                thumbs={{ swiper: thumbsSwiper }}
                className="main-swiper  "
                spaceBetween={5}
                slidesPerView={1}
                loop
            >   
                {product_images?.map((image, index) => (
                <SwiperSlide className='relative w-auto h-auto '  key={index}>
                    <Image  
                        width={400} height={400}  
                        loading='lazy'
                        onClick={() => handleImageClick(index)}
                        className='object-cover hover:cursor-pointer' src={image} alt={`Slide ${index + 1}`}
                    />
                    <p className='absolute top-2 right-2   z-20 text-gray-400 '>{index +1}/{product_images.length} </p>
                </SwiperSlide>
                ))}        
            </Swiper>

            {/* Thumbnails Carousel */}
            <Swiper
                lazy={true}
                onSwiper={setThumbsSwiper}
                modules={[Thumbs]}
                spaceBetween={10}
                slidesPerView={5.4}
                watchSlidesProgress        
                className="thumbs-swiper mt-2"   
            >
                {product_images?.map((image, index) => (
                    <SwiperSlide  key={index} className={`hover:border-[1px] hover:border-black hover:opacity-100 hover:rounded-lg transition`}  >
                        <Image
                            className='object-cover '
                            width={50} height={50}  
                            loading='lazy' src={image} alt={`Thumbnail ${index + 1}  object-cover  `} />
                    </SwiperSlide>
                ))}
            </Swiper>           
        </div>

        {/* light box */}
        { isLightboxOpen &&
            <div className='image-carousel z-50  '  >
                <p className='fixed top-5 left-5 text-gray-400 z-50  '>{currentIndex+1}/{product_images.length} </p>
                <CloseIcon onClick={handleCloseLightbox} 
                                sx={{fontSize:'60px'}} 
                                className='z-50 fixed top-5   right-5  transition  text-gray-500 hover:text-gray-700 
                                    hover:cursor-pointer ' 
                />
                {/* show on pc desktop */}
                {    currentIndex > 0 && screenWidth>1028  &&              
                    <ArrowBackIosIcon  sx={{fontSize: '60px'}} onClick={handlePrev}  
                        className='z-50 fixed left-5  hidden lg:top-2/4 text-gray-500  transition  hover:text-gray-700  ' />
                }
                {    currentIndex < lastIndex && screenWidth>1028 &&           
                    <ArrowForwardIosIcon  sx={{fontSize: '60px'}} onClick={handleNext}  
                        className='z-50 fixed right-5 hidden  lg:top-2/4 text-gray-500  transition  hover:text-gray-700  ' />
                }
                {/* show on phone and tab */}
                {    currentIndex > 0 && screenWidth<=1028  &&              
                    <ArrowBackIosIcon  sx={{fontSize: '80px'}} onClick={handlePrev}  
                        className='z-50 fixed left-1 top-[250px]  sm:top-[400px] md:top-[450px] lg:top-[500px] text-gray-500  transition  hover:text-gray-700  ' />
                }
                {    currentIndex < lastIndex && screenWidth<=1028 &&           
                    <ArrowForwardIosIcon  sx={{fontSize: '80px'}} onClick={handleNext}  
                        className='z-50 fixed right-0  top-[250px] sm:top-[400px] md:top-[450px] lg:top-[500px] text-gray-500  transition  hover:text-gray-700  ' />
                }
               
                <div className={`z-40 fixed top-0 left-0  bg-black    w-screen h-screen  
                      transition-all transform duration-300 ease-in-out ${isLightboxOpen ? 'translate-x-0' : 'translate-x-10' } `} >
                    {/* Main Carousel */}
                    <Swiper                     
                        modules={[Navigation, Thumbs, Zoom, Keyboard, Controller]}
                        controller
                        zoom ={true}
                        keyboard
                        navigation = {true}
                        thumbs={{ swiper: thumbsSwiper }}
                        className="main-swiper w-full md:w-5/5 lg:w-5/5 xl:w-2/5 2xl:w-2/5 z-50  h-auto mt-[100px] md:mt-[100px] xl:mt-0 mx-2 text-center   "
                        spaceBetween={2000}
                        slidesPerView={1}
                        onSwiper={(swiper) => (swiperRef.current = swiper)}    
                        initialSlide={currentIndex}
                        onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
                        lazy={true}
                    >   
              
                    {product_images?.map((image, index) => (            
                        <SwiperSlide className='  '  key={index}>
                                 {/* show on phone and tab */}
                            <Image
                                    width={400} height={400}
                                    onClick={() => handleImageClick(index)} 
                                    loading='lazy'
                                    className=' z-50 object-cover ' 
                                    src={image} alt={`Slide ${index + 1}`} />    
                        </SwiperSlide>
                    ))}  
                       
                    </Swiper>

                    {/* images thumb */}
                    <Swiper 
                        lazy={true}
                        spaceBetween={1} 
                        slidesPerView={12.5}
                        watchSlidesProgress
                        modules={[Thumbs]}
                        className='mt-2'
                    >
                    <div className='flex flex-wrap' >
                        {product_images.map((image, index)=>
                        <SwiperSlide key={index} >
                            <Image
                                width={50} height={50}  
                                loading='lazy'
                                onClick={() => handleThumbClick(index)}                         
                                className={`z-50 w-24 xl:w-36 h-auto hover:opacity-100  transition object-cover  ${currentIndex===index?'opacity-100':'opacity-50'} `} 
                                src={image} alt="" 
                            />        
                        </SwiperSlide>
                        )}
                    </div> 
                    </Swiper>       
                </div>           
            </div>
        }   
    </>
  );
}
