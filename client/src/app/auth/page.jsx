'use client'
import React, { useEffect, useState } from 'react'

const page = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [result, setResult] = useState("")

    console.log(email)
    console.log(password)

    

    const login = async() => {
      const response = await loginService(email,password)
      setResult(response)
    }



  return (
    <>

        <div className='flex w-1/2 mx-auto'>

            <div className='w-1/2 gap-8'>
                <input onChange={(e) => setEmail(e.target.value)} type='text' className='w-full h-12 rounded-sm outline-none p-3 border-2 mb-4 mt-4' placeholder='email'/>
                <input onChange={(e) => setPassword(e.target.value)} type='text' className='w-full h-12 rounded-sm outline-none p-3 border-2' placeholder='password'/>

                <button onClick={() => login()} className='border p-2 bg-blue-500 hover:bg-blue-600 text-white mt-4'>Girş Yap</button>




            </div>
            
        </div>


    </>
  )
}

export default page