import React from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


const SuccessPopup = ({message, handleClosePopup}) => {
  return (
    <span className={`fixed rounded text-center   flex top-20 right-2 p-2 font-bold text-md shadow-2xl 
         w-auto h-auto bg-green-500  text-white z-30  hover:bg-green-800 transition   `} >
         <CheckCircleOutlineIcon  className='text-white left-0  ' fontSize='large'  />
        <span className='p-1  ' >{message}</span>
        <span className='ml-10' >
        <ClearIcon fontSize='large' className='absolute top-0   right-0 z-20 hover:cursor-pointer ' onClick={handleClosePopup} />
        </span>
    </span>
  )
}

export default SuccessPopup