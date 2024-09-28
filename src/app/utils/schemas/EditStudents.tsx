import { z } from "zod";

export const editStudentsSchema = z.object({
  emailResponsible1: z
    .string()
    .email("Email inválido")
    .min(1, "Email Responsável 1 é obrigatório"),
  emailResponsible2: z
    .string()
    .email("Email inválido")
    .min(1, "Email Responsável 2 é obrigatório"),
  name: z.string().min(1, "Nome é obrigatório"),
  birthDate: z.string().min(1, "Data de Nascimento é obrigatória"),
  nationalId: z.string().min(1, "CPF é obrigatório"),
});

export type EditStudents = z.infer<typeof editStudentsSchema>;
