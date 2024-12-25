'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Cookies from 'js-cookie'
import { editAvatarService } from '@/services/User'
import { redirect } from 'next/navigation'

const Profile = ({ users }) => {
  const [avatar, setAvatar] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [renderAvatar, setRenderAvatar] = useState()
  const [dialogOpen, setDialogOpen] = useState(false)  // Add dialogOpen state

  useEffect(() => {
    if (users) setAvatar(users.avatar)
  }, [users, renderAvatar])

  const handleImageChange = (event) => {
    const file = event.target.files[0]

    if (file) {
      const allowedExtensions = ['image/png', 'image/jpeg', 'image/jpg']
      if (allowedExtensions.includes(file.type)) {
        setSelectedImage(file)
      } else {
        alert("Lütfen geçerli bir resim dosyası seçin (.png, .jpg, .jpeg)")
      }
    }
  }

  const handleUpload = async () => {
    if (!selectedImage) {
      alert("Lütfen bir fotoğraf seçin")
      return
    }

    const formData = new FormData()
    formData.append('avatar', selectedImage)

    const token = Cookies.get('token')

    const result = await editAvatarService(formData, token)

    if (result.success) {
      console.log(result.data.avatar)
      setAvatar(result.data.avatar)
      setRenderAvatar(true)
      setDialogOpen(false)  
      redirect('/')
    } else {
      alert('Fotoğraf yüklenirken bir hata oluştu')
    }
  }

  return (
    <>
      <div className='flex flex-row items-center justify-between border rounded-xl p-3 w-full'>
        <div className='flex flex-col'>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>  {/* Bind open state */}
            <DialogTrigger onClick={() => setDialogOpen(true)}>
              <Image
                alt='Avatar'
                className='w-full rounded-full'
                width={100}
                height={100}
                src={avatar && avatar.startsWith('avatar') ? `http://localhost:5000/uploads/avatars/${avatar}` : 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png'}
              />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Fotoğrafınızı Güncelleyin</DialogTitle>
                <div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <input
                      type='file'
                      accept='.png, .jpg, .jpeg'
                      className='border mt-8 p-3 rounded-lg'
                      onChange={handleImageChange}
                    />
                    <button
                      onClick={handleUpload}
                      className='border mt-4 p-2 bg-black text-white rounded-lg'>
                      Fotoğrafı Yükle
                    </button>
                  </div>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <p className='mt-6 font-medium text-lg'>
            {users && users.firstName + ' ' + users.lastName}
          </p>

        </div>
        <div className='flex flex-col'>
          <p className='font-medium text-lg'>2</p>
          <p className='font-thin text-sm'>Yıldır Hire Express Kullanıyor.</p>
        </div>
      </div>
    </>
  )
}

export default Profile
