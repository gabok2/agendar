"use client";
import { Modal } from "@/app/components/Modal";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { useStore } from "@/app/store";
import {
  EditStudents,
  editStudentsSchema,
} from "@/app/utils/schemas/EditStudents";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface ModalStudentsProps {
  readonly name: string;
  readonly birthDate: string;
  readonly responsibleemail1: string;
  readonly responsibleemail2: string;
  readonly nationalId: string;
}

export function ModalStudents() {
  const { isOpen, setIsOpen, objectStructure } = useStore((state) => state);
  console.log(objectStructure);
  console.log("teste");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditStudents>({
    defaultValues: {
      name: objectStructure.name,
      birthDate: objectStructure.birthDate,
      emailResponsible1: objectStructure.responsibleemail1,
      emailResponsible2: objectStructure.responsibleemail2,
      nationalId: objectStructure.nationalId,
    },
    resolver: zodResolver(editStudentsSchema),
  });

  useEffect(() => {
    if (isOpen) {
      setValue("name", objectStructure.name);
      setValue("birthDate", objectStructure.birthDate);
      setValue("emailResponsible1", objectStructure.responsibleemail1);
      setValue("emailResponsible2", objectStructure.responsibleemail2);
      setValue("nationalId", objectStructure.nationalId);
    }
  }, [isOpen, objectStructure, setValue]);
  const onSubmit: SubmitHandler<EditStudents> = async (data) => {
    console.log(data);
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
            />
          </div>
          <div className="w-full md:w-6/12 px-4 mb-8">
            <Input
              type="date"
              label="Data de nascimento"
              register={register}
              name="birthDate"
              error={errors.birthDate?.message}
            />
          </div>
          <div className="md:w-6/12 px-4 mb-8">
            <Input
              placeholder="abc@email.com"
              label="Email 1"
              register={register}
              name="emailResponsible2"
              error={errors.emailResponsible2?.message}
            />
          </div>
          <div className="md:w-6/12 px-4 mb-8">
            <Input
              placeholder="Digite o CPF do aluno"
              label="CPF"
              register={register}
              name="nationalId"
              error={errors.nationalId?.message}
            />
          </div>
          <div className="md:w-6/12 px-4 mb-8">
            <Input
              placeholder="abc@email.com"
              label="Email 2"
              register={register}
              name="emailResponsible2"
              error={errors.emailResponsible2?.message}
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
