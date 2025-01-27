'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { userRequest } from '@/requestMethod'
import Loader from '@/components/Loader'
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/navigation'
import SuccessPopup from '@/components/Popup/SuccessPopup'
import CloseIcon from '@mui/icons-material/Close';

const CategoryDetail = () => {


    const router = useRouter()
    const categoryId = useParams().id
    const [notifySuccess, setNotifySuccess] = useState(false)
    const [loading, setLoading] = useState(true)
    const [category, setCategory] = useState('')
    const [subCategory, setSubCategory] = useState('')
    const [input, setInput] = useState('')
    const [reload, setReload] = useState(false)

    const [editSubCatWindow, setEditSubCatWindow] = useState(false)
    const [newSubCategory, setNewSubCategory] = useState('')
    const [subCategoryId, setSubCategoryId] = useState('')

    const [editCatWindow, setEditCatWindow] = useState(false)
    const [newCategory, setNewCategory] = useState('')
    //get category
    useEffect(()=> {
        const getCategory = async () => {
            setLoading(true)
            try {   
                const res = await userRequest.get(`/category/${categoryId}`)
                if(res.data){
                    console.log(res)
                    setLoading(false)
                    setCategory(res.data.category.name)
                }
            } catch(err){
                console.log('error while getting category',err)
            }
        }
        getCategory();
    }, [reload])

    // close the popup
    const handleClosePopup = () => {
        setNotifySuccess(false)
        
    }

    //get subCategory
    useEffect(()=> {
        const getSubCategory = async () => {
            setLoading(true)
            try {   
                const res = await userRequest.get(`/sub-category/${categoryId}`)
                if(res.data){
                    console.log(res)
                    setLoading(false)
                    setSubCategory(res.data.subCategory)
                }
            } catch(err){
                console.log('error while getting category',err)
            }
        }
        getSubCategory();
    }, [reload])

    const handleInput = (e) => {
        setInput(e.target.value)
    }
    //add subcategory
    const handleAddSubCategory = async () => {
        setLoading(true)
        try {
            const res = await userRequest.post('/sub-category', {
                categoryId: categoryId,
                name: input
            })
            if(res.data) {
          
                setReload(!reload)
                setNotifySuccess(true)
                setTimeout(()=>{
                    setNotifySuccess(false)
                }, 3000)
            }
        } catch(err) {
            console.log('error while adding sub-category',err)
        }
    }

    //delete subcategory
    const handleDeleteSubCategory = async (categoryId) => {
        setLoading(true)
        try {
            const res = await userRequest.delete(`/sub-category/${categoryId}`)
            if(res.data) {
                setReload(!reload)
                setNotifySuccess(true)
                setTimeout(()=>{
                    setNotifySuccess(false)
                }, 3000)
            }
        } catch(err) {
            console.log('error white delete sub category',err)
        }
    }

    const handleUpdateCategory = async () => {
        setLoading(true)
        try {
            const res = await userRequest.put(`/category/${categoryId}`,{
                name: newCategory
            })
            if(res.data){
                setReload(!reload)
                setEditCatWindow(false)
                setNotifySuccess(true)
                setTimeout(()=> {
                    setNotifySuccess(false)
                }, 3000)
            }
        } catch(err) {
            console.log('error while update category',err)
        }
    }
    
    const handleEditSubCatClick = (subCat_name, subCatId) => {
        setEditSubCatWindow(true)
        setSubCategoryId(subCatId)
        setNewSubCategory(subCat_name)
    }

    const handleEditCategoryClick = () => {
        setEditCatWindow(true)
        setNewCategory(category)
    }

    console.log('subCatId:',subCategoryId)
    console.log('subcat name:', newSubCategory)
    console.log('new category', newCategory)
    // delete subcat
    const handleUpdateSubCategory = async () => {
        setLoading(true)
        try {
            const res = await userRequest.put(`/sub-category/${subCategoryId}`,{
                name: newSubCategory
            })
            if (res.data){
                setReload(!reload)
               
                setEditSubCatWindow(false)
                setNotifySuccess(true)
                setTimeout(()=> {
                    setNotifySuccess(false)
                }, 3000)
            }
        } catch(err) {
            console.log('error while update sub-cat',err)
        }
    }

    const columns = [ 
        { field: "name", headerName: 'Tên sub-category', width:500 },  
        { field: "action", headerName: 'Hành động', width:150 ,
          renderCell: (params)=>{
            return(
              <span>
                <span className='p-2 rounded   '  >
                
                  <span >
                    
                        <span title='Edit' >
                            <EditIcon      
                                onClick={()=>handleEditSubCatClick(params.row.name, params.row._id)}
                                fontSize='large' className='text-blue-500 hover:text-blue-800 hover:cursor-pointer  '  />  
                        </span>
                    
                
                        <span  title='Xóa'  >
                            <DeleteIcon 
                                onClick={()=>handleDeleteSubCategory(params.row._id)} 
                                fontSize='large'  className='text-red-500 hover:text-red-800 hover:cursor-pointer  '   />
                        </span>
                  
                  </span> 
                  
                </span>  
                  
              </span>
            )
          }
        },
       
       
      ]

  return (
 
    <div className={` mt-20 flex flex-col  ${loading?'bg-white opacity-50':''}    `} >
        {editSubCatWindow ?
            <div className='fixed p-4 z-20 flex flex-col w-4/5  lg:w-3/5 h-[300px] bg-white shadow-2xl  left-10 lg:left-96 top-96 border-2 rounded-md  '  >
                <div className='flex flex-col justify-center' >
                    <div className='flex justify-between' >
                        <div className='font-bold text-2xl' >Edit sub-category</div>
                        <CloseIcon className='hover:cursor-pointer ' onClick={()=>setEditSubCatWindow(false)} fontSize='large' />
                    </div>
                    <input type="text" onChange={(e)=>setNewSubCategory(e.target.value)} 
                        value={newSubCategory}
                        className='w-full border-2 mt-4 p-4 rounded-md text-2xl' />
                    <div className='text-center' >   
                        <button
                            onClick={handleUpdateSubCategory} 
                            className='mt-4 p-4 bg-blue-500 text-white font-bold text-2xl hover:bg-blue-800 w-1/3  rounded-md transition' >
                            Update
                        </button>
                    </div>  
                 </div>  
              
            </div> : ''
        }
        {editCatWindow ?
            <div className='fixed p-4 z-20 flex flex-col w-4/5  lg:w-3/5 h-[300px] bg-white shadow-2xl  left-10 lg:left-96 top-96 border-2 rounded-md  '  >
                <div className='flex flex-col justify-center' >
                    <div className='flex justify-between' >
                        <div className='font-bold text-2xl' >Edit category</div>
                        <CloseIcon className='hover:cursor-pointer ' onClick={()=>setEditCatWindow(false)} fontSize='large' />
                    </div>
                    <input type="text" onChange={(e)=>setNewCategory(e.target.value)} 
                        value={newCategory}
                        className='w-full border-2 mt-4 p-4 rounded-md text-2xl' />
                    <div className='text-center' >   
                        <button
                            onClick={handleUpdateCategory} 
                            className='mt-4 p-4 bg-blue-500 text-white font-bold text-2xl hover:bg-blue-800 w-1/3  rounded-md transition' >
                            Update
                        </button>
                    </div>  
                 </div>  
              
            </div> : ''
        }
        {loading ?  <div className='flex justify-center  ' >  <Loader  color={'inherit'} />  </div> : ''}
        {notifySuccess ? 
                <SuccessPopup  message={'Update Successfully!'}  handleClosePopup={handleClosePopup}   /> 
           : '' }
        <div className='text-3xl font-bold' >
            Category : {category} 
            <EditIcon fontSize='large' onClick={handleEditCategoryClick} className='text-blue-500 ml-2 hover:text-blue-800 hover:cursor-pointer' />
        </div>
        <div className='text-xl font-semibold mt-10' >Thêm sub-category</div>
        <div className='flex mt-2' >
          <input 
            onChange={handleInput}  
            className='w-3/5  rounded-l-md border-2 border-gray-300 p-2 text-2xl '  type="text" />
          <button 
            disabled={input===''}
            onClick = {handleAddSubCategory}
            className={` rounded-r-md   w-1/5 bg-green-500 font-bold p-4 text-white text-xl hover:bg-green-800 transition
                ${input===''?'hover:cursor-not-allowed':''} `} >
            Thêm
          </button>
        </div>
        <div className='mt-10 font-semibold text-xl' >Sub-category</div>
        <DataGrid
          className='mt-2'
          rows={subCategory}
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

export default CategoryDetail