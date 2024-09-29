"use client";
import { Modal } from "@/app/components/Modal";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { useStore } from "@/app/store";
import { DateFormat } from "@/app/utils/DateFormat";
import { maskCPF, maskDate } from "@/app/utils/Masks";
import {
  EditStudents,
  editStudentsSchema,
} from "@/app/utils/schemas/EditStudents";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateStudentAction } from "./actions/updateStudent";
import { Student } from "@/app/utils/types/student";
import { parse } from "date-fns";

export function ModalStudentsForm() {
  const { isOpen, setIsOpen, objectStructure } = useStore((state) => state);
  const student = objectStructure as Student;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditStudents>({
    defaultValues: {
      name: student.name,
      birthDate: DateFormat(student.birthDate),
      responsibleemail1: student.responsibleemail1,
      responsibleemail2: student.responsibleemail2,
      nationalId: student.nationalId,
    },
    resolver: zodResolver(editStudentsSchema),
  });

  const onSubmit: SubmitHandler<EditStudents> = async (data) => {
    console.log(data);
    const updatedData = {
      ...data,
      birthDate: parse(data.birthDate, "dd/MM/yyyy", new Date()).toISOString(),
    };
    await updateStudentAction(student.id, updatedData);
    setIsOpen(false);
  };
  return (
    <Modal title="Editar aluno(a)" isOpen={isOpen} setIsOpen={setIsOpen}>
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
              label="Email 1"
              register={register}
              name="responsibleemail1"
              error={errors.responsibleemail1?.message}
              setValue={setValue}
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
          <div className="md:w-6/12 px-4 mb-8">
            <Input
              placeholder="abc@email.com"
              label="Email 2"
              register={register}
              name="responsibleemail2"
              setValue={setValue}
              error={errors.responsibleemail2?.message}
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
