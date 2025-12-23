import React from "react";
import { Dropdown, DropdownItem } from "flowbite-react";

interface IProps {
  dropdown: number[];
  value: number;
  handleChange: (value: number) => void;
}

const Select = ({ dropdown, value, handleChange }: IProps) => {
  return (
    <Dropdown
      label={value}
      dismissOnClick={false}
      className="cursor-pointer"
      color="alternative"
      size="sm"
    >
      {dropdown.map((item) => (
        <DropdownItem
          key={item}
          className="flex items-center gap-2"
          onClick={() => handleChange(item)}
        >
          {item}
        </DropdownItem>
      ))}
    </Dropdown>
  );
};

export default Select;
