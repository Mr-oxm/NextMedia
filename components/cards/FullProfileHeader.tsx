import { Hash, Heart, HeartHandshake, Pin, Share2, UserPlus, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ShareButton from "../shared/ShareButton"
import { headers } from 'next/headers';
interface props{
    userId:string,
    image:string, 
    name:string,
    userName:string,
    postsNum: number,
    groupsNum: number,
    friendsNum: number,
    followersNum:number,
    isCurrentUser:boolean,
}

const FullProfileHeader = ({userId,image, name,userName, postsNum, groupsNum, friendsNum,followersNum,isCurrentUser}:props) => {
    const headersList = headers();
    const domain = headersList.get('host') || "";
    const fullUrl = headersList.get('referer') || "";
    const [,pathname] = fullUrl.match( new RegExp(`https?:\/\/${domain}(.*)`))||[];


    const returnButtons= ()=>{
        if(isCurrentUser){
            return(
                <>
                    <Link href={"/friends"} className="cardBtn md:hidden border-2">
                            <HeartHandshake />
                            <span>Friends</span>
                    </Link>
                    <Link href={"/groups"} className="cardBtn md:hidden border-2">
                            <Users />
                            <span>Groups</span>
                    </Link>
                    <button className="cardBtn border-2" >
                        <Heart />
                        <span>Liked</span>
                    </button>
                    <button className="cardBtn border-2 ">
                        <Pin />
                        <span>Saved</span>
                    </button>
                    <ShareButton hide link={pathname} className="cardBtn p-2 border-2 rounded-full"/>
                </>
            )
        }else{
            return(
                <>
                    <Link href={"/friends"} className="cardBtn md:hidden border-2">
                            <HeartHandshake />
                            <span>Friends</span>
                    </Link>
                    <Link href={"/groups"} className="cardBtn md:hidden border-2">
                            <Users />
                            <span>Groups</span>
                    </Link>
                    <button className="cardBtn border-2 ">
                        <UserPlus />
                        <span>Add</span>
                    </button>
                    <button className="cardBtn border-2 ">
                        <Hash />
                        <span>Follow</span>
                    </button>
                    <button className="cardBtn p-2 border-2 rounded-full">
                        <Share2 />
                    </button>
                </>
            )
        }
    }
    return (
        <>
            <div className="flex flex-col md:flex-row relative card gap-4 p-4 pt-1 md:p-4  items-center md:items-end justify-center md:justify-around">
                <img 
                    src="/back-02.jpg"
                    alt="cover"
                    className="absolute top-0 w-[calc(100%)] rounded-3xl h-2/5 md:h-1/2 -z-10 object-cover bg-backColor mix-blend-luminosity"
                />
                {/* buttons for big screens */}
                <div className="md:flex flex-row gap-4 items-center w-1/3 justify-end hidden">
                    {returnButtons()}
                </div>
            
                {/* user profile data  */}
                <div className="flex flex-col gap-2 md:gap-4 items-center justify-center">
                    {/* profile image  */}
                    <Image
                        src={image}
                        width={64}
                        height={64}
                        alt="profile photo "
                        className="avatar w-16 h-16 md:w-24 md:h-24"
                    />
            
                    {/* profile info : name , username  */}
                    <div className="flex flex-col text-center">
                        <h1 className="text-textColor font-bold text-sm md:text-base">{name}</h1>
                        <span className="text-textColorMuted text-xs md:text-sm">@{userName}</span>
                    </div>
            
                    
                </div>
            
                {/* account status  */}
                <div className="flex flex-row gap-8 justify-center md:justify-start items-center w-full md:w-1/3">
                        <div className="flex flex-col text-center">
                            <h1 className="text-textColor font-bold text-base md:text-xl">{postsNum}</h1>
                            <span className="text-textColorMuted text-xs md:text-sm">Posts</span>
                        </div>
            
                        <div className="flex flex-col text-center">
                            <h1 className="text-textColor font-bold text-base md:text-xl">{friendsNum}</h1>
                            <span className="text-textColorMuted text-xs md:text-sm">Friends</span>
                        </div>
                        
                        <div className="flex flex-col text-center">
                            <h1 className="text-textColor font-bold text-base md:text-xl">{followersNum}</h1>
                            <span className="text-textColorMuted text-xs md:text-sm">Followers</span>
                        </div>
                        <div className="flex flex-col text-center">
                            <h1 className="text-textColor font-bold text-base md:text-xl">{groupsNum}</h1>
                            <span className="text-textColorMuted text-xs md:text-sm">Groups</span>
                        </div>
                </div>
            </div>

            {/* buttons */}
            <div className="flex flex-row items-center gap-2 justify-center md:hidden p-2 card rounded-full">
                {returnButtons()}
            </div>
        </>
                
    )
}
export default FullProfileHeader