import "./globals.css"
import {Inter} from 'next/font/google';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
          <main className='mx-auto  mb-10'  >{children}</main> 
          <Footer  />   
      </body>
    </html>
  );
};

export default layout;