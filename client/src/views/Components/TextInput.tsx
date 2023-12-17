import { ReactNode } from "react";

import "@sass/components/textinput.scss"

type TextInputProps = {
  id: string;
  children: ReactNode;
  type?: string;
  className?: string;
  state: {
    value: string;
    setValue: (value: string) => void;
  }
  placeholder?: string;
}

export default function TextInput({ id, type = 'text', className = '', children, state, placeholder }: TextInputProps) {

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className={`block font-medium text-md text-gray-700 ` + className}>
        {children}
      </label>
      <input
        autoComplete="on"
        id={id}
        placeholder={placeholder}
        type={type}
        className={
          'bg-gray-100 px-3 h-10 focus:ring-[2px] focus:ring-sky-600 rounded-lg outline outline-gray-200 focus:outline-none ' +
          className
        }
        value={state.value}
        onChange={(e) => state.setValue(e.target.value)}
      />
    </div>
  );
}
