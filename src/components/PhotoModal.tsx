'use client'

import { JSX } from "react";
import Image from "next/image";
import { Photo } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import DeletePhotoOption from "./profileDetailsPage/DeletePhotoOption";

function PhotoModal({ photo }: { photo: Photo }): JSX.Element {
    const userId = useUser().user?.id;
    const isAdmin = process.env.ADMIN_USER_ID

    return (
        <Dialog>
            {/* photo small display */}
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

            {/* photo full display */}
            <DialogContent className="max-w-4xl overflow-hidden bg-[#E5C6AC] p-7 text-[#C05C41]">
                <VisuallyHidden>
                    <DialogTitle>
                        User uploaded photo
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

                {/* delete photo option */}
                {/* <DeletePhotoOption photo={photo} /> */}
                {(userId == photo.memberId || (isAdmin && photo.isApproved == true)) && <DeletePhotoOption photo={photo} />}
            </DialogContent>
        </Dialog>
    )
}

export default PhotoModal