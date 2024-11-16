"use client";
import { Modal } from "@/app/components/Modal";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { useStore } from "@/app/store";
import { useClassForm } from "../hooks/useClassForm";
import { IClass } from "../interfaces/class";
import { IStatusClass, IStatusShift } from "../interfaces/class";
import { InputSelect } from "@/app/components/ui/InputSelect";
import { Typography } from "@/app/components/ui/Typography";
import { useFetchStudentData } from "../hooks/useFetchStudentData";
import FilterInput from "@/app/components/ui/FilterInput";
import useStudentSearch from "../hooks/useStudentSearch";

interface ModalClassFormProps {
  statusClass: IStatusClass[];
  statusShift: IStatusShift[];
}

export function ModalClassForm({
  statusClass,
  statusShift,
}: ModalClassFormProps) {
  const { isOpen, setIsOpen, objectStructure } = useStore((state) => state);
  const classItem = objectStructure as IClass;
  const { register, handleSubmit, setValue, errors, control } = useClassForm({
    classItem,
  });

  const students = useFetchStudentData(classItem, isOpen);
  const { filteredStudents, setSearch, search } = useStudentSearch(students);

  return (
    <Modal title="Editar aluno(a)" isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={handleSubmit} className="flex flex-col w-full h-full ">
        <div className="flex flex-row w-full -mx-4 h-[600px]">
          <div className="flex flex-col w-6/12 h-full ">
            <div className="w-full px-4 mb-6">
              <Input
                placeholder="Digite o nome do aluno"
                label="Nome"
                register={register}
                name="name"
                error={errors.name?.message}
                setValue={setValue}
              />
            </div>
            <div className="w-full px-4 mb-6">
              <Input
                placeholder="Digite o nome do Titular"
                label="Nome do Titular"
                register={register}
                name="head_teacher"
                error={errors.head_teacher?.message}
                setValue={setValue}
              />
            </div>
            <div className="w-full px-4 mb-6">
              <Input
                placeholder="Digite o nome do Auxiliar"
                label="Nome do Auxiliar"
                register={register}
                name="assistant"
                error={errors.assistant?.message}
                setValue={setValue}
              />
            </div>
            <div className="w-full px-4 mb-6">
              <InputSelect
                name="shift"
                arrayItens={statusShift}
                control={control}
                label="Turno"
              />
            </div>
            <div className="w-full px-4">
              <InputSelect
                name="status"
                arrayItens={statusClass}
                control={control}
                label="Status administrativo"
              />
            </div>
            <div className="mt-auto p-4 rounded-b-xl bg-white border-t border-gray-200 absolute bottom-0 left-0 right-0">
              <div className="flex justify-between">
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
            </div>
          </div>
          <div className="flex flex-col pl-8 w-6/12 h-full ">
            <div>
              <Typography
                color="text-gray-700"
                fontWeight="medium"
                variant="body"
              >
                Modifique os alunos
              </Typography>
              <div className="w-full pt-5">
                <FilterInput
                  placeholder="Buscar por nome"
                  value={search}
                  onChange={(e) => setSearch(e)}
                />
              </div>
            </div>

            <div className=" overflow-y-auto">
              <div className="w-full pt-5 space-y-4 ">
                {filteredStudents.map((student) => (
                  <div key={student.id}>
                    <Typography
                      color="text-gray-400"
                      fontWeight="regular"
                      variant="body"
                    >
                      {student.name}
                    </Typography>
                    <div className="flex flex-row items-center justify-between">
                      <Typography
                        color="text-black"
                        fontWeight="medium"
                        variant="base"
                      >
                        Matrícula: {student.id}
                      </Typography>
                      <p className="text-cancel font-medium">Retirar</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
}
