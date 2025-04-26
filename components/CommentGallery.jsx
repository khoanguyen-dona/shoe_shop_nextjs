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
export default function CommentGallery({ product_images}) {
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
        
        <div className="flex gap-2">
            {product_images?.map((image, index) => (
                <span  key={index} className=' '  >
                    <Image  
                            width={100} height={100}
                            loading='lazy'
                            onClick={() => handleImageClick(index)} 
                            src={image} alt={`Thumbnail ${index + 1}`} 
                            className='  w-32 h-24 md:h-32   rounded-xl object-cover hover:opacity-80 hover:cursor-pointer transition ' />
                </span>
            ))}
                  
        </div>

        {/* light box */}
        { isLightboxOpen &&
            <div className={` image-carousel z-50   `}  >
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
                        className='z-50 fixed left-1 top-[375px]  sm:top-[300px] md:top-[450px] lg:top-[500px] text-gray-500  transition  hover:text-gray-700  ' />
                }
                {    currentIndex < lastIndex && screenWidth<=1028 &&           
                    <ArrowForwardIosIcon  sx={{fontSize: '80px'}} onClick={handleNext}  
                        className='z-50 fixed right-0  top-[375px] sm:top-[300px] md:top-[450px] lg:top-[500px] text-gray-500  transition  hover:text-gray-700  ' />
                }
               
                <div className={`z-40 fixed top-0 left-0  bg-black w-screen h-screen   `} >
                    {/* Main Carousel */}
                    <Swiper                     
                        modules={[Navigation, Thumbs, Zoom, Keyboard, Controller]}
                        controller
                        zoom ={true}
                        keyboard
                        navigation = {true}
                        thumbs={{ swiper: thumbsSwiper }}
                        className="main-swiper w-full   xl:w-2/6 2xl:w-2/6  z-50 h-4/6 md:h-4/5  mt-[100px] xl:mt-0 mx-2 text-center   "
                        spaceBetween={2000}
                        slidesPerView={1}
                        onSwiper={(swiper) => (swiperRef.current = swiper)}    
                        initialSlide={currentIndex}
                        onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
                        lazy={true}
                    >   
              
                    {product_images?.map((image, index) => (            
                        <SwiperSlide className='w-full  xl:w-2/6 2xl:w-2/6  h-4/6 md:h-4/5 '  key={index}>
                            <Image 
                                    width={400} height={400} 
                                    onClick={() => handleImageClick(index)} loading='lazy'
                                    className=' z-50 w-full h-full object-cover   ' 
                                    src={image} alt={`Slide ${index + 1}`} />    
                        </SwiperSlide>
                    ))}  
                       
                    </Swiper>

                    {/* images thumb */}
                    <Swiper 
                        lazy={true}
                        spaceBetween={1} 
                        slidesPerView={10}
                        watchSlidesProgress
                        modules={[Thumbs]}
                        className='mt-2'
                    >
                    <div className='flex flex-wrap' >
                        {product_images.map((image, index)=>
                        <SwiperSlide key={index} className='' >
                            <Image  
                                width={100} height={100}  
                                loading='lazy'
                                onClick={() => handleThumbClick(index)}                         
                                className={`z-50  object-cover w-24 h-auto hover:opacity-100 transition  ${currentIndex===index?'opacity-100':'opacity-50'} `} 
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
