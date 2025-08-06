import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Tombol from "./pages/Tombol";
import Login from "./pages/Login";
import Register from "./pages/Register";
import General from "./pages/table/General";
import DataTable from "./pages/table/DataTable";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  // Jika halaman login, tampilkan layout khusus
  if (location.pathname === "/login") {
    return (
      <div className="h-screen flex items-center justify-center bg-neutral-200 dark:bg-gray-900">
        <Login />
      </div>
    );
  }
  if (location.pathname === "/register") {
    return (
      <div className="h-screen flex items-center justify-center bg-neutral-200 dark:bg-gray-900">
        <Register />
      </div>
    );
  }

  // Layout utama untuk semua halaman selain login
  return (
    <div className="flex h-screen">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        <main className="h-full p-4 overflow-auto bg-neutral-100 text-gray-900 dark:bg-gray-900 dark:text-white">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tombol" element={<Tombol />} />
            <Route path="/table/general" element={<General />} />
            <Route path="/table/datatable" element={<DataTable />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
