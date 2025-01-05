'use client'
import SideBar from "./component/Sidebar";
import './admincss.css'
import {Inter} from 'next/font/google';
const inter = Inter({subsets: ['latin']});
import Admin from "./component/Admin";
import { Provider } from "react-redux";
import {store, persistor} from '../../redux/store'
import { PersistGate } from "redux-persist/integration/react";

const layout = ({ children }) => {

  return (
    <html lang="en">    
       <body className={inter.className}>   
       <Provider store={store}> 
      {/* <PersistGate loading={null}  persistor={persistor}>  */}
   
          <Admin/>
          <div className="flex flex-col lg:flex-row" >
             
               <div className="w-full  lg:w-1/6  bg-gray-800 h-2/5 lg:h-screen">
                <SideBar/>
              </div>
              
            <div className='w-full  lg:w-5/6  p-4  '  >{children}</div>      
          </div>     
    
       {/* </PersistGate> */}
       </Provider> 
         </body>
      </html>
  );
};

export default layout;