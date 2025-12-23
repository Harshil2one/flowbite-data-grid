import { Direction } from "./enum";
import type { IListItem } from "../types/table";

export const sortData = (data: any, key: string, direction: Direction) => {
  return data.sort((a: IListItem, b: IListItem) => {
    const A = a[key];
    const B = b[key];

    if (typeof A === "string" && typeof B === "string") {
      return direction === Direction.Asc
        ? A.localeCompare(B)
        : B.localeCompare(A);
    }

    if (typeof A === "number" && typeof B === "number") {
      return direction === Direction.Asc ? A - B : B - A;
    }

    return 0;
  });
};

export const searchData = (data: any, search: string) => {
  if (!search) return data;

  const lowerSearch = search.toLowerCase();

  return data?.filter((item: IListItem) =>
    Object.values(item)?.some((value) =>
      value?.toString().toLowerCase().includes(lowerSearch),
    ),
  );
};

export const searchByColumn = (data: any, filters: IListItem) => {
  if (!filters) return data;

  return data?.filter((item: IListItem) =>
    Object.entries(filters).every(([key, value]) => {
      if (!value) return true;

      const itemValue = item?.[key];
      if (!itemValue) return false;

      if (typeof value === "string") {
        return itemValue
          ?.toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      }

      return itemValue === value;
    }),
  );
};
