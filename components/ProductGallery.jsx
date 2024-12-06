import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';



const ProductGallery = ({thumbnail,product_images}) => {
    // const pro_imgs = product_images;
  return (
    <div>
        <Carousel 
            className=''
            showArrows={true}
            showThumbs={true}
            showIndicators={false}
            infiniteLoop={true}
        >   
        
                                   

            {product_images?.map((img, index)=>(
                <div key={index}>
                    <img   src={img} />           
                </div>
            ))}
       
                
        </Carousel>
    </div>
  )
}

export default ProductGallery