"use client"
import {useForm} from 'react-hook-form'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import {zodResolver} from '@hookform/resolvers/zod'
import { CommentValidation, PostValidation } from '@/lib/validations/post';
import * as z from "zod"

import { isBase64Image } from '@/lib/utils'
import {useUploadThing} from "@/lib/uploadthing"
import { updateUser } from '@/lib/actions/user.action'
import { usePathname, useRouter } from 'next/navigation'

import Image from "next/image"
import UserHeader from "../shared/UserHeader"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Heart, ImagePlus, Loader2, MessageCircle, Repeat2, Smile, User, X } from "lucide-react"
import { Textarea } from "../ui/textarea"
import { ChangeEvent,useEffect,useRef, useState } from "react"

import dynamic from 'next/dynamic';
import { ImageCard } from '../cards/ImageCard';
import { addComment, createPost } from '@/lib/actions/post.action';
import { useUserDataState } from '@/lib/userInfoState';

import UserIcon from "@/public/user.svg"

const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });



const CreatePost = ({btnMsg, parentId}:{btnMsg:string, parentId?:string}) => {
    const {userInfo} = useUserDataState();
    const userId= userInfo?._id;
    const image= userInfo?.image||UserIcon;

    useEffect(() => {
    }, [userInfo])
    
    

    // for saving the image
    const [files, setFiles]= useState<File[]>([])
    // for disabling the sumbit button
    const [isDisabled, setIsDisabled]= useState(false);
    // to use uploadthings
    const {startUpload} = useUploadThing("media");
    const router= useRouter();
    const pathname= usePathname();

    // created a zod resolver to make it easy for the data coming from the form
    const defaultValues: {
        uploadedPic: string;
        post: string;
        accountId?: string; // Make accountId optional
    } = {
        uploadedPic: "",
        post: "",
    };
    
    if (!parentId) {
        defaultValues.accountId = userId;
    }
    
    const form = useForm({
        resolver: zodResolver(parentId ? CommentValidation : PostValidation),
        defaultValues: defaultValues,
    });
    


    const [emoji, setEmoji] = useState<boolean>(false);
    const [text, setText] = useState<string>('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    
    const uploadRef = useRef<HTMLInputElement>(null);



    // const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>, ref:<HTMLTextAreaElement>) => {
    //     const textarea = textareaRef.current;
    //     if (!textarea) return;
        
    //     textarea.style.height = '100%'; // Reset the height to auto to recalculate
    //     textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to match the content
    //     setText(e.target.value);
    // };


    const handleImage = (e:ChangeEvent<HTMLInputElement>, fieldChange: (value:string)=> void)=>{
        e.preventDefault();
        const fileReader = new FileReader();

        if(e.target.files && e.target.files.length>0){
            const file = e.target.files[0];

            setFiles(Array.from(e.target.files));
            if(!file.type.includes("image")) return;

            fileReader.onload= async(event)=>{
                const imageDataUrl= event.target?.result?.toString()|| "";
                fieldChange(imageDataUrl);
            }
            fileReader.readAsDataURL(file);
        }
    }

    const onSubmit=async (values: z.infer<typeof CommentValidation | typeof PostValidation>)=>{
        setIsDisabled(true);

        // value of image is called a blob
        const blob= values.uploadedPic;
        
        const hasImageChanged= isBase64Image(blob||"");
        
        if(hasImageChanged){
            const imgRes= await startUpload(files);
            
            if(imgRes&& imgRes[0].url){
                values.uploadedPic= imgRes[0].url;
            }
        }
        
        if(parentId){
            await addComment({
                text: values.post,
                image: values.uploadedPic||"",
                userId:userId||"",
                postId: parentId,
                path:pathname,
            })
        }else{
            await createPost(
                {
                    text: values.post,
                    image: values.uploadedPic||"",
                    author:userId||"",
                    groupId:null,
                    path:pathname,
                }
            );
        }

        
        form.reset();
        setIsDisabled(false);
    }
    return (
        <Form {...form}>
            <form 
            onSubmit={form.handleSubmit(onSubmit)} >

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

                        {/* -------------- start of post field */}
                        <FormField
                            control={form.control}
                            name="post"
                            render={({ field }) => (
                                <FormItem className='flex-1'>
                                    <FormControl >
                                        <Textarea id="text-area" rows={1} placeholder="Write something" className="field placeholder:text-textColorMuted p-4 overflow-y-hidden"
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className='text-accent'/>
                                </FormItem>
                            
                            )}
                        />
                        {/* -------------- start of post field */}
                        
                    </div>
                    

                    {/* start of display image */}
                    <FormField
                control={form.control}
                name="uploadedPic"
                render={({ field }) => (
                    <FormItem className={`${field.value?"":"hidden"}`}>
                            {field.value?
                            (
                                <ImageCard image={field.value}/>
                                
                            ):
                            (
                                <></>
                            )
                        }
                    </FormItem>
                    
                    )}/>

                    {/* end of display image */}






                    <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-row items-center gap-2 relative">
                        {/* //-------------- start of image upload  */}
                        <FormField
                            control={form.control}
                            name="uploadedPic"
                            render={({ field }) => (
                                <FormItem>

                                    <FormControl>
                                    <button type='button' className='flex flex-row items-center'>
                                        <Input 
                                            id="file-input"
                                            ref={uploadRef}
                                            type='file'
                                            accept='image/*'
                                            placeholder="Image"
                                            className='hidden'
                                            onChange={(e)=> handleImage(e, field.onChange)}
                                            />
                                        
                                        <label htmlFor="file-input"
                                        className={`secondaryBtn ${field.value&& "card"}`}>
                                            <ImagePlus />
                                            Image
                                        </label>

                                        {/* clear the image  */}

                                        {field.value&&
                                        (<button type='button' className='hover:text-textColor text-textColorMuted rounded-full' onClick={
                                            ()=>{
                                                if(uploadRef.current!=null)
                                                    uploadRef.current.value=""
                                                    field.onChange("");
                                        }}>
                                            <X />
                                        </button>)}
                                    </button>
                                    </FormControl>
                                </FormItem>
                                
                                )}
                                />
                                {/* //-------------- end of image upload */}

                            <button type='button' onClick={()=>{setEmoji(emoji ? false :true)}} className="secondaryBtn" >
                                <Smile />
                                Emojis
                            </button>
                            <div className={`z-50 absolute top-16 left-0 ${!emoji&& "hidden "}`}>
                                <FormField
                                    control={form.control}
                                    name="post"
                                    render={({ field }) => (
                                        <FormItem>
                                            <EmojiPicker onEmojiClick={(e)=>{field.value +=(e.emoji) }} />
                                        </FormItem>
                                    
                                    )}
                                />
                                <EmojiPicker onEmojiClick={(e)=>{if(textareaRef.current!= null) setText(textareaRef.current.value+ e.emoji)}} />
                            </div>
                        </div>
                        <Button disabled={isDisabled} type="submit" className="z-10 bg-gradient-to-r from-secondary to-primary primaryBtn rounded-full px-8">
                            {isDisabled&& <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {btnMsg}
                        </Button>
                    </div>
                </div>
            </form>
    </Form>
    )
}
export default CreatePost