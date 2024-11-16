import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { giayData } from '@/Data/data';


const ProductGallery = ({product_images}) => {
    const pro_imgs = product_images
  return (
    <div>
        <Carousel 
            className=' '
            showArrows={true}
            showThumbs={true}
            showIndicators={false}
            infiniteLoop={true}
        >
            {pro_imgs.map((img,index)=>(
                <div key={index}>
                    <img   src={img} />           
                </div>
            ))}
                
        </Carousel>
    </div>
  )
}

export default ProductGallery