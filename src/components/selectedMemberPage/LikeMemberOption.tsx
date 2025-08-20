import { JSX } from "react";
import { useRouter } from "next/navigation";
import { toggleLikeMemberAction } from "@/actions/likeActions";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

type LikeMemberOptionProps = {
    targetMemberId: string;
    isLiked: boolean;
}

function LikeMemberOption({ targetMemberId, isLiked }: LikeMemberOptionProps): JSX.Element {
    const router = useRouter();

    async function toggleLike() {
        await toggleLikeMemberAction(targetMemberId, isLiked);
        router.refresh();
    }

    return (
        <div onClick={toggleLike} className="relative hover:opacity-80 transition cursor-pointer">
            <AiOutlineHeart size={40} className="fill-white absolute -top-[2px] -right-[2px]" />
            <AiFillHeart size={36} className={isLiked ? 'fill-rose-500' : 'fill-neutral-500/70'} />
        </div>
    )
}

export default LikeMemberOption