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

interface ModalTeachersFormProps {
  readonly teachersStatus: StatusEnumTeacherProps[];
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
          <div className="w-full md:w-6/12 px-4 mb-8">
            <Input
              placeholder="Digite o nome do aluno"
              label="Nome"
              register={register}
              name="name"
              error={errors.name?.message}
              setValue={setValue}
            />
          </div>
          <div className="w-full md:w-6/12 px-4 mb-8">
            <Input
              label="Data de nascimento"
              register={register}
              name="birthDate"
              inputMask={maskDate}
              error={errors.birthDate?.message}
              setValue={setValue}
            />
          </div>
          <div className="md:w-6/12 px-4 mb-8">
            <Input
              placeholder="abc@email.com"
              label="Email"
              register={register}
              name="email"
              error={errors.email?.message}
              setValue={setValue}
            />
          </div>
          <div className="md:w-6/12 px-4 mb-8">
            <Input
              placeholder="Formação acadêmica"
              label="Formação"
              register={register}
              name="academic"
              error={errors.email?.message}
              setValue={setValue}
            />
          </div>
          <div className="md:w-6/12 px-4 mb-8">
            <InputSelect
              label="Tipo de Professor"
              name="statusEnum"
              arrayItens={teachersStatus}
              control={control}
            />
          </div>
          <div className="md:w-6/12 px-4 mb-8">
            <Input
              placeholder="Digite o CPF do aluno"
              label="CPF"
              register={register}
              name="nationalId"
              error={errors.nationalId?.message}
              setValue={setValue}
              inputMask={maskCPF}
            />
          </div>
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
