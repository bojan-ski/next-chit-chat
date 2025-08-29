'use client';

import { JSX } from 'react';
import { useMembers } from '@/context/membersProvider';
import Filters from '@/components/membersPage/Filters';
import MembersList from '@/components/membersPage/MembersList';
import LoadMoreMembersOption from '@/components/membersPage/LoadMoreMembersOption';

function MembersPage(): JSX.Element {
  const { members, hasMore, loading, handleLoadMoreMembers, gender, ageRange, setAgeRange, handleFilterChange } = useMembers();

  return (
    <div className='members-page max-w-7xl mx-auto my-10 h-[80vh]'>

      <Filters
        gender={gender}
        ageRange={ageRange}
        setAgeRange={setAgeRange}
        handleFilterChange={handleFilterChange}
      />

      <MembersList members={members} />

      {(members.length > 0 && hasMore) && (
        <LoadMoreMembersOption
          handleLoadMoreMembers={handleLoadMoreMembers}
          loading={loading}
        />
      )}

    </div>
  )
}

export default MembersPage