'use client'

import { useRouter } from 'next/navigation'
import { userRequest } from '@/requestMethod'
import { publicRequest } from '@/requestMethod'
import { useParams } from 'next/navigation'
import React from 'react'
import { useState, useEffect } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import Loader from '@/components/Loader'
import SuccessPopup from '@/components/Popup/SuccessPopup'
 import {
    getStorage,
    ref,
    deleteObject,
    uploadBytesResumable,
    uploadBytes,
    getDownloadURL,
  } from "firebase/storage";
import app from '@/firebase'

const ProductDetail = () => {

   
    const router = useRouter()
    const storage = getStorage(app);
    const [notifySuccess, setNotifySuccess]= useState(false)
    const [loading, setLoading] = useState(true)
    const product_id = useParams().id

    const [product, setProduct] = useState({})

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

    const [inStock, setInStock] = useState('')

    const [desc, setDesc] = useState('')

     // handle from string to array
    String(formCategory).split('|').map((item)=> {
        item = item.trim()
        category.push(item)
    })

    String(formSize).split('|').map((item)=> {
        item = item.trim()
        size.push(item)
    })

    String(formColor).split('|').map((item)=> {
        item = item.trim()
        color.push(item)
    })

    useEffect (() => {
        var cat =''
        var size =''
        var color = ''
        const getProduct = async () => {
             try {
                 const res = await publicRequest.get(`/product/${product_id}`)
                if(res.data){       
                    cat = String(res.data.categories).split(',').join('|')
                    size = String(res.data.size).split(',').join('|')
                    color = String(res.data.color).split(',').join('|')
                    setProduct(res.data)
                    setProductName(res.data.name)
                    setProductLine(res.data.productLine)
                    setDesc(res.data.desc)
                    setThumbnail(res.data.thumbnail)
                    setImageGallery(res.data.imgGallery)
                    setFormCategory(cat)
                    setFormSize(size)
                    setFormColor(color)
                    setPrice(res.data.price)
                    setInStock(res.data.inStock)

                    setLoading(false)    
                }
             } catch {}
        }
        getProduct();
}, [])
   


   

    // handle choose thumbnail
    const handleThumbnail = (e) => {
        const file = e.target.files[0]
        setThumbnailFile(file)
        if(file){
            const imageURL = URL.createObjectURL(file)
            setThumbnail(imageURL)
        }
    }

    const handleRemoveThumbnail = async () => {
        setThumbnail('')
        setThumbnailFile('')
        setLoading(true)
        const imageRef = ref(storage, thumbnail);
        // delete thumbnail in firebase
        try {
            await deleteObject(imageRef);
            
        } catch (error) {
            console.error("Error deleting image in firebase:", error);           
        }
        // delete thumbnail in mongo db
        try {
            const res = await userRequest.put(`/product/${product_id}`,{
                thumbnail: ''
            })
            if(res.data){
                setLoading(false)
                setNotifySuccess(true)
                setTimeout(()=> {
                    setNotifySuccess(false)
                },3000)

            }
        } catch (err) {
            console.log('err delete in mongo ',err)
        }
        
    }
    // handle choose image gallery
    const handleImageGallery = (e) => {
        const files = Array.from(e.target.files)
        setImageGalleryFile(files)
        const imgUrls = files.map(f=>URL.createObjectURL(f))
        setImageGallery(imgUrls)
    }
    
    const handleRemoveImageGallery = async (index, imgUrl) => {
        setLoading(true)
        

        const imgs=imageGallery.filter((_, i) => i !== index)
        setImageGallery(imgs)

        if (imageGalleryFile !== ''){
            const files = imageGalleryFile.filter((_, i)=> i !==index)
            setImageGalleryFile(files)
        }

        const imageRef = ref(storage, imgUrl);
        // delete image in firebase
        try {
            await deleteObject(imageRef);
        } catch (error) {
            console.error("Error deleting image:", error);           
        }
        //delete imageGallery in mongo 
        try {
            const res = await userRequest.put(`/product/${product_id}`,{
                imgGallery: imgs
            })
            if(res.data){
                setLoading(false)
                setNotifySuccess(true)
                setTimeout(()=> {
                    setNotifySuccess(false)
                },3000)

            }
        } catch (err) {
            console.log('err delete in mongo ',err)
        }
       
    }
    // close the popup
    const handleClosePopup = () => {
        setNotifySuccess(false)
    }

    
    // upload image gallery to firebase then push to imageGalleryUrl[]
    const handleUploadImageGallery = async () => {

        for(let file of imageGalleryFile) {
            let imageName = new Date().getTime() + file.name
            let imageRef = ref(storage, `upload/${imageName}`)
            try{
                await uploadBytes(imageRef, file)
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
    
        let imageName = new Date().getTime() + thumbnailFile.name
        let imageRef = ref(storage, `upload/${imageName}`)
            try{
                if ( thumbnailFile.length !== 0){

                    await uploadBytes(imageRef, thumbnailFile)
                    const thumbnail_URL = await getDownloadURL(imageRef)
                    handleUpdateProduct(thumbnail_URL)
                } else {
                    handleUpdateProduct(thumbnail)
                }
            } catch (err){
                console.log('error uploading thumbnail', err)
            }
        
    }
    // update product .
    const handleUpdateProduct = async (thumbnail_URL) => {
        try{
            if(imageGalleryUrl.length >0  ){
                const res = await userRequest.put(`/product/${product_id}`, {
                    name: productName,
                    productLine: productLine,
                    desc: desc ,
                    thumbnail: thumbnail_URL  ,
                    imgGallery: imageGalleryUrl ,  
                    categories: category ,
                    size: size,
                    color: color,
                    price: price ,
                    inStock: inStock
                    
                })
                if(res.data){
                
                    setNotifySuccess(true)
                }
            } else {
                const res = await userRequest.put(`/product/${product_id}`, {
                    name: productName,
                    productLine: productLine,
                    desc: desc ,
                    thumbnail: thumbnail_URL  ,  
                    categories: category ,
                    size: size,
                    color: color,
                    price: price,
                    inStock: inStock
                    
                })
                if(res.data){
              
                    setNotifySuccess(true)
                }
            }
        }catch(err) {
            console.log('error handle create product',err)
        }
    }
    // handle submit
    const handleSubmit = async (e) => {         
        e.preventDefault()
        setLoading(true)
        if ( imageGalleryFile.length !== 0) {
            await handleUploadImageGallery()
        }
               
        await handleUploadThumbnail()
        
        setLoading(false)
        router.refresh()
        setTimeout(()=>{
            setNotifySuccess(false)
        }, 3000)
    }

  return (
   
    <div className={` mt-20  flex flex-col mb-20   ${loading?'bg-white opacity-50':''}  `} >
        <p className='text-3xl font-bold' >
            Chi tiết sản phẩm 
        </p>
        {loading ?  <div className='flex justify-center  ' >  <Loader  color={'inherit'} />  </div> : ''}
        {notifySuccess ? 
            <div  className='flex justify-center p-4' > 
                <SuccessPopup  message={'Update Successfully!'}  handleClosePopup={handleClosePopup}   /> 
            </div>  : '' }
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
                <p className='text-red-500 text-sm mt-2' >Lưu ý mỗi category cách nhau một dấu '|' Ví dụ : black|white|blue ...</p>   
            </div>

            <div>
                <p className='text-sm text-gray-500' >Giá sản phẩm (vnđ)</p>
                <input  className='border-2 p-2 w-2/3 ' type="number" 
                    onChange={(e)=>setPrice(e.target.value)}  value={price} />
            </div>

            <div>
                <p className='text-sm text-gray-500' >Size sản phẩm</p>
                <textarea  className='border-2 p-2 w-2/3 ' type="text" 
                    onChange={(e)=>setFormSize(e.target.value)}  value={formSize} />
                <p className='text-red-500 text-sm ' >Lưu ý mỗi Size cách nhau một dấu '|' Ví dụ : 6 US|7 US ...</p>
            </div>

            <div>
                <p className='text-sm text-gray-500' >Màu sản phẩm</p>
                <textarea  className='border-2 p-2 w-2/3 ' type="text" 
                    onChange={(e)=>setFormColor(e.target.value)}  value={formColor} />
                <p className='text-red-500 text-sm' >Lưu ý mỗi màu cách nhau một dấu '|' Ví dụ : black|white|blue ...</p>
            </div>

            <div>
                <p className='text-sm text-gray-500' >Mô tả sản phẩm</p>
                <textarea  className='border-2 p-2 w-2/3  ' rows='9'  type="text" 
                    onChange={(e)=>setDesc(e.target.value)}  value={desc} />
         
            </div>
            
           

          <div className='space-y-2 flex flex-col ' >
            <p className='font-bold' >Trạng thái sản phẩm</p>
            <select value={inStock} className={`rounded-lg p-2 border-2 w-32 ${String(inStock)==='true'?'text-green-500':'text-red-500'} `} 
                    name="inStock" id="inStock" 
                    onChange={(e)=>setInStock(e.target.value)} >
                <option   className='text-green-500' value="true">Còn hàng</option>
                <option  className='text-red-500'  value="false">Hết hàng</option>
            </select>
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
                                    onClick={()=>handleRemoveImageGallery(index, img)}
                                    className='hover:text-black text-gray-500  transition absolute top-4 right-0 z-20 ' 
                                />
                            </div>
                        ))}
                    </div>
                }
            </div>
            <button 
                onClick = {handleSubmit}
                className='p-4 font-bold bg-black text-white hover:text-gray-500 transition w-2/3 mb-30' >
                    Update
            </button>

        </form>
        
    </div>
    
  )
}

export default ProductDetail