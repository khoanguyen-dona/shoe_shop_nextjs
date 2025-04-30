'use client'
import SideBar from "./component/Sidebar";
import './admincss.css'
import {Inter} from 'next/font/google';
const inter = Inter({subsets: ['latin']});
import Admin from "./component/Admin";
import { Provider, useSelector } from "react-redux";
import {store, persistor} from '../../redux/store'
import { useRouter } from "next/navigation";


//layout.jsx
const getStoredValue = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("persist:root");
  }
  return null; 
};
const user = JSON.parse(getStoredValue())?.user;
const currentUser = user && JSON.parse(user).currentUser


const layout = ({ children }) => {
  
  const router = useRouter()
  return (
    <html lang="en">    
       <body className={inter.className}>   
       <Provider store={store}>   
          {currentUser?.isAdmin ?
          <>                                                                       
            <div className="flex flex-col " >  
                <div className="z-40 lg:z-40 fixed   w-full" >
                  <Admin/>
                </div>  
                <SideBar  />                        
                <div className='w-full lg:ml-[200px]   p-4 mt-24   '  >{children}</div>      
            </div> 
           
          </>
           :router.push('/admin-login')   
          }    
       </Provider> 
         </body>
      </html>
  );
};

export default layout;