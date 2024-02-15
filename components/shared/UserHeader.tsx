
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface props{
    userId:string
    name:string,
    username:string,
    image:string,
    groupName?:string, 
    groupImage?:string,
}
const UserHeader = ({userId, name, username,image, groupName, groupImage}:props) => {
    return (
        <div className="flex flex-row gap-2 items-center">
            {/* normal user */}
            <Link  href={`/profile/${userId}`}>
                <div>
                    <Image
                        src={image}
                        width={64}
                        height={64}
                        alt="profile photo "
                        className="avatar"
                    />
                </div>
            </Link>
            <Link href={`/profile/${userId}`} className=" flex flex-col">
                <div>
                    <h1 className="text-textColor font-bold  text-sm md:text-base h-5">{name}</h1>
                    <span className="text-textColorMuted  text-sm md:text-base">@{username}</span>
                </div>
            </Link>

            {/* group section */}
            {groupName && groupImage && (
                <div className="flex flex-row items-center text-textColor ">
                    <ChevronRight />

                    <div className="flex flex-row gap-2 items-center">
                        <Image
                            src={groupImage}
                            width={48}
                            height={48}
                            alt="profile photo"
                            className="avatar"
                        />
                        <h1 className="font-bold text-sm">{groupName}</h1>
                    </div>
                </div>
            )}
        </div>
    )
}
export default UserHeader