'use client'
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'


const SideBar = () => {
  const pathname = usePathname()
  const currentPage = pathname.split('/')[2]
  const menu = ['products','product line','orders','categories','users','attributes']

  return (
    <div className='flex flex-col space-y-2  text-white p-4 '>
      {/* {menu.map((m,index) => (
        <a href={`/admin/${m}`} key={index}  >
           <button 
                  value={m}    
                  className={`border-2 hover:bg-black  transition p-4 font-bold w-full
                  ${currentPage===m ? 'bg-black text-white ':''  }`} 
        >
            {m}          
          </button>
        </a>   
      ))}   */}

      <a href={`/admin/products`} >
            <button 
                      
                  className={`border-2 hover:bg-black  transition p-4 font-bold w-full
                  ${currentPage==='products' ? 'bg-black text-white ':''  }`} 
            >
              Products          
          </button>
        </a>  

        <a href={`/admin/product-line`}  >
            <button 
                    
                  className={`border-2 hover:bg-black  transition p-4 font-bold w-full
                  ${currentPage==='product-line' ? 'bg-black text-white ':''  }`} 
            >
              Product line          
          </button>
        </a>

        <a href={`/admin/orders`}  >
            <button 
                    
                  className={`border-2 hover:bg-black  transition p-4 font-bold w-full
                  ${currentPage==='orders' ? 'bg-black text-white ':''  }`} 
            >
              Orders          
          </button>
        </a>

        <a href={`/admin/categories`}  >
            <button 
                    
                  className={`border-2 hover:bg-black  transition p-4 font-bold w-full
                  ${currentPage==='categories' ? 'bg-black text-white ':''  }`} 
            >
              Categories         
          </button>
        </a>

        <a href={`/admin/users`}  >
            <button 
                    
                  className={`border-2 hover:bg-black  transition p-4 font-bold w-full
                  ${currentPage==='users' ? 'bg-black text-white ':''  }`} 
            >
              Users        
          </button>
        </a>

        <a href={`/admin/attributes`}  >
            <button 
                    
                  className={`border-2 hover:bg-black  transition p-4 font-bold w-full
                  ${currentPage==='attributes' ? 'bg-black text-white ':''  }`} 
            >
              Attributes          
          </button>
        </a>

       
        
    </div>
  )
}

export default SideBar