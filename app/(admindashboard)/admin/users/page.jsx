'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { userRequest } from '@/requestMethod'
import { DataGrid } from '@mui/x-data-grid';
import Loader from '@/components/Loader';
import { FormatCurrency } from '@/utils/FormatCurrency';
import moment from 'moment';
import SuccessPopup from '@/components/Popup/SuccessPopup';
import Image from 'next/image'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation'
import { AirlineSeatReclineNormalRounded } from '@mui/icons-material';

const Users = () => {

 
  const router = useRouter()
  const [notifySuccess, setNotifySuccess] = useState(false)
  const [loading, setLoading] = useState(true)
  const [users, setUsers]= useState('')
  const [userId, setUserId] = useState('')
  const [reload, setReload] = useState(false)
  const handleClosePopup = () => {
    setNotifySuccess(false)
}

  useEffect(() => {
    const getUsers = async () =>{
      try{
        const res = await userRequest.get(`/user`) 
        if(res.data){
          setUsers(res.data.users)
          setLoading(false)
        }
      }catch(err) {
        console.log(err)
      }
    }

  getUsers();
}, [reload])

  const handleDeleteUser = async (userId) => {
    setLoading(true)
    try {
        const res = await userRequest.delete(`/user/${userId}`)
        if(res.data){
          setReload(!reload)
          setNotifySuccess(true)
          setTimeout(()=> {
            setNotifySuccess(false)
          }, 3000)
        }
    } catch(err) {
      console.log('err deleting user', err)
    }
  }
  
  const handleNavigate = (url) => {
    setLoading(true)
    router.push(url)
    setLoading(false)
  }

  const columns = [
    { field: "_id", headerName: 'Mã user', width:100 },
   
    { field: "username", headerName: 'Tên user', width:200 },
    { field: "img", headerName: 'avatar', width:110 ,height:400 ,
      renderCell: (params)=>{
        return(
        <div className=' p-[2px]  '>
          {/* <img  src={params.row.img} className='w-12 h-12 object-cover border-[1px] rounded-full '  alt="" /> */}
          <Image src ={params.row.img} width={100} height={100} alt='avatar' className='w-12 h-12 object-cover rounded-full '  />
        </div>
        )
      }
    },
    { field: "email", headerName: 'Email', width:300  },
    { field: "action", headerName: 'Xem chi tiết', width:150 ,
      renderCell: (params)=>{
        return(
          <span>
            <span className='p-2 rounded   '  >
            
              <span >
                <a onClick={()=>handleNavigate(`/admin/user-detail/${params.row._id}`)}   >
                    <span title='Edit' >
                        <EditIcon fontSize='large' className='text-blue-500 hover:text-black hover:cursor-pointer '  />  
                    </span>
                </a>
                    <span  title='Xóa'  >
                        <DeleteIcon  
                            onClick={()=>handleDeleteUser(params.row._id)}
                            fontSize='large'  className='text-red-500 hover:text-red-800 hover:cursor-pointer '   />
                    </span>
                
              </span> 
              
            </span>  
              
          </span>
        )
      }
    },
   
    { field: "isAdmin", headerName: 'is Admin', width:200 ,
        renderCell: (params)=>{
            return(
                <span className='font-bold'>

                {params.row.isAdmin === true ? 
                <span className='text-green-500' >True </span> :
                <span  className='text-red-500' >False</span> }
                
    
            </span>
            )
          }
    }, 
    { field: "verified", headerName: 'Xác thực', width:150} ,
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
   
    <div className={`flex flex-col  ${loading?'bg-white opacity-50':''}    `} >
    
      {loading ?  <div className='flex justify-center  ' >  <Loader  color={'inherit'} />  </div> : ''}
      {notifySuccess ?  
                <SuccessPopup  message={'Delete user Successfully!'}  handleClosePopup={handleClosePopup}   /> 
          : '' }

      <p className='font-bold text-3xl mt-20' >Users</p>
      <div className='flex flex-col' >
      <DataGrid
        className='w-full '
        rows={users}
        // disableSelectionOnClick
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

export default Users