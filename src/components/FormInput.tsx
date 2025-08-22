import { JSX } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type FormInputProps = {
  name: string;
  type: string;
  label?: boolean;
  labelText?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean
  additionInputClasses?: string
};

function FormInput({ name, type, label = false, labelText, value, defaultValue, placeholder, required, additionInputClasses }: FormInputProps): JSX.Element {
  return (
    <div className="mb-5">
      {label && (
        <Label
          htmlFor={name}
          className='capitalize mb-2'>
          {labelText || name}
        </Label>
      )}
      <Input
        className={`border border-[#E5C6AC] focus:ring-transparent w-full ${additionInputClasses}`}
        id={name}
        name={name}
        type={type}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
      />
    </div>
  )
}

export default FormInput