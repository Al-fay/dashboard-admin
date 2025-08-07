"use client";

import React, { useState, useMemo } from "react";
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
import { ArrowUpDown } from "lucide-react";
import { Card } from "@/components/ui/card";

// Dummy data
const rawData = [
  { id: 1, name: "Budi", email: "budi@example.com", role: "Admin" },
  { id: 2, name: "Sari", email: "sari@example.com", role: "User" },
  { id: 3, name: "Tono", email: "tono@example.com", role: "Editor" },
  { id: 4, name: "Ayu", email: "ayu@example.com", role: "User" },
];

// Kolom definisi
const columnHelper = createColumnHelper();

const columns = [
  // columnHelper.accessor("id", {
  //   header: "ID",
  //   cell: (info) => info.getValue(),
  // }),
  columnHelper.accessor("name", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nama
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("role", {
    header: "Role",
    cell: (info) => info.getValue(),
  }),
];

export default function DataTable() {
  useState(() => {
    document.title = "Datatable";
  }, []);
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState(""); // Filter khusus kolom Role

  // Filter data berdasarkan global search + role
  const filteredData = useMemo(() => {
    return rawData.filter((item) => {
      const matchesSearch = Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(globalFilter.toLowerCase());

      const matchesRole =
        roleFilter === "all" || roleFilter === ""
          ? true
          : item.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [globalFilter, roleFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="container mx-auto py-3">
      <h1 className="text-2xl font-bold mb-4">Tabel Pengguna</h1>

      <Card className="p-5">
        {/* Filter Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
          <Input
            placeholder="Cari semua kolom..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="max-w-sm bg-slate-200"
          />

          <Select
            onValueChange={(value) => setRoleFilter(value)}
            value={roleFilter}
          >
            <SelectTrigger className="w-[125px] bg-slate-200">
              <SelectValue placeholder="Filter Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Role</SelectItem>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="User">User</SelectItem>
              <SelectItem value="Editor">Editor</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  <TableHead>No</TableHead> {/* Kolom nomor urut manual */}
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
                    <TableCell>{index + 1}</TableCell> {/* Nomor urut */}
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
                    colSpan={columns.length + 1} // +1 untuk kolom 'No'
                    className="h-24 text-center"
                  >
                    Tidak ada data
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
