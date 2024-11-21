'use client'
import React from 'react'
import { useParams } from 'next/navigation';
import ProductGallery from '@/components/ProductGallery';
import { giayData } from '@/Data/data'; 
import { useState } from 'react';
import { FormatCurrency } from '@/utils/FormatCurrency';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const ProductDetail = () => {
    const size_data = ['5 US','5.5 US','6 US','6.5 US','7 US','7.5 US','8 US','8.5 US','9 US','9.5 US','10 US','10.5 US','11 US']
    const color_data = ['https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/73f271fa2fb24c4cbd2ce0063da51a5a_9366/Giay_Ultraboost_5_DJen_ID8812_HM1.jpg',
      'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/ff67e3405f7f46eca232d3aa4e0b78e9_9366/Giay_Ultraboost_5_trang_ID8810_HM1.jpg',
      'https://adidas.donawebs.com/wp-content/uploads/2024/11/Giay_Ultraboost_Light_trang_GY9350_HM1.avif',
      'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/bb05aaabce844850a56ad18ce7a364c8_9366/Giay_Ultraboost_5_trai_cam_IF1484_HM1.jpg']
    
    const product_images = giayData[0].imgs
    const productId = useParams().id

    const [size,setSize]=useState('8 US')
    const [color,setColor]=useState('https://adidas.donawebs.com/wp-content/uploads/2024/11/Giay_Ultraboost_Light_trang_GY9350_HM1.avif')

  return (
    <div className='px-32  ' >
      {/* <div>produc_id là : {productId} </div> */}
      <div className='flex  mt-20  ' >
        {/* product image gallery */}
        <div className=' w-2/4 ' > 
          <ProductGallery product_images={product_images} />
        </div>
        {/* product short desciption */}
        <div className='w-2/3 px-10 py-5  space-y-3' >
          <div className='text-4xl font-bold' > Ultraboost Light</div>
          <div className='text-2xl font-bold' > {FormatCurrency(2600000)} đ </div>
          <div> NĂNG LƯỢNG VƯỢT TRỘI. THANH THOÁT TRÊN CHÂN.
          Trải nghiệm nguồn năng lượng vượt trội với giày Ultraboost Light mới, phiên bản Ultraboost nhẹ nhất 
          của chúng tôi. Sự kỳ diệu nằm ở đế giữa Light BOOST, thế hệ mới của đệm adidas BOOST. Thiết kế phân 
          tử độc đáo của mẫu giày này đạt đến chất liệu mút xốp BOOST nhẹ nhất từ trước đến nay. Với hàng trăm 
          hạt BOOST bùng nổ năng lượng cùng cảm giác êm ái và thoải mái tột đỉnh, đôi chân bạn thực sự sẽ được 
          trải nghiệm tất cả.</div>
          <hr />
          {/* size */}
          <div className='font-bold' > 
            Size : {size} 
          </div>
          <div className='  flex flex-wrap  '>
            {size_data.map((s,index)=>(
                <span 
                  key={index}
                  onClick={()=>setSize(s)}
                  className = {` border-gray-400 border-4  text-center transition rounded py-2 ml-1 mt-1 w-20 h-12 hover:border-gray-500
                    ${s===size?'bg-black border-4 border-black text-white ':''} `} 
                >
                  {s}
                </span>
              ))
            }            
          </div>
          {/* color */}
          <div className='font-bold' >
            Color : White
          </div>
          <div className='flex flex-swap' >
            {color_data.map((c,index)=>(
              <img 
              onClick={()=>setColor(c)}
              className={`object-cover ml-1 mt-1 hover:border-gray-500 hover:border-4 transition rounded ${c===color?'border-black border-4':'' } `}
              key={index} width='80px'  
              src={c} alt="" />
            ))}
          </div>
          {/* add to cart */}
          <div className='flex  ' >
            <div className='border-gray-500 border-4 mr-1 flex p-1 ' >
              <span className='hover:bg-black hover:text-white transition' ><RemoveIcon sx={{fontSize:50}} /></span>
              <span className='text-4xl py-1 font-bold ' >2</span>
              <span className='hover:bg-black hover:text-white transition ' ><AddIcon sx={{fontSize:50}} /></span>
            </div>
            <button className='bg-black text-white font-bold text-2xl p-3  w-2/5 hover:text-gray-500 transition ' >Add to cart</button>
            <button className='px-5 border-gray-500 ml-1 border-4 hover:border-gray-black hover:border-black transition ' ><FavoriteBorderIcon sx={{fontSize:40}} /></button>
          </div>
         
          
            
        </div>

      </div>
      <div className='border-b-2 mt-2 border-black mx-96' ></div>
      {/* Product description  */}
      <div className='mt-10' >
            <h1 className='text-4xl font-bold text-center' >  Mô tả</h1>
            <h1>Đôi giày chạy bộ cự ly ngắn, có sử dụng chất liệu tái chế.</h1>
            <h1>NĂNG LƯỢNG VƯỢT TRỘI. THANH THOÁT TRÊN CHÂN.</h1>
            <p>Trải nghiệm nguồn năng lượng vượt trội với giày Ultraboost Light mới, phiên bản Ultraboost nhẹ nhất của 
              chúng tôi. Sự kỳ diệu nằm ở đế giữa Light BOOST, thế hệ mới của đệm adidas BOOST. Thiết kế phân tử độc đáo
               của mẫu giày này đạt đến chất liệu mút xốp BOOST nhẹ nhất từ trước đến nay. Với hàng trăm hạt BOOST bùng 
               nổ năng lượng cùng cảm giác êm ái và thoải mái tột đỉnh, đôi chân bạn thực sự sẽ được trải nghiệm tất cả.</p>
            <h2>Thông tin chi tiết</h2>
            <div>
            Dáng regular fit
            Có dây giày
            Thân giày bằng vải dệt adidas PRIMEKNIT+
            Lớp lót bằng vải dệt
            Hệ thống Linear Energy Push
            Đệm Light BOOST
            Trọng lượng: 299 g (size U.K. 8.5)
            Độ dày đế giữa: 10 mm (độ cao gót giày: 22 mm, độ cao mũi giày: 12 mm)
            Đế ngoài Continental™ Better Rubber
            Thân giày làm từ sợi dệt có chứa tối thiểu 50% chất liệu Parley Ocean Plastic và 50% polyester tái chế / Mỗi đôi giảm tối thiểu 10% phát thải so với phiên bản trước
            Màu sản phẩm: Cloud White / Cloud White / Crystal White
            </div>
      </div>
        
    
    </div>
  )
}

export default ProductDetail