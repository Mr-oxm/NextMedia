
import { create } from 'zustand'
import { fetchUser } from './actions/user.action';
import { redirect } from 'next/navigation';


interface info{
    _id:string,
    id:string,
    username:string,
    name: string,
    image: String,
    bio: String,
    posts:[],
    saved:[],
    friends:[],
    followers:[],
    requests:[],
    stories:[],
    groups:[],
    onboarded:boolean,
}

let userData: null|info= null;

interface UserDataState{
    userInfo:info|null,
    setUserInfo: (UserInfo:info)=> void,
    stateChecker:(userClerkId:string)=> void
}
const fetch= async(userClerkId:string)=>{
    
    const userInfo=await fetchUser(userClerkId);

    if(!userInfo?.onboarded) redirect("/onboarding");
    userData= userInfo;
    return userInfo;
}


export const useUserDataState = create<UserDataState>()((set)=>({
    userInfo:null,
    setUserInfo: (userInfo:info)=> set({userInfo}),
    stateChecker:async(userClerkId:string)=>{
        if (!userData) {
            const fetchedUserInfo = await fetch(userClerkId);
            if (fetchedUserInfo !== null) {
                set({ userInfo: fetchedUserInfo });
            }
        }
    },
}))
