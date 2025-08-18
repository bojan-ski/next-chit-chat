'use client';

import { JSX, useEffect, useState } from 'react';
import { fetchAllMembersAction } from '@/actions/memberActions';
import { Member } from '@prisma/client';
import { MemberFilters, MembersSearchParams } from '@/types/types';
import Filters from '@/components/membersPage/Filters';
import MembersList from '@/components/membersPage/MembersList';
import LoadMoreMembersOption from '@/components/membersPage/LoadMoreMembersOption';

const PAGE_SIZE = 2;

function MembersPage({ searchParams }: { searchParams: Promise<MembersSearchParams> }): JSX.Element {
  const [members, setMembers] = useState<Member[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const loadMembers = async (reset = false): Promise<void> => {
    setLoading(true);

    const { gender, minAge, maxAge } = await searchParams;

    const filters: MemberFilters = {};

    if (gender) filters.gender = gender as "male" | "female";
    if (minAge) filters.minAge = parseInt(minAge);
    if (maxAge) filters.maxAge = parseInt(maxAge);

    const newMembers = await fetchAllMembersAction(filters, reset ? 0 : offset, PAGE_SIZE);

    if (reset) {
      setMembers(newMembers);
      setOffset(PAGE_SIZE);
    } else {
      setMembers((prev) => [...prev, ...newMembers]);
      setOffset((prev) => prev + PAGE_SIZE);
    }

    setHasMore(newMembers.length === PAGE_SIZE);
    setLoading(false);
  }

  useEffect(() => {
    console.log('MembersPage - useEffect');

    setOffset(0);
    loadMembers(true);
  }, [searchParams]);

  return (
    <div className='members-page max-w-7xl mx-auto my-10 h-[80vh]'>

      {/* Filter feature */}
      <Filters
        setOffset={setOffset}
        loadMembers={loadMembers}
      />

      {/* Members list*/}
      <MembersList members={members} />

      {/* Pagination option */}
      {(members.length > 0 && hasMore) && (
        <LoadMoreMembersOption
          loadMembers={loadMembers}
          loading={loading}
        />
      )}

    </div>
  )
}

export default MembersPage