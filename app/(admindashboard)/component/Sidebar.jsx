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
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';

const SideBar = () => {
  const [mobileMenu, setMobileMenu] = useState(false)
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
    router.push(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`)

    
  }

  const handleNavigate = (url) => {
    setLoading(true)
    setMobileMenu(false)
    router.push(url)
    setLoading(false)
  }

  return (
  
  <div className=' '>
    {/* loader */}
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

    {/* desktop dashboard */}
    <span className='hidden lg:block bg-gray-800 h-screen w-[200px] fixed  z-20'>   

      <span className={`flex flex-col space-y-20   text-white p-4  mt-12   `}>
      
        <div className='' >  
          <a onClick={()=>setLoading(true)} href={`/admin/products`} >
              <button 
                        
                    className={`hover:border-l-4   border-blue-500 hover:text-blue-500  transition p-4 font-bold w-full text-left
                    ${currentPage==='products' ? ' border-l-4 border-blue-500  text-blue-500':''  }`}  
              >
                Products          
            </button>
          </a>  

          <a onClick={()=>setLoading(true)} href={`/admin/product-line`}  >
              <button 
                      
                    className={`hover:border-l-4 border-blue-500  hover:text-blue-500 transition p-4 font-bold w-full text-left
                    ${currentPage==='product-line' ? ' border-l-4 border-blue-500  text-blue-500 ':''  }`} 
              >
                Product line          
            </button>
          </a>

          <a onClick={()=>setLoading(true)}  href={`/admin/orders`}  >
              <button 
                      
                    className={`hover:border-l-4 border-blue-500 hover:text-blue-500  transition   p-4 font-bold w-full text-left
                    ${currentPage==='orders' ? ' border-l-4 border-blue-500  text-blue-500 ':''  }`} 
              >
                Orders          
            </button>
          </a>

          <a onClick={()=>setLoading(true)}  href={`/admin/categories`}  >
              <button 
                      
                    className={`hover:border-l-4 border-blue-500 hover:text-blue-500 transition p-4 font-bold w-full text-left
                    ${currentPage==='categories' ? 'border-l-4 border-blue-500  text-blue-500 ':''  }`} 
              >
                Categories         
            </button>
          </a>

          <a onClick={()=>setLoading(true)}  href={`/admin/users`}  >
              <button 
                      
                    className={`hover:border-l-4 border-blue-500 hover:text-blue-500  transition p-4 font-bold w-full text-left
                    ${currentPage==='users' ? 'border-l-4 border-blue-500  text-blue-500 ':''  }`} 
              >
                Users        
            </button>
          </a>

          <a onClick={()=>setLoading(true)} href={`/admin/attributes`} className='' >
              <button 
                      
                    className={`hover:border-l-4  border-blue-500 hover:text-blue-500  transition p-4 font-bold w-full text-left
                    ${currentPage==='attributes' ? 'border-l-4 border-blue-500  text-blue-500 ':''  }`} 
              >
                Attributes          
            </button>
          </a>
        </div>
      
        <div className=' items-end' >
            <button 
                  onClick={handleLogout}
                  className=' border-2 rounded-sm hover:bg-red-800 hover:border-red-800 bg-red-500 border-red-500  transition p-4 font-bold w-full   ' 
            >
              Log out          
          </button>
        </div>
                
      </span>

    </span>
    
    {/* open mobilemenu */}
    <div className='fixed top-16 left-4 z-20 rounded-md bg-gray-800 text-white p-1 block lg:hidden ' >
      <MenuIcon fontSize='large' onClick={()=>setMobileMenu(true)} />
    </div>
    
    {/* mobile dashboard */}
    <div className={`block lg:hidden h-screen w-screen  bg-gray-800 fixed z-50 transform duration-300  transition-transform  ${mobileMenu?'translate-x-0':'-translate-x-full'}  `} >
              
      <div className={`flex flex-col    text-white p-4  mt-0  `}>
      
        <div> 
           {/*close mobilemenu  */}
           <div className='fixed right-5  z-40 text-white ' >
            <CloseIcon fontSize='large' onClick={()=>setMobileMenu(false)} />
          </div>  
          <a onClick={()=>handleNavigate('/admin/products')} >
              <button 
                        
                    className={`hover:border-l-4   border-blue-500 hover:text-blue-500  transition p-4 font-bold w-full text-left
                    ${currentPage==='products' ? ' border-l-4 border-blue-500  text-blue-500':''  }`}  
              >
                Products          
            </button>
          </a>  

          <a onClick={()=>handleNavigate('/admin/product-line') } >
              <button 
                      
                    className={`hover:border-l-4 border-blue-500  hover:text-blue-500 transition p-4 font-bold w-full text-left
                    ${currentPage==='product-line' ? ' border-l-4 border-blue-500  text-blue-500 ':''  }`} 
              >
                Product line          
            </button>
          </a>

          <a onClick={()=>handleNavigate('/admin/orders')}  >
              <button 
                      
                    className={`hover:border-l-4 border-blue-500 hover:text-blue-500  transition   p-4 font-bold w-full text-left
                    ${currentPage==='orders' ? ' border-l-4 border-blue-500  text-blue-500 ':''  }`} 
              >
                Orders          
            </button>
          </a>

          <a onClick={()=>handleNavigate('/admin/categories')}  >
              <button 
                      
                    className={`hover:border-l-4 border-blue-500 hover:text-blue-500 transition p-4 font-bold w-full text-left 
                    ${currentPage==='categories' ? 'border-l-4 border-blue-500  text-blue-500 ':''  }`} 
              >
                Categories         
            </button>
          </a>

          <a onClick={()=>handleNavigate('/admin/users')}  >
              <button 
                      
                    className={`hover:border-l-4 border-blue-500 hover:text-blue-500  transition p-4 font-bold w-full text-left
                    ${currentPage==='users' ? 'border-l-4 border-blue-500  text-blue-500 ':''  }`} 
              >
                Users        
            </button>
          </a>

          <a onClick={()=>handleNavigate('/admin/attributes')} className='' >
              <button 
                      
                    className={`hover:border-l-4  border-blue-500 hover:text-blue-500  transition p-4 font-bold w-full text-left
                    ${currentPage==='attributes' ? 'border-l-4 border-blue-500  text-blue-500 ':''  }`} 
              >
                Attributes          
            </button>
          </a>
        </div>
      
        <div className='mt-32' >
            <button 
                  onClick={handleLogout}
                  className=' border-2 rounded-sm hover:bg-red-800 hover:border-red-800 bg-red-500 border-red-500  transition p-4 font-bold w-full   ' 
            >
              Log out          
          </button>
        </div>
                
      </div>
    </div>

  </div>
  )
}

export default SideBar