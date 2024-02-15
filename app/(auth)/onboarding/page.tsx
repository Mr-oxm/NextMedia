import { AccountProfile } from "@/components/forms/AccountProfile"
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation";
async function page() {
  const user= await currentUser();

  //TO DO: redirect to sing in
  if(!user) return null;

  const userInfo=await fetchUser(user.id);

  if(userInfo?.onboarded) redirect("/");

  const userData= {
    id: user?.id,
    objectId: userInfo?._id,
    username: userInfo?.username|| user?.username,
    name: userInfo?.name|| user?.firstName||"",
    bio: userInfo?.bio|| "",
    image: userInfo?.image || user?.imageUrl,
  }
  return (
    <div className="flex flex-col">
      <AccountProfile 
        user={userData} 
        btnTitle="Continue"
        title="Onboaridng"
        message="Complete your profile now to use Next Media"
      />
    </div>
  )
}
export default page