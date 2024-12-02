"use client"

import "./globals.css"
import {Inter} from 'next/font/google';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Provider } from "react-redux";
import {store, persistor} from '../../redux/store'
import { PersistGate } from "redux-persist/integration/react";

const inter = Inter({subsets: ['latin']});
// export const metadata = {
//   title: "Shoe shop",
//   description: "Giày thời trang",
// };

const layout = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>  
        <Provider store={store}>
          <PersistGate loading={null}  persistor={persistor}>
            <Navbar/>
            <main className='mx-auto  mb'  >{children}</main> 
            <Footer  />   
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
};

export default layout;