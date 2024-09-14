import { z } from "zod";

// Definindo o schema de validação
export const loginSchema = z.object({
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  password: z.string().min(1, "Senha é obrigatória"),
});

export type FormDataLogin = z.infer<typeof loginSchema>;
