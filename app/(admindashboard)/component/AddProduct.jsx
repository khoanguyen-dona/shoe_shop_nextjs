'use client'

import React, { use } from 'react'
import { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

const AddProduct = () => {
    const[productname,setProductName]=useState('')
    const[productLine,setProductLine]=useState('')
    const[price,setPrice]=useState('')
    const[category,setCategory]=useState('')
    const[size,setSize]=useState('')
    const[thumbnail,setThumbnail]=useState('')
    const[imageGallery,setImageGallery]=useState('')

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
            Add Product
        </p>
        
        <form action="" className='flex flex-col space-y-4 mt-8' >

            <div>
                <p className='text-sm text-gray-500' >Tên sản phẩm</p>
                <input  className='border-2 p-2 w-1/3 ' type="text" placeholder='Tên sản phẩm' 
                        onChange={(e)=>setProductName(e.target.value)}   />
            </div>
            

            <div>
                <p className='text-sm text-gray-500' >Tên sản phẩm</p>
                <input  className='border-2 p-2 w-1/3 ' type="text" placeholder='' 
                    onChange={(e)=>setProductLine(e.target.value)}   />
            </div>

            <div>
            <p className='text-sm text-gray-500' >Category sản phẩm</p>
                <input  className='border-2 p-2 w-1/3 ' type="text" placeholder='' 
                    onChange={(e)=>setCategory(e.target.value)}   />
            </div>

            <div>
                <p className='text-sm text-gray-500' >Giá sản phẩm</p>
                <input  className='border-2 p-2 w-1/3 ' type="number" placeholder='' 
                    onChange={(e)=>setPrice(e.target.value)}   />
            </div>

            <div>
                <p className='text-sm text-gray-500' >Size sản phẩm</p>
                <input  className='border-2 p-2 w-1/3 ' type="text" placeholder='' 
                    onChange={(e)=>setSize(e.target.value)}   />
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

            <div className='' >
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
                                    className='hover:bg-black text-gray-500  hover:text-white transition absolute top-4 right-0' 
                                />
                            </div>
                        ))}
                    </div>
                }
            </div>
            <button 
                onClick=''
                className='mt-10 p-4 bg-black font-bold text-white hover:text-gray-500 transition w-[520px]' >
                Thêm 
            </button>

        </form>
        
    </div>
  )
}

export default AddProduct