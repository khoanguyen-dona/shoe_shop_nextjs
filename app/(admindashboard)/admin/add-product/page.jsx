'use client'

import { publicRequest, userRequest } from '@/requestMethod'
import { useParams } from 'next/navigation'
import React from 'react'
import { useState, useEffect } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import Loader from '@/components/Loader'
import SuccessPopup from '@/components/Popup/SuccessPopup'
 import {
    getStorage,
    ref,
    uploadBytesResumable,
    uploadBytes,
    getDownloadURL,
  } from "firebase/storage";
import app from '@/firebase'

const AddProduct = () => {
    const [notifySuccess, setNotifySuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [productName, setProductName] = useState('')
    const [productLine, setProductLine] = useState('')
    const [price, setPrice] = useState('')

    const [formCategory, setFormCategory] = useState('')
    var category = []

    const [formSize, setFormSize] = useState('')
    var size = []

    const [formColor, setFormColor] = useState('')
    var color = []

    
    const [thumbnail, setThumbnail] = useState('')
    const [thumbnailFile, setThumbnailFile] = useState('')
   
    const [imageGallery, setImageGallery] = useState([])
    const [imageGalleryFile, setImageGalleryFile] = useState([])
    var imageGalleryUrl = []

    // console.log('img gal file ->',imageGalleryFile)
    // console.log('img gal',imageGallery)

    const [desc, setDesc] = useState('')

    // handle from string to array
    formCategory.split(',').map((item)=> {
        item = item.trim()
        category.push(item)
    })

    formSize.split(',').map((item)=> {
        item = item.trim()
        size.push(item)
    })

    formColor.split(',').map((item)=> {
        item = item.trim()
        color.push(item)
    })

    // handle choose thumbnail 
    const handleThumbnail = (e) => {
        const file = e.target.files[0]
        setThumbnailFile(file)
        if(file){
            const imageURL = URL.createObjectURL(file)
            setThumbnail(imageURL)
        }
    }

    const handleRemoveThumbnail = () => {
        setThumbnail('')
    }

    // handle choose image gallery
    const handleImageGallery = (e) => {
        const files = Array.from(e.target.files)
        setImageGalleryFile(files)
        const imgUrls = files.map(f=>URL.createObjectURL(f))
        setImageGallery(imgUrls)
    }
    
    const handleRemoveImageGallery = (index) => {
        const imgs=imageGallery.filter((_, i) => i !== index)
        const files = imageGalleryFile.filter((_, i)=> i !==index)
        setImageGallery(imgs)
        setImageGalleryFile(files)
    }
    // close the popup
    const handleClosePopup = () => {
        setNotifySuccess(false)
    }

    // upload image gallery to firebase then push to imageGalleryUrl[]
    const handleUploadImageGallery = async () => {

        const storage = getStorage(app);

        for(let image of imageGalleryFile) {
            let imageName = new Date().getTime() + image.name
            let imageRef = ref(storage, `upload/${imageName}`)
            try{
                await uploadBytes(imageRef, image)
                const imgGallery_URL = await getDownloadURL(imageRef)
                imageGalleryUrl.push(imgGallery_URL)
            } catch (err){
                console.log('error loading file', err)
            }
        }
        console.log('upload img gallery url: ', imageGalleryUrl)
    }

    // upload thumbnail to firebase , take the thumbnail url  then create product. 
    const handleUploadThumbnail = async () => {
        const storage = getStorage(app)
        let imageName = new Date().getTime() + thumbnailFile.name
        let imageRef = ref(storage, `upload/${imageName}`)
            try{
                await uploadBytes(imageRef, thumbnailFile)
                const thumbnail_URL = await getDownloadURL(imageRef)
                handleCreateProduct(thumbnail_URL)
            } catch (err){
                console.log('error uploading thumbnail', err)
            }
        
    }

    const handleSubmit = async (e) => {         
        e.preventDefault()
        setLoading(true)
        await handleUploadImageGallery()
        await handleUploadThumbnail()
        setLoading(false)
        
    }

    // create product .
    const handleCreateProduct = async (thumbnail_URL) => {
        console.log('da vao day')
        try{
            const res = await userRequest.post('/product', {
                name: productName,
                productLine: productLine,
                desc: desc ,
                thumbnail: thumbnail_URL ,
                imgGallery: imageGalleryUrl,  
                categories: category ,
                size: size,
                color: color,
                price: price
            })
            if(res.data){
                setNotifySuccess(true)
                setTimeout(()=>{
                    setNotifySuccess(false)
                }, 3000)
                console.log('-->create product success',res.data.product)
                
            }
        }catch(err) {
            console.log('error handle create product',err)
        }
    }

  return (
    <div className={`mt-20  flex flex-col  ${loading?'bg-white opacity-50':''} `} >
        {loading ?  <div className='flex justify-center  ' >  <Loader  color={'inherit'} />  </div> : ''}
         {notifySuccess ? 
            <div  className='flex justify-center p-4' > 
                <SuccessPopup  message={'Add product Successfully!'}  handleClosePopup={handleClosePopup}   /> 
            </div>  : '' }
        <p className='text-3xl font-bold' >
            Thêm sản phẩm 
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
                    onChange={(e)=>setFormCategory(e.target.value)} value={formCategory}  />
            </div>

            <div>
                <p className='text-sm text-gray-500' >Giá sản phẩm</p>
                <input  className='border-2 p-2 w-2/3 ' type="number" 
                    onChange={(e)=>setPrice(e.target.value)}  value={price} />
            </div>

            <div>
                <p className='text-sm text-gray-500' >Size sản phẩm</p>
                <textarea  className='border-2 p-2 w-2/3 ' type="text" 
                    onChange={(e)=>setFormSize(e.target.value)}  value={formSize} />
                <p className='text-red-500 text-sm' >Lưu ý mỗi Size cách nhau một dấu ',' Ví dụ : 6 US,7 US ...</p>
            </div>

            <div>
                <p className='text-sm text-gray-500' >Màu sản phẩm</p>
                <textarea  className='border-2 p-2 w-2/3 ' type="text" 
                    onChange={(e)=>setFormColor(e.target.value)}  value={formColor} />
                <p className='text-red-500 text-sm' >Lưu ý mỗi Color cách nhau một dấu ',' Ví dụ : black,white,blue ...</p>
            </div>

            <div>
                <p className='text-sm text-gray-500' >Mô tả sản phẩm</p>
                <textarea  className='border-2 p-2 w-2/3 ' rows='9' type="text" 
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

            <button  onClick={handleSubmit} className='p-4 font-bold bg-black text-white hover:text-gray-500 transition w-2/3' >
                Submit
            </button>

        </form>
        
    </div>
  )
}

export default AddProduct