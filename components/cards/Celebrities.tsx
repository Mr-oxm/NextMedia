import Link from "next/link";
import { SectionHeader } from "../shared/SectionHeader"
import UserHeader from "../shared/UserHeader";

const Celebrities = () => {
    const results= [];
    return (
        <div className="flex flex-col card gap-4 p-4">
            <SectionHeader title="Celebrities" link="/celebrities"/>
            <Link href={`/profile`} >
                <div className="flex flex-row justify-between items-center">
                    <UserHeader userId="1212" name="Ahmed Mohsen" username="ahmed_mohsen" image="https://github.com/shadcn.png"/>
                    <span className="text-textColor font-bold">50k</span>
                </div>
            </Link>
            <Link href={`/profile`} >
                <div className="flex flex-row justify-between items-center">
                    <UserHeader userId="1212" name="Ahmed Mohsen" username="ahmed_mohsen" image="https://github.com/shadcn.png"/>
                    <span className="text-textColor font-bold">50k</span>
                </div>
            </Link>
            <Link href={`/profile`} >
                <div className="flex flex-row justify-between items-center">
                    <UserHeader userId="1212" name="Ahmed Mohsen" username="ahmed_mohsen" image="https://github.com/shadcn.png"/>
                    <span className="text-textColor font-bold">50k</span>
                </div>
            </Link>


            {/* {results.map((user)=>(
            ))} */}
        </div>
    )
}
export default Celebrities