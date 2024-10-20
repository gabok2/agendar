import { CardInfo } from "./CardInfo";
import {
  ChalkboardTeacher,
  GraduationCap,
} from "@phosphor-icons/react/dist/ssr";

interface ClassTurm {
  class_id: number;
  created_at: string;
  total_students: number;
  name: string;
  assistant: string;
  shift: string;
  holder: string;
  status: number;
}

interface Teacher {
  id: number;
  name: string;
  email: string;
  status_teacher: number;
  class: ClassTurm[];
}

interface CardProps {
  readonly classTurm: ClassTurm[];
  readonly teachers: Teacher[];
}

export function Card({ classTurm, teachers }: CardProps) {
  const activeTurms = classTurm.filter((turma) => turma.status === 0).length;
  const planningTurms = classTurm.filter((turma) => turma.status === 1).length;
  const holderTeachers = teachers.filter(
    (teacher) => teacher.status_teacher === 1
  ).length;
  const assistantTeachers = teachers.filter(
    (teacher) => teacher.status_teacher === 2
  ).length;

  return (
    <div className="flex mt-10">
      <div className="px-6 py-4 flex items-end space-x-8 rounded-lg bg-white w-1/2">
        <CardInfo
          title="Total turmas"
          number={classTurm.length.toString()}
          IconComponent={ChalkboardTeacher}
        />
        <CardInfo title="Planejamento" number={planningTurms.toString()} />
        <CardInfo title="Ativas" number={activeTurms.toString()} />
      </div>
      <div className="px-6 py-4 flex items-end space-x-8 ml-5 rounded-lg bg-white w-1/2">
        <CardInfo
          title="Total professores"
          number={teachers.length.toString()}
          IconComponent={GraduationCap}
        />
        <CardInfo title="Titulares" number={holderTeachers.toString()} />
        <CardInfo title="Auxiliares" number={assistantTeachers.toString()} />
      </div>
    </div>
  );
}
