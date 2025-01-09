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
const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser

console.log('curr',currentUser)
const layout = ({ children }) => {
  
  const router = useRouter()
  return (
    <html lang="en">    
       <body className={inter.className}>   
       <Provider store={store}>   
          {currentUser?.isAdmin ?
          <>
            <Admin/>
            <div className="flex flex-col lg:flex-row" >             
                <div className="w-full  lg:w-1/6  bg-gray-800 h-2/5 lg:h-screen">       
                  <SideBar/>                  
                </div>              
              <div className='w-full  lg:w-5/6  p-4  '  >{children}</div>      
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