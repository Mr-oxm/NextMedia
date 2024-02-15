
import FullProfileHeader from "@/components/cards/FullProfileHeader";
import { Feed } from "@/components/shared/Feed";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { Frown } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";


export  default async function Page({params}:{params:{id:string}}) {

    const user= await currentUser();
    if(!user) return null;
    
    const userInfo=await fetchUser(params.id);
    const isCurrentUser = (userInfo.id === user.id);


    if(!userInfo?.onboarded) redirect("/onboarding");
    return (
        <div className="flex flex-col gap-4 w-full flex-1 justify-start overflow-y-scroll md:overflow-clip pr-1 md:pr-0">
            <FullProfileHeader 
                userId={userInfo._id} 
                image={userInfo.image} 
                name={userInfo.name} 
                userName={userInfo.username}
                postsNum={userInfo.posts.length}
                friendsNum={userInfo.friends.length}
                groupsNum={userInfo.friends.length}
                followersNum={userInfo.followers.length}
                isCurrentUser={isCurrentUser}
            />
            <div className="flex flex-row gap-4 flex-1 justify-between overflow-visible md:overflow-clip ">
                 {/* friends zone */}
                <div className="hidden md:flex flex-col flex-1 h-full w-1/5 card p-4">
                    <SectionHeader title="Friends" link="/friends"/>
                    <div className="flex flex-col justify-center items-center gap-2 m-auto">
                        <Frown className="text-textColorMuted"/>
                        <span className="text-textColorMuted">You have no friends</span>
                    </div>
                </div>

                <Feed type="profile" userId={userInfo.id} isCurrentUser={isCurrentUser}/>

                {/* groups zone */}
                <div className="hidden md:flex flex-1 flex-col h-full w-1/5 card p-4">
                    <SectionHeader title="Groups" link="/groups"/>
                    <div className="flex flex-col justify-center items-center gap-2 m-auto">
                        <Frown className="text-textColorMuted"/>
                        <span className="text-textColorMuted">You have no groups</span>
                    </div>
                </div>
            </div>
        </div>
    )
}