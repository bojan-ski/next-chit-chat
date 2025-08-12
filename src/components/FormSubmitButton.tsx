'use client';

import { JSX } from 'react'
import { useFormStatus } from 'react-dom'

function FormSubmitButton({ children, buttonCss }: { children: React.ReactNode, buttonCss: string }): JSX.Element {
    const status = useFormStatus();
    
    return (
        <button type="submit" className={buttonCss} disabled={status.pending}>
            {children}
        </button>
    )

}

export default FormSubmitButton