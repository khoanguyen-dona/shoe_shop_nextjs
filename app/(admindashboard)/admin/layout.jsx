import "./admincss.css"
import {Inter} from 'next/font/google';
const inter = Inter({subsets: ['latin']});


const layout = ({ children }) => {
  return (
    <html lang="en">    
       <body className={inter.className}>   
          <div className='mx-auto'  >{children}</div>      
       </body>
    </html>
  );
};

export default layout;