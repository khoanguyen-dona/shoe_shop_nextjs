import React from 'react'
import { giayData } from '@/Data/data'



const Products = ({setCurrentPage}) => {
  return (
    <div className='flex flex-col' >
      <p className='font-bold text-3xl mt-20' >Products</p>
      <div className='flex flex-col mt-4' >
        <button
            
            onClick={(e)=>setCurrentPage('AddProduct')} 
            className='bg-green-500 hover:bg-green-700 transition rounded p-3  w-32 text-white font-bold' >
          Thêm mới
        </button>

        <table className=' border-collapse   table-auto w-full border-gray-200 mt-4  ' >
          <thead>
            <tr className='bg-gray-600 text-white  text-left  ' >
              <th className='py-4 px-2 border-2 ' >Hình ảnh</th>
              <th className='border-2 px-1 '  >Tên </th>
              <th className='border-2 px-1 ' >Giá</th>
              <th className='px-1' >Thao tác </th>
            </tr>
          </thead>  
          <tbody>
            {giayData.map((d,index) => (                        
              <tr key={index} className='border border-solid' >
                <td className='border-2  ' ><img className='w-16' src={d.thumbnail} alt="" /></td>
                <td className='border-2 p-1  ' >{d.productName}</td>
                <td className='border-2 p-1 ' >{d.price} đ</td>
                <td className='border-2 p-1  ' >
                  <span onClick={()=>setCurrentPage('EditProduct')}  className='text-blue-500 hover:cursor-pointer 
                    hover:text-blue-900 transition' >
                    Chỉnh sửa 
                  </span> |
                  <span className='text-red-500 hover:cursor-pointer hover:text-red-900 transition' > Xóa </span> 
                </td>
              </tr>        
            ))}
          </tbody>
        </table>

        <div className='flex mt-4 justify-around  ' >
            <a  className='p-4 bg-black text-white hover:text-gray-500 transition ' href="">PREVIOUS</a>
            <p className='mt-4 text-xl'>Page : <span  className='font-bold' >1</span>   of 5</p>
            <a  className='p-4 bg-black text-white hover:text-gray-500 transition ' href="">NEXT </a>
        </div>


        
      </div>
    </div>
  )
}

export default Products