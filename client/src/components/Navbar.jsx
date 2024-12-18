import React from 'react'
import Profile from './Profile/Profile'
import Search from './Search/Search'
import { SiExpressvpn } from "react-icons/si";
import Link from 'next/link';


const Navbar = () => {
  return (
    <>

        <div className='flex  items-center mt-4'>

            <div className='w-1/4'>
                    <Link href="/" className='flex items-center'>
                        <SiExpressvpn size={36}  className='text-red-500'/>
                        <span className='ml-2'>HireExpress</span>
                    </Link>
                    
            </div>

            <div className='w-1/2'>
                <Search></Search>

            </div>

            <div className='w-1/4 '>
                <Profile></Profile>
            </div>

        </div>
        

    </>
  )
}

export default Navbar