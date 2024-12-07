import React from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


const SuccessPopup = ({message, handleClosePopup}) => {
  return (
    <div className={`fixed rounded text-center flex top-20 right-0 p-2 font-bold text-md 
         w-[300px] h-[60px] bg-green-500  text-white z-40 `} >
         <CheckCircleOutlineIcon  className='text-white left-0  ' fontSize='large'  />
        <span className='p-1' >{message}</span>
        <ClearIcon fontSize='large' className='absolute top-0  right-0 z-20 hover:cursor-pointer ' onClick={handleClosePopup} />
    </div>
  )
}

export default SuccessPopup