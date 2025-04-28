'use client'
import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { userRequest } from '@/requestMethod';
import Loader from '@/components/Loader';
import { useState, useEffect } from 'react';
import SuccessPopup from '@/components/Popup/SuccessPopup';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/navigation';
import FailurePopup from '@/components/Popup/FailurePopup';

const Attribute = () => {
  const router = useRouter()
  const [notifyFailure, setNotifyFailure] = useState(false)
  const [ editAttributeWindow , setEditAttributeWindow] = useState(false)
  const [notifySuccess, setNotifySuccess] = useState(false)
  const [loading, setLoading] = useState(true)
  const [attributes, setAttributes] = useState('')

  const [attribute, setAttribute] = useState('')
  const [attributeId, setAttributeId] = useState('')
  const [reload, setReload] = useState(false)

  const [newAttribute, setNewAttribute] = useState('')
  const [newAttributeItem, setNewAttributeItem] = useState('')
  // close the popup
  const handleClosePopup = () => {
    setNotifySuccess(false)
  }
  const handleCloseFailurePopup =  () => {
    setNotifyFailure(false)
  }

 // get all attributes
  useEffect(()=> {
    setLoading(true)
    const getAttributes = async () => {
      try {
        const res = await userRequest.get('/attribute')
        if (res.data) {
          setAttributes(res.data.attributes)
          setLoading(false)    
        }
      } catch(err){
        console.log('error whilte loading attributes',err)
      }
    }
    getAttributes()
  }, [reload])



  const handleAttributeInput = (e) => {
    setAttribute(e.target.value)
  }
  
  const handleAddAttribute = async () => {
    if(attribute===''){
      setNotifyFailure(true)
      setTimeout(()=>{
        setNotifyFailure(false)
      }, 3000)
    } else {
      setLoading(true)
      try {
        const res = await userRequest.post('/attribute', {
          name: attribute
        })
        if(res.data){
          setReload(!reload)
          setNotifySuccess(true)
          setTimeout(()=> {
            setNotifySuccess(false)
          }, 3000)
        }
      } catch (err){
        console.log('error while adding new attribute',err)
      }
    }
  }

  const handleDeleteAttribute = async (attributeId) => {
    setLoading(true)
    try {
      const res = await userRequest.delete(`/attribute/${attributeId}`)
      if(res.data){  
        setReload(!reload)
        setNotifySuccess(true)
        setTimeout(()=>{
          setNotifySuccess(false)
        }, 3000)
      }
    } catch(err){
      console.log('err while deleting attribute',err)
    }
  }

  const handleClickEditAttribute = async (id, name, item) => {
      let attr = String(item).split(",").join("|")
      setNewAttributeItem(attr)
      setEditAttributeWindow(true)
      setAttributeId(id)
      setNewAttribute(name)

  }


  const handleUpdateAttribute = async () => {
    setLoading(true)
    try {
      
      let attributeItemArray =[]
      let attr = ''
      attr = String(newAttributeItem).split('|')

      await attr.map((item) => {
        item = item.trim()
        if(item.length===0){
          attributeItemArray
        } else {
          attributeItemArray.push(item)
        }
      })

      const res = await userRequest.put(`/attribute/${attributeId}`, {
        name: newAttribute,
        item: attributeItemArray
      })
      if (res.data) {
        setReload(!reload)
        setEditAttributeWindow(false)
        setNotifySuccess(true)

        setTimeout(()=> {
          setNotifySuccess(false)
        }, 3000)
      }
    

    } catch(err){
      console.log('err while update attribute',err)
    }
  }

  const handleDeleteAttributeItem = async (id, name, itemArray, item) => {
    setLoading(true)
    try {
      console.log('-->')
      let newItemArray = [] 
      newItemArray = itemArray.filter((i) => i!==item)
    
      const res = await userRequest.put(`attribute/${id}`,{
        name: name,
        item: newItemArray
      })
      if(res.data){
        setReload(!reload)
        setNotifySuccess(true)
        setTimeout(()=>{
          setNotifySuccess(false)
        }, 3000)
      }
    } catch(err){
      console.log('err while delete attribute item',err)
    }
  }
  

  const columns = [ 
    
    { field: "action", headerName: 'Hành động', width:130 ,
      renderCell: (params)=>{
        return(
          <span>
            <span className='p-2 rounded   '  >
            
              <span >
                
                    <span title='Edit' >
                        <EditIcon 
                            onClick={()=>handleClickEditAttribute(params.row._id, params.row.name, params.row.item)}
                            
                            fontSize='large' className='text-blue-500 hover:text-blue-800  '  />  
                    </span>
             
            
                    <span  title='Xóa'  >
                        <DeleteIcon 
                            onClick={()=>handleDeleteAttribute(params.row._id)} 
                            fontSize='large'  className='text-red-500 hover:text-red-800  '   />
                    </span>
               
              </span> 
              
            </span>  
              
          </span>
        )
      }
    },
    { field: "name", headerName: 'Tên attribute', width:150 },  

    { field: "item", headerName: "Attribute item", width: 1500,
      renderCell: (params)=>{
        return(
          <p>
            {params.row.item.map((i, index)=> 
                 <span key={index} className='p-2  rounded-lg text-black bg-gray-300 ml-1' >
                  {i} 
                  <span title='Xóa'>
                    <CloseIcon  className='text-red-500 hover:text-red-800  hover:cursor-pointer mb-1' fontSize='medium' 
                    onClick={()=>handleDeleteAttributeItem(params.row._id, params.row.name, params.row.item, i)} />
                  </span>
                </span>        
            )}
           
          </p>
        )
      }
    }
    
  ]
  

  return (

    <div className= {` mt-20 flex flex-col   ${loading?'bg-white opacity-50':''}   `} >
        {editAttributeWindow ?
            <div className='fixed p-4 z-50 flex flex-col w-4/5  lg:w-3/5 h-auto bg-white shadow-2xl  left-10 lg:left-96 top-36 lg:top-20 lg:top-68 border-2 rounded-md  '  >
                <div className='flex flex-col justify-center' >
                    <div className='flex justify-between' >
                        <div className='font-bold text-2xl' >Edit attribute</div>
                        <CloseIcon className='hover:cursor-pointer text-black hover:text-gray-300 transition' onClick={()=>setEditAttributeWindow(false)} fontSize='large' />
                    </div>

                    <p className='mt-4'  >Tên attribute</p>
                    <input type="text" onChange={(e)=>setNewAttribute(e.target.value)} 
                        value={newAttribute}
                        className='w-full border-2  p-4 rounded-md text-2xl' 
                    />

                    <p className='mt-4'  >Attribute item </p>
                    <textarea type="text" rows={3} onChange={(e)=>setNewAttributeItem(e.target.value)} 
                        value={newAttributeItem   }
                        className='w-full border-2  p-2 lg:p-4 rounded-md  text-2xl' 
                    />
                    <p  className='text-red-500 text-sm' >! Mỗi thuộc tính con cách nhau một dấu "|" , ví dụ : black|white|blue...</p>

                    <div className='text-center' >   
                        <button
                            onClick={handleUpdateAttribute} 
                            className='mt-4 p-4 bg-blue-500 text-white font-bold text-2xl hover:bg-blue-800 w-2/4 lg:w-1/3  rounded-md transition' >
                            Update
                        </button>
                    </div>  
                 </div>  
              
            </div> : ''
        }
        {loading ?  <div className='flex justify-center  ' >  <Loader  color={'inherit'} />  </div> : ''}
        {notifySuccess ? 
                <SuccessPopup  message={'Update Successfully!'}  handleClosePopup={handleClosePopup}   /> 
             : '' 
        }
        {notifyFailure &&
                <FailurePopup  message={'Attribute trống'} handleClosePopup = {handleCloseFailurePopup} />
        }
        <div className='text-3xl font-bold' >Attributes</div>
        <div className='flex mt-4' >
          <input 
            onChange={handleAttributeInput}  
            className='w-4/5 lg:w-3/5 rounded-l-md border-2 border-gray-300 p-2 text-2xl '  type="text" />
          <button 
            onClick = {handleAddAttribute}
            className='rounded-r-md   w-1/5 bg-green-500 font-bold p-2 text-white text-xl hover:bg-green-800 transition' >
            Thêm
          </button>
        </div>

        <DataGrid
          className='mt-10 w-full xl:w-5/6'
          rows={attributes}
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

export default Attribute