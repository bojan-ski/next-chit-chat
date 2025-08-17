import { JSX } from "react";
import { FaMale, FaFemale } from "react-icons/fa";
import { Label } from "../ui/label";
import { Checkbox } from '../ui/checkbox';

type GenderSelectOptionProps = {
    gender: string[];
    ageRange: number[];
    handleFilterChange: (gender: string[], ageRange: number[]) => void;
}

function GenderSelectOption({ gender, ageRange, handleFilterChange }: GenderSelectOptionProps): JSX.Element {
    const toggleGender = (value: string) => {
        const selectedOption = gender.includes(value)
            ? gender.filter(g => g !== value)
            : [...gender, value];
        const selectedGender = selectedOption.length === 0 ? ['male', 'female'] : selectedOption;

        handleFilterChange(selectedGender, ageRange);
    };

    return (
        <div className="gender-select-option flex justify-center items-center md:justify-start gap-6 mb-8 md:mb-0">
            {/* male */}
            <Label className={`cursor-pointer ${gender.includes("male") ? "text-[#C05C41] scale-125" : "text-[#7B4B3A] scale-100"} transition-transform`}>
                <Checkbox
                    checked={gender.includes("male")}
                    onCheckedChange={() => toggleGender("male")}
                    className="hidden"
                />
                <FaMale size={30} />
            </Label>

            {/* female */}
            <Label className={`cursor-pointer ${gender.includes("female") ? "text-[#C05C41] scale-125" : "text-[#7B4B3A] scale-100"} transition-transform`}>
                <Checkbox
                    checked={gender.includes("female")}
                    onCheckedChange={() => toggleGender("female")}
                    className="hidden"
                />
                <FaFemale size={30} />
            </Label>
        </div>
    );
}


export default GenderSelectOption