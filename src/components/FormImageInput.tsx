import { JSX } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';

type FormImageInputProps = {
    name: string;
    label?: boolean;
    labelText?: string;
    required?: boolean
    additionInputClasses?: string
};

function FormImageInput({ name, label = false, labelText, required, additionInputClasses }: FormImageInputProps): JSX.Element {
    return (
        <div className="mb-2 hover:shadow-md transition">
            {label && (
                <Label
                    htmlFor={name}
                    className='capitalize mb-2'>
                    {labelText || name}
                </Label>
            )}
            <Input
                className={`border border-[#E5C6AC] w-full ${additionInputClasses}`}
                id={name}
                name={name}
                type='file'
                accept='image/*'
                required={required}
            />
        </div>
    )
}

export default FormImageInput