import { Dispatch, JSX, SetStateAction, useRef } from 'react';
import { Slider } from '@/components/ui/slider';

type AgeRangeOptionProps = {
    ageRange: number[];
    setAgeRange: Dispatch<SetStateAction<number[]>>;
    gender: string[];
    handleFilterChange: (gender: string[], ageRange: number[]) => void;
}

function AgeRangeOption({ ageRange, setAgeRange, gender, handleFilterChange, }: AgeRangeOptionProps): JSX.Element {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleChange = (value: number[]) => {
        setAgeRange(value);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            handleFilterChange(gender, value);
        }, 500);
    };

    return (
        <div className='set-age-range-option'>
            <div className="mb-3">
                <Slider
                    value={ageRange}
                    onValueChange={handleChange}
                    max={80}
                    min={18}
                    step={1}
                    className="bg-[#C05C41] h-1 text-[#C05C41] rounded-2xl"
                />
            </div>

            <div className="flex justify-between text-xs text-[#C05C41] font-bold">
                <span>18</span>
                <span>{ageRange[1]}</span>
                <span>80</span>
            </div>
        </div>
    );
}

export default AgeRangeOption