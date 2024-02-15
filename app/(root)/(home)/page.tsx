
import { Feed } from "@/components/shared/Feed";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";


export  default async function Home() {

  const user= await currentUser();

  //TO DO: redirect to sing in
  if(!user) return null;

  const userInfo=await fetchUser(user.id);

  if(!userInfo?.onboarded) redirect("/onboarding");

  return (
    <>
      
      {/* middle */}
      <Feed isCurrentUser={true} type="feed" userId={userInfo.id}/>
      
    </>
  )
}