'use client'
import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { userRequest } from '@/requestMethod';
import Loader from '@/components/Loader';
import { useState, useEffect } from 'react';
import SuccessPopup from '@/components/Popup/SuccessPopup';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';
import FailurePopup from '@/components/Popup/FailurePopup';

const Categories = () => {
  const [notifyFailure, setNotifyFailure] = useState(false)
  const router = useRouter()
  const [notifySuccess, setNotifySuccess] = useState(false)
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState('')
  const [category, setCategory] = useState('')
  const [reload, setReload] = useState(false)

  // close the popup
  const handleClosePopup = () => {
    setNotifySuccess(false)
  }
  const handleCloseFailurePopup =  () => {
    setNotifyFailure(false)
  }

  useEffect(()=> {
    setLoading(true)
    const getCategories = async () => {
      try {
        const res = await userRequest.get('/category')
        if (res.data) {
          setCategories(res.data.categories)
          setLoading(false)
          
        }
      } catch(err){
        console.log('error whilte loading categories',err)
      }
    }
    getCategories()
  }, [reload])

  const handleCategoryInput = (e) => {
    setCategory(e.target.value)
  }
  
  const handleAddCategory = async () => {
    if(category===''){
      setNotifyFailure(true)
      setTimeout(()=>{
        setNotifyFailure(false)
      }, 3000)
    } else {
      setLoading(true)
      try {
        const res = await userRequest.post('/category', {
          name: category
        })
        if(res.data){
          setReload(!reload)
          setLoading(false)
          setNotifySuccess(true)
          setTimeout(()=> {
            setNotifySuccess(false)
          }, 3000)
        }
      } catch (err){
        console.log('error while add new category',err)
      }
    }
  }

  const handleDeleteCategory = async (categoryId) => {
    setLoading(true)
    try {
      const res = await userRequest.delete(`/category/${categoryId}`)
      if(res.data){
        setReload(!reload)
        setLoading(false)
        setNotifySuccess(true)
        setTimeout(()=>{
          setNotifySuccess(false)
        }, 3000)
      }
    } catch(err){
      console.log('err while delete category',err)
    }
  }

  const handleNavigate = (url) => {
    setLoading(true)
    router.push(url)
    setLoading(false)
  }

  const columns = [ 
    { field: "name", headerName: 'Tên category', width:250 },  
    { field: "action", headerName: 'Hành động', width:150 ,
      renderCell: (params)=>{
        return(
          <span>
            <span className='p-2 rounded   '  >
            
              <span >
                <a  onClick={()=>handleNavigate(`/admin/category-detail/${params.row._id}`)} >
                    <span title='Edit' >
                        <EditIcon 
                            onClick={()=>setLoading(true)}
                            
                            fontSize='large' className='text-blue-500 hover:text-blue-800  '  />  
                    </span>
                </a>
                <a>
                    <span  title='Xóa'  >
                        <DeleteIcon 
                            onClick={()=>handleDeleteCategory(params.row._id)} 
                            fontSize='large'  className='text-red-500 hover:text-red-800'   />
                    </span>
                </a>
              </span> 
              
            </span>  
              
          </span>
        )
      }
    },
   
   
  ]

  return (

    <div className= {` mt-20 flex flex-col   ${loading?'bg-white opacity-50':''}   `} >
        {loading ?  <div className='flex justify-center  ' >  <Loader  color={'inherit'} />  </div> : ''}
        {notifySuccess ? 
                <SuccessPopup  message={'Update Successfully!'}  handleClosePopup={handleClosePopup}   /> 
             : '' 
        }
        {notifyFailure &&
                <FailurePopup  message={'Categories trống'} handleClosePopup = {handleCloseFailurePopup} />
        }
        <div className='text-3xl font-bold' >Categories</div>
        <div className='flex mt-4' >
          <input 
            onChange={handleCategoryInput}  
            className='w-4/5 lg:w-3/5  rounded-l-md border-2 border-gray-300 p-2 text-2xl '  type="text" />
          <button 
            onClick = {handleAddCategory}
            className='rounded-r-md   w-1/5 bg-green-500 font-bold p-2 text-white text-xl hover:bg-green-800 transition' >
            Thêm
          </button>
        </div>

        <DataGrid
          className='mt-10'
          rows={categories}
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

  )
}

export default Categories