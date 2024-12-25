import React from 'react'
import { LuSchool } from "react-icons/lu";
import { MdWork } from "react-icons/md";
import { GrLanguage } from "react-icons/gr";
import { IoMdHome } from "react-icons/io";
import { MdOutlineRoundaboutRight } from "react-icons/md";


const About = ({ users }) => {

  return (
    <>

      <div className='flex border rounded-lg p-3 w-full'>
        <div className='flex flex-col gap-4'>
          <h1 className='font-medium text-2xl'>{users && users.firstName}  Hakkında </h1>

          <div className='flex items-center gap-2'>
            <LuSchool />
            <p>Okula Gitiğim Yer : {users && users.school} </p>
          </div>

          <div className='flex items-center gap-2'>
            <MdWork />
            <p>Yaptığım İş : {users && users.work} </p>
          </div>

          <div className='flex items-center gap-2'>
            <GrLanguage />

            <div className='flex gap-2'>Konuştuğum Diller :

              {
                users && users.language && users.language.map(lang => {
                  return (
                    <p key={lang}> {lang}, </p>
                  )
                })
              }


            </div>
          </div>

          <div className='flex items-center gap-2'>
            <IoMdHome />
            <p>Yaşadığım Yer : {users && users.location && users.location.country} / {users && users.location && users.location.city} / {users && users.location && users.location.state}  </p>
          </div>

          <div className='flex items-center gap-2'>
            <MdOutlineRoundaboutRight />

            <p>Hakkımda : {users && users.about} </p>
          </div>

        </div>
      </div>





    </>
  )
}

export default About

