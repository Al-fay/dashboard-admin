import { useEffect } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  ChevronRightIcon,
  Loader2Icon,
  Plus,
} from "lucide-react";

export default function Tombol() {
  useEffect(() => {
    document.title = "Daftar Tombol";
  }, []);

  return (
    <div>
      <h1 className="text-5xl font-bold text-gray-800 dark:text-white">
        Tombol
      </h1>

      <div className="mt-5 gap-4 grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3">
        <Card>
          <CardTitle>Tombol Normal</CardTitle>
          <CardContent>
            <Button>Default</Button>
          </CardContent>
        </Card>
        <Card>
          <CardTitle>Tombol Secondary</CardTitle>
          <CardContent>
            <Button variant="secondary">Secondary</Button>
          </CardContent>
        </Card>
        <Card>
          <CardTitle>Tombol Destructive</CardTitle>
          <CardContent>
            <Button variant="destructive">Destructive</Button>
          </CardContent>
        </Card>
        <Card>
          <CardTitle>Tombol Outline</CardTitle>
          <CardContent>
            <Button variant="outline">Outline</Button>
          </CardContent>
        </Card>
        <Card>
          <CardTitle>Tombol Ghost</CardTitle>
          <CardContent>
            <Button variant="ghost">Ghost</Button>
          </CardContent>
        </Card>
        <Card>
          <CardTitle>Tombol Link</CardTitle>
          <CardContent>
            <Button variant="link">Link</Button>
          </CardContent>
        </Card>
        <Card>
          <CardTitle>Tombol Icon</CardTitle>
          <CardContent>
            <Button variant="secondary" size="icon" className="size-8">
              <ChevronRightIcon />
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardTitle>Tombol With Icon</CardTitle>
          <CardContent>
            <Button variant="outline" size="sm">
              <Plus /> Buat Baru
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardTitle>Tombol Loading</CardTitle>
          <CardContent>
            <Button size="sm" disabled>
              <Loader2Icon className="animate-spin" />
              Please wait
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
