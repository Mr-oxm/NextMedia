import Link from "next/link"
import { SectionHeader } from "../shared/SectionHeader"

const Trends = () => {
    return (
        <div className="flex flex-col card gap-4 p-4 flex-1">
            <SectionHeader title="Top Trends" link="/trends"/>
            <Link href={`/search`} className="card bg-fieldColor px-4 py-2 flex flex-row justify-between items-center">
                <span className="text-textColor font-bold">1. Pizza</span>
                <span className="text-textColorMuted">600k</span>
            </Link>
            <Link href={`/search`} className="card bg-fieldColor px-4 py-2 flex flex-row justify-between items-center">
                <span className="text-textColor font-bold">1. Pizza</span>
                <span className="text-textColorMuted">600k</span>
            </Link>
            <Link href={`/search`} className="card bg-fieldColor px-4 py-2 flex flex-row justify-between items-center">
                <span className="text-textColor font-bold">1. Pizza</span>
                <span className="text-textColorMuted">600k</span>
            </Link>
            <Link href={`/search`} className="card bg-fieldColor px-4 py-2 flex flex-row justify-between items-center">
                <span className="text-textColor font-bold">1. Pizza</span>
                <span className="text-textColorMuted">600k</span>
            </Link>
        </div>
    )
}
export default Trends