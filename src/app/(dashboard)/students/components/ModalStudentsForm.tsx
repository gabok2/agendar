"use client";
import { Modal } from "@/app/components/Modal";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { useStore } from "@/app/store";
import { maskCPF, maskDate } from "@/app/utils/Masks";
import { useStudentForm } from "../hooks/useStudentForm";
import { IStudent } from "../interfaces/Student";

export function ModalStudentsForm() {
  const { isOpen, setIsOpen, objectStructure } = useStore((state) => state);
  const student = objectStructure as IStudent;
  const { register, handleSubmit, setValue, errors } = useStudentForm({
    student,
    setIsOpen,
  });

  return (
    <Modal title="Editar aluno(a)" isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={handleSubmit} className="flex flex-col w-full">
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
