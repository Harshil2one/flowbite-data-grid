import React, { useEffect, useState } from "react";
import type { IHeaderList } from "~/types/table";
import CustomTable from "~/components/Table";
import { Align } from "~/helper/enum";
import Title from "~/components/Title";
import { Badge } from "flowbite-react";
import axios from "axios";

export function meta() {
  return [
    { title: "Data Grid | Users" },
    { name: "description", content: "Customizable grid view" },
  ];
}

interface IUser {
  username: string;
  email: string;
  phone: number;
  role: string;
}

const headerList: IHeaderList[] = [
  {
    key: "username",
    label: "User Name",
    align: Align.Left,
    sortable: true,
    show: true,
  },
  {
    key: "email",
    label: "Email Address",
    align: Align.Left,
    sortable: true,
    show: true,
  },
  {
    key: "phone",
    label: "Contact details",
    align: Align.Center,
    sortable: false,
    show: false,
    custom: (value) => <span>+91 {value}</span>,
  },
  {
    key: "role",
    label: "User Role",
    align: Align.Center,
    sortable: true,
    show: false,
    custom: (value) => (
      <Badge color="indigo" className="max-w-max">
        {value}
      </Badge>
    ),
  },
  {
    key: "user_action",
    label: "Actions",
    align: Align.Center,
    sortable: false,
    show: true,
    custom: () => (
      <a
        href="#"
        className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
      >
        Action
      </a>
    ),
  },
];

export default function Users() {
  const [users, setUsers] = useState<IUser[]>([]);

  const fetchUsers = async (query?: any) => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users",
      query
        ? {
            params: {
              page: query.page,
              limit: query.limit,
              sortKey: query.sort?.key,
              sortDir: query.sort?.direction,
              search: query.search,
              ...query.filters,
            },
          }
        : {},
    );
    const users = await response.data;
    const result = users?.map((user: IUser) => {
      return {
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: "Admin",
      };
    });
    setUsers(result);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <main className="flex min-h-screen flex-col gap-5 bg-gray-900 px-4 py-22">
      <Title>Users</Title>
      {users?.length > 0 && (
        <CustomTable
          headerList={headerList}
          list={users}
          paginate
          itemsPerPage={5}
          onQueryChange={fetchUsers}
        />
      )}
    </main>
  );
}
