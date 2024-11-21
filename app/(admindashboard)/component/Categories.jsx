import React from 'react'


const cat_data=['Giày','Áo','Phụ kiện']

const Categories = ({setCurrentPage}) => {

  return (
    <div className='flex flex-col mt-20'>
        <div className='font-bold text-3xl' >
        Categories
        </div>
        <div
          onClick={()=>setCurrentPage('AddCategory')} 
          className='p-3 bg-green-500 w-32 text-center font-semibold  text-white mt-4 hover:bg-green-800 
            transition rounded-md ' >
            Thêm mới
        </div>
        <table className='mt-4  ' >
          <thead className='bg-gray-500 text-white p-2 ' >
            <tr className='text-left' >
              <th className='border-2 p-2' >Tên</th>
              <th className='border-2 p-2' >Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {cat_data.map((d,index)=>(   

            <tr key={index} className='border-2' >
              <td className='border-2 p-2' >{d}</td>
              <td className='space-x-2' >
                <span className='text-blue-500 hover:text-blue-900 hover:cursor-pointer p-2 transition ' >
                  Chỉnh sửa 
                </span>
                |
                <span className='text-red-500 hover:cursor-pointer hover:text-red-900 ' >Xóa</span>
              </td>
            </tr>

            ))}
          </tbody>
        </table>

    </div>
  )
}

export default Categories