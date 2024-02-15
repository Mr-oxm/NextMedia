"use client"
import { Forward, Heart, MessageCircle, Repeat2 } from "lucide-react"
import { Button } from "../ui/button"
import UserHeader from "../shared/UserHeader"
import { useState } from "react"
import { timeAgo } from "@/lib/utils"
import { ImageCard } from "./ImageCard"
import Link from "next/link"
import ShareButton from "../shared/ShareButton"

interface params{
    userId: string,
    postId: string,
    name:string,
    username:string,
    text: string, 
    profileImage:string
    image?:string,
    date: Date,
    likes:number,
    comments:number,
    isComment:boolean
}

const PostCard = ({userId, postId,name, username, profileImage, text, image, date, likes, comments, isComment}:params) => {
    const [liked, setLiked]= useState(false);
    return (
        <article className={` flex flex-col gap-2  ${!isComment&& "card"} p-4`}>
            <div className="flex flex-row justify-between items-center">
                    <UserHeader
                    name={name}
                    username={username}
                    image={profileImage}
                    userId={userId}
                    />
                
                <span className="text-textColorMuted  text-xs md:text-base">{timeAgo(date)}</span>
            </div>

            <p className="text-textColor  text-sm md:text-base">
                {text}
            </p>
            {image && <ImageCard image={image}/>}
            <div className="flex flex-row justify-between items-center h-8">
                <div className="flex flex-row items-center gap-2" >
                    <button onClick={()=>{setLiked(liked ? false :true)}} className={`secondaryBtn ${liked&& "card"}`}>
                        <Heart className={`${liked&& "fill-accent"}  `} />
                        {likes}
                    </button>
                    <Link href={`/comment/${postId}`}>
                        <button className="secondaryBtn">
                            <MessageCircle />
                            {comments}
                        </button>
                    </Link>
                    <button className="secondaryBtn">
                        <Repeat2 />
                        Repost
                    </button>
                </div>

                <ShareButton className="secondaryBtn" hide={false} link={`/comment/${postId}`}/>
            </div>
        </article>
    )
}
export default PostCard