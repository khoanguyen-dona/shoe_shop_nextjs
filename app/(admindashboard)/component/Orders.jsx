import React from 'react'
import { orderData } from '@/Data/data'





const Orders = ({setCurrentPage}) => {
  return (
    <div className='flex flex-col' >
      <p className='font-bold text-3xl mt-20' >Orders</p>
      <div className='flex flex-col' >
        

        <table className='table-auto w-full border-gray-200 mt-4 ' >
          <thead>
            <tr className='bg-gray-600 text-white  text-left  ' >
              <th className='py-4 px-1 border-2 ' >Id</th>
              <th className='border-2 px-1 ' >Tên khách hàng </th>
              <th className='border-2 px-1 ' >Ngày</th>
              <th className='border-2 px-1 '>Trạng thái </th>
              <th className='border-2 px-1 ' >Giá</th>
              <th className='border-2 px-1 ' >Thao tác</th>

            </tr>
          </thead>  
          <tbody>
            {orderData.map((d,index) => (                        
              <tr key={index} className='border border-solid' >
                <td className='border-2 px-1 ' > {d.id} </td>
                <td className='border-2 px-1 ' >{d.clientName}</td>
                <td className='border-2 px-1 ' >{d.date} </td>
                <td className='border-2 px-1 ' >{d.status} </td>
                <td className='border-2 px-1 ' >{d.total} đ </td>

                <td className='border-2 px-1 ' >
                  <span className='text-blue-500 hover:cursor-pointer hover:text-blue-900 transition' 
                    onClick={()=>setCurrentPage('EditOrder')} > Chỉnh sửa </span> |
                  <span className='text-red-500 hover:cursor-pointer hover:text-red-900 transition ' > Xóa </span> 
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

export default Orders