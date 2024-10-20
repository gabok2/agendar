import { Modal } from "@/app/components/Modal";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { InputSelect } from "@/app/components/ui/InputSelect";
import { useStore } from "@/app/store";
import { maskCPF, maskDate } from "@/app/utils/Masks";
import { StatusEnumTeacherProps } from "@/app/utils/types/statusTeacher";
import { useTeacherForm } from "../hooks/useTeacherForm";
import { ITeacher } from "../interfaces/Teacher";

interface ModalTeachersFormProps {
  readonly teachersStatus: StatusEnumTeacherProps[];
}

export function ModalTeachersForm({ teachersStatus }: ModalTeachersFormProps) {
  const { isOpen, setIsOpen, objectStructure } = useStore((state) => state);
  const teacher = objectStructure as ITeacher;
  const { control, errors, handleSubmit, register, setValue } = useTeacherForm({
    teacher,
    teachersStatus,
    setIsOpen,
  });

  return (
    <Modal title="Editar Professor(a)" isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={handleSubmit} className="flex flex-col w-full">
        <div className="flex flex-wrap -mx-4">
          <Input
            label="Nome"
            name="name"
            placeholder="Digite o nome do professor"
            register={register}
            error={errors.name?.message}
            setValue={setValue}
          />
          <Input
            label="Data de nascimento"
            name="birthDate"
            register={register}
            error={errors.birthDate?.message}
            setValue={setValue}
            inputMask={maskDate}
          />
          <Input
            label="Email"
            name="email"
            placeholder="abc@email.com"
            register={register}
            error={errors.email?.message}
            setValue={setValue}
          />
          <Input
            label="Formação"
            name="academic"
            placeholder="Formação acadêmica"
            register={register}
            error={errors.academic?.message}
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
          <Input
            label="CPF"
            name="nationalId"
            placeholder="Digite o CPF do professor"
            register={register}
            error={errors.nationalId?.message}
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
