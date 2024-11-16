import { useMemo } from "react";
import { IStudent } from "../../students/interfaces/student";

function useFilteredStudents(students: IStudent[], search: string): IStudent[] {
  return useMemo(() => {
    return students.filter((student) =>
      student.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [students, search]);
}

export default useFilteredStudents;
