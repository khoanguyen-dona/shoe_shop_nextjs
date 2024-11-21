
import React from 'react'
import { useState } from 'react'


const AddCategory = () => {

    const[category,setCategory]=useState('')

  return (
    <div className='mt-20 flex flex-col'>
        <div className='text-3xl font-bold' >
            Add category
        </div>
        <form action="" className='mt-10' >
            <div>
                <p className='text-sm text-gray-500' >Tên danh mục</p>
                <input  className='border-2 p-2 w-96' type="text"  onChange={(e)=>setCategory(e.target.value)}  />
            </div>

            <button  className='font-bold text-white bg-black w-[380px] hover:text-gray-500 transition p-4 mt-4' >
                Thêm
            </button>
        </form>

    </div>
  )
}

export default AddCategory