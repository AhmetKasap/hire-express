'use client'
import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from 'next/navigation'
import { editUserService } from '@/services/User'
import Cookies from 'js-cookie'

const EditProfile = ({ users }) => {
  const router = useRouter();

  const [school, setSchool] = useState('')
  const [work, setWork] = useState('')
  const [about, setAbout] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [languages, setLanguages] = useState([])
  const [newLanguage, setNewLanguage] = useState('')
  const [token, setToken] = useState()
  const [dialogOpen, setDialogOpen] = useState(false) // Dialog state

  const getToken = Cookies.get('token')

  useEffect(() => {
    if (users) {
      setSchool(users.school || '')
      setWork(users.work || '')
      setAbout(users.about || '')
      setCity(users.location?.city || '')
      setState(users.location?.state || '')
      setCountry(users.location?.country || '')
      setLanguages(users.language || [])
      setToken(getToken)
    }
  }, [users])

  const addLanguage = () => {
    if (newLanguage.trim()) {
      setLanguages((prev) => [...prev, newLanguage.trim()])
      setNewLanguage('')
    }
  }

  const removeLanguage = (lang) => {
    setLanguages((prev) => prev.filter((language) => language !== lang))
  }

  const edit = async () => {
    const editPayload = {
      school,
      work,
      about,
      location: { city, state, country },
      language: languages
    }

    const response = await editUserService(token, editPayload)
    console.log("Response", response)

    if (response.success === true) {
      setDialogOpen(false)
      router.push('/')

    }
  }

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger
          onClick={() => setDialogOpen(true)}
          className='p-2 border rounded-lg hover:bg-black hover:text-white outline-none border-gray-900'>
          Profili Düzenle
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl">Profilinizi Düzenleyin</DialogTitle>
            <DialogDescription className="flex flex-col items-center"></DialogDescription>
          </DialogHeader>

          <div className='flex flex-col items-center gap-4'>
            <div className='flex flex-col gap-2 w-full'>
              <label htmlFor='school' className='font-medium text-lg'>Okul</label>
              <input
                onChange={(e) => setSchool(e.target.value)}
                value={school}
                id='school'
                type='text'
                className='border w-full rounded-sm h-10 p-3 text-sm'
              />
            </div>
            <div className='flex flex-col gap-2 w-full'>
              <label htmlFor='work' className='font-medium text-lg'>İş</label>
              <input
                onChange={(e) => setWork(e.target.value)}
                value={work}
                id='work'
                type='text'
                className='border w-full rounded-sm h-10 p-3 text-sm'
              />
            </div>
            <div className='flex flex-col gap-2 w-full'>
              <label htmlFor='about' className='font-medium text-lg'>Hakkımda</label>
              <textarea
                onChange={(e) => setAbout(e.target.value)}
                value={about}
                id='about'
                className='border w-full rounded-sm h-18 p-3 text-sm'
              />
            </div>
            <div className='flex flex-col gap-2 w-full'>
              <label htmlFor='country' className='font-medium text-lg'>Ülke</label>
              <input
                onChange={(e) => setCountry(e.target.value)}
                value={country}
                placeholder='örneğin: Türkiye'
                id='country'
                type='text'
                className='border w-full rounded-sm h-10 p-3 text-sm'
              />
            </div>
            <div className='flex flex-col gap-2 w-full'>
              <label htmlFor='state' className='font-medium text-lg'>Bölge/Şehir</label>
              <input
                onChange={(e) => setState(e.target.value)}
                value={state}
                placeholder='örneğin: İstanbul'
                id='state'
                type='text'
                className='border w-full rounded-sm h-10 p-3 text-sm'
              />
            </div>
            <div className='flex flex-col gap-2 w-full'>
              <label htmlFor='city' className='font-medium text-lg'>İlçe</label>
              <input
                onChange={(e) => setCity(e.target.value)}
                value={city}
                placeholder='örneğin: Kadıköy'
                id='city'
                type='text'
                className='border w-full rounded-sm h-10 p-3 text-sm'
              />
            </div>
            <div className='flex flex-col gap-2 w-full'>
              <label htmlFor='languages' className='font-medium text-lg'>Konuştuğum Diller</label>
              <div className='flex gap-2'>
                <input
                  onChange={(e) => setNewLanguage(e.target.value)}
                  value={newLanguage}
                  id='languages'
                  type='text'
                  placeholder='Dil ekleyin, ör: Türkçe'
                  className='border w-full rounded-sm h-10 p-3 text-sm'
                />
                <button
                  onClick={addLanguage}
                  className='border px-3 hover:bg-black hover:text-white outline-none font-medium text-sm rounded-lg'>
                  Ekle
                </button>
              </div>
              <ul className="mt-2">
                {languages.map((lang, index) => (
                  <li key={index} className="flex justify-between items-center border-b py-1">
                    <span>{lang}</span>
                    <button
                      onClick={() => removeLanguage(lang)}
                      className="text-red-500 text-sm hover:underline">
                      Sil
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className='flex flex-col gap-2 w-full'>
              <button
                onClick={edit}
                className='border p-2 hover:bg-black hover:text-white outline-none font-medium text-sm rounded-lg'>
                Kaydet
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default EditProfile
