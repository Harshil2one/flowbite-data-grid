import React, { useEffect, useState } from "react";
import { TextInput } from "flowbite-react";
import { SearchIcon } from "lucide-react";

interface IProps {
  placeholder: string;
  type?: string;
  className?: string;
  defaultValue?: string;
  bounceTime?: number;
  handleChange?: (value: string) => void;
}

const Input = (props: IProps) => {
  const {
    placeholder,
    type = "text",
    className,
    defaultValue = "",
    bounceTime = 0,
    handleChange,
  } = props;

  const [inputValue, setInputValue] = useState(defaultValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (handleChange) {
        handleChange(inputValue);
      }
    }, bounceTime);

    return () => clearTimeout(handler);
  }, [inputValue]);

  return (
    <TextInput
      type={type}
      className={className}
      placeholder={placeholder}
      defaultValue={defaultValue}
      icon={SearchIcon}
      onChange={(event) => setInputValue(event.target.value)}
    />
  );
};

export default Input;
