import React from "react";
import { Link } from "react-router";
import { PublicPath } from "~/helper/enum";

const Header = () => {
  return (
    <div className="flex items-center justify-center gap-10 bg-gray-900 py-5 text-gray-300">
      <Link to={PublicPath.Home} className="hover:underline">
        Home
      </Link>
      <Link to={PublicPath.Users} className="hover:underline">
        Users
      </Link>
    </div>
  );
};

export default Header;
