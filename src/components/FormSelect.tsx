import { JSX } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FaMale, FaFemale } from "react-icons/fa";

type FormSelectProps = {
    name: string;
    label?: boolean;
    labelText?: string;
    defaultValue?: string;
    required?: boolean;
}

function FormSelect({ name, label, labelText, defaultValue, required }: FormSelectProps): JSX.Element {
    return (
        <div className="mb-5">
            {label && (
                <Label
                    htmlFor={name}
                    className='capitalize mb-2'>
                    {labelText || name}
                </Label>
            )}
            <Select name={name} defaultValue={defaultValue} required={required}>
                <SelectTrigger id={name} className="w-full border-[#E5C6AC]">
                    <SelectValue placeholder="Choose gender" />
                </SelectTrigger>

                <SelectContent className="bg-[#FDF6F0]">
                    <SelectItem value="male">
                        <div className="flex items-center gap-2">
                            <FaMale className="text-blue-500" />
                            <span>Male</span>
                        </div>
                    </SelectItem>

                    <SelectItem value="female">
                        <div className="flex items-center gap-2">
                            <FaFemale className="text-pink-500" />
                            <span>Female</span>
                        </div>
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}

export default FormSelect
