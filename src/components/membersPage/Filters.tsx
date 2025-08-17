'use client';

import { JSX, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import GenderSelectOption from './GenderSelectOption';
import AgeRangeOption from './AgeRangeOption';

function Filters(): JSX.Element {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [gender, setGender] = useState<string[]>(
        searchParams.get('gender')?.split(',') || ['male', 'female']
    );
    const [ageRange, setAgeRange] = useState<number[]>([
        parseInt(searchParams.get('minAge') || '18'),
        parseInt(searchParams.get('maxAge') || '80')
    ]);

    const handleFilterChange = (updatedGender: string[], updatedAgeRange: number[]) => {
        setGender(updatedGender);
        setAgeRange(updatedAgeRange);

        const params = new URLSearchParams();

        if (!(updatedGender.includes('male') && updatedGender.includes('female'))) {
            params.set('gender', updatedGender.join(','));
        }

        params.set('minAge', updatedAgeRange[0].toString());
        params.set('maxAge', updatedAgeRange[1].toString());

        router.push(`/members?${params.toString()}`);
    };

    return (
        <div className="bg-[#FFF9F5] p-6 rounded-xl shadow-md border border-[#E5C6AC] mb-5">
            <div className="grid grid-cols-1 md:grid-cols-2">
                {/* filter by gender */}
                <GenderSelectOption
                    gender={gender}
                    ageRange={ageRange}
                    handleFilterChange={handleFilterChange}
                />

                {/* filter by age range */}
                <AgeRangeOption
                    ageRange={ageRange}
                    setAgeRange={setAgeRange}
                    gender={gender}
                    handleFilterChange={handleFilterChange}
                />
            </div>
        </div>
    );
}

export default Filters;
