// frontend/src/components/employee-grid.tsx
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Employee {
  id: string;
  name: string;
  age: number;
  class: string;
  subjects: string[];
  attendance: number;
}

interface Props {
  data: Employee[];
}

export function EmployeeGrid({ data }: Props) {
  return (
    <div className="rounded-md border bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead> {/* New */}
            <TableHead>Role</TableHead>  {/* New */}
            <TableHead>Phone</TableHead> {/* New */}
            <TableHead>Age</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Subjects</TableHead>
            <TableHead className="text-right">Attendance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((employee) => (
            <TableRow key={employee.id} className="hover:bg-gray-50 transition-colors">
              <TableCell className="font-mono text-xs text-gray-400">{employee.id.slice(0, 4)}...</TableCell>
              <TableCell className="font-medium text-gray-900">{employee.name}</TableCell>
              <TableCell className="text-gray-500 text-sm">{employee.name.toLowerCase().replace(" ", ".")}@company.com</TableCell>
              <TableCell className="text-gray-500 text-sm">Developer</TableCell>
              <TableCell className="text-gray-500 text-xs">+1 (555) 000-0000</TableCell>
              <TableCell>{employee.age}</TableCell>
              <TableCell>{employee.class}</TableCell>
              <TableCell>
                {employee.attendance > 85 ? (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200 shadow-none">Active</Badge>
                ) : (
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700">Review</Badge>
                )}
              </TableCell>
              <TableCell className="max-w-[150px] truncate text-xs text-gray-500" title={employee.subjects.join(", ")}>
                {employee.subjects.join(", ")}
              </TableCell>
              <TableCell className="text-right font-medium">
                <span className={employee.attendance < 75 ? "text-red-500" : "text-green-600"}>
                    {employee.attendance}%
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}