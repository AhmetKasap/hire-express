'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const Profile = ({users}) => {

  const [avatar,setAvatar] = useState()

  useEffect(() =>{
    if(users) setAvatar(users.avatar)

  },[users])


  return (
    <>
        <div className='flex flex-row items-center justify-between border rounded-xl p-3 w-full'>
            <div className='flex flex-col'>
                
                                            <Image
                                            alt='Avatar'
                                            className='w-full rounded-full'
                                            width={100}
                                            height={100}
                                            src={avatar && avatar.startsWith('avatar') ? `http://localhost:5000/uploads/avatars/${avatar}` : 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png'}
                                        />
                <p className='mt-6 font-medium text-lg'> {users && users.firstName + ' ' + users.lastName}</p>

            </div>
            <div className='flex flex-col'>
                <p className='font-medium text-lg'>2</p>
                <p className=' font-thin text-sm'>Yıldır Hire Express Kullanıyor.</p>
          
            </div>

        </div>

    </>
  )
}

export default Profile