import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image"

interface props{
    image: string,
    name: string,
    text: string,
    bg?:string,
}
const Story = ({image, name, text, bg}: props) => {
    return (
        <Dialog >
            <DialogTrigger asChild >
                <button type="button" className=" flex flex-col gap-2 items-center justify-center realtive p-4 hover:bg-cardColor rounded-3xl min-w-fit active:scale-95">
                    <Image
                        src= {image}
                        alt="post pjoto"
                        width={64}
                        height={64}
                        className='avatar ring-4 ring-primary'
                    />
                    <span className="text-textColor ">{name}</span>
                </button>
            </DialogTrigger>
            <DialogContent className=" w-screen h-screen  flex flex-col items-center overflow-hidden border-none p-0 text-textColor bg-backColor  !rounded-none">
                
                <div className= {`${bg} w-full h-full flex`}>
                    <p className="m-auto p-4 text-lg">
                        {text}
                    </p>
                </div>

            </DialogContent>
        </Dialog>

    )
}
export default Story