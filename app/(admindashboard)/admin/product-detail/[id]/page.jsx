'use client'

import { publicRequest } from '@/requestMethod'
import { useParams } from 'next/navigation'
import React from 'react'
import { useState, useEffect } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

const ProductDetail = () => {

    const product_id = useParams().id

    useEffect (() => {
        const getProduct = async () => {
             try {
                 const res = await publicRequest.get(`/product/${product_id}`)
                if(res.data){
                 setProduct(res.data)
                 setProductName(res.data.name)
                //  setProductLine(res.data.productLine)
                setPrice(res.data.price)
                setCategory(res.data.categories)
                setSize(res.data.size)
                setColor(res.data.color)
                setThumbnail(res.data.thumbnail)
                setImageGallery(res.data.imgGallery)
                setDesc(res.data.desc)
                }
             } catch {}
        }
        getProduct();
}, [product_id])

    

    const [product, setProduct] = useState({})
    const [productName, setProductName] = useState('')
    const [productLine, setProductLine] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [size, setSize] = useState('')
    const [color, setColor] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [imageGallery, setImageGallery] = useState('')
    const [desc, setDesc] = useState('')

    
    
    // console.log('-->',price)

    const handleThumbnail = (e) => {
        const file = e.target.files[0]
        if(file){
            const imageURL = URL.createObjectURL(file)
            setThumbnail(imageURL)
        }
    }

    const handleRemoveThumbnail = () => {
        setThumbnail('')
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
                <input  className='border-2 p-2 w-2/3 ' type="text" 
                        onChange={(e)=>setProductName(e.target.value)} value={productName}   />
            </div>
            

            <div>
                <p className='text-sm text-gray-500' >Dòng sản phẩm</p>
                <input  className='border-2 p-2 w-2/3 ' type="text" 
                    onChange={(e)=>setProductLine(e.target.value)} value={productLine}  />
            </div>

            <div>
                <p className='text-sm text-gray-500' >Category sản phẩm</p>
                <input  className='border-2 p-2 w-1/3 ' type="text" 
                    onChange={(e)=>setCategory(e.target.value)} value={category}  />
            </div>

            <div>
                <p className='text-sm text-gray-500' >Giá sản phẩm</p>
                <input  className='border-2 p-2 w-2/3 ' type="number" 
                    onChange={(e)=>setPrice(e.target.value)}  value={price} />
            </div>

            <div>
                <p className='text-sm text-gray-500' >Size sản phẩm</p>
                <textarea  className='border-2 p-2 w-2/3 ' type="text" 
                    onChange={(e)=>setSize(e.target.value)}  value={size} />
                <p className='text-red-500 text-sm' >Lưu ý mỗi Size cách nhau một dấu ',' Ví dụ : 6 US,7 US ...</p>
            </div>

            <div>
                <p className='text-sm text-gray-500' >Màu sản phẩm</p>
                <textarea  className='border-2 p-2 w-2/3 ' type="text" 
                    onChange={(e)=>setColor(e.target.value)}  value={color} />
                <p className='text-red-500 text-sm' >Lưu ý mỗi màu cách nhau một dấu ',' Ví dụ : black,white,blue ...</p>
            </div>

            <div>
                <p className='text-sm text-gray-500' >Mô tả sản phẩm</p>
                <textarea  className='border-2 p-2 w-2/3  ' rows='9'  type="text" 
                    onChange={(e)=>setDesc(e.target.value)}  value={desc} />
         
            </div>

            <div>
                <p className='font-bold  mt-4 mb-2' >Ảnh thumbnail </p>
                <label className='hover:text-white  border-[1px] font-semibold hover:bg-black p-2 transition border-black ' 
                        htmlFor="thumbnail">
                    Chọn ảnh
                    <input  className='hidden' type="file" id='thumbnail' onChange={handleThumbnail} />
                </label>
                
                {thumbnail.length>0    &&   
                <div className=' w-32 relative' >
                    <img  className=' mt-3 border-2' src={thumbnail}  />  
                    <DeleteIcon  
                            onClick={handleRemoveThumbnail} 
                            className='z-30 absolute top-1 text-gray-500 right-0  hover:text-black '   />                                                                
                </div>
                } 
                
                
            </div>

            <div>
                <p className='font-bold mb-2 ' >Danh sách ảnh (album gallery)</p>
                <label className='hover:text-white  border-[1px] font-semibold hover:bg-black p-2 transition border-black' 
                    htmlFor="imageGallery">
                    Chọn ảnh
                    <input  className='hidden' type="file" multiple onChange={handleImageGallery} id='imageGallery' />
                </label>

                {imageGallery.length>0   &&
                    <div className='flex flex-wrap space-x-1' >
                        {imageGallery.map((img, index)=>(
                            <div className='relative' key={index} >
                                <img  className='w-32 border-2  mt-3' src={img} alt="" />
                                <DeleteIcon  
                                    onClick={()=>handleRemoveImageGallery(index)}
                                    className='hover:text-black text-gray-500  transition absolute top-4 right-0 z-20 ' 
                                />
                            </div>
                        ))}
                    </div>
                }
            </div>
            <button className='p-4 font-bold bg-black text-white hover:text-gray-500 transition w-2/3' >
                Update
            </button>

        </form>
        
    </div>
  )
}

export default ProductDetail