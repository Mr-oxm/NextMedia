import Link from "next/link"

interface props{
    title: string, 
    link: string,
}
export const SectionHeader = ({title, link}:props) => {
    return (
        <div className="flex flex-row justify-between items-center w-full">
            <span className="text-textColor font-bold">{title}</span>
            <Link href={link} className="text-textColorMuted hover:text-textColor transition-all">Take a look </Link>
        </div>
    )
}