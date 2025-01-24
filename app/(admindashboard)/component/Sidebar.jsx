'use client'
import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { setCart } from '@/redux/cartRedux'
import { setWishlist } from '@/redux/wishlistRedux'
import { setUser } from '@/redux/userRedux'
import Loader from '@/components/Loader'
import SuccessPopup from '@/components/Popup/SuccessPopup'

const SideBar = () => {
  const [notifySuccess, setNotifySuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()
  const pathname = usePathname()
  const currentPage = pathname.split('/')[2]

  const user = useSelector((state)=>state.user?.currentUser)

  const handleClosePopup = () => {
    setNotifySuccess(false)
  }

  const handleLogout = async () => {
    setLoading(true)  
    
    dispatch(setCart(null))
    dispatch(setWishlist(null))
    dispatch(setUser(null))
    // router.push('/')
    setNotifySuccess(true)
    
  }
  return (
 
  < >
   
    {loading ?  
      <div className='fixed  right-1/2 z-40 ' >
       <Loader  color={'inherit'} />  
       </div>      
       : ''}
    {loading &&
      <div className='fixed w-screen h-screen bg-white opacity-50 z-20' ></div> 
    }
    {/* Notify */}
    {notifySuccess ? 
            <div  className='absolute flex justify-center p-4  ' > 
                <SuccessPopup  message={'Log out Successfully! redirecting...'}  handleClosePopup={handleClosePopup}   /> 
            </div>  : '' }
    
    <div className={`flex flex-col space-y-2  text-white p-4   `}>
     

      <a onClick={()=>setLoading(true)} href={`/admin/products`} >
            <button 
                      
                  className={`border-2 hover:bg-black hover:border-black  transition p-4 font-bold w-full
                  ${currentPage==='products' ? 'bg-black border-black  text-white ':''  }`} 
            >
              Products          
          </button>
        </a>  

        <a onClick={()=>setLoading(true)} href={`/admin/product-line`}  >
            <button 
                    
                  className={`border-2 hover:bg-black  hover:border-black  transition p-4 font-bold w-full
                  ${currentPage==='product-line' ? 'bg-black border-black  text-white ':''  }`} 
            >
              Product line          
          </button>
        </a>

        <a onClick={()=>setLoading(true)}  href={`/admin/orders`}  >
            <button 
                    
                  className={`border-2 hover:bg-black hover:border-black  transition p-4 font-bold w-full
                  ${currentPage==='orders' ? 'bg-black border-black  text-white ':''  }`} 
            >
              Orders          
          </button>
        </a>

        <a onClick={()=>setLoading(true)}  href={`/admin/categories`}  >
            <button 
                    
                  className={`border-2 hover:bg-black hover:border-black transition p-4 font-bold w-full
                  ${currentPage==='categories' ? 'bg-black border-black  text-white ':''  }`} 
            >
              Categories         
          </button>
        </a>

        <a onClick={()=>setLoading(true)}  href={`/admin/users`}  >
            <button 
                    
                  className={`border-2 hover:bg-black hover:border-black  transition p-4 font-bold w-full
                  ${currentPage==='users' ? 'bg-black border-black text-white ':''  }`} 
            >
              Users        
          </button>
        </a>

        <a onClick={()=>setLoading(true)} href={`/admin/attributes`}  >
            <button 
                    
                  className={`border-2    hover:bg-black hover:border-black  transition p-4 font-bold w-full
                  ${currentPage==='attributes' ? 'bg-black border-black text-white ':''  }`} 
            >
              Attributes          
          </button>
        </a>

        <a href='/' onClick={handleLogout}  >
            <button 
                    
                  className='border-2 rounded-sm hover:bg-red-800 hover:border-red-800 bg-red-500 border-red-500  transition p-4 font-bold w-full   ' 
            >
              Log out          
          </button>
        </a>

       
        
    </div>
    
  </>
  )
}

export default SideBar