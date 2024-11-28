import React from "react";
import { Typography } from "@/app/components/ui/Typography";
import Loading from "@/app/components/Loading";

interface StudentListProps {
  isLoading: boolean;
  students: Array<{ id: string; name: string }>;
}

export const StudentList = ({ isLoading, students }: StudentListProps) => {
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full  space-y-4 ">
      {students.map((student) => (
        <div key={student.id}>
          <Typography color="text-gray-400" fontWeight="regular" variant="body">
            {student.name}
          </Typography>
          <div className="flex flex-row items-center justify-between">
            <Typography color="text-black" fontWeight="medium" variant="base">
              Matrícula: {student.id}
            </Typography>
            <p className="text-cancel font-medium cursor-pointer">Retirar</p>
          </div>
        </div>
      ))}
    </div>
  );
};
