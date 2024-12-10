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

const Users = () => {

const [users, setUsers]= useState('')


  const handleSeeDetail = () => {

  }

  useEffect(() => {
    const getUsers = async () =>{
      try{
        const res = await userRequest.get(`/user`) 
        if(res.data){
          setUsers(res.data.users)
        }
      }catch(err) {
        console.log(err)
      }
    }

  getUsers();
}, [])
  
  const columns = [
    { field: "_id", headerName: 'Mã user', width:250 },
   
    { field: "username", headerName: 'Tên user', width:300 },
    { field: "img", headerName: 'avatar', width:110 ,height:400 ,
      renderCell: (params)=>{
        return(
        <div className='w-[50px]  '>

          <img src={params.row.img} className=' object-cover rounded-full '  alt="" />
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
                <a onClick={()=>setLoading(true)}  href={`/admin/product-detail/${params.row._id}`}>
                    <span title='Edit' >
                        <EditIcon fontSize='large' className='text-blue-500 hover:text-black  '  />  
                    </span>
                    <span  title='Xóa'  >
                        <DeleteIcon  fontSize='large'  className='text-red-500 hover:text-red-800'   />
                    </span>
                </a>
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
    <div className='flex flex-col' >
      <p className='font-bold text-3xl mt-20' >Users</p>
      <div className='flex flex-col' >
      <DataGrid
        
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