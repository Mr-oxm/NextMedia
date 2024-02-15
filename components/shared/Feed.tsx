import { fetchPosts } from "@/lib/actions/post.action"
import PostCard from "../cards/PostCard"
import CreatePost from "../forms/CreatePost"
import Stories from "./Stories";
import { fetchUserPosts } from "@/lib/actions/user.action";

export const  Feed = async ({userId,type, isCurrentUser}:{userId?:string|undefined,type:string,isCurrentUser:boolean }) => {
    // const fetchData =async ()=>{
    //     switch (type) {
    //     case "feed":
    //         return await fetchPosts(1,30);
    //     case "profile":
    //         return await fetchUserPosts(userId);
    //     default:
    //         return;
    //     ;}
    // }
    const result= ((type==="feed")? await fetchPosts(1,30):  await fetchUserPosts(userId));

    return (
        <div className={`flex flex-col gap-4 w-full md:w-2/4 ${(type!=="feed")?"pr-0 md:pr-1 overflow-visible md:overflow-y-scroll":"overflow-y-scroll pr-1"} `}>
            <Stories type={type} userId={userId||undefined} isCurrentUser={isCurrentUser} />
            {isCurrentUser && <CreatePost btnMsg="Post"/>}
            {result.posts.length ===0? 
                (<p>There are no posts</p>)
                :(
                    <>
                        {result.posts.map((post:any)=>(
                            <PostCard 
                                key={post._id}
                                userId= {(type==="feed"?post.author.id: result.id)}
                                postId={post._id}
                                name={(type==="feed"?post.author.name:result.name)} 
                                username={(type==="feed"?post.author.username:result.username)}
                                profileImage={(type==="feed"?post.author.image:result.image)}
                                image={post.image}
                                text= {post.text}
                                date= {post.createdAt}
                                likes={0}
                                comments={post.children.length}
                                isComment= {post.parentId&& true}
                            />
                        ))}
                    </>
                )
                
            }
        </div>
    )
}