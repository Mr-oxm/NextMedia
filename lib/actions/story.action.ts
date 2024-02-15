"use server"

import { revalidatePath } from "next/cache";
import Story from "../models/story.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose"

interface Params{
    text: string,
    bg:string,
    author:string,
    path:string,
}
export async function createStory({text,bg, author, path}:Params){
    connectToDB();
    try {
        const createdStory= await Story.create({
            text,
            bg,
            author,
        });
        
        await User.findByIdAndUpdate(author, {
            $push:{stories: createdStory._id}
        })
        
    } catch (error:any) {
        throw new Error(`Failed to post story: ${error.message}`)
    }


    revalidatePath(path);
}

