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
import SuccessPopup from '@/components/Popup/SuccessPopup';
import { useRouter } from 'next/navigation'
import ConfirmBox from '../../component/ConfirmBox';

const Orders = () => {

 
  const router = useRouter()
  const [notifySuccess, setNotifySuccess] = useState(false)
  const [loading, setLoading] = useState(true)
  const [orders, setOrders]= useState('')
  const [orderId, setOrderId] = useState('')
  const [openConfirmBox, setOpenConfirmBox] = useState(false)
  const [orderIdChosen, setOrderIdChosen] = useState('')


  useEffect(() => {
    const getOrders = async () =>{
      try{
        const res = await userRequest.get(`/admin/orders`) 
        if(res.data){
          setOrders(res.data.orders)
          setLoading(false)
        }
      }catch(err) {
        console.log(err)
      }
    }

  getOrders();
}, [orderId])

 
  const handleDeleteOrder = async (orderIdChosen) => {
    setLoading(true)
    try {
      const res = await userRequest.delete(`/admin/order/${orderIdChosen}`)
      if(res.status===200){ 
        setOrderId(orderIdChosen)
        setLoading(false)
        handleCloseConfirmBox()
        setNotifySuccess(true)
        setTimeout(()=> {
          setNotifySuccess(false)
        }, 3000)
      }
    } catch(err) {
      console.log('err while delete order',err)
    }
  }

  // open confirm box
  const handleOpenConfirmBox = async (order_id) => {
    setOpenConfirmBox(true)
    setOrderIdChosen(order_id)
  }

  // close confirm box
  const handleCloseConfirmBox = () => {
    setOpenConfirmBox(false)
  }

  // close the popup
  const handleClosePopup = () => {
    setNotifySuccess(false)
}
  
  
  const handleNavigate = (url) => {
    setLoading(true)
    router.push(url)
    setLoading(false)
  }

  const columns = [
    { field: "_id", headerName: 'Mã order', width:120 },
    { field: "createdAt", headerName: 'Ngày đặt hàng', width:270 ,
      renderCell: (params)=>{
        return(
          <span>
            <span className='p-2 rounded hover:cursor-pointer text-gray-500 hover:text-black' title='xem chi tiết' > 
              {moment(params.row.createdAt).format("YYYY-MMM-DD h:mm:ss A")}
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
    { field: "action", headerName: 'Hành động', width:150 ,
      renderCell: (params)=>{
        return(
          <span>
            <span className='p-2 rounded   '  >
            
              <span >
                <a   onClick={()=>handleNavigate(`/admin/order-detail/${params.row._id}`)} >
                    <span title='Edit' >
                        <EditIcon 
                            onClick={()=>setLoading(true)}
                            
                            fontSize='large' className='text-blue-500 hover:text-blue-800 hover:cursor-pointer '  />  
                    </span>
                </a>
                <a>
                    <span  title='Xóa'  >
                        <DeleteIcon 
                            onClick={()=>handleOpenConfirmBox(params.row._id)}
                            fontSize='large'  className='text-red-500 hover:text-red-800 hover:cursor-pointer'   />
                    </span>
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
    <>
      {openConfirmBox &&
        <ConfirmBox 
          handleClose={handleCloseConfirmBox} 
          handleYes={()=>handleDeleteOrder(orderIdChosen)} 
          handleNo={handleCloseConfirmBox}
          content={'Bạn có chắc muốn xóa đơn hàng này'}
        />
      }
   
      <div className={` flex flex-col  ${loading?'bg-white opacity-50':''}   `} >
        {loading ?  <div className='flex justify-center  ' >  <Loader  color={'inherit'} />  </div> : ''}
        {notifySuccess ? 
                  <SuccessPopup  message={'Delete order Successfully!'}  handleClosePopup={handleClosePopup}   /> 
              : '' }
        <p className='font-bold text-3xl mt-20' >Orders</p>
        <div className='flex flex-col' >
        <DataGrid
          className='w-full '
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
    </>
    
  )
}

export default Orders