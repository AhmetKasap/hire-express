'use client'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { loginService, registerService } from '@/services/Auth'
import Navbar from '@/components/Navbar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie'
import { redirect } from 'next/navigation'
import { Skeleton } from "@/components/ui/skeleton"




const page = () => {

  const notify = (message) => toast(message)

  const { register: loginRegister, handleSubmit: handleLoginSubmit, reset: resetLoginForm, formState: { errors: loginErrors } } = useForm()
  const { register: signupRegister, handleSubmit: handleSignupSubmit, reset: resetSignupForm, formState: { errors: signupErrors } } = useForm()


  const login = async (data) => {
    const result = await loginService(data.email, data.password)
    if (result.success === true) {
      Cookies.set('token', result.data.token)
      notify("Giriş İşlemi Başarılı")
      resetLoginForm()
      redirect('/')
    }
    else {
      notify("Email adresiniz veya şifreniz yanlış, lütfen tekrar deneyiniz.")
      resetLoginForm()
    }

  }

  const signUp = async (data) => {
    const result = await registerService(data.firstname, data.lastname, data.email, data.password)
    if (result.success === true) {
      notify("Kayıt işlemi başarılı, giriş yapabilirsiniz.")
      resetSignupForm()
    }
    else {
      notify(result.message)
      resetSignupForm()
    }

  }


  const [loading, setLoading] = useState(true)

  useEffect(() => {

    setLoading(true)
    const token = Cookies.get('token')

    if (token) redirect('/')
    else setLoading(false)




  }, [])



  return (
    <>

      {
        loading ? (
          <div className='w-10/12 mx-auto'>
            <div className="flex  sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/3 mx-auto border items-center justify-center mt-24 rounded-lg p-8">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>

          </div>

        ) : (
          <div className='w-10/12 mx-auto'>
            <Navbar></Navbar>

            <ToastContainer />

            <div className='flex  sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/3 mx-auto border items-center justify-center mt-24 rounded-lg p-8 '>

              <Tabs defaultValue="login" className="w-full">

                <TabsList className="mb-8">
                  <TabsTrigger value="login">Giriş Yap</TabsTrigger>
                  <TabsTrigger value="signup">Kayıt Ol</TabsTrigger>
                </TabsList>

                {/* Login */}
                <TabsContent value="login" className="w-full">
                  <form onSubmit={handleLoginSubmit(login)} className='flex flex-col w-full '>
                    <label className='mb-2 font-medium' htmlFor='email'>Email</label>
                    <input
                      id="email"
                      type="text"
                      {...loginRegister("email", {
                        required: "Email is required",
                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                      })}
                      className="w-full p-2 border rounded-md"
                    />
                    {loginErrors.email && <p className="text-red-500 text-sm">{loginErrors.email.message}</p>}

                    <label htmlFor="password" className="block mb-2 font-medium mt-4">Password</label>
                    <input
                      id="password"
                      type="password"
                      {...loginRegister("password", {
                        required: "Password is required",
                        minLength: { value: 6, message: "Password must be at least 6 characters" }
                      })}
                      className="w-full p-2 border rounded-md"
                    />
                    {loginErrors.password && <p className="text-red-500 text-sm">{loginErrors.password.message}</p>}

                    {/* Gönder Butonu */}
                    <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md mt-8">
                      Login
                    </button>


                  </form>
                </TabsContent>

                {/* Sign up */}
                <TabsContent value="signup">

                  <form onSubmit={handleSignupSubmit(signUp)} className='flex flex-col w-full '>

                    <div className='flex flex-col mb-3'>
                      <label className='mb-2 font-medium' htmlFor='firstname'>First Name</label>
                      <input
                        id="firstname"
                        type="text"
                        {...signupRegister("firstname", {
                          required: "Firstname is required",
                        })}
                        className="w-full p-2 border rounded-md"
                      />
                      {signupErrors.firstname && <p className="text-red-500 text-sm">{signupErrors.firstname.message}</p>}

                    </div>

                    <div className='flex flex-col mb-3'>
                      <label className='font-medium mb-2' htmlFor='lastname'>Last Name</label>
                      <input
                        id="lastname"
                        type="text"
                        {...signupRegister("lastname", {
                          required: "Lastname is required",
                        })}
                        className="w-full p-2 border rounded-md"
                      />
                      {signupErrors.lastname && <p className="text-red-500 text-sm">{signupErrors.lastname.message}</p>}

                    </div>

                    <div className='flex flex-col '>
                      <label className='mb-2 font-medium' htmlFor='email'>Email</label>
                      <input
                        id="email"
                        type="text"
                        {...signupRegister("email", {
                          required: "Email is required",
                          pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                        })}
                        className="w-full p-2 border rounded-md"
                      />
                      {signupErrors.email && <p className="text-red-500 text-sm">{signupErrors.email.message}</p>}



                    </div>

                    <div className='flex flex-col '>
                      <label htmlFor="password" className="block mb-2 font-medium mt-4">Password</label>
                      <input
                        id="password"
                        type="password"
                        {...signupRegister("password", {
                          required: "Password is required",
                          minLength: { value: 6, message: "Password must be at least 6 characters" }
                        })}
                        className="w-full p-2 border rounded-md"
                      />
                      {signupErrors.password && <p className="text-red-500 text-sm">{signupErrors.password.message}</p>}


                    </div>

                    {/* Gönder Butonu */}
                    <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md mt-8">
                      Register
                    </button>


                  </form>

                </TabsContent>
              </Tabs>

            </div>
          </div>

        )
      }


    </>
  )
}

export default page