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
import ConfirmBox from '../../component/ConfirmBox';

const Categories = () => {
  const [notifyFailure, setNotifyFailure] = useState(false)
  const router = useRouter()
  const [notifySuccess, setNotifySuccess] = useState(false)
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState('')
  const [category, setCategory] = useState('')
  const [reload, setReload] = useState(false)

  const [openConfirmBox, setOpenConfirmBox] = useState(false)
  const [categoryIdChosen, setCategoryIdChosen] = useState('')
 

    // open confirm box
  const handleOpenConfirmBox = async (category_id) => {
    setOpenConfirmBox(true)
    setCategoryIdChosen(category_id)
  }

  // close confirm box
  const handleCloseConfirmBox = () => {
    setOpenConfirmBox(false)
  }

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
          setCategory('')
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

  const handleDeleteCategory = async (id) => {
    setLoading(true)
    try {
      const res = await userRequest.delete(`/category/${id}`)
      if(res.data){
        setReload(!reload)
        setLoading(false)
        handleCloseConfirmBox()
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
   
   
  ]

  return (
     <>
      {openConfirmBox &&
        <ConfirmBox 
          handleClose={handleCloseConfirmBox} 
          handleYes={()=>handleDeleteCategory(categoryIdChosen)} 
          handleNo={handleCloseConfirmBox}
          content={'Bạn có chắc muốn xóa category này'}
        />
      }

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
              value={category}
              className='w-4/5 lg:w-3/5  rounded-l-md border-2 border-gray-300 p-2 text-2xl '  type="text" />
            <button 
              onClick = {handleAddCategory}          
              className='rounded-r-md   w-1/5 bg-green-500 font-bold p-2 text-white text-xl hover:bg-green-800 transition' >
              Thêm
            </button>
          </div>

          <DataGrid
            className='mt-10 w-full '
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

    </>

  )
}

export default Categories