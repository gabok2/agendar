import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TeacherEdit,
  teacherEditSchema,
} from "@/app/utils/schemas/TeacherEdit";
import { FormatDate } from "@/app/utils/DateFormat";
import { ITeacher } from "../interfaces/Teacher";
import { parse } from "date-fns";
import { useCallback } from "react";
import { updateTeacherAction } from "../components/actions/updateTeacher";
import { StatusEnumTeacherProps } from "@/app/utils/types/statusTeacher";

interface UseTeacherFormProps {
  teacher: ITeacher;
  teachersStatus: StatusEnumTeacherProps[];
  setIsOpen: (value: boolean) => void;
}

export function useTeacherForm({
  teacher,
  teachersStatus,
  setIsOpen,
}: UseTeacherFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<TeacherEdit>({
    defaultValues: {
      name: teacher.name,
      birthDate: FormatDate(teacher.birthDate),
      email: teacher.email,
      nationalId: teacher.nationalId,
      academic: teacher.academic,
      statusEnum: teachersStatus[0].id,
    },
    resolver: zodResolver(teacherEditSchema),
  });

  const onSubmit = useCallback(
    async (data: TeacherEdit) => {
      const updatedData = {
        academic: data.academic,
        email: data.email,
        name: data.name,
        nationalId: data.nationalId,
        status_teacher: data.statusEnum,
        birthDate: parse(
          data.birthDate,
          "dd/MM/yyyy",
          new Date()
        ).toISOString(),
      };
      await updateTeacherAction(teacher.id, updatedData);
      setIsOpen(false);
    },
    [teacher.id, setIsOpen]
  );

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    setValue,
    control,
    errors,
  };
}
