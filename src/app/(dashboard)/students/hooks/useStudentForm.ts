import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  editStudentsSchema,
  EditStudents,
} from "@/app/utils/schemas/EditStudents";
import { FormatDate } from "@/app/utils/DateFormat";
import { parse } from "date-fns";
import { updateStudentAction } from "../components/actions/updateStudent";
import { IStudent } from "../interfaces/Student";

interface UseStudentFormProps {
  student: IStudent;
  setIsOpen: (value: boolean) => void;
}

export function useStudentForm({ student, setIsOpen }: UseStudentFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditStudents>({
    defaultValues: {
      name: student.name,
      birthDate: FormatDate(student.birthDate),
      responsibleemail1: student.responsibleemail1,
      responsibleemail2: student.responsibleemail2,
      nationalId: student.nationalId,
    },
    resolver: zodResolver(editStudentsSchema),
  });

  const onSubmit = async (data: EditStudents) => {
    const updatedData = {
      ...data,
      birthDate: parse(data.birthDate, "dd/MM/yyyy", new Date()).toISOString(),
    };
    await updateStudentAction(student.id, updatedData);
    setIsOpen(false);
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    setValue,
    errors,
  };
}
