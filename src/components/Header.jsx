import { Menu, Moon, Sun, Settings, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useState, useEffect } from "react";

export default function Header({ toggleSidebar }) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <header className="flex items-center px-4 py-2 bg-fuchsia-50 dark:bg-gray-800 shadow">
      {/* Left: Hamburger (mobile only) */}
      <button className="md:hidden" onClick={toggleSidebar}>
        <Menu className="w-6 h-6 text-gray-800 dark:text-white" />
      </button>

      {/* Right: Avatar (gunakan ml-auto untuk dorong ke kanan) */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer ml-auto">
            <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48" align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={toggleTheme}>
            {theme === "dark" ? (
              <>
                <Sun className="w-4 h-4 mr-2" />
                Light Mode
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 mr-2" />
                Dark Mode
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
