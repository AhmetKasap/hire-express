import Navbar from '@/components/Navbar'
import React from 'react'
import AddHost from './components/AddHost'
import Host from './components/Host'

const page = () => {
  return (
    <>
      <div className='w-10/12 mx-auto'>
        <Navbar></Navbar>

        <div className='mt-4 flex flex-col'>
          <AddHost></AddHost>
          <Host></Host>

        </div>

      


      </div>

    </>
  )
}

export default page