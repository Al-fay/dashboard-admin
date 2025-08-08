import {
  X,
  LayoutDashboard,
  ChevronDown,
  ChevronRight,
  FilePlus,
  ClipboardList,
  Layout,
  Table,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Sidebar({ isOpen, onClose }) {
  const [tableOpen, setTableOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        ></div>
      )}

      <div
        className={`fixed z-50 md:static top-0 left-0 h-full w-64 bg-slate-50 dark:bg-gray-900 p-4 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            MyApp
          </h2>
          <button className="md:hidden" onClick={onClose}>
            <X className="w-6 h-6 text-gray-800 dark:text-white" />
          </button>
        </div>

        <nav className="space-y-2">
          <Link
            to="/"
            className="flex items-center px-2 py-1 rounded text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <LayoutDashboard className="w-4 h-4 mr-2" />
            Dashboard
          </Link>

          <Link
            to="/tombol"
            className="flex items-center px-2 py-1 rounded text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <Layout className="w-4 h-4 mr-2" />
            Button
          </Link>

          {/* Dropdown: Forms */}
          <button
            onClick={() => setTableOpen(!tableOpen)}
            className="flex items-center justify-between w-full px-2 py-1 rounded text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <div className="flex items-center">
              <ClipboardList className="w-4 h-4 mr-2" />
              Tables
            </div>
            {tableOpen ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>

          {tableOpen && (
            <div className="ml-6 mt-1 space-y-1">
              <Link
                to="/table/general"
                className="flex items-center px-2 py-1 rounded text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <FilePlus className="w-4 h-4 mr-2" />
                Table General
              </Link>
              <Link
                to="/table/datatable"
                className="flex items-center px-2 py-1 rounded text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Table className="w-4 h-4 mr-2" />
                Table Data
              </Link>
              {/* Tambahkan submenu lainnya di sini */}
            </div>
          )}
          {/* End Dropdown */}

          <Link
            to="/alert"
            className="flex items-center px-2 py-1 rounded text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <AlertCircle className="w-4 h-4 mr-2" />
            Alert
          </Link>
        </nav>
      </div>
    </>
  );
}
