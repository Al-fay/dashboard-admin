import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LaptopMinimal } from "lucide-react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  useEffect(() => {
    document.title = "Register";
  }, []);

  return (
    <Card className="w-full max-w-sm dark:bg-gray-700">
      <CardHeader>
        <div className="flex justify-center">
          <LaptopMinimal className="dark:text-white" size={50} />
        </div>
        <CardTitle className="text-4xl text-center dark:text-white">
          Register
        </CardTitle>
        <CardDescription className="text-md text-center dark:text-white">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email" className="dark:text-white">
                E-mail
              </Label>
              <Input
                className="bg-slate-200"
                type="email"
                id="email"
                name="email"
                placeholder="Email"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="dark:text-white">
                Password
              </Label>
              <Input
                className="outline-black bg-slate-200"
                type="password"
                id="password"
                name="password"
                placeholder="Password"
              />
            </div>

            <div>
              <Link to="/login">
                <Button className="w-full">Register</Button>
              </Link>
            </div>
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex-col gap-2">
        <CardAction>
          <p className="dark:text-white">
            Sudah punya akun? silahkan{" "}
            <span>
              <Link to="/login" className="text-blue-900 dark:text-blue-400">
                Login
              </Link>
            </span>
          </p>
        </CardAction>
      </CardFooter>
    </Card>
  );
}
