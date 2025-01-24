import React from 'react'
import DoneIcon from '@mui/icons-material/Done';

const SelectPopup = ({data, handleClick, itemChoose}) => {

  return (
    <div className={`absolute top-18 left-0 z-40 bg-white text-left p-1 w-auto  overflow-auto  shadow-2xl rounded-md border-2 border-gray-300 
        ${ data.length>20 ? 'h-[500px]':'h-auto'} `}   >
        {data?.map((item, index)=> 

            <div
                onClick = {()=>handleClick(item)} 
                key={index} className={`hover:bg-gray-300 p-1 hover:cursor-pointer rounded-md `}
             >
                {item}
                { itemChoose===item &&
                    <DoneIcon  className='text-green-500 font-bold ' fontSize='medium' />      
                }
            </div>
           
      
        )

        }
    </div>
  )
}

export default SelectPopup