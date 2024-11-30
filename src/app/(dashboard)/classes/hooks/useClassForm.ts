import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IClass } from "../interfaces/class";
import { EditClass, editClassSchema } from "@/app/utils/schemas/EditClass";
import { updateClassAction } from "../actions/classStudentsActions";

interface UseClassFormProps {
  classItem: IClass;
  setIsOpen: (isOpen: boolean) => void;
}

export function useClassForm({ classItem, setIsOpen }: UseClassFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<EditClass>({
    defaultValues: {
      name: classItem.name,
      head_teacher:
        typeof classItem.head_teacher === "object"
          ? classItem.head_teacher.name
          : classItem.head_teacher,
      assistant:
        typeof classItem.assistant === "object"
          ? classItem.assistant.name
          : classItem.assistant,
      shift: Number(classItem.statusShift),
      status: Number(classItem.status),
    },
    resolver: zodResolver(editClassSchema),
  });

  let studentsIds = [] as string[];

  const onSubmit = async (data: EditClass) => {
    const updatedData = {
      statusShift: data.shift,
      name: data.name,
      status: data.status,
      headTeacherName: data.head_teacher,
      assistantName: data.assistant,
      headTeacherId: classItem.head_teacher_id,
      assistantId: classItem.assistant_id,
      studentsIds: studentsIds,
    };

    await updateClassAction(classItem.class_id.toString(), updatedData);
    setIsOpen(false);
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    setValue,
    errors,
    control,
    studentsIds,
  };
}
