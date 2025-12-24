import React, { useEffect, useRef, useMemo } from "react";
import {
  Button,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { useState } from "react";
import type { IHeaderList, IListItem, ISortConfig } from "~/types/table";
import { ArrowDownUp, ArrowDownAz, ArrowUpAz, Funnel } from "lucide-react";
import { Direction } from "~/helper/enum";
import Input from "./Input";
import Select from "./Select";
import CustomPopover from "./CustomPopover";
import { searchByColumn, searchData, sortData } from "~/helper/utils";
import CheckboxSelect from "./Select/CheckboxSelect";

interface IProps {
  headerList: IHeaderList[];
  list: IListItem[];
  paginate?: boolean;
  itemsPerPage?: number;
  totalItems?: number;
  onQueryChange?: (query: {
    page: number;
    limit: number;
    sort?: ISortConfig;
    search?: string;
    filters?: IListItem;
  }) => void;
}

const CustomTable = (props: IProps) => {
  const {
    headerList,
    list,
    paginate = false,
    itemsPerPage = 10,
    totalItems,
    onQueryChange,
  } = props;
  const isFirstRender = useRef(true);

  const [rowsPerPage, setRowsPerPage] = useState(itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<ISortConfig>({
    key: "",
    direction: Direction.Asc,
  });
  const [isFilterOpen, setIsFilterOpen] = useState("");
  const [filters, setFilters] = useState<IListItem>({});
  const [searchText, setSearchText] = useState("");

  const [headers, setHeaders] = useState(headerList);
  const [listData, setListData] = useState(list);

  const handleSortData = (sortConfig: ISortConfig) => {
    const { key, direction } = sortConfig;
    const sortedData = sortData([...list], key, direction);
    setListData(sortedData);
  };

  const handleSearchByColumn = (filters: IListItem) => {
    const data = searchByColumn([...list], filters);
    setListData(data);
  };

  const handleColumnFlag = (key: string) => {
    const data = headers.map((header) =>
      header.key === key ? { ...header, show: !header.show } : header,
    );
    setHeaders(data);
  };

  const handleSearch = (search: string) => {
    const data = searchData([...list], search);
    setListData(data);
  };

  const onPageChange = (page: number) => setCurrentPage(page);

  const handleSortColumn = (key: string, direction: Direction) => {
    const updatedSortConfig = {
      key,
      direction,
    };
    setSortConfig(updatedSortConfig);
    handleSortData(updatedSortConfig);
  };

  const handleFilterClick = (key: string) => {
    setFilters((prev: IListItem) => {
      return {
        ...prev,
        [key]: filters?.[key],
      };
    });
    setIsFilterOpen(key);
  };

  const handleApplyFilter = (key: string) => {
    const updatedFilters = {
      ...filters,
      [key]: searchText,
    };
    handleSearchByColumn(updatedFilters);
    setFilters(updatedFilters);
    setIsFilterOpen("");
  };

  const handleResetFilter = (key: string) => {
    const { [key]: _, ...restFilters } = filters || {};
    handleSearchByColumn(restFilters);
    setFilters(restFilters);
    setIsFilterOpen("");
  };

  const paginatedList = useMemo(() => {
    if (!paginate || totalItems) return listData;

    const start = rowsPerPage * (currentPage - 1);
    const end = currentPage * rowsPerPage;

    return listData.slice(start, end);
  }, [listData, paginate, rowsPerPage, currentPage]);

  useEffect(() => {
    if (currentPage > 1) setCurrentPage(1);
  }, [listData?.length]);

  useEffect(() => {
    setListData(list);
  }, [list]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (paginate && onQueryChange) {
      onQueryChange({
        page: currentPage,
        limit: rowsPerPage,
        sort: sortConfig.key ? sortConfig : undefined,
        search: searchText || undefined,
        filters: Object.keys(filters).length ? filters : undefined,
      });
    }
  }, [currentPage, rowsPerPage, sortConfig, searchText, filters]);

  if (!headers) {
    return (
      <>
        <Spinner color="failure" />
        <h1 className="mt-2 text-2xl text-red-500">No Data Found.</h1>
      </>
    );
  }

  return (
    <>
      <div className="flex justify-between">
        <CheckboxSelect headers={headers} handleColumnFlag={handleColumnFlag} />
        <Input
          placeholder="Search here.."
          className="sm:w-auto md:w-100"
          bounceTime={1000}
          handleChange={(text) => handleSearch(text)}
        />
      </div>
      <div className="min-h-80 max-w-[100%] overflow-x-auto">
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header, index) => {
                if (!header.show) return;
                return (
                  <TableHeadCell key={header.key} align={header.align}>
                    <div className={`flex justify-${header.align} gap-2`}>
                      <span className="flex gap-1">
                        {header.label}
                        {sortConfig.key === header.key &&
                        sortConfig.direction === Direction.Asc ? (
                          <ArrowDownAz
                            className="cursor-pointer text-white"
                            size={16}
                            onClick={() =>
                              handleSortColumn(header.key, Direction.Desc)
                            }
                          />
                        ) : sortConfig.key === header.key &&
                          sortConfig.direction === Direction.Desc ? (
                          <ArrowUpAz
                            className="cursor-pointer text-white"
                            size={16}
                            onClick={() =>
                              handleSortColumn(header.key, Direction.Asc)
                            }
                          />
                        ) : (
                          header.sortable && (
                            <ArrowDownUp
                              className={`cursor-pointer ${sortConfig.key === header.key ? "text-white" : ""}`}
                              size={16}
                              onClick={() =>
                                handleSortColumn(header.key, Direction.Asc)
                              }
                            />
                          )
                        )}
                      </span>
                      {index !== headers.length - 1 && (
                        <CustomPopover
                          open={isFilterOpen === header.key}
                          title="Filter"
                          body={
                            <>
                              <Input
                                placeholder="Search here.."
                                defaultValue={filters?.[header.key]}
                                handleChange={(text) => setSearchText(text)}
                              />
                              <div className="mt-2 flex flex-row-reverse gap-2">
                                <Button
                                  color="default"
                                  className="cursor-pointer"
                                  disabled={searchText?.length <= 0}
                                  onClick={() => handleApplyFilter(header.key)}
                                >
                                  Apply
                                </Button>
                                <Button
                                  color="light"
                                  className="cursor-pointer"
                                  onClick={() => handleResetFilter(header.key)}
                                >
                                  Reset
                                </Button>
                              </div>
                            </>
                          }
                        >
                          <Funnel
                            size={16}
                            className="cursor-pointer"
                            onClick={() => handleFilterClick(header.key)}
                          />
                        </CustomPopover>
                      )}
                    </div>
                  </TableHeadCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody className="divide-y">
            {paginatedList?.length > 0 ? (
              paginatedList.map((item, index) => (
                <TableRow
                  key={index}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  {headers.map((header) => {
                    if (!header.show) return;
                    return (
                      <TableCell
                        key={header.key}
                        align={header.align}
                        className="font-medium whitespace-nowrap text-gray-900 dark:text-white"
                      >
                        {header.custom
                          ? header.custom(item[header.key])
                          : item[header.key]}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell colSpan={headers.length} align="center">
                  No Data Found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {paginate && (
        <div className="flex flex-col items-center gap-2">
          <Select
            dropdown={[1, 3, 5, 10, 25]}
            value={rowsPerPage}
            handleChange={(value) => setRowsPerPage(value)}
          />
          <Pagination
            layout="table"
            className="flex flex-col items-center gap-1"
            showIcons
            currentPage={currentPage}
            totalItems={totalItems || listData.length}
            itemsPerPage={rowsPerPage}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </>
  );
};

export default CustomTable;
