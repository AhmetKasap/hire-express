import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const EditProfile = () => {
  return (
    <>

      <Dialog>
        <DialogTrigger className='p-2 border rounded-lg hover:bg-black hover:text-white outline-none border-gray-900'>Profili Düzenle</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl">Profilinizi Düzenleyin</DialogTitle>
            <DialogDescription className="flex flex-col items-center">
             
              
            </DialogDescription>
          </DialogHeader>

          <div className='flex flex-col items-center gap-4'>
            <div className='flex flex-col  gap-2 w-full'>
              <label htmlFor='school' className='font-medium text-lg'>Okul</label>
              <input id='school' type='text' className='border w-full rounded-sm h-10 p-3 text-sm'/>
            </div>
            <div className='flex flex-col  gap-2 w-full'>
              <label htmlFor='work' className='font-medium text-lg'>İş</label>
              <input id='work' type='text' className='border w-full rounded-sm h-10 p-3 text-sm'/>
            </div>
            <div className='flex flex-col  gap-2 w-full'>
              <label htmlFor='about' className='font-medium text-lg'>Hakkımda</label>
              <textarea id='about' type='text' className='border w-full rounded-sm h-18 p-3 text-sm'/>
            </div>
            <div className='flex flex-col  gap-2 w-full'>
              <label htmlFor='location' className='font-medium text-lg'>Yaşadığım Yer</label>
              <input id='location' type='text' className='border w-full rounded-sm h-10 p-3 text-sm'/>
            </div>
            <div className='flex flex-col  gap-2 w-full'>
              <label htmlFor='languages' className='font-medium text-lg'>Konuştuğum Diller</label>
              <input id='languages' type='text' className='border w-full rounded-sm h-10 p-3 text-sm'/>
            </div>

            <div className='flex flex-col  gap-2 w-full'>
              
             <button className='border p-2 hover:bg-black hover:text-white outline-none font-medium text-sm rounded-lg'>Kaydet</button>
            </div>
            
            
               
          </div>
        </DialogContent>
      </Dialog>



    </>
  )
}

export default EditProfile