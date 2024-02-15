
import {ClerkProvider, currentUser} from "@clerk/nextjs"
import { Inter } from 'next/font/google'

import '../globals.css';
import '../clerkAuth.css';
import Navbar from "@/components/shared/Navbar";
import Sidebar from "@/components/shared/Sidebar";



const inter = Inter({ subsets: ['latin'] })

export const metadata= {
    title: 'Next Media',
    description: 'The best social media experience in the world'
}


export default async function({children} : {children: React.ReactNode}){
    const user= await currentUser();

    //TO DO: redirect to sing in
    if(!user) return null;
    
    return(
        <ClerkProvider>
            <html lang="en">
                <body className={`${inter.className} bg-backColor`}>
                    {/* wallpaper */}
                    {/* <div className="absolute -z-50 h-screen w-screen bg-hero-pattern blur-sm bg-cover mix-blend-luminosity brightness-50"></div> */}
                    <div className="flex flex-col h-screen max-h-screen">
                        <Navbar userClerkId={user.id}/>
                        <div className="flex flex-col-reverse md:flex-row gap-4 max-h-[calc(100vh-(57.6px+56px-8px))] flex-1 ml-3 mr-2 md:mx-4 mb-4 relative">
                            <Sidebar/>
                            {children}
                        </div>
                    </div>
                </body>
            </html>
        </ClerkProvider>
    )
}