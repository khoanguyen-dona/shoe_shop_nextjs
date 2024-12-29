'use client'
import SideBar from "../component/Sidebar";
import "./admincss.css"
import {Inter} from 'next/font/google';
const inter = Inter({subsets: ['latin']});
import Admin from "../component/Admin";

const layout = ({ children }) => {
  return (
    <html lang="en">    
       <body className={inter.className}>   
        <Admin/>

        <div className="flex flex-col lg:flex-row" >
          <div className="w-full  lg:w-1/6  bg-gray-800 h-2/5 lg:h-screen">
            <SideBar/>
          </div>
          <div className='w-full  lg:w-5/6 p-4   '  >{children}</div>      
        </div>

       </body>
    </html>
  );
};

export default layout;