import React from "react";
import { Checkbox, Dropdown, DropdownItem } from "flowbite-react";
import type { IHeaderList } from "~/types/table";

interface IProps {
  headers: IHeaderList[];
  handleColumnFlag: (key: string) => void;
}

const CheckboxSelect = ({ headers, handleColumnFlag }: IProps) => {
  return (
    <Dropdown
      label="Customize"
      dismissOnClick={false}
      className="cursor-pointer"
    >
      {headers.map((header) => (
        <DropdownItem
          key={header.key}
          className="flex items-center gap-2"
          onClick={() => handleColumnFlag(header.key)}
        >
          <Checkbox className="cursor-pointer" checked={header.show === true} />
          {header.label}
        </DropdownItem>
      ))}
    </Dropdown>
  );
};

export default CheckboxSelect;
