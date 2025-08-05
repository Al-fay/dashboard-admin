import { useEffect } from "react";

export default function Produk() {
  useEffect(() => {
    document.title = "Daftar Produk";
  }, []);

  return (
    <div>
      <h1 className="text-5xl font-bold text-gray-800 dark:text-white">
        Produk
      </h1>
      <p className="mt-3 text-gray-600 dark:text-gray-300">
        Daftar produk akan ditampilkan di sini.
      </p>
    </div>
  );
}
