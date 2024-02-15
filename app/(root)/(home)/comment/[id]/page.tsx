import PostCard from "@/components/cards/PostCard";
import CreatePost from "@/components/forms/CreatePost";
import { fetchPostById } from "@/lib/actions/post.action";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const page = async ({params}:{params:{id:string}}) => {
    
    const post = await fetchPostById(params.id);
    return (
        <section className="flex flex-col gap-4 overflow-y-scroll w-full md:w-2/4 pr-1">
            <PostCard 
                key={post._id}
                userId= {post.author.id}
                postId={post._id}
                name={post.author.name} 
                username={post.author.username}
                profileImage={post.author.image}
                image={post.image}
                text= {post.text}
                date= {post.createdAt}
                likes={0}
                comments={post.children.length}
                isComment={false}
            />
            <span className="text-textColor font-bold">Comments</span>
            <CreatePost btnMsg="Reply" parentId={post._id}/>
            {post.children.length ===0? 
                (<p className="text-textColorMuted">There are no comments</p>)
                :(
                    <>
                        {post.children.map((comment:any)=>(
                            <PostCard 
                                key={comment._id}
                                userId= {comment.author.id}
                                postId={comment._id}
                                name={comment.author.name} 
                                username={comment.author.username}
                                profileImage={comment.author.image}
                                image={comment.image}
                                text= {comment.text}
                                date= {comment.createdAt}
                                likes={0}
                                comments={comment.children.length}
                                isComment= {comment.parentId&& true}
                            />
                        ))}
                    </>
                )
                
            }
        </section>
    )
}
export default page