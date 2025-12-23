import React, { type ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const Title = ({ children }: IProps) => {
  return <h1 className="mb-0 text-2xl font-bold text-white">{children}</h1>;
};

export default Title;
