"use client"
import Image from "next/image"
import UserHeader from "../shared/UserHeader"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Heart, ImagePlus, MessageCircle, Repeat2, Smile } from "lucide-react"
import { Textarea } from "../ui/textarea"
import { ChangeEvent, ReactComponentElement, TextareaHTMLAttributes, useRef, useState } from "react"
import EmojiPicker from 'emoji-picker-react';

const CreatePost = ({userId, image}:{userId:String, image:string}) => {

    const [emoji, setEmoji] = useState<boolean>(false);
    const [text, setText] = useState<string>('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        
        textarea.style.height = '100%'; // Reset the height to auto to recalculate
        textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to match the content
        setText(e.target.value);
    };


    return (
        <div className=" flex flex-col gap-4 card p-4">
            <div className="flex flex-row gap-2 items-start">
                {/* <UserHeader
                    name="Omar Emara"
                    username="omar_emara"
                    image="https://github.com/shadcn.png"
                /> */}
                <Image
                    src={image}
                    width={64}
                    height={64}
                    alt="profile photo"
                    className="avatar "
                />
                <Textarea ref={textareaRef} value={text} onChange={handleTextareaChange} rows={1} placeholder="Write something" className="field placeholder:text-textColorMuted p-4 overflow-y-hidden"/>
            </div>
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row items-center gap-2 relative">
                    <button className="secondaryBtn">
                        <ImagePlus />
                        Image
                    </button>
                    <button onClick={()=>{setEmoji(emoji ? false :true)}} className="secondaryBtn" >
                        <Smile />
                        Emojis
                    </button>
                    <div className={`absolute top-16 left-0 ${!emoji&& "hidden "}`}>
                        <EmojiPicker onEmojiClick={(e)=>{if(textareaRef.current!= null) textareaRef.current.value+= e.emoji}} />
                    </div>
                </div>
                <Button className="primaryBtn rounded-full px-8">
                    Post
                </Button>
            </div>
        </div>
    )
}
export default CreatePost