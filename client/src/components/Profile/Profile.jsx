'use client'
import React, { useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'
import { FaUser } from "react-icons/fa";
import Cookies from 'js-cookie';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getAvatar } from '@/redux/fetuares/userSlice';



const Profile = () => {

    const dispatch = useDispatch()
    const avatar = useSelector((state) => state.users.avatar)

    console.log("avatrımqq", avatar)


    const [token, setToken] = useState()

    useEffect(() => {
        const getToken = Cookies.get('token')

        if (getToken) setToken(getToken)

    }, [])

    useEffect(() => {

        if(token) {
            dispatch(getAvatar(token))
        }

    },[token, dispatch])




    const logOut = async () => {
        Cookies.remove('token')
        redirect('/auth')

    }


    return (
        <>

            <div className=' flex items-end justify-end '>

                {
                    token ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger className='rounded-full   bg-slate-200'>

                            {
                                avatar ? (
                                    <Image
                            alt='Avatar'
                            className='w-full rounded-full'
                            width={35}
                            height={35}
                            src={ `http://localhost:5000/uploads/avatars/${avatar}` }
                        />

                                ) : (
                                    <div className='rounded-full p-4 w-12 bg-slate-200'>
                                        <FaUser></FaUser>
                                    </div>
                                )
                            }
                            


                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>
                                    <Link href="/" passHref>
                                        <span>Mesajlar</span>
                                    </Link>
                                </DropdownMenuLabel>
                                <DropdownMenuLabel>
                                    <Link href="/" passHref>
                                        <span>Seyhatlar</span>
                                    </Link>
                                </DropdownMenuLabel>
                                <DropdownMenuLabel>
                                    <Link href="/" passHref>
                                        <span>Favoriler</span>
                                    </Link>
                                </DropdownMenuLabel>

                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link href="/account">
                                        Hesap
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />

                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link href="/advertisement">Evinizi Paylaşın</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />

                                <DropdownMenuItem>
                                    <button onClick={() => logOut()}>
                                        <span>Oturumu Kapatın</span>
                                    </button>

                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger className='rounded-full p-4 w-12 bg-slate-200'>
                                <FaUser />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>
                                    <Link href="/auth" passHref>
                                        <span>Oturum Açın</span>
                                    </Link>
                                </DropdownMenuLabel>
                                <DropdownMenuLabel>
                                    <Link href="/auth" passHref>
                                        <span>Kayıt Olun</span>
                                    </Link>
                                </DropdownMenuLabel>

                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Evinizi ExpressHire'a Taşıyın</DropdownMenuItem>
                                <DropdownMenuItem>Yardım Merkezi</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )
                }
            </div>



        </>
    )
}

export default Profile