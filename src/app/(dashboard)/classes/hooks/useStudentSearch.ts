import { useState } from "react";

import useFilteredStudents from "@/app/(dashboard)/classes/hooks/useFilteredStudents";
import { IStudent } from "../../students/interfaces/student";
import useDebounce from "./useDebounce";

function useStudentSearch(students: IStudent[]): {
  filteredStudents: IStudent[];
  setSearch: (search: string) => void;
  search: string;
} {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const filteredStudents = useFilteredStudents(students, debouncedSearch);

  return {
    filteredStudents,
    setSearch,
    search,
  };
}

export default useStudentSearch;
