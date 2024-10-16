import { z } from "zod";

export const teacherEditSchema = z.object({
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  name: z.string().min(1, "Nome é obrigatório"),
  birthDate: z.string().min(1, "Data de Nascimento é obrigatória"),
  nationalId: z.string().min(1, "CPF é obrigatório"),
  academic: z.string().min(1, "Formação é obrigatória"),
  statusEnum: z.number(),
});

export type TeacherEdit = z.infer<typeof teacherEditSchema>;
