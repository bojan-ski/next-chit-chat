import { JSX } from 'react';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';

type FormCheckboxProps = {
    name: string;
    label?: boolean;
    labelText?: string;
    required?: boolean;
}

function FormCheckbox({ name, label, labelText, required }: FormCheckboxProps): JSX.Element {
    return (
        <div className="flex items-center gap-2">
            <Checkbox id={name} name={name} required={required} className='border-[#C05C41]' />
            {label && <Label htmlFor={name}>{labelText}</Label>}
        </div>
    )
}

export default FormCheckbox

