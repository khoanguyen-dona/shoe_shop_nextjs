import "./globals.css"
import {Inter} from 'next/font/google';
import Navbar from "@/components/Navbar";

const inter = Inter({subsets: ['latin']});

export const metadata = {
  title: "Shoe shop",
  description: "Giày thời trang",
};

const layout = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>  
          <Navbar/>
          <main className='mx-auto   '  >{children}</main>    
      </body>
    </html>
  );
};

export default layout;