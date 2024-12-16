'use client'
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'


const SideBar = () => {
  const pathname = usePathname()
  const currentPage = pathname.split('/')[2]
  const menu = ['products','orders','categories','users']

  return (
    <div className='flex flex-col space-y-2  text-white p-4 '>
      {menu.map((m,index) => (
        <a href={`/admin/${m}`} key={index}  >
           <button 
                  value={m}    
                  className={`border-2 hover:bg-black  transition p-4 font-bold w-full
                  ${currentPage===m ? 'bg-black text-white ':''  }`} 
        >
            {m}          
          </button>
        </a>
       
        
      ))}    
    </div>
  )
}

export default SideBar