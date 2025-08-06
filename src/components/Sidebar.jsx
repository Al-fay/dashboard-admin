import {
  X,
  LayoutDashboard,
  Users as UsersIcon,
  ChevronDown,
  ChevronRight,
  FilePlus,
  ClipboardList,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Sidebar({ isOpen, onClose }) {
  const [formsOpen, setFormsOpen] = useState(false);

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
            to="/users"
            className="flex items-center px-2 py-1 rounded text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <UsersIcon className="w-4 h-4 mr-2" />
            Users
          </Link>

          {/* Dropdown: Forms */}
          <button
            onClick={() => setFormsOpen(!formsOpen)}
            className="flex items-center justify-between w-full px-2 py-1 rounded text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <div className="flex items-center">
              <ClipboardList className="w-4 h-4 mr-2" />
              Forms
            </div>
            {formsOpen ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>

          {formsOpen && (
            <div className="ml-6 mt-1 space-y-1">
              <Link
                to="/forms/create"
                className="flex items-center px-2 py-1 rounded text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <FilePlus className="w-4 h-4 mr-2" />
                Create Form
              </Link>
              {/* Tambahkan submenu lainnya di sini */}
            </div>
          )}
        </nav>
      </div>
    </>
  );
}
