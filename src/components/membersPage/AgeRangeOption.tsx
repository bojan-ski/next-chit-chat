import { Dispatch, JSX, SetStateAction } from 'react';
import { Label } from '../ui/label';
import { Slider } from '@/components/ui/slider';

type AgeRangeOptionProps = {
    ageRange: number[];
    setAgeRange: Dispatch<SetStateAction<number[]>>;
    gender: string[];
    handleFilterChange: (gender: string[], ageRange: number[]) => void;
}

function AgeRangeOption({ ageRange, setAgeRange, gender, handleFilterChange, }: AgeRangeOptionProps): JSX.Element {
    const handleChange = (value: number[]) => {
        setAgeRange(value);
        handleFilterChange(gender, value);
    };

    return (
        <div className='set-age-range-option'>
            <Label className="flex justify-center md:justify-start text-[#7B4B3A]">
                Age Range: {ageRange[0]} - {ageRange[1]} years
            </Label>

            <div className="my-5">
                <Slider
                    value={ageRange}
                    onValueChange={handleChange}
                    max={80}
                    min={18}
                    step={1}
                    className="bg-[#7B4B3A] h-1 text-[#7B4B3A]"
                />
            </div>
            
            <div className="flex justify-between text-xs text-[#A67C65]">
                <span>18</span>
                <span>80</span>
            </div>
        </div>
    );
}

export default AgeRangeOption