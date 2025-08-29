import { Dispatch, JSX, SetStateAction } from 'react';
import GenderSelectOption from './GenderSelectOption';
import AgeRangeOption from './AgeRangeOption';

type FiltersProps = {
    gender: string[];
    ageRange: number[];
    setAgeRange: Dispatch<SetStateAction<number[]>>;
    handleFilterChange: (updatedGender: string[], updatedAgeRange: number[]) => void;
}

function Filters({ gender, ageRange, setAgeRange, handleFilterChange }: FiltersProps): JSX.Element {
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
