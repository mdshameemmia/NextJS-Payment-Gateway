import React from "react";

// components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Admin({ children }) {

  
  const router = useRouter();
  const { data: session, status } = useSession();
  


  if (status === 'unauthenticated') {
    router.push('/user/login')
    return;
  }else {
    return (
      <>
      <ToastContainer position='top-right' autoClose={2000} limit={1} />
        <Sidebar />
        <div className="flex flex-col  items-between md:ml-64 bg-blueGray-100 min-h-screen">
  
          <AdminNavbar />
  
          <div className="p-4">
            {children}
          </div>
        </div>
      </>
    );

  }

}
