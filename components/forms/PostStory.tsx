"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Loader2, Plus } from "lucide-react"

import { zodResolver } from "@hookform/resolvers/zod"

import { useForm } from "react-hook-form"
import * as z from "zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"


import { useState } from "react"
import { StoryValidation } from "@/lib/validations/story"
import { Textarea } from "../ui/textarea"
import { createStory } from "@/lib/actions/story.action"
import { usePathname } from "next/navigation"



const PostStory = ({userId}:{userId:string}) => {
    const pathname= usePathname();
    function getRandomColor() {
        const colors = [
            '#734DFF',
            '#E05036',
            '#F7E348',
            '#36E092',
            '#9181F4',
            '#F77360',
            '#5F48F7',
            '#F7DD2F',
            '#3BF79C',
        ];
        // Generate a random index to select a color from the array
        const randomIndex = Math.floor(Math.random() * colors.length);
        // Get the randomly selected color
        const selectedColor = colors[randomIndex];
        // Return the string in the desired format
        return `bg-[${selectedColor}]`;
    }

    // for disabling the sumbit button
    const [isDisabled, setIsDisabled]= useState(false);
    // created a zod resolver to make it easy for the data coming from the form
    const defaultValues= {
        text: "",
        bg: getRandomColor(),
    };

    const form = useForm({
        resolver: zodResolver(StoryValidation),
        defaultValues: defaultValues,
    });
    
    const onSubmit=async (values: z.infer<typeof StoryValidation>)=>{
        setIsDisabled(true);
        await createStory({author:userId, text: values.text, bg:values.bg, path:pathname});
        form.reset();
        setIsDisabled(false);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button type="button" className=" flex flex-col gap-2 items-center justify-center realtive p-4 hover:bg-cardColor rounded-3xl min-w-fit active:scale-95">
                    <div className="text-textColor text-xs avatar ring-4 ring-primary flex flex-col justify-center items-center bg-cardColor">
                        <Plus  />
                    </div>
                    <span className="text-textColor ">Post</span>
                </button>
            </DialogTrigger>

            <DialogContent className="w-[80vw] md:max-w-[425px] card !rounded-3xl">

                <DialogHeader>
                    <DialogTitle className="text-textColor">Post a story</DialogTitle>
                    <DialogDescription className="text-textColorMuted">
                    Share your story with people
                    </DialogDescription>
                </DialogHeader>
                
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
                        {/* -------------- start of story field */}
                        <FormField
                            control={form.control}
                            name="text"
                            render={({ field }) => (
                                <FormItem className='flex-1'>
                                    <FormControl >
                                        <Textarea id="text-area" rows={8} placeholder="Write something" className="field placeholder:text-textColorMuted p-4 overflow-y-hidden"
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className='text-accent'/>
                                </FormItem>
                            
                            )}
                        />
                        {/* -------------- start of story field */}

                        <Button disabled={isDisabled} type="submit" className="bg-gradient-to-r from-secondary to-primary primaryBtn rounded-full px-8">
                            {isDisabled&&
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Post
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
export default PostStory