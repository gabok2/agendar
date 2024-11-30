import React, { useState, useEffect } from "react";
import { Typography } from "@/app/components/ui/Typography";
import Loading from "@/app/components/Loading";
import Image from "next/image";

interface StudentListProps {
  isLoading: boolean;
  students: Array<{ id: string; name: string }>;
  studentsIds: string[];
}

export const StudentList = ({
  isLoading,
  students,
  studentsIds,
}: StudentListProps) => {
  const [studentsList, setStudentsList] = useState(students);

  useEffect(() => {
    setStudentsList(students);
  }, [students]);

  if (isLoading) {
    return <Loading />;
  }

  const handleRemoveStudent = (id: string) => {
    setStudentsList(studentsList.filter((student) => student.id !== id));
    studentsIds.push(id);
  };

  return (
    <div className="w-full space-y-4">
      {studentsList.length > 0 && (
        <>
          {studentsList.map((student) => (
            <div key={student.id}>
              <Typography
                color="text-gray-400"
                fontWeight="regular"
                variant="body"
              >
                {student.name}
              </Typography>
              <div className="flex flex-row items-center justify-between">
                <Typography
                  color="text-black"
                  fontWeight="medium"
                  variant="base"
                >
                  Matrícula: {student.id}
                </Typography>
                <button onClick={() => handleRemoveStudent(student.id)}>
                  <p className="text-cancel font-medium cursor-pointer">
                    Retirar
                  </p>
                </button>
              </div>
            </div>
          ))}
        </>
      )}
      {studentsList.length === 0 && (
        <div className="flex flex-col items-center pt-10 h-full">
          <Image
            src="grupStudents.svg"
            alt="grupStudents"
            width={100}
            height={100}
          />
          <Typography
            className="pt-10"
            color="text-black"
            fontWeight="medium"
            variant="h2"
          >
            Nenhum aluno
          </Typography>
          <Typography
            className="pt-3 text-center"
            color="text-gray-400"
            fontWeight="regular"
            variant="base"
          >
            cadastre alunos na opção de alunos no menu
          </Typography>
        </div>
      )}
    </div>
  );
};
