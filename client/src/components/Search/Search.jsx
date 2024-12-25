'use client'
import React, { useState } from 'react'
import { GoSearch } from "react-icons/go";


const Search = () => {



  return (
    <>
      <div className='mt-8 rounded-full p-5 border flex gap-2'>

        <input type='text' placeholder='Nereye gitmek istersiniz ? ' className='xsm : w-1/4 sm:w-1/4 md:w-1/4 lg:w-full xl:w-full border p-3  text-sm rounded-full outline-none' />
        <input type='date' className='xsm : w-1/4 sm:w-1/4 md:w-1/4 lg:w-full xl:w-full border p-3  text-sm rounded-full outline-none' />
        <input type='date' className='xsm : w-1/4 sm:w-1/4 md:w-1/4 lg:w-full xl:w-full border p-3  text-sm rounded-full outline-none' />
        <input type='number' placeholder='Yolcu sayısı seçin ' className='xsm : w-1/4 sm:w-1/4 md:w-1/4 lg:w-full xl:w-full border p-3  text-sm rounded-full outline-none' />


        <button className=''>
          <GoSearch size={30} className='text-red-500'/>
        </button>



      </div>

      
    </>



  )
}

export default Search
