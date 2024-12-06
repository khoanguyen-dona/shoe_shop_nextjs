import React from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


const SuccessPopup = ({message, handleClosePopup}) => {
  return (
    <div className={`fixed top-0 p-6 font-bold text-2xl  w-screen h-[80px] bg-green-500  text-white z-10 `} >
         <CheckCircleOutlineIcon  className='text-white' fontSize='large'  />
        {message}
        <ClearIcon fontSize='large' className='absolute top-0  right-3 z-20 hover:cursor-pointer ' onClick={handleClosePopup} />
    </div>
  )
}

export default SuccessPopup