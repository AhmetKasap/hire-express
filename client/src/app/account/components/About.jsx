import React from 'react'
import { LuSchool } from "react-icons/lu";
import { MdWork } from "react-icons/md";
import { GrLanguage } from "react-icons/gr";
import { IoMdHome } from "react-icons/io";
import { MdOutlineRoundaboutRight } from "react-icons/md";






const About = ({users}) => {
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

              <p>Konuştuğum Diller : {users && users.language} </p>
            </div>

            <div className='flex items-center gap-2'>
              <IoMdHome />
              <p>Yaşadığım Yer : {users && users.location} </p>
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


/*

 location: {
        city: { type: String, trim: true },
        state: { type: String, trim: true },
        country: { type: String, trim: true }
    },
    language : {type : [String], trim : true},
    school : {type : String, trim : true},
    work : {type : String, trim : true},
    about : {type : String, trim : true},

*/