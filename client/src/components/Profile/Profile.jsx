import React from 'react'
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


const Profile = () => {
    return (
        <>

            <div className=' flex items-end justify-end '>
                <DropdownMenu>
                    <DropdownMenuTrigger className='rounded-full p-4 w-12 bg-slate-200'>
                        <FaUser />

                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>
                            <Link href="/auth" passHref>
                                <span>Login</span>
                            </Link>
                        </DropdownMenuLabel>
                        <DropdownMenuLabel>
                            <Link href="/auth" passHref>
                                <span>Register</span>
                            </Link>
                        </DropdownMenuLabel>

                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Support</DropdownMenuItem>
                        <DropdownMenuItem>Help</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>



        </>
    )
}

export default Profile