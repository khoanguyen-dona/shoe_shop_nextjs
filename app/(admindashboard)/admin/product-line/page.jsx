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
import { useRouter } from 'next/navigation'
import FailurePopup from '@/components/Popup/FailurePopup';
import ConfirmBox from '../../component/ConfirmBox';

const ProductLine = () => {

  const router = useRouter()
  const [notifyFailure, setNotifyFailure] = useState(false)
  const [notifySuccess, setNotifySuccess] = useState(false)
  const [loading, setLoading] = useState(true)
  const [productLines, setProductLines] = useState('')

  const [productLine, setProductLine] = useState('')
  const [productLineId, setProductLineId] = useState('')
  const [reload, setReload] = useState(false)
  const [editProductLineWindow, setEditProductLineWindow] = useState(false)  

  const [openConfirmBox, setOpenConfirmBox] = useState(false)
  const [idChosen, setIdChosen] = useState('')

  // open confirm box
  const handleOpenConfirmBox = async (id) => {
    setOpenConfirmBox(true)
    setIdChosen(id)
  }

  // close confirm box
  const handleCloseConfirmBox = () => {
    setOpenConfirmBox(false)
  }

  // close the popup
  const handleClosePopup = () => {
    setNotifySuccess(false)
  }

  
  useEffect(()=> {
    
    const getProductLines = async () => {
      try {
        const res = await userRequest.get('/product-line')
        if (res.data) {
          setProductLines(res.data.productLines)
          setLoading(false)
          
          
        }
      } catch(err){
        console.log('error while loading categories',err)
      }
    }
    getProductLines()
  }, [reload])

  const handleProductLineInput = (e) => {
    setProductLine(e.target.value)
  }

  const handleAddProductLine = async () => {
    if(productLine===''){
      setNotifyFailure(true)
      setTimeout(()=>{
        setNotifyFailure(false)
      }, 3000)
    } else {
      setLoading(true)
      try {
        const res = await userRequest.post('/product-line', {
          name: productLine
        })
        if(res.data){
          setProductLine('')
          setReload(!reload)
          setNotifySuccess(true)
              setTimeout(()=> {
              setNotifySuccess(false)
              }, 3000)
        }
      } catch (err){
        console.log('error while adding new product line',err)
      }
    }
  }

  const handleDeleteProductLine = async (productLineId) => {
    setLoading(true)
    try {
      const res = await userRequest.delete(`/product-line/${productLineId}`)
      if(res.data){
        setReload(!reload)
        handleCloseConfirmBox()
        setNotifySuccess(true)
            setTimeout(()=> {
            setNotifySuccess(false)
            }, 3000)
       
      }
    } catch(err){
      console.log('err while delete product line',err)
    }
  }

  const handleClickEditProductLine = (productLine_name, productLine_id) => {
        setEditProductLineWindow(true)
        setProductLine(productLine_name)
        setProductLineId(productLine_id)
  }

  const handleUpdateProductLine = async () => {
        setLoading(true)
        try {   
            const res = await userRequest.put(`/product-line/${productLineId}`,{
                name: productLine
            })
            if(res.data) {
                setReload(!reload)
                setEditProductLineWindow(false)
                setNotifySuccess(true)
                setTimeout(()=> {
                    setNotifySuccess(false)
                }, 3000)
            }

        } catch(err) {
            console.log('error while updating productLine',err)
        }
  }
  const handleCloseFailurePopup =  () => {
    setNotifyFailure(false)
  }
  const closeEditProductLineWindow = () => {
    setEditProductLineWindow(false)
    setProductLine('')
  }

  const columns = [ 
    { field: "name", headerName: 'Tên dòng sản phẩm', width:250 },  
    { field: "action", headerName: 'Hành động', width:150 ,
      renderCell: (params)=>{
        return(
          <span>
            <span className='p-2 rounded   '  >
            
              <span >
               
                    <span title='Edit' >
                        <EditIcon 
                            onClick={()=>handleClickEditProductLine(params.row.name, params.row._id)}
                            
                            fontSize='large' className='text-blue-500 hover:text-blue-800 hover:cursor-pointer  '  />  
                    </span>
           
               
                    <span  title='Xóa'  >
                        <DeleteIcon 
                            onClick={()=>handleOpenConfirmBox(params.row._id)} 
                            fontSize='large'  className='text-red-500 hover:text-red-800 hover:cursor-pointer'   />
                    </span>
            
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
        handleYes={()=>handleDeleteProductLine(idChosen)} 
        handleNo={handleCloseConfirmBox}
        content={'Bạn có chắc muốn xóa product line này'}
      />
    }  
 
    <div className= {` mt-20 flex flex-col   ${loading?'bg-white opacity-50':''}   `} >
        {loading ?  <div className='flex justify-center  ' >  <Loader  color={'inherit'} />  </div> : ''}
        {notifySuccess ? 
                <SuccessPopup  message={'Update Successfully!'}  handleClosePopup={handleClosePopup}   /> 
             : '' 
        }
        {notifyFailure &&
                <FailurePopup  message={'Product Line trống'} handleClosePopup = {handleCloseFailurePopup} />
        }
        {editProductLineWindow ? 
            <div className='fixed p-4 z-50 flex flex-col w-4/5  lg:w-3/5 h-auto bg-white shadow-2xl  left-10 lg:left-96 top-52 border-2 rounded-md  '  >
                <div className='flex flex-col justify-center' >
                    <div className='flex justify-between' >
                        <div className='font-bold text-2xl' >Edit product line</div>
                        <CloseIcon 
                            className='hover:cursor-pointer ' 
                            onClick={closeEditProductLineWindow} fontSize='large' />
                    </div>
                    <input type="text" onChange={(e)=>setProductLine(e.target.value)} 
                        value={productLine}
                        className='w-full border-2 mt-4 p-4 rounded-md text-2xl' />
                    <div className='text-center' >   
                        <button
                            onClick={handleUpdateProductLine} 
                            className='mt-4 p-4 bg-blue-500 text-white font-bold text-2xl hover:bg-blue-800 w-2/4 lg:w-1/3  rounded-md transition' >
                            Update
                        </button>
                    </div>  
                 </div>  
              
            </div> : ''
        }
        <div className='text-3xl font-bold' >Product Line</div>
        <div className='flex mt-4 w-full ' >
          <input 
            value={productLine}
            onChange={handleProductLineInput}  
            className='w-4/5  lg:w-3/5  rounded-l-md border-2 border-gray-300 p-2 text-2xl '  type="text" 
          />
          <button 
            onClick = {handleAddProductLine}
            className='rounded-r-md   w-1/5  lg:w-1/5 bg-green-500 font-bold p-2 text-white text-xl hover:bg-green-800 transition' >
            Thêm
          </button>
        </div>

        <DataGrid
          className='mt-10 w-full '
          rows={productLines}
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

export default ProductLine