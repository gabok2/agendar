import { createClient } from "@/app/utils/supabase/client";
import { showToast } from "@/app/toastify";

const supabase = createClient();

export async function login(email: string, password: string) {
  let toastId = showToast({ type: "pending", message: "Processando login..." });

  try {
    const { data: user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      showToast({ type: "error", message: error.message }, { id: toastId });
      throw new Error(error.message);
    }

    showToast(
      { type: "success", message: "Login realizado com sucesso!" },
      { id: toastId }
    );
    return user;
  } catch (error) {
    if (error instanceof Error) {
      showToast(
        { type: "error", message: "Ocorreu um erro no login" },
        { id: toastId }
      );
    }
    throw error;
  }
}
