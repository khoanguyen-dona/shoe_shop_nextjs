'use client'

import React, { use } from 'react'
import { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

const EditProduct = () => {
    const[productName,setProductName]=useState('Adizero Sl 2')
    const[productLine,setProductLine]=useState('Adizero SL')
    const[price,setPrice]=useState(2600000)
    const[category,setCategory]=useState('Giày')
    const[size,setSize]=useState('6 US|6.5 US|7 US|7.5 US|8 US|8.5 US|9 US|9.5 US|10 US|10.5 US|11 US')
    const[thumbnail,setThumbnail]=useState('https://adidas.donawebs.com/wp-content/uploads/2024/11/ADIZERO_SL_trang_IG5941_HM3_hover.avif')
    const[imageGallery,setImageGallery]=useState([
            'https://adidas.donawebs.com/wp-content/uploads/2024/11/ADIZERO_SL_trang_IG5941_HM9-600x600.avif',
            'https://adidas.donawebs.com/wp-content/uploads/2024/11/ADIZERO_SL_trang_IG5941_HM8-600x600.avif',
            'https://adidas.donawebs.com/wp-content/uploads/2024/11/ADIZERO_SL_trang_IG5941_HM7-600x600.avif',
            'https://adidas.donawebs.com/wp-content/uploads/2024/11/ADIZERO_SL_trang_IG5941_HM6-600x600.avif',
            'https://adidas.donawebs.com/wp-content/uploads/2024/11/ADIZERO_SL_trang_IG5941_HM5-600x600.avif',
            'https://adidas.donawebs.com/wp-content/uploads/2024/11/ADIZERO_SL_trang_IG5941_HM4-600x600.avif'])

    const handleThumbnail = (e) => {
        const file = e.target.files[0]
        if(file){
            const imageURL = URL.createObjectURL(file)
            setThumbnail(imageURL)
        }
    }
    const handleImageGallery = (e) => {
        const files = Array.from(e.target.files)
        const imgUrls = files.map(f=>URL.createObjectURL(f))
        setImageGallery(imgUrls)
    }
    
    const handleRemoveImageGallery = (index) => {
        const imgs=imageGallery.filter((_, i) => i !== index)
        setImageGallery(imgs)
    }

  

  return (
    <div className='mt-20  flex flex-col ' >
        <p className='text-3xl font-bold' >
            Chỉnh sửa sản phẩm 
        </p>
        
        <form action="" className='flex flex-col space-y-4 mt-8' >

            <div>
                <p className='text-sm text-gray-500' >Tên sản phẩm</p>
                <input  className='border-2 p-2 w-1/3 ' type="text" 
                        onChange={(e)=>setProductName(e.target.value)} value={productName}   />
            </div>
            

            <div>
                <p className='text-sm text-gray-500' >Tên sản phẩm</p>
                <input  className='border-2 p-2 w-1/3 ' type="text" 
                    onChange={(e)=>setProductLine(e.target.value)} value={productLine}  />
            </div>

            <div>
                <p className='text-sm text-gray-500' >Category sản phẩm</p>
                <input  className='border-2 p-2 w-1/3 ' type="text" 
                    onChange={(e)=>setCategory(e.target.value)} value={category}  />
            </div>

            <div>
                <p className='text-sm text-gray-500' >Giá sản phẩm</p>
                <input  className='border-2 p-2 w-1/3 ' type="number" 
                    onChange={(e)=>setPrice(e.target.value)}  value={price} />
            </div>

            <div>
                <p className='text-sm text-gray-500' >Size sản phẩm</p>
                <textarea  className='border-2 p-2 w-1/3 ' type="text" 
                    onChange={(e)=>setSize(e.target.value)}  value={size} />
                <p className='text-red-500 text-sm' >Lưu ý mỗi Size cách nhau một dấu | Ví dụ : 6 US|7 US ...</p>
            </div>

            <div>
                <p className='font-bold  mt-4 mb-2' >Ảnh thumbnail </p>
                <label className='hover:text-white  border-[1px] font-semibold hover:bg-black p-2 transition border-black ' 
                        htmlFor="thumbnail">
                    Chọn ảnh
                    <input  className='hidden' type="file" id='thumbnail' onChange={handleThumbnail} />
                </label>
                
                {thumbnail.length>0 &&        
                    <img  className='w-32 mt-3 border-2' src={thumbnail}  />                                                                  
                } 
                
                
            </div>

            <div>
                <p className='font-bold mb-2 ' >Danh sách ảnh (album gallery)</p>
                <label className='hover:text-white  border-[1px] font-semibold hover:bg-black p-2 transition border-black' 
                    htmlFor="imageGallery">
                    Chọn ảnh
                <input  className='hidden' type="file" multiple onChange={handleImageGallery} id='imageGallery' />
                </label>

                {imageGallery.length>0 && 
                    <div className='flex flex-wrap space-x-1' >
                        {imageGallery.map((img,index)=>(
                            <div className='relative' key={index} >
                                <img  className='w-32 border-2  mt-3' src={img} alt="" />
                                <DeleteIcon  
                                    onClick={()=>handleRemoveImageGallery(index)}
                                    className='hover:bg-black text-gray-500  hover:text-white transition absolute top-4 right-0 z-20 ' 
                                />
                            </div>
                        ))}
                    </div>
                }
            </div>
            <button className='p-4 font-bold bg-black text-white hover:text-gray-500 transition w-[520px]' >
                Cập nhật
            </button>

        </form>
        
    </div>
  )
}

export default EditProduct