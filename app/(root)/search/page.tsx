import PostCard from "@/components/cards/PostCard";
import UserHeader from "@/components/shared/UserHeader";
import { fetchSearchPosts } from "@/lib/actions/post.action";
import { fetchUser, fetchUsers } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation";

export  default async function Page(){
    const user= await currentUser();
    const userInfo=await fetchUser(user?.id);
    if(!userInfo?.onboarded) redirect("/onboarding");

    const usersResult= await fetchUsers({
        userId: user?.id,
        searchString: "Ahmed",
        pageNumber: 1,
        pageSize: 20,
    });
    const postsResult= await fetchSearchPosts({
        userId: userInfo._id,
        searchString: "yeah",
        pageNumber: 1,
        pageSize: 20,
    });
    return (
        <div>
            <div className="flex flex-col gap-4 card p-4 flex-1">
                {usersResult.users? usersResult.users.map((user)=>(
                    <UserHeader userId={user.id} name={user.name} username={user.username} image={user.image}/>
                )): <p>No results found</p>
                }
            </div>
            <div className="flex flex-col gap-4 p-4 w-full">
                {postsResult.posts? postsResult.posts.map((post)=>(
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
                        isComment= {post.parentId&& true}
                    />
                )): <p>No results found</p>
                }
            </div>
        </div>
    )
}