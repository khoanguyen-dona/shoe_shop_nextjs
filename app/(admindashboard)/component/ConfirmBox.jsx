'use client'
import ClearIcon from '@mui/icons-material/Clear';

const ConfirmBox = ({content, handleYes, handleNo, handleClose }) => {

  return (
   
        <div className='fixed flex flex-col bg-white border-2 rounded-lg w-4/5 md:w-3/5 lg:w-1/3 h-1/4  top-1/3 left-10 md:left-28 lg:left-1/3 z-30 shadow-lg'>
            <div className='text-right'>
                <ClearIcon fontSize='large' className='hover:text-gray-400 hover:cursor-pointer' onClick={handleClose}/>
            </div>
            <div className='p-4 text-center'>
                {content}
            </div>
            <div className='text-center space-x-4'>
                <button onClick={handleYes} className='px-4 py-2  bg-green-500 text-white font-bold rounded-lg 
                    hover:bg-green-400'>
                    Yes
                </button  >
                <button onClick={handleNo} className='px-4 py-2  bg-gray-200 text-black font-bold rounded-lg
                    hover:bg-gray-100'>
                    No
                </button>

            </div>
        </div>

  )
}

export default ConfirmBox