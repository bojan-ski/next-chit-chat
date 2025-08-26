'use client';

import { JSX } from 'react'
import { useFormStatus } from 'react-dom'

function FormSubmitButton({ children, buttonCss }: { children: React.ReactNode, buttonCss: string }): JSX.Element {
    const { pending } = useFormStatus();
    
    return (
        <button type="submit" className={buttonCss} disabled={pending}>
            {children}
        </button>
    )

}

export default FormSubmitButton