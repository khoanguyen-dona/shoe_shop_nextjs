import React from 'react'
import ClearIcon from '@mui/icons-material/Clear';



const FailurePopup = ({message, handleClosePopup}) => {
  return (
    <span className={`fixed rounded text-center flex top-20 right-4 p-2 font-bold text-md shadow-2xl 
         w-[300px] h-auto bg-red-500  text-white z-30  hover:bg-red-800 transition duration-300`} >
         
        <span className='p-1 mr-6' >! {message}</span>
        <ClearIcon fontSize='large' className='absolute top-0  right-0 z-20 hover:cursor-pointer ' onClick={handleClosePopup} />
    </span>
  )
}

export default FailurePopup