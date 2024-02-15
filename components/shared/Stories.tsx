import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Story from "./Story"
import PostStory from "../forms/PostStory"
import { useUserDataState } from "@/lib/userInfoState"
import { useEffect, useState } from "react"
import { fetchUserStories } from "@/lib/actions/user.action"

interface props{
    userId:string|undefined,
    type:string,
    isCurrentUser?:boolean,
}

const Stories = async({userId, type,isCurrentUser}:props) => {
    // const {userInfo} = useUserDataState();
    // const userId= userInfo?._id;
    // const [result, setResult]= useState();
    const result=await fetchUserStories(userId);

    // useEffect(() => {async()=>{
    //     setResult(await fetchUserStories(Id));
    // }
    // }, [userInfo])
    return (
        <Accordion  type="single" collapsible>
            <AccordionItem className="border-none" value="item-1">
                <AccordionTrigger className="text-textColor font-bold decoration-transparent py-0">Stories</AccordionTrigger>

                <AccordionContent className="mb-0 pb-0">
                    <section className="flex flex-row gap-2 items-center justify-start overflow-x-scroll py-1 ">
                        {((isCurrentUser)&& <PostStory userId={result._id||""}/>)}

                        {result&& (result.stories.map((story:any)=>(
                            <Story
                                image={result.image}
                                name={result.name.split(" ")[0]}
                                text={story.text}
                                bg={story.bg}
                            />
                        )))}

                    </section>
                </AccordionContent>

            </AccordionItem>
        </Accordion>

    )
}
export default Stories