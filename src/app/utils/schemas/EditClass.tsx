import { z } from "zod";

export const editClassSchema = z.object({
  name: z.string().min(1, "Nome da Turma é obrigatório"),
  head_teacher: z.string().min(1, "Professor Titular é obrigatório"),
  assistant: z.string().min(1, "Professor Auxiliar é obrigatório"),
  shift: z.number().min(1, "Turno é obrigatório"),
  status: z.number().min(1, "Status é obrigatório"),
});

export type EditClass = z.infer<typeof editClassSchema>;
