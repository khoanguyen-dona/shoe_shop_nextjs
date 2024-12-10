'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { userRequest } from '@/requestMethod'
import { DataGrid } from '@mui/x-data-grid';
import Loader from '@/components/Loader';
import { FormatCurrency } from '@/utils/FormatCurrency';
import moment from 'moment';
import VisibilityIcon from '@mui/icons-material/Visibility';


const Orders = () => {

const [orders, setOrders]= useState('')


  const handleSeeDetail = () => {

  }

  useEffect(() => {
    const getOrders = async () =>{
      try{
        const res = await userRequest.get(`/admin/orders`) 
        if(res.data){
          setOrders(res.data.orders)
        }
      }catch(err) {
        console.log(err)
      }
    }

  getOrders();
}, [])
  
  const columns = [
    { field: "_id", headerName: 'Mã order', width:120 },
    { field: "createdAt", headerName: 'Ngày đặt hàng', width:270 ,
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
    { field: "address", headerName: 'Địa chỉ', width:200 },
    { field: "total", headerName: 'Tổng', width:200 ,
      renderCell: (params)=>{
        return(
          <span className='p-2 rounded' > 
              {FormatCurrency(params.row.total)} đ
          </span>   
        )
      }
    },
    { field: "status", headerName: 'Trạng thái', width:150 ,
      renderCell: (params)=>{
        return(
          <span className={`p-2 rounded  
            ${params.row.status==='processing'?'text-white  bg-gray-500 ':''}
            ${params.row.status==='on delivery'?'text-white bg-blue-500 ':''} 
            ${params.row.status==='success'?'text-white bg-green-500':''}
            ${params.row.status==='cancel'?'text-white bg-red-500':''} `} >
              {params.row.status}
          </span>   
        )
      }
    },
    { field: "action", headerName: 'Xem chi tiết', width:150 ,
      renderCell: (params)=>{
        return(
          <span>
            <span className='p-2 rounded hover:cursor-pointer text-gray-500 hover:text-black' title='xem chi tiết' >
            
              <span >
                <a onClick={()=>setLoading(true)}  href={`/admin/order-detail/${params.row._id}`}>
                  <VisibilityIcon  />  
                </a>
              </span> 
              
            </span>  
              
          </span>
        )
      }
    },
   
    { field: "paymentMethod", headerName: 'Phương thức thanh toán', width:200 },
    { field: "message", headerName: 'Tin nhắn', width:200 },
    { field: "email", headerName: 'Email', width:200 },

  ]


  return (
    <div className='flex flex-col' >
      <p className='font-bold text-3xl mt-20' >Orders</p>
      <div className='flex flex-col' >
      <DataGrid
        
        rows={orders}
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

export default Orders