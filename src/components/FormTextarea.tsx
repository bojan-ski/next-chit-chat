import { JSX } from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type FormTextareaProps = {
  name: string;
  label?: boolean;
  labelText?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  rows?: number;
  cols?: number;
  required?: boolean
  additionTextareaClasses?: string
};

function FormTextarea({ name, label, labelText, value, defaultValue, placeholder, rows, cols, required, additionTextareaClasses }: FormTextareaProps): JSX.Element {
  return (
    <div className='mb-5'>
      {label && (
        <Label
          htmlFor={name}
          className='capitalize mb-2'>
          {labelText || name}
        </Label>
      )}
      <Textarea
        className={`border border-[#E5C6AC] resize-none w-full ${additionTextareaClasses}`}
        id={name}
        name={name}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        rows={rows}
        cols={cols}
        required={required}
      />
    </div>
  )
}

export default FormTextarea