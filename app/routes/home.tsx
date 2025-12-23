import React from "react";
import type { IHeaderList } from "~/types/table";
import CustomTable from "~/components/Table";
import { Align } from "~/helper/enum";
import Title from "~/components/Title";

export function meta() {
  return [
    { title: "Data Grid | Home" },
    { name: "description", content: "Customizable grid view" },
  ];
}

interface IProduct {
  product_name: string;
  product_color: string;
  product_category: string;
  product_price: number;
}

const headerList: IHeaderList[] = [
  {
    key: "product_name",
    label: "Product name",
    align: Align.Left,
    sortable: true,
    show: true,
  },
  {
    key: "product_color",
    label: "Color",
    align: Align.Center,
    sortable: true,
    show: true,
  },
  {
    key: "product_category",
    label: "Category",
    align: Align.Center,
    sortable: false,
    show: true,
  },
  {
    key: "product_price",
    label: "Price",
    align: Align.Center,
    sortable: true,
    show: true,
    custom: (value) => <span>₹ {value}</span>,
  },
  {
    key: "product_action",
    label: "Edit",
    align: Align.Center,
    sortable: false,
    show: false,
    custom: () => (
      <a
        href="#"
        className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
      >
        Edit
      </a>
    ),
  },
];

const productsData: IProduct[] = [
  {
    product_name: 'Apple MacBook Pro 17"',
    product_color: "Silver",
    product_category: "Laptop",
    product_price: 2999,
  },
  {
    product_name: "Microsoft Surface Pro",
    product_color: "White",
    product_category: "Laptop PC",
    product_price: 1999,
  },
  {
    product_name: "Magic Mouse 2",
    product_color: "Black",
    product_category: "Accessories",
    product_price: 99,
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-5 bg-gray-900 px-4 py-22">
      <Title>Products</Title>
      <CustomTable
        headerList={headerList}
        list={productsData}
        paginate
        itemsPerPage={10}
      />
    </main>
  );
}
