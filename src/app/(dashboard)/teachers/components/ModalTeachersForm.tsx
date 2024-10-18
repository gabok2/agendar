import { Modal } from "@/app/components/Modal";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { InputSelect } from "@/app/components/ui/InputSelect";

import { useStore } from "@/app/store";
import { DateFormat } from "@/app/utils/dateFormat";
import { maskCPF, maskDate } from "@/app/utils/Masks";
import {
  TeacherEdit,
  teacherEditSchema,
} from "@/app/utils/schemas/TeacherEdit";
import { StatusEnumTeacherProps } from "@/app/utils/types/statusTeacher";
import { Teacher } from "@/app/utils/types/teacher";
import { zodResolver } from "@hookform/resolvers/zod";
import { parse } from "date-fns";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateTeacherAction } from "./actions/updateTeacher";
import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";

interface ModalTeachersFormProps {
  readonly teachersStatus: StatusEnumTeacherProps[];
}

interface FormFieldProps {
  label: string;
  name: keyof TeacherEdit;
  placeholder?: string;
  register: UseFormRegister<TeacherEdit>;
  errors: FieldErrors<TeacherEdit>;
  setValue: UseFormSetValue<TeacherEdit>;
  inputMask?: (value: string) => string;
}

function FormField({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
  inputMask,
}: FormFieldProps) {
  return (
    <div className="w-full md:w-6/12 px-4 mb-8">
      <Input
        label={label}
        placeholder={placeholder}
        register={register}
        name={name}
        error={errors[name]?.message}
        setValue={setValue}
        inputMask={inputMask}
      />
    </div>
  );
}

export function ModalTeachersForm({ teachersStatus }: ModalTeachersFormProps) {
  const { isOpen, setIsOpen, objectStructure } = useStore((state) => state);
  const teacher = objectStructure as Teacher;

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<TeacherEdit>({
    defaultValues: {
      name: teacher.name,
      birthDate: DateFormat(teacher.birthDate),
      email: teacher.email,
      nationalId: teacher.nationalId,
      academic: teacher.academic,
      statusEnum: teacher.status_teacher,
    },
    resolver: zodResolver(teacherEditSchema),
  });

  const onSubmit: SubmitHandler<TeacherEdit> = async (data) => {
    const updatedData = {
      academic: data.academic,
      email: data.email,
      name: data.name,
      nationalId: data.nationalId,
      status_teacher: data.statusEnum,
      birthDate: parse(data.birthDate, "dd/MM/yyyy", new Date()).toISOString(),
    };

    await updateTeacherAction(teacher.id, updatedData);
    setIsOpen(false);
  };
  return (
    <Modal title="Editar Professor(a)" isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
        <div className="flex flex-wrap -mx-4">
          <FormField
            label="Nome"
            name="name"
            placeholder="Digite o nome do professor"
            register={register}
            errors={errors}
            setValue={setValue}
          />
          <FormField
            label="Data de nascimento"
            name="birthDate"
            register={register}
            errors={errors}
            setValue={setValue}
            inputMask={maskDate}
          />
          <FormField
            label="Email"
            name="email"
            placeholder="abc@email.com"
            register={register}
            errors={errors}
            setValue={setValue}
          />
          <FormField
            label="Formação"
            name="academic"
            placeholder="Formação acadêmica"
            register={register}
            errors={errors}
            setValue={setValue}
          />
          <div className="md:w-6/12 px-4 mb-8">
            <InputSelect
              label="Tipo de Professor"
              name="statusEnum"
              arrayItens={teachersStatus}
              control={control}
            />
          </div>
          <FormField
            label="CPF"
            name="nationalId"
            placeholder="Digite o CPF do professor"
            register={register}
            errors={errors}
            setValue={setValue}
            inputMask={maskCPF}
          />
        </div>
        <div className="flex justify-end space-x-8">
          <Button
            color="blue"
            variant="outlined"
            onClick={() => setIsOpen(false)}
          >
            Cancelar
          </Button>
          <Button color="blue" variant="filled" type="submit">
            Atualizar
          </Button>
        </div>
      </form>
    </Modal>
  );
}
