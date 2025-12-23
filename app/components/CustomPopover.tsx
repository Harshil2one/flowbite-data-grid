import React, { type ReactNode } from "react";
import { Popover } from "flowbite-react";

interface IProps {
  open: boolean;
  title: string;
  body: ReactNode;
  children: ReactNode;
}

const CustomPopover = ({ open, title, body, children }: IProps) => {
  return (
    <Popover
      open={open}
      content={
        <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
          <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
          </div>
          <div className="px-3 py-2">{body}</div>
        </div>
      }
    >
      {children}
    </Popover>
  );
};

export default CustomPopover;
