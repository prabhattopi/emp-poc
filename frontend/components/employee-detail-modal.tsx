"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface Employee {
  id: string;
  name: string;
  age: number;
  class: string;
  subjects: string[];
  attendance: number;
}

interface Props {
  employee: Employee | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EmployeeDetailModal({ employee, isOpen, onClose }: Props) {
  if (!employee) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{employee.name}</DialogTitle>
          <DialogDescription>Employee ID: {employee.id}</DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <h4 className="text-sm font-medium leading-none text-gray-500">Class/Department</h4>
              <p className="text-base font-semibold">{employee.class}</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium leading-none text-gray-500">Age</h4>
              <p className="text-base font-semibold">{employee.age}</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium leading-none text-gray-500">Attendance</h4>
              <p className="text-base font-semibold text-blue-600">{employee.attendance}%</p>
            </div>
          </div>
          
          <div className="space-y-2 pt-2 border-t">
            <h4 className="text-sm font-medium leading-none text-gray-500">Subjects / Skills</h4>
            <div className="flex flex-wrap gap-2">
              {employee.subjects.map((sub) => (
                <span key={sub} className="px-2 py-1 bg-gray-100 rounded-md text-sm text-gray-700">
                  {sub}
                </span>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}