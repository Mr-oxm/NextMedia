import Image from "next/image"
import { SectionHeader } from "../shared/SectionHeader"
import { Frown, UserX } from "lucide-react"

interface params{
    name:string,
    username: string,
    image: string,
    postsNum: number, 
    groupsNum: number,
    friendsNum:number,
    friends?:object,
    groups?:object
}


export const ProfileCard = ({name, username, image, postsNum, groupsNum, friendsNum, friends, groups}:params) => {
    return (
        <div className="card h-full w-1/5 hidden md:flex p-4  flex-col items-center gap-4 ">
            {/* user data */}
            <div className="flex flex-col gap-4 items-center justify-center w-full">
                {/* profile image  */}
                <Image
                    src={image}
                    width={64}
                    height={64}
                    alt="profile photo "
                    className="avatar w-16 h-16"
                />

                {/* profile info : name , username  */}
                <div className="flex flex-col text-center">
                    <h1 className="text-textColor font-bold ">{name}</h1>
                    <span className="text-textColorMuted text-sm">@{username}</span>
                </div>

                {/* posts , friends and groups  */}
                <div className="flex felx-row justify-around w-full">

                    <div className="flex flex-col text-center">
                        <h1 className="text-textColor font-bold text-xl">{postsNum}</h1>
                        <span className="text-textColorMuted text-sm">Posts</span>
                    </div>

                    <div className="flex flex-col text-center">
                        <h1 className="text-textColor font-bold text-xl">{friendsNum}</h1>
                        <span className="text-textColorMuted text-sm">Friends</span>
                    </div>
                    
                    <div className="flex flex-col text-center">
                        <h1 className="text-textColor font-bold text-xl">{groupsNum}</h1>
                        <span className="text-textColorMuted text-sm">Groups</span>
                    </div>
                </div>
                
            </div>
            {/* friends zone */}
            <div className=" flex flex-col h-2/6 w-full">
                <SectionHeader title="Friends" link="/friends"/>
                <div className="flex flex-col justify-center items-center gap-2 m-auto">
                    <Frown className="text-textColorMuted"/>
                    <span className="text-textColorMuted">You have no friends</span>
                </div>
            </div>
            {/* groups zone */}
            <div className=" flex flex-col h-2/6 w-full">
                <SectionHeader title="Groups" link="/groups"/>
                <div className="flex flex-col justify-center items-center gap-2 m-auto">
                    <Frown className="text-textColorMuted"/>
                    <span className="text-textColorMuted">You have no groups</span>
                </div>
            </div>
        </div>
    )
}