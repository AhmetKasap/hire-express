'use client'
import Navbar from '@/components/Navbar'
import React from 'react'
import About from './components/About'
import Profile from './components/Profile'

import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import EditProfile from './components/EditProfile'
import { userValidateService, getUserByIdService } from '@/services/User'

const page = () => {


  const [token, setToken] = useState()
  useEffect(() => {
    const getToken = Cookies.get('token')

    if (getToken) setToken(getToken)

  }, [])


  const [validUser, setValidUser] = useState()

  useEffect(() => {
    const validateUser = async () => {
      const result = await userValidateService(token)
      setValidUser(result.data)

    }

    validateUser()

  }, [token])




  return (
    <>


      <div className='w-10/12 mx-auto'>
        <Navbar></Navbar>

        {
          validUser && (
            <div className='sm:flex sm:flex-col md:flex md:flex-col lg:flex lg:flex-row xl:flex xl:flex-row xl:w-3/4 xl:mx-auto mt-8 gap-8'>
            <Profile users={validUser}></Profile>
            <About users={validUser}></About>
  
  
          </div>

          )
        }

       

        {
          validUser && (
            <div className='w-9/12 mx-auto mt-8 flex justify-end'>

              <EditProfile users={validUser}></EditProfile>
            </div>

          )
        }



      </div>


    </>
  )
}

export default page