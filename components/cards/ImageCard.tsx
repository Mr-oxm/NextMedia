import Image from "next/image"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"


export const ImageCard = ({image}:{image:string}) => {
    return (
        <div className="relative rounded-3xl overflow-hidden">
            <Dialog>
                <DialogTrigger asChild >
                    <div className="realtive">
                        <div className="absolute w-full h-full opacity-0 hover:opacity-100 bg-black/20 transition-all"></div>
                        <Image
                            src={image}
                            alt="post pjoto"
                            width={300}
                            height={300}
                            className='w-full max-h-96  object-cover'
                        />
                    </div>
                </DialogTrigger>
                <DialogContent className=" w-screen h-screen  flex flex-col items-center overflow-hidden border-none p-0 text-textColor bg-backColor">
                    
                    <Image
                        src={image}
                        alt="post pjoto"
                        width={300}
                        height={300}
                        className=' h-screen w-screen object-contain '
                    />

                </DialogContent>
            </Dialog>
            
        </div>
    )
}