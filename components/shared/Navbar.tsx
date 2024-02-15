"use client"
import { UserButton, currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from 'next/link'
import { Input } from "../ui/input";
import { Bell, Palette, Search } from "lucide-react";

import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.action";
import { useUserDataState } from "@/lib/userInfoState";
import { useEffect } from "react";
import { Logo } from "./Logo";
const Navbar = ({userClerkId}:{userClerkId:string}) => {
    const {stateChecker} = useUserDataState();
    stateChecker(userClerkId);
    

    return (
        <nav className="card flex flex-row rounded-full justify-between items-center px-6 mx-3 md:mx-4 my-4">
            {/* start */}
            <div className="w-2/6">
                <Link href="/">
                    <Logo/>
                    {/* <Image
                        src="/fullLogo.svg"
                        width="50"
                        height="50"
                        alt="Next Media logo"
                        className="w-48 h-full"
                    /> */}
                </Link>
            </div>
            {/* middle  */}
            <div className="md:flex flex-row flex-1 hidden relative">
                    <span className="sr-only">Search</span>
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-textColor">
                        <Search className="w-5 h-5" />
                    </span>
                    <Input className=" pl-9 field" placeholder="Search for anything..." type="text" name="search"/>
                
                {/* <button className="bg-fieldColor text-textColor text-sm rounded-l-3xl px-2">
                    <Search className="w-5 h-5" />
                </button>
                <Input className="field rounded-l-none " placeholder="Search"/> */}
            </div>
            {/* end  */}
            <div className="w-2/6 flex flex-row justify-end text-textColor items-center">
                <button className="iconButton flex md:hidden">
                    <Search />
                </button>
                <button className="iconButton">
                    <Palette />
                </button>
                <button className="iconButton hidden md:flex">
                    <Bell />
                </button>
                <div className="my-2 ml-2">
                    <UserButton afterSignOutUrl="/sign-in"/>
                </div>
            </div>
        </nav>
    )
}
export default Navbar