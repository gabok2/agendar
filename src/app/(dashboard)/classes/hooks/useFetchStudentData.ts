import { useEffect, useState } from "react";
import { fetchClassStudents } from "../actions/classStudentsActions";
import { IClass } from "../interfaces/class";
import { IStudent } from "../../students/interfaces/student";

export function useFetchStudentData(classItem: IClass) {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadStudents() {
      setIsLoading(true);
      const fetchedStudents = await fetchClassStudents(classItem.class_id);
      setStudents(fetchedStudents);
      setIsLoading(false);
    }

    loadStudents();
  }, [classItem.id]);

  return { students, isLoading };
}
