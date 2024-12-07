'use client'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { userRequest } from '@/requestMethod'
import { DataGrid } from '@mui/x-data-grid';
import Loader from '@/components/Loader';
import { FormatCurrency } from '@/utils/FormatCurrency';
import VisibilityIcon from '@mui/icons-material/Visibility';
import moment from "moment";
import { useRouter } from 'next/navigation';

const profileOrder = () => {
  const router = useRouter()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const user = useSelector((state)=>state.user.currentUser)
  console.log(orders)

  useEffect(() => {
      const getOrders = async () =>{
        try{
          const res = await userRequest.get(`/orders/${user._id}`) 
          if(res.data){
            setOrders(res.data.orders)
          }
        }catch(err) {
          console.log(err)
        }
      }
  
    getOrders();
  }, [])

  const handleSeeDetail = (order_id) => {
    try{
        setLoading(true)
        router.push(`/profile/order-detail/${order_id}`)
    }catch(err){
        console.log(err)
    }
  }

  const columns = [
    { field: "_id", headerName: 'Mã order', width:300 },
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
              {/* <span href={`/profile/order-detail/${params.row._id}`}>
                <VisibilityIcon  />  
              </span>  */}
              <span onClick={()=>handleSeeDetail(params.row._id)}>
                <VisibilityIcon  />  
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
    <div className={`px-2 md:px-4 lg:px-16 xl:px-24 2xl:px-48  text-center mt-10 mb-20 ${loading ?'bg-white opacity-50':''}   `} >
      {loading ?  <div className='flex justify-center  ' >  <Loader  color={'inherit'} />  </div> : ''}

      <p className='font-bold text-4xl' >Order</p>

      <div className='mt-20 font-bold' >
      <DataGrid
        
        rows={orders}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSizeOptions={[10, 20, 50, 100]}
        // checkboxSelection
        sx={{fontSize:'20px'}}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
      />
      </div>
    </div>
  )
}

export default profileOrder 