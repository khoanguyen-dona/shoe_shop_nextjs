'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { userRequest } from '@/requestMethod'
import { DataGrid } from '@mui/x-data-grid';
import Loader from '@/components/Loader';
import { FormatCurrency } from '@/utils/FormatCurrency';
import moment from 'moment';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
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

const Products = () => {

  const storage = getStorage(app)
  const [loading, setLoading] = useState(true)
  const [products, setProducts]= useState('')

  const [productId, setProductId] = useState()



  const handleDeleteProduct = async (product_id) => {
    setLoading(true)
   
    //get thumbnail_url and imageGallery_url then delete it in firebase
    try{
      const res = await userRequest.get(`/product/${product_id}`)
      if(res.data){
        // delete thumbnail in firebase
          try {
            let imageRef = ref(storage, res.data.thumbnail);
            await deleteObject(imageRef);
            console.log('delete thumbnail in firebase successfully')
          } catch (error) {
              console.error("Error deleting image in firebase:", error);           
          }
           //delete imgGallery in firebase
          for ( let imageUrl of res.data.imgGallery){   
            try {
              let imageRef = ref(storage, imageUrl);
              await deleteObject(imageRef);
              console.log('delete imgGallery in firebase successfully')
            } catch (error) {
                console.error("Error deleting image in firebase:", error);           
            }
          }
        
      }
    } catch(err){
      console.log('get product error',err)
    }
   
    //delete product data in mongo db
    try{
      const res = await userRequest.delete(`/product/${product_id}`)
      if (res.status===200){
        console.log('deleted product in mongo successfuly -->')
       
      }
    } catch(err){
      console.log('delete product error',err)
    }
    setLoading(false)
    setProductId(product_id)
  }

  useEffect(() => {
    const getOrders = async () =>{
      try{
        const res = await userRequest.get(`/product`) 
        if(res.data){
          setProducts(res.data)
          setLoading(false)
        }
      }catch(err) {
        console.log(err)
      }
    }

  getOrders();
}, [productId])
  
  const columns = [
    { field: "_id", headerName: 'Mã sản phẩm', width:120 },
   
    { field: "name", headerName: 'Tên sản phẩm', width:200 },
    { field: "categories", headerName: 'Categories', width:130 },
    { field: "thumbnail", headerName: 'Hình ảnh', width:110 ,height:400 ,
      renderCell: (params)=>{
        return(
        <div className='w-[50px]  '>

          <img src={params.row.thumbnail} className=' object-cover'  alt="" />
        </div>
        )
      }
    },
    { field: "size", headerName: 'Size', width:150  },
    { field: "action", headerName: 'Hành động', width:150 ,
      renderCell: (params)=>{
        return(
          <span>
            <span className='p-2 rounded   '  >
            
              <span >
                <a  href={`/admin/product-detail/${params.row._id}`}>
                    <span title='Edit' >
                        <EditIcon 
                            onClick={()=>setLoading(true)}
                            
                            fontSize='large' className='text-blue-500 hover:text-blue-800  '  />  
                    </span>
                </a>
                <a>
                    <span  title='Xóa'  >
                        <DeleteIcon 
                            onClick={()=>handleDeleteProduct(params.row._id)} 
                            fontSize='large'  className='text-red-500 hover:text-red-800'   />
                    </span>
                </a>
              </span> 
              
            </span>  
              
          </span>
        )
      }
    },
   
    { field: "color", headerName: 'Màu sắc', width:200 },
    { field: "price", headerName: 'Giá', width:200 ,
        renderCell: (params)=>{
            return(
              <span className='p-2 rounded' > 
                  {FormatCurrency(params.row.price)} đ
              </span>   
            )
          }
    },
    { field: "inStock", headerName: 'Trạng thái', width:150 ,
        renderCell: (params)=>{
            return(
            <span>

                {params.row.inStock === true ? 
                <span className='text-green-500' >Còn hàng </span> :
                <span  className='text-red-500' >Hết hàng</span> }
                
    
            </span>
            )

          }
     },
    { field: "createdAt", headerName: 'Ngày tạo', width:270 ,
        renderCell: (params)=>{
          return(
            <span>
              <span className='p-2 rounded hover:cursor-pointer text-gray-500 hover:text-black' title='xem chi tiết' > 
                {moment(params.row.createdAt).format("YYYY-MMM-d h:mm:ss A")}
              </span>  
                
            </span>
          )
        }
      },

  ]


  return (
    <div className={`flex flex-col ${loading ?'bg-white opacity-50':''}  `} >
      <p className='font-bold text-3xl mt-20' >Products</p>
      <a  
          onClick={()=>setLoading(true)}
          href="/admin/add-product" className='my-2 p-4 text-center text-xl rounded hover:bg-green-800 transition  w-[200px] bg-green-500
           text-white font-bold' disabled={loading}>Thêm sản phẩm</a>
      <div className='flex flex-col' >
      {loading ?  <div className='flex justify-center  ' >  <Loader  color={'inherit'} />  </div> : ''}
      <DataGrid
        
        rows={products}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSizeOptions={[20, 40, 50, 100]}
        // checkboxSelection
        sx={{fontSize:'20px'}}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 20, page: 0 },
          },
        }}
      />  

              
      </div>
    </div>
  )
}

export default Products