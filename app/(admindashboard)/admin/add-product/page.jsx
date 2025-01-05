'use client'

import { publicRequest, userRequest } from '@/requestMethod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useState, useEffect } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import Loader from '@/components/Loader'
import SuccessPopup from '@/components/Popup/SuccessPopup'
import SelectPopup from '../../component/SelectPopup'
import DoneIcon from '@mui/icons-material/Done';
 import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
  } from "firebase/storage";
import app from '@/firebase'

const AddProduct = () => {
    const router = useRouter()
    const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
    const currentUser = user && JSON.parse(user).currentUser
    console.log('curr',currentUser)
    const [notifySuccess, setNotifySuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [productName, setProductName] = useState('')
    const [productLine, setProductLine] = useState('')
    const [price, setPrice] = useState('')
    const [desc, setDesc] = useState('')

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

    const [productLinesSuggest, setProductLinesSuggest] = useState([])
    const [productLinesPopup, setProductLinesPopup] = useState(false)
    var productLines = []
    
    const [sizePopup, setSizePopup] = useState(false)
    const [attribute_Size, setAttribute_Size] = useState('')
    const [attributes, setAttributes] = useState([])

    const [attributesName, setAttributesName] = useState([])
    var attrsName = []

    const [colorsPopup, setColorsPopup] = useState(false)
    const [attribute_Color, setAttribute_Color] = useState('')
  
    const [categoriesPopup, setCategoriesPopup] = useState(false)
    const [categoryList, setCategoryList] = useState([])
   
    const [categoryChoose, setCategoryChoose] = useState([])
    var categories = []
    const [subCategories, setSubCategories] = useState([])
    var subCatArray = []

    // fetching productLines
    useEffect(() => {
        setLoading(true)
        const getProductLines = async () => {
            try {
                const res = await publicRequest.get('/product-line')
                if(res.data){
                    
                    res.data.productLines.map((item)=> {
                        productLines.push(item.name)
                    })
                    setProductLinesSuggest(productLines)
               
                                             
                    setLoading(false)
                }
            } catch(err){
                console.log('err while fetching product lines', err)
            }
        }
        getProductLines()
    }, [])
  
    // fetching categories
    useEffect(() => {
        setLoading(true)
        const getCategories = async () => {
            try {
                const res = await publicRequest.get('/category')
                if(res.data){
                    res.data.categories.map((item) =>  {
                        categories.push(item.name)
                        const getSubCategories = async () => {    
                            const res2 = await publicRequest.get(`/sub-category/${item._id}`)
                            if(res2.data){
                                res2.data.subCategory.map((subCat)=> {
                                    categories.push(subCat.name)
                                    subCatArray.push(subCat.name)
                                })
                            }
                        }
                        getSubCategories()
                    })
                }
                setSubCategories(subCatArray)
                setCategoryList(categories)
                setLoading(false)
            
            } catch(err){
                console.log('err while fetching categories', err)
            }
        }
        getCategories()
    }, [])
    // fetching attrs
    useEffect(() => {
        setLoading(true)
        const getAttributes = async () => {
            try {
                
                const res = await publicRequest.get('/attribute')
                if(res.data){
                   setAttributes(res.data.attributes)
                    res.data.attributes.map((item)=> {
                        attrsName.push(item.name)
                        setAttributesName(attrsName)
                    })
                }
                setLoading(false)
            
            } catch(err){
                console.log('err while fetching attributes', err)
            }
        }
        getAttributes()
    }, [])

    

    // handle from string to array
    formCategory.split(',').map((item)=> {
        item = item.trim()
        category.push(item)
    })

    formSize.split('|').map((item)=> {
        item = item.trim()
        size.push(item)
    })

    formColor.split('|').map((item)=> {
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
        
                
            }
        }catch(err) {
            console.log('error handle create product',err)
        }
    }

    // Handle click outside the popup
    const handleClickOutside = (e) => {      
        if(e.target.value===undefined ){  
            setSizePopup(false)
            setColorsPopup(false)     
            setProductLinesPopup(false); // Close the popup
            setCategoriesPopup(false)
        }         
    };

    const handleChooseProductLine = (productLine) => {
        setProductLinesPopup(!productLinesPopup)
        setProductLine(productLine)
    }
 
    const handleChooseSize = (attributeName) => {
        let size =''
        let att =[]
        setSizePopup(true)
        setAttribute_Size(attributeName)
        att = attributes.filter((item)=> item.name === attributeName)
        size = String(att[0].item).split(',').join('|')
        setFormSize(size)
    }

    const handleChooseColor = (attributeName) => {
        let color =''
        let att =[]
        setColorsPopup(true)
        setAttribute_Color(attributeName)
        att = attributes.filter((item)=> item.name === attributeName)
        color = String(att[0].item).split(',').join('|')
        setFormColor(color)
    }

    const handleChooseCategory = async (category) => {
        
        if(categoryChoose.includes(category)){
              setCategoryChoose( categoryChoose.filter((cat) => cat !== category) )
              let catArray = String(categoryChoose.filter((cat) => cat !== category))
              setFormCategory(catArray)
        } else {
            categoryChoose.push(category)
            let catArray = String(categoryChoose)
            setFormCategory(catArray)
        }   
    }

        console.log('cat choose',categoryChoose)
        console.log('form cat',formCategory)
        console.log('cat list',categoryList)
        console.log('pro sug',productLinesSuggest)
  return (
    <>
    { currentUser?.isAdmin === true ? 
    <div className={`mt-20  flex flex-col  ${loading?'bg-white opacity-50':''} `} onClick={handleClickOutside} >
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
            

            <div className='relative' >
                <p className='text-sm text-gray-500' >Dòng sản phẩm</p>
                <input  className='border-2 p-2 w-2/3 overflow-auto ' type="text" 
                        onClick={()=>setProductLinesPopup(true)}
                        onChange={(e)=>setProductLine(e.target.value)} value={productLine}  />
                {productLinesPopup &&
                    <SelectPopup data={productLinesSuggest} handleClick={handleChooseProductLine} itemChoose={productLine} />
                }
            
        
            </div>

            <div className='relative' >
                <p className='text-sm text-gray-500' >Category sản phẩm</p>
                <input  className='border-2 p-2 w-2/3 ' type="text" onClick={()=>setCategoriesPopup(true)} spellCheck='false'
                    onChange={(e)=>setFormCategory(e.target.value)} value={formCategory}  />

                    {categoriesPopup &&
                        <div className={` absolute top-18 left-0 z-40 bg-white text-left p-2 w-auto  overflow-auto  shadow-2xl rounded-md border-2 border-gray-300 
                            ${ categoryList.length>20 ? 'h-[500px]':'h-auto'} `}   >
                            {categoryList.sort()?.map((item, index)=> 
                            <div key={index} className='space-x-2' >
                                {subCategories.includes(item)?
                                <span className='ml-4' >-</span>
                                :''}
                                <input type='checkbox' 
                                    defaultChecked={categoryChoose.includes(item)}
                                    onClick = {()=>handleChooseCategory(item)} 
                                    key={index} 
                                    className={`hover:bg-gray-300 p-1 hover:cursor-pointer rounded-md 
                                        `} 
                                    
                                />
                                <span className='ml-2' >
                                    {item}
                                </span>

                                                           
                            </div>
                            )
                    
                            }
                        </div>
                }
            </div>

            <div>
                <p className='text-sm text-gray-500' >Giá sản phẩm (vnđ)</p>
                <input  className='border-2 p-2 w-2/3 ' type="number" 
                    onChange={(e)=>setPrice(e.target.value)}  value={price} />
            </div>

            <div className='relative' >
                <p className='text-sm text-gray-500' >Size sản phẩm</p>
                <textarea  className='border-2 p-2 w-2/3 ' type="text" onClick={()=>setSizePopup(true)}
                    onChange={(e)=>setFormSize(e.target.value)}  value={formSize} spellCheck="false" />
                {sizePopup &&
                    <SelectPopup data={attributesName} handleClick={handleChooseSize} itemChoose={attribute_Size}  />
                }
                <p className='text-red-500 text-sm' >Lưu ý mỗi Size cách nhau một dấu ',' Ví dụ : 6 US|7 US|8 US ...</p>
            </div>

            <div  className='relative' >  
                <p className='text-sm text-gray-500' >Màu sản phẩm</p>
                <textarea  className='border-2 p-2 w-2/3 ' type="text" onClick={()=>setColorsPopup(true)}
                    onChange={(e)=>setFormColor(e.target.value)}  value={formColor} spellCheck="false" />
                {colorsPopup &&
                    <SelectPopup data={attributesName} handleClick={handleChooseColor} itemChoose={attribute_Color}  />
                }
                <p className='text-red-500 text-sm' >Lưu ý mỗi Color cách nhau một dấu ',' Ví dụ : black|white|blue ...</p>
            </div>

            <div>
                <p className='text-sm text-gray-500' >Mô tả sản phẩm</p>
                <textarea  className='border-2 p-2 w-2/3 ' rows='9' type="text" 
                    onChange={(e)=>setDesc(e.target.value)}  value={desc} spellCheck="false" />
                
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
    : router.push('/admin-login')}
    </>
  )
}

export default AddProduct