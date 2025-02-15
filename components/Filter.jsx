import React from 'react'
import Slider from '@mui/material/Slider';
import CloseIcon from '@mui/icons-material/Close';
import { FormatCurrency } from '@/utils/FormatCurrency';
import DoneIcon from '@mui/icons-material/Done';

export const Filter = ({ handleFilterClick , size_data, categoryList, subCategories, category, filter,  size, color, price, setPrice,
     setCategory, setPage, setColor, setSize}) => {


    const handlePrice = (e) => {
        setPrice(e.target.value)
        }
  
    const handleReset = () => {
        setPage(1)
        setColor('')
        setSize('')
        setCategory(['Áo','Quần'])
        setPrice([0,20000000])
    }
        
    const handleColor = (c) => {
        setPage(1)
        if(color === c){
            setColor('')
        } else {
            setColor(c)
        }
    }
        
    const handleSize = (s) => {
        setPage(1)
        if(size===s){
            setSize('')
        } else {
            setSize(s)
        }
    }
        
    const handleChooseCategory = async (cat) => {
        setPage(1)
        if(category.includes(cat)){
            setCategory(category.filter((c) => String(c) !== cat))        
        } else {
        setCategory(prev=>[...prev,cat])
        }    
    }

  return (
    <div className={`shadow-2xl overflow-auto   fixed  bg-white  w-full md:w-2/4 xl:w-1/4  h-screen z-40  p-3 top-0 right-0  flex flex-col transform  transition-transform 
              duration-300  ${filter ? 'translate-x-0' : 'translate-x-full'}  `} >
            <div className='flex flex-row justify-between ' >
                <div>
                    Lọc sản phẩm
                </div>
    
                <div>
                    <CloseIcon className='hover:cursor-pointer'  onClick={handleFilterClick}  />
                </div>
            </div>
    
            <hr  className='mt-2' />
     
            {/* Price filter */}
            <div className='font-bold text-2xl mt-3' >Giá </div>
            <div className='p-4' >
              <Slider
                getAriaLabel={() => 'Price range'}
                value={price}
                min={0}
                max={20000000}
                step={2000000}
                marks={true}
                onChange={handlePrice}
              />
            </div>
            <div className='text-center font-bold' >
              {FormatCurrency(price[0])} - {FormatCurrency(price[1])} vnđ
            </div>
            
            <hr className='mt-2'/>
            {/* size filter */}
            <div className='font-bold text-2xl mt-2' >
              Size
            </div>
            <div className='flex flex-wrap' >
            {size_data.map((d,index)=>(
              <span 
                onClick={()=>handleSize(d)}
                key={index} 
                className={`w-20 h-12 rounded-md border-gray-300 border-[2px] ml-[1px] mt-[1px] p-2 text-center font-bold
                     hover:border-gray-600  hover:cursor-pointer
                ${size===d ? 'bg-black text-white':'' }  `} >
                  {d}
              </span>
            ))}
            </div>
    
            {/* color filter */}
            <div className='font-bold text-2xl mt-4' >Color </div>
            <div className='flex flex-wrap   ' >
      
                <span 
                  onClick={()=>handleColor('black')}      
                  className={`relative rounded-md w-16 h-12 border-gray-300  ml-[1px] mt-[1px] text-center hover:border-black bg-black
                  `} 
                >     
                  {color==='black' && <DoneIcon fontSize='large' className='absolute z-20 flex left-5 text-white'/>}
                </span>
                    
                <span 
                  onClick={()=>handleColor('red')}      
                  className={`relative rounded-md w-16 h-12 border-gray-300  ml-[1px] mt-[1px] text-center hover:border-black bg-red-600
                  `} 
                >   
                  {color==='red' && <DoneIcon fontSize='large' className='absolute z-20 flex left-5 text-black'/>}
                </span>
    
                <span 
                  onClick={()=>handleColor('brown')}      
                  className={`relative rounded-md w-16 h-12 border-gray-300  ml-[1px] mt-[1px] text-center hover:border-black bg-amber-900
                  `} 
                >   
                  {color==='brown' && <DoneIcon fontSize='large' className='absolute z-20 flex left-5 text-black'/>}
                </span>
                    
                <span 
                  onClick={()=>handleColor('blue')}      
                  className={`relative rounded-md w-16 h-12 border-gray-300  ml-[1px] mt-[1px] text-center hover:border-black bg-blue-600
                  `} 
                >   
                  {color==='blue' && <DoneIcon fontSize='large' className='absolute z-20 flex left-5 text-black'/>}
                </span>
    
                <span 
                  onClick={()=>handleColor('green')}      
                  className={`relative rounded-md w-16 h-12 border-gray-300  ml-[1px] mt-[1px] text-center hover:border-black bg-green-600
                  `} 
                >   
                  {color==='green' && <DoneIcon fontSize='large' className='absolute z-20 flex left-5 text-black'/>}
                </span>
    
                <span 
                  onClick={()=>handleColor('yellow')}      
                  className={`relative rounded-md w-16 h-12 border-gray-300  ml-[1px] mt-[1px] text-center hover:border-black bg-yellow-400
                  `} 
                >   
                  {color==='yellow' && <DoneIcon fontSize='large' className='absolute z-20 flex left-5 text-black'/>}
                </span>
    
                <span 
                  onClick={()=>handleColor('gray')}      
                  className={`relative rounded-md w-16 h-12 border-gray-300  ml-[1px] mt-[1px] text-center hover:border-black bg-gray-400
                  `} 
                >   
                  {color==='gray' && <DoneIcon fontSize='large' className='absolute z-20 flex left-5 text-black'/>}
                </span>
    
                <span 
                  onClick={()=>handleColor('pink')}      
                  className={`relative rounded-md w-16 h-12 border-gray-300  ml-[1px] mt-[1px] text-center hover:border-black bg-pink-500
                  `} 
                >   
                  {color==='pink' && <DoneIcon fontSize='large' className='absolute z-20 flex left-5 text-black'/>}
                </span>
    
                <span 
                  onClick={()=>handleColor('orange')}      
                  className={`relative rounded-md w-16 h-12 border-gray-300  ml-[1px] mt-[1px] text-center hover:border-black bg-orange-600
                  `} 
                >   
                  {color==='orange' && <DoneIcon fontSize='large' className='absolute z-20 flex left-5 text-black'/>}
                </span>
    
                <span 
                  onClick={()=>handleColor('violet')}      
                  className={`relative rounded-md w-16 h-12 border-gray-300  ml-[1px] mt-[1px] text-center hover:border-black bg-violet-500
                  `} 
                >   
                  {color==='violet' && <DoneIcon fontSize='large' className='absolute z-20 flex left-5 text-black'/>}
                </span>
    
                <span 
                  onClick={()=>handleColor('white')}      
                  className={`relative rounded-md w-16 h-12 border-gray-300 border-2 ml-[1px] mt-[1px] text-center hover:border-black bg-white-500
                  `} 
                >   
                  {color==='white' && <DoneIcon fontSize='large' className='absolute z-20 flex left-5 text-black'/>}
                </span>
          
            </div>
    
             {/* filter categories */}
            <div className='font-bold text-2xl mt-4' >
                Categories 
            </div>
            <div className={`  bg-white text-left p-2  rounded-md  `}   >
                {categoryList.sort()?.map((item, index)=> 
                    <div key={index} className='space-x-2' >
                        {subCategories.includes(item)?
                        <span className='ml-4' >-</span>
                        :''}
                        <input type='checkbox' 
                            checked={category.includes(item)}
                            onClick = {()=>handleChooseCategory(item)} 
                            key={index} 
                            className={`hover:bg-gray-300 p-1 hover:cursor-pointer rounded-md `}         
                        />
                        <span className='ml-2' >
                            {item}
                        </span>

                                                
                    </div>
                )
        
                }
            </div> 
    
            <button  className='text-2xl border-2 border-gray-300 hover:bg-black hover:text-white transition p-3 font-bold mt-4 rounded-md' onClick={handleReset} >
              Reset filter
            </button>
            
    </div>
  )
}
