import type { ReactNode } from "react";
import type { Align, Direction } from "~/helper/enum";

export interface IHeaderList {
  key: string;
  label: string;
  align: Align;
  sortable: boolean;
  show: boolean;
  custom?: (value: string) => ReactNode;
}

export interface IListItem {
  [key: string]: any;
}

export interface ISortConfig {
  key: string;
  direction: Direction;
}
