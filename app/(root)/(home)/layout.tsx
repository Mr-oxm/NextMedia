import { currentUser} from "@clerk/nextjs"
import { Inter } from 'next/font/google'

import { fetchUser } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import { ProfileCard } from "@/components/cards/ProfileCard";
import Celebrities from "@/components/cards/Celebrities";
import Trends from "@/components/cards/Trends";


const inter = Inter({ subsets: ['latin'] })

export const metadata= {
    title: 'Next Media',
    description: 'The best social media experience in the world'
}

export default async  function({children} : {children: React.ReactNode}){
    const user= await currentUser();

    //TO DO: redirect to sing in
    if(!user) return null;

    const userInfo=await fetchUser(user.id);

    if(!userInfo?.onboarded) redirect("/onboarding");
    return(
        <>
            {/* left */}
            <ProfileCard
                name= {userInfo.name}
                username={userInfo.username}
                image= {userInfo.image}
                postsNum={userInfo.posts.length}
                friendsNum={userInfo.friends.length}
                groupsNum={userInfo.friends.length}
            />
            {children}

            {/* right  */}
            <div className=" flex-col gap-4 flex-1 hidden md:flex">
                <Celebrities/>
                <Trends/>
            </div>
        </>
    )
}