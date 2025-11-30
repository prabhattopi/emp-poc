"use client";

import { MoreHorizontal, Edit, Flag, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Employee {
  id: string;
  name: string;
  class: string;
  attendance: number;
}

interface Props {
  data: Employee;
  onClick: () => void;
}

export function EmployeeTile({ data, onClick }: Props) {
  return (
    <Card 
      className="hover:shadow-lg transition-shadow cursor-pointer relative group" 
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-bold">{data.name}</CardTitle>
        
        {/* The "Bun Button" (StopPropagation needed so clicking it doesn't open the detail view) */}
        <div onClick={(e) => e.stopPropagation()}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => console.log("Edit", data.id)}>
                <Edit className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log("Flag", data.id)}>
                <Flag className="mr-2 h-4 w-4" /> Flag
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log("Delete", data.id)} className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="text-sm text-gray-500">
          <p>Class: <span className="font-medium text-gray-900">{data.class}</span></p>
          <p>Attendance: <span className={`font-medium ${data.attendance < 75 ? 'text-red-500' : 'text-green-600'}`}>
            {data.attendance}%
          </span></p>
        </div>
      </CardContent>
    </Card>
  );
}