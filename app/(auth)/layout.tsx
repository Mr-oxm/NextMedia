import {ClerkProvider} from "@clerk/nextjs"
import { Inter } from 'next/font/google'

import Image from "next/image";
import '../globals.css';
import '../clerkAuth.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata= {
    title: 'Next Media',
    description: 'The best social media experience in the world'
}

export default function({children} : {children: React.ReactNode}){
    return(
        <ClerkProvider>
            <html lang="en">
                <body className={`${inter.className} bg-backColor flex items-center justify-center`}>
                    {/* gradient */}
                    <div className="-z-40 w-screen h-screen absolute inset-0 bg-gradient-to-tr from-backColor via-transparent to-transparent">
                    </div>
                    {/* wallpaper */}
                    <div className="absolute -z-50 h-screen w-screen bg-hero-pattern blur-sm bg-cover mix-blend-luminosity brightness-50"></div>

                    {/* content */}
                    <div className="flex flex-col sm:flex-row-reverse items-center justify-evenly h-screen w-11/12 md:w-4/5">
                        {/* left div: logo and p */}
                        <div className="flex flex-col  text-textColorMuted items-center w-full sm:w-5/12 ">
                            <Image
                                src="/fullLogo.svg"
                                width={450}
                                height={250}
                                alt="Next Media logo"
                                className="w-full"
                            />
                            <p className="text-center mt-8 text-sm sm:text-lg"> Enter your world of seamless social interaction. Join us, and let's connect beyond boundaries!</p>
                        </div>
                        
                        {/* right dv: for children */}
                        <div className="w-full sm:w-5/12 authPage">
                            {children}
                        </div>
                    </div>
                </body>
            </html>
        </ClerkProvider>
    )
}