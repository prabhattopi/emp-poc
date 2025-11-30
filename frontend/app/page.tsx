"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { LayoutGrid, List, ChevronLeft, ChevronRight, Search, ArrowUpDown } from "lucide-react";
import { GET_EMPLOYEES } from "@/lib/queries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EmployeeTile } from "@/components/employee-tile";
import { EmployeeGrid } from "@/components/employee-grid";
import { EmployeeDetailModal } from "@/components/employee-detail-modal";
import { Skeleton } from "@/components/ui/skeleton";

// --- Types ---
interface Employee {
  id: string;
  name: string;
  age: number;
  class: string;
  subjects: string[];
  attendance: number;
}

interface GetEmployeesData {
  getEmployees: {
    nodes: Employee[];
    totalCount: number;
    hasNextPage: boolean;
  };
}

const ITEMS_PER_PAGE = 8;

export default function Home() {
  // UI State
  const [viewMode, setViewMode] = useState<"grid" | "tile">("tile");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  
  // Data State
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{ field: string; direction: "ASC" | "DESC" } | null>(null);

  // Debounce search (optional optimization, basic here)
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to page 1 on search
  };

  // Fetch Data
  const { loading, error, data } = useQuery<GetEmployeesData>(GET_EMPLOYEES, {
    variables: { 
      page: currentPage, 
      limit: ITEMS_PER_PAGE,
      filter: searchTerm ? { nameContains: searchTerm } : undefined,
      sort: sortConfig
    },
    fetchPolicy: "cache-and-network", // Ensure fresh data on sort/filter
  });

  const employees = data?.getEmployees?.nodes || [];
  const totalCount = data?.getEmployees?.totalCount || 0;
  const hasNextPage = data?.getEmployees?.hasNextPage || false;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  // Stats Calculation
  const averageAttendance = employees.length 
    ? (employees.reduce((acc, curr) => acc + curr.attendance, 0) / employees.length).toFixed(1) 
    : 0;
  const activeCount = employees.filter((e) => e.attendance > 85).length;

  if (error) return <div className="p-8 text-red-500">Error: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      
      {/* 1. CREATIVITY: Stats Dashboard */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <div className="p-6 bg-white rounded-xl border shadow-sm flex flex-col">
          <span className="text-sm font-medium text-gray-500">Total Employees</span>
          <span className="text-3xl font-bold text-gray-900 mt-2">{totalCount}</span>
        </div>
        <div className="p-6 bg-white rounded-xl border shadow-sm flex flex-col">
          <span className="text-sm font-medium text-gray-500">Avg. Attendance</span>
          <span className="text-3xl font-bold text-gray-900 mt-2">{averageAttendance}%</span>
        </div>
        <div className="p-6 bg-white rounded-xl border shadow-sm flex flex-col">
            <span className="text-sm font-medium text-gray-500">Top Performers</span>
            <span className="text-3xl font-bold text-gray-900 mt-2">{activeCount}</span>
        </div>
      </div>

      {/* 2. Controls Bar: Search, Sort, View Toggle */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4 bg-white p-4 rounded-lg border shadow-sm">
        
        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input 
            placeholder="Search employees..." 
            className="pl-8" 
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowUpDown className="h-4 w-4" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortConfig({ field: "name", direction: "ASC" })}>
                Name (A-Z)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortConfig({ field: "attendance", direction: "DESC" })}>
                Attendance (High-Low)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortConfig({ field: "attendance", direction: "ASC" })}>
                Attendance (Low-High)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* View Toggle */}
         {/* View Toggle */}
         <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-md">
            <Button
              variant="ghost" // FIX: Use a valid variant (static)
              size="icon"
              // The className below handles the "white" active state
              className={`h-8 w-8 ${viewMode === "grid" ? "bg-white shadow-sm" : "text-gray-500"}`}
              onClick={() => setViewMode("grid")}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost" // FIX: Use a valid variant (static)
              size="icon"
              className={`h-8 w-8 ${viewMode === "tile" ? "bg-white shadow-sm" : "text-gray-500"}`}
              onClick={() => setViewMode("tile")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* 3. Main Content Area */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full" />
          ))}
        </div>
      ) : (
        <>
          {employees.length === 0 ? (
            <div className="text-center py-20 text-gray-500">No employees found matching your criteria.</div>
          ) : viewMode === "tile" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {employees.map((emp) => (
                <EmployeeTile 
                  key={emp.id} 
                  data={emp} 
                  onClick={() => setSelectedEmployee(emp)} 
                />
              ))}
            </div>
          ) : (
            <EmployeeGrid data={employees} />
          )}
          
          {/* Pagination Controls */}
          <div className="flex items-center justify-between mt-8 border-t pt-4">
            <Button 
              variant="outline" 
              onClick={() => setCurrentPage(p => p - 1)} 
              disabled={currentPage === 1 || loading}
            >
              <ChevronLeft className="h-4 w-4 mr-2" /> Previous
            </Button>
            
            <span className="text-sm font-medium text-gray-600">
              Page {currentPage} of {totalPages || 1}
            </span>

            <Button 
              variant="outline" 
              onClick={() => setCurrentPage(p => p + 1)} 
              disabled={!hasNextPage || loading}
            >
              Next <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </>
      )}

      {/* Detail Modal */}
      <EmployeeDetailModal
        isOpen={!!selectedEmployee}
        employee={selectedEmployee}
        onClose={() => setSelectedEmployee(null)}
      />
    </div>
  );
}