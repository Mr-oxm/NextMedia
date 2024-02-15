"use client"
import {siderbarLinks} from "@/constants";
import { SignedIn } from "@clerk/clerk-react";
import { SignOutButton,  useAuth} from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import Link from "next/link"
import {usePathname, useRouter} from "next/navigation"
const Sidebar = () => {
    const router= useRouter();
    const pathName= usePathname();
    const {userId}= useAuth();
    return (
        <div className="z-50 card rounded-full p-2 self-center w-full mx-3 md:mx-0 md:w-14 h-14 bottom-0 md:h-full  flex flex-row md:flex-col items-center justify-center">
            {siderbarLinks.map((link:any)=>{
                const isActive= (pathName.includes(link.route)&& link.route.length>1)|| pathName === link.route;

                if(link.route=== '/profile') link.route= `${link.route}/${userId}`
                return(
                        <Link href={link.route} key={link.label}>
                            <button  className={` iconButton ${isActive &&"card bg-fieldColor rounded-full"}`}>
                                {link.icon}
                                {/* <span className="text-xs">{link.label}</span> */}
                            </button>
                        </Link>
                    )
                })
            }
            <SignedIn>
                <SignOutButton signOutCallback={()=>{
                    router.push('/sign-in');
                }}>
                    <button  className={` iconButton hidden md:flex`}>
                        <LogOut />
                    </button>
                </SignOutButton>
            </SignedIn>
        </div>
    )
}
export default Sidebar