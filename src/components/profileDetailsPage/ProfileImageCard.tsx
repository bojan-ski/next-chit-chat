import { JSX } from "react";
import Image from "next/image";
import { Photo } from "@prisma/client";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

function ProfileImageCard({ photo }: { photo: Photo }): JSX.Element {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="relative w-full h-60 hover:scale-105 transition duration-700 cursor-pointer">
                    <Image
                        src={photo.image}
                        alt="user_image"
                        fill
                        className="object-cover rounded-lg"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        priority
                    />

                    {!photo?.isApproved && (
                        <div className="absolute bottom-5 w-full text-white bg-[#C05C41] p-1">
                            <div className="flex justify-center font-semibold">
                                Awaiting approval
                            </div>
                        </div>
                    )}
                </div>
            </DialogTrigger>

            <DialogContent className="max-w-4xl overflow-hidden bg-[#E5C6AC] p-4 text-[#C05C41]">
                <VisuallyHidden>
                    <DialogTitle>
                        User image
                    </DialogTitle>
                </VisuallyHidden>

                <div className="relative w-full h-[50vh]">
                    <Image
                        src={photo.image}
                        alt="full_image"
                        fill
                        className="object-contain"
                        sizes="100vw"
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ProfileImageCard;
