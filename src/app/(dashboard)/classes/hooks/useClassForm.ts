import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IClass, IStatusClass, IStatusShift } from "../interfaces/class";
import { EditClass, editClassSchema } from "@/app/utils/schemas/EditClass";

interface UseClassFormProps {
  classItem: IClass;
}

export function useClassForm({ classItem }: UseClassFormProps) {
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

  const onSubmit = async (data: EditClass) => {
    const updatedData = {
      ...data,
    };
    // await updateClassAction(classItem.id, updatedData);
    // setIsOpen(false);
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    setValue,
    errors,
    control,
  };
}
