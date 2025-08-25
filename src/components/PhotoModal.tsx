'use client'

import { JSX } from "react";
import Image from "next/image";
import { Photo } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import DeletePhotoOption from "./profileDetailsPage/DeletePhotoOption";
import ReportContent from "./ReportContent";

type PhotoModalProps = {
    photo: Photo;
    height?: string;
    allowDelete?: boolean;
}

function PhotoModal({ photo, height = 'h-60', allowDelete = false }: PhotoModalProps): JSX.Element {
    const userId = useUser().user?.id;

    return (
        <Dialog>
            {/* photo small display */}
            <DialogTrigger asChild>
                <div className={`relative w-full ${height} hover:scale-105 transition duration-700 cursor-pointer`}>
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

                {/* delete photo */}
                <div className='absolute top-4.5 left-2'>
                    {(userId == photo.memberId || allowDelete) && <DeletePhotoOption photo={photo} />}

                    {/* report photo */}
                    {(userId !== photo.memberId && !allowDelete) && (
                        <ReportContent
                            contentType='photo'
                            photoId={photo.id}
                            contentOwnerId={photo.memberId}
                        />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default PhotoModal