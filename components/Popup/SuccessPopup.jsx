import React from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


const SuccessPopup = ({message, handleClosePopup}) => {
  return (
    <span className={`fixed rounded text-center flex top-40 right-0 p-2 font-bold text-md shadow-2xl 
         w-[300px] h-[60px] bg-green-500  text-white z-30  hover:bg-green-800 transition   `} >
         <CheckCircleOutlineIcon  className='text-white left-0  ' fontSize='large'  />
        <span className='p-1' >{message}</span>
        <ClearIcon fontSize='large' className='absolute top-0  right-0 z-20 hover:cursor-pointer ' onClick={handleClosePopup} />
    </span>
  )
}

export default SuccessPopup