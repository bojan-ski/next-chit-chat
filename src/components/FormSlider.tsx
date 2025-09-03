'use client';

import { JSX, useState } from 'react';
import { Label } from './ui/label';
import { Slider } from './ui/slider';

type FormSliderProps = {
    name: string;
    label?: boolean;
    labelText?: string;
    min: number;
    max: number;
    step?: number
}

function FormSlider({ name, label, labelText, min, max, step = 1 }: FormSliderProps): JSX.Element {
    const [ageRange, setAgeRange] = useState<number[]>([min, max]);

    return (
        <div className="mb-5">
            {label && (
                <Label
                    htmlFor={name}
                    className='capitalize mb-5'>
                    {labelText || name}
                </Label>
            )}
            <Slider
                name={name}
                value={ageRange}
                onValueChange={setAgeRange}
                min={min}
                max={max}
                step={step}
                className="bg-[#C05C41] h-1 rounded-2xl"
            />
            <div className="flex justify-between text-xs text-[#C05C41] font-bold mt-2">
                <span>{ageRange[0]}</span>
                <span>{ageRange[1]}</span>
            </div>
            <input type="hidden" name="minAge" value={ageRange[0]} />
            <input type="hidden" name="maxAge" value={ageRange[1]} />
        </div>
    )
}

export default FormSlider