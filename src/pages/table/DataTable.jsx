import React, { useState, useMemo, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown, Loader2Icon } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const columnHelper = createColumnHelper();

export default function DataTable() {
  const [data, setData] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [roleCategory, setRoleCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(() => {
    const saved = localStorage.getItem("pageSize");
    return saved ? (saved === "all" ? "all" : Number(saved)) : 10;
  });

  // Ambil data dari API
  useEffect(() => {
    document.title = "Datatable";
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://bukuacak-9bdcb4ef2605.herokuapp.com/api/v1/book"
        );
        const json = await res.json();
        setData(Array.isArray(json.books) ? json.books : []);
      } catch (err) {
        console.error("Gagal fetch data", err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Ambil kategori unik dari data
  const uniqueCategories = useMemo(() => {
    return [
      "all",
      ...new Set(data.map((b) => b.category?.name).filter(Boolean)),
    ];
  }, [data]);

  // Filter data
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch = Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(globalFilter.toLowerCase());
      const matchesCategory =
        roleCategory === "all" || roleCategory === ""
          ? true
          : item.category?.name === roleCategory;
      return matchesSearch && matchesCategory;
    });
  }, [data, globalFilter, roleCategory]);

  // Hitung pagination
  const totalPages =
    pageSize === "all" ? 1 : Math.ceil(filteredData.length / pageSize);
  const paginatedData = useMemo(() => {
    if (pageSize === "all") return filteredData;
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  // Kolom tabel
  const columns = [
    columnHelper.accessor("cover_image", {
      header: "Cover",
      cell: (info) => (
        <img
          src={info.getValue()}
          alt="Cover Buku"
          loading="lazy"
          className="w-12 h-16 object-cover rounded"
        />
      ),
    }),
    columnHelper.accessor("title", {
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Judul Buku
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.author?.name || "-", {
      id: "author",
      header: "Penulis",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.category?.name || "-", {
      id: "category",
      header: "Kategori",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("publisher", {
      header: "Penerbit",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.details?.price || "-", {
      id: "price",
      header: "Harga",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.details?.total_pages || "-", {
      id: "total_pages",
      header: "Total Halaman",
      cell: (info) => info.getValue(),
    }),
  ];

  const table = useReactTable({
    data: paginatedData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="container mx-auto py-3">
      <h1 className="text-2xl font-bold mb-4">Tabel Buku</h1>

      <Card className="p-5">
        {/* Filter */}
        <div className="flex flex-wrap sm:flex-nowrap items-start sm:items-center gap-2 sm:gap-4 mb-4">
          <Input
            placeholder="Cari semua kolom..."
            value={globalFilter}
            onChange={(e) => {
              setGlobalFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full sm:max-w-sm bg-slate-200"
          />

          <Select
            onValueChange={(value) => {
              setRoleCategory(value);
              setCurrentPage(1);
            }}
            value={roleCategory}
          >
            <SelectTrigger className="w-full sm:w-[150px] bg-slate-200">
              <SelectValue placeholder="Filter Kategori" />
            </SelectTrigger>
            <SelectContent>
              {uniqueCategories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={String(pageSize)}
            onValueChange={(value) => {
              const newSize = value === "all" ? "all" : Number(value);
              setPageSize(newSize);
              localStorage.setItem("pageSize", value);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-full sm:w-[100px] bg-slate-200">
              <SelectValue placeholder="Per Hal." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
              <SelectItem value="all">Semua</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-md border bg-slate-200 dark:bg-slate-800">
          {loading ? (
            <div className="flex p-4 justify-center">
              <Loader2Icon className="animate-spin" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    <TableHead>No</TableHead>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {(currentPage - 1) *
                          (pageSize === "all"
                            ? filteredData.length
                            : pageSize) +
                          index +
                          1}
                      </TableCell>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length + 1}
                      className="h-24 text-center"
                    >
                      Tidak ada data
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>

        {/* Pagination */}
        {pageSize !== "all" && (
          <div className="items-end mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      onClick={() => setCurrentPage(i + 1)}
                      isActive={currentPage === i + 1}
                      className={
                        currentPage === i + 1
                          ? "bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900"
                          : ""
                      }
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </Card>
    </div>
  );
}
