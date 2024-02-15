"use client"
import {useForm} from 'react-hook-form'

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import {zodResolver} from '@hookform/resolvers/zod'
import { UserValidation } from '@/lib/validations/user';
import * as z from "zod"
import Image from 'next/image'
import { ChangeEvent, useState } from 'react'
import { ImageIcon, Loader2 } from 'lucide-react'
import { Textarea } from '../ui/textarea'
import { isBase64Image } from '@/lib/utils'
import {useUploadThing} from "@/lib/uploadthing"
import { updateUser } from '@/lib/actions/user.action'
import { usePathname, useRouter } from 'next/navigation'

interface Props{
    user:{
        id: string;
        objectId: string;
        username:string;
        name:string;
        bio:string;
        image: string;
    }
    btnTitle: string;
    title: string;
    message: string;
}


export const AccountProfile = ({user, btnTitle, title, message}:Props) => {
    // for saving the image
    const [files, setFiles]= useState<File[]>([])
    // for disabling the sumbit button
    const [isDisabled, setIsDisabled]= useState(false);
    // to use uploadthings
    const {startUpload} = useUploadThing("media");
    const router= useRouter();
    const pathname= usePathname();

    // created a zod resolver to make it easy for the data coming from the form
    const form = useForm({
        resolver: zodResolver(UserValidation),
        defaultValues:{
            profile_photo: user?.image || "",
            name: user?.name || "",
            username: user?.username || "",
            bio: user?.bio || "",
        }
    });

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

    const onSubmit=async (values: z.infer<typeof UserValidation>)=>{
        setIsDisabled(true);
        // value of image is called a blob
        const blob= values.profile_photo;
        
        const hasImageChanged= isBase64Image(blob);
        
        if(hasImageChanged){
            const imgRes= await startUpload(files);
            
            if(imgRes&& imgRes[0].url){
                values.profile_photo= imgRes[0].url;
            }
        }
        
        
        //To Do update user profile 
        await updateUser(
            {
                userId:user.id,
                username:values.username,
                name: values.name,
                bio:values.bio,
                image:values.profile_photo,
                path:pathname,
            }
        );
        
        if(pathname=== "/profile/edit"){
            router.back();
        }else{
            router.push('/');
        }

    }
    return (
        <Form {...form}>
            <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            className="flex flex-col gap-4 card p-6">
                <div>
                    <h1 className="text-3xl text-textColor font-bold">{title}</h1>
                    <p className="text-textColorMuted text-sm ">{message}</p>
                </div>
                <FormField
                control={form.control}
                name="profile_photo"
                render={({ field }) => (
                    //-------------- start of image upload 
                    <FormItem className='flex flex-row items-center text-textColor'>
                        <FormLabel>
                            {field.value?
                            (
                                <Image
                                    src={field.value}
                                    alt="profile photo"
                                    width={96}
                                    height={96}
                                    className='avatar w-24 h-24'
                                />
                            ):
                            (
                                <div className='h-full card p-6 rounded-full'>
                                    <ImageIcon />
                                </div>
                            )
                        }
                        </FormLabel>

                        <FormControl>
                            <Input 
                                type='file'
                                accept='image/*'
                                placeholder="Upload a photo"
                                className='border-none w-2/3 !m-0 file:text-primary file:font-bold'
                                onChange={(e)=> handleImage(e, field.onChange)}
                                />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                    //-------------- end of image upload
                    
                    )}
                    />

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        //-------------- start of name field
                        <FormItem className='flex flex-col gap-1 text-textColor'>
                            <FormLabel>
                                Name
                            </FormLabel>

                            <FormControl >
                                <Input 
                                    type='text'
                                    placeholder=""
                                    className='field'
                                    {...field}
                                    />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                        
                        //-------------- end of name field
                    
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        //-------------- start of username field
                        <FormItem className='flex flex-col gap-1 text-textColor'>
                            <FormLabel>
                                Username
                            </FormLabel>

                            <FormControl >
                                <Input 
                                    type='text'
                                    placeholder=""
                                    className='field'
                                    {...field}
                                    />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                        //-------------- end of username field
                    
                    )}
                />
                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        //-------------- start of bio field
                        <FormItem className='flex flex-col gap-1 text-textColor'>
                            <FormLabel>
                                Bio
                            </FormLabel>

                            <FormControl >
                                <Textarea 
                                    rows={8}
                                    placeholder=""
                                    className='field'
                                    {...field}
                                    />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                        //-------------- end of bio field
                    
                    )}
                />
                    
                    
                <Button disabled={isDisabled} type="submit" className='flex flex-row gap-2 primaryBtn bg-gradient-to-r from-secondary to-primary h-11 ' >
                    {isDisabled&& <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {btnTitle}
                </Button>
            </form>
    </Form>
    )
}