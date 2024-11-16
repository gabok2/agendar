import { useEffect, useState } from "react";
import { fetchClassStudents } from "../actions/classStudentsActions";
import { IClass } from "../interfaces/class";
import { IStudent } from "../../students/interfaces/student";

export function useFetchStudentData(classItem: IClass, isOpen: boolean) {
  const [students, setStudents] = useState<IStudent[]>([]);

  useEffect(() => {
    async function loadStudents() {
      const fetchedStudents = await fetchClassStudents(classItem.class_id);
      setStudents(fetchedStudents);
    }

    if (isOpen) {
      loadStudents();
    }
  }, [isOpen, classItem.id]);

  return students;
}
