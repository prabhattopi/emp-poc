// frontend/src/components/header.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ChevronDown, ChevronRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// --- Mock Data for Menus ---
const horizontalItems = [
  { label: "Dashboard", href: "/" },
  { label: "Employees", href: "/" },
  { label: "Reports", href: "#" },
  { label: "Settings", href: "#" },
];

const hamburgerItems = [
  { label: "Home", href: "/" },
  {
    label: "HR Management",
    submenu: [
      { label: "All Employees", href: "/" },
      { label: "Attendance", href: "#" },
      { label: "Payroll", href: "#" },
    ],
  },
  {
    label: "Company",
    submenu: [
      { label: "Policies", href: "#" },
      { label: "Events", href: "#" },
    ],
  },
  { label: "Support", href: "#" },
];

export function Header() {
  return (
    <header className="border-b bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center gap-4">
          <HamburgerMenu />
          <div className="font-bold text-xl tracking-tight text-blue-600">
            Portal<span className="text-gray-800">POC</span>
          </div>
        </div>

        {/* Center: Horizontal Menu (Hidden on mobile) */}
        <nav className="hidden md:flex items-center gap-6">
          {horizontalItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right: User Profile Placeholder */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
      </div>
    </header>
  );
}

// --- Sub-Component: The Hamburger Drawer ---
function HamburgerMenu() {
  // State to track open sub-menus
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const toggleSubMenu = (label: string) => {
    setOpenSubMenu(openSubMenu === label ? null : label);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="-ml-2">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px]">
        <SheetHeader>
          <SheetTitle className="text-left text-xl font-bold">Menu</SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 flex flex-col gap-1">
          {hamburgerItems.map((item) => (
            <div key={item.label}>
              {/* If item has no submenu, just render a link */}
              {!item.submenu ? (
                <Button
                  variant="ghost"
                  asChild
                  className="w-full justify-start text-base font-normal"
                >
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              ) : (
                /* If item has submenu, render standard accordion logic */
                <>
                  <Button
                    variant="ghost"
                    onClick={() => toggleSubMenu(item.label)}
                    className="w-full justify-between text-base font-normal hover:bg-gray-100"
                  >
                    {item.label}
                    {openSubMenu === item.label ? (
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                  
                  {/* Sub-menu Items */}
                  {openSubMenu === item.label && (
                    <div className="ml-4 flex flex-col border-l border-gray-200 pl-2">
                      {item.submenu.map((sub) => (
                        <Button
                          key={sub.label}
                          variant="ghost"
                          asChild
                          className="w-full justify-start text-sm text-gray-600 h-9"
                        >
                          <Link href={sub.href}>{sub.label}</Link>
                        </Button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}