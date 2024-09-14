import { createClient } from "@/app/utils/supabase/client";

const supabase = createClient();

export async function loginUser(email: string, password: string) {
  const { data: user, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return user;
}
