import { JSX } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Member } from '@prisma/client';
import { calculateMemberAge } from '@/utils/utils';

function MemberCard({ member }: { member: Member }): JSX.Element {
    return (
        <Link
            href={`/members/${member.id}`}
            className="relative w-full h-60 group rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
        >
            {/* profile image */}
            <Image
                src={member.profileImage}
                alt={member.username}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                priority
            />

            {/* overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* info container */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <p className="text-lg font-semibold truncate">
                    <span>{member.username}</span>
                    <span>, {calculateMemberAge(member.dateOfBirth)}</span>
                </p>
                <p className="text-sm text-gray-200 flex items-center gap-1">
                    <span>{member.city}</span>
                    <span>, {member.state}</span>
                </p>
            </div>
        </Link>
    )
}

export default MemberCard