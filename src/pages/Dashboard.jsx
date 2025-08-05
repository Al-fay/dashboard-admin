import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect } from "react";

export default function Dashboard() {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  return (
    <div>
      <h1 className="text-5xl font-bold text-gray-800 dark:text-white">
        Dashboard
      </h1>
      <h3 className="mt-3 text-3xl text-gray-600 dark:text-gray-300">
        Welcome
      </h3>

      <div className="mt-3 gap-4 grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-md lg:text-2xl">Jumlah User</CardTitle>
            <CardDescription className="text-3xl text-end">5</CardDescription>
          </CardHeader>
        </Card>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-md lg:text-2xl">Jumlah User</CardTitle>
            <CardDescription className="text-3xl text-end">5</CardDescription>
          </CardHeader>
        </Card>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-md lg:text-2xl">Jumlah User</CardTitle>
            <CardDescription className="text-3xl text-end">5</CardDescription>
          </CardHeader>
        </Card>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-md lg:text-2xl">Jumlah User</CardTitle>
            <CardDescription className="text-3xl text-end">5</CardDescription>
          </CardHeader>
        </Card>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-md lg:text-2xl">Jumlah User</CardTitle>
            <CardDescription className="text-3xl text-end">5</CardDescription>
          </CardHeader>
        </Card>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-md lg:text-2xl">Jumlah User</CardTitle>
            <CardDescription className="text-3xl text-end">5</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
