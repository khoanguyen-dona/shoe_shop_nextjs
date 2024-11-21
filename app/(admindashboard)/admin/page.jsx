'use client'

import React  from 'react'
import SideBar from '../component/Sidebar'
import { useState } from 'react'
import Products from '../component/Products'
import Orders from '../component/Orders'
import Users from '../component/Users'
import AddProduct from '../component/AddProduct'
import EditProduct from '../component/EditProduct'
import EditOrder from '../component/EditOrder'
import Categories from '../component/Categories'
import AddCategory from '../component/AddCategory'


const page = () => {
  const[currentPage,setCurrentPage] = useState('Products')

  return (
    <div className='m-auto flex flex-col ' >
      <div className='bg-black' >
        <p className='font-extrabold text-white text-4xl text-center p-2' >
          <a href="/admin">
            Admin Dashboard
          </a>
        </p>
      </div>
      <div className='flex'>
        <div className='w-1/6 p-4 h-screen bg-gray-700 ' >
          <SideBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>

        <div className='w-5/6  p-4' >
          {currentPage==='AddCategory' && <AddCategory/>}
          {currentPage==='Categories' && <Categories setCurrentPage={setCurrentPage} />}
          {currentPage==='EditOrder' && <EditOrder/>}
          {currentPage==='AddProduct' && <AddProduct/> }
          {currentPage==='EditProduct' && <EditProduct/> }
          {currentPage==='Products' && <Products setCurrentPage={setCurrentPage} /> }
          {currentPage==='Orders' && <Orders setCurrentPage={setCurrentPage} /> }
          {currentPage==='Users' && <Users/> }
        </div>

      </div>
    </div>
  )
}

export default page