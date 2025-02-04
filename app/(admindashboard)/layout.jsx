'use client'
import SideBar from "./component/Sidebar";
import './admincss.css'
import {Inter} from 'next/font/google';
const inter = Inter({subsets: ['latin']});
import Admin from "./component/Admin";
import { Provider } from "react-redux";
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
            <div className="flex flex-col lg:flex-row" >  
                <div className="z-30 lg:z-20 fixed   w-full" >
                  <Admin/>
                </div>           
                <div className="w-full lg:fixed mt-14 lg:mt-0 lg:w-[250px] z-20 lg:z-30  bg-gray-800 h-2/5 lg:h-screen">       
                  <SideBar/>                       
                </div>              
              <div className='w-full lg:ml-[260px] lg:w-full  p-4  '  >{children}</div>      
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