"use client"
import { Check, ClipboardCopy, Link2, Share2 } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"

interface props{
    className:string,
    hide:boolean,
    link:string,
}
const ShareButton = ({className, hide, link}:props) => {
    const [isClicked, setIsclicked]= useState(false);
    const copyLink= ()=>{
        navigator.clipboard.writeText(link);
        setIsclicked(true);
    }
    
    return (
        <Dialog>
        <DialogTrigger asChild >
            <button className={className}>
                <Share2 />
                <span className={`${hide&& "hidden"}`}>Share</span>
            </button>
        </DialogTrigger>
        <DialogContent className="w-4/5 flex flex-col gap-4 !rounded-3xl card">
            <h1 className="text-textColor font-bold">Share this link with others</h1>
            <div className="flex flex-row gap-2 p-4 items-center text-textColor card bg-fieldColor">
                <Link2 />
                <span className="flex-1 truncate">
                    {link}
                </span>
                <button className="iconButton "  onClick={copyLink}>
                    {isClicked?<Check />:<ClipboardCopy />}
                </button>
            </div>
        </DialogContent>
    </Dialog>
    )
}
export default ShareButton