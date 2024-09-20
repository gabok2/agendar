"use client";
import { Input } from "@/app/components/ui/Input";
import { Typography } from "@/app/components/ui/Typography";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { loginSchema, FormDataLogin } from "@/app/utils/schemas/LoginForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/app/components/ui/Button";
import { useState } from "react";
import { login } from "./endpoint";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataLogin>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<FormDataLogin> = async (data) => {
    try {
      await login(data.email, data.password);
      router.push("/home");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white  shadow-md px-8 py-11 w-full md:w-6/12 lg:w-5/12 xl:w-4/12 2xl:w-2/12  rounded-xl flex flex-col items-center "
    >
      <Image src="/icon.svg" alt="logo" width={55} height={55} />
      <Typography
        className="pt-4"
        variant="h1"
        color="text-gray-800"
        fontWeight="regular"
      >
        Bem-Vindo
      </Typography>
      <Typography
        className="pt-2"
        variant="body"
        color="text-gray-400"
        fontWeight="regular"
      >
        Entre com a sua conta
      </Typography>

      <div className="flex flex-col w-full space-y-8  pt-14">
        <Input
          placeholder="abc@email.com"
          label="Email"
          icon="EnvelopeSimple"
          register={register}
          name="email"
          error={errors.email?.message}
        />
        <Input
          icon="Lock"
          type="password"
          placeholder="Sua senha"
          label="Senha"
          register={register}
          name="password"
          error={errors.password?.message}
          showPassword={showPassword}
          togglePasswordVisibility={togglePasswordVisibility}
        />
      </div>
      <Button
        variant="filled"
        color="blue"
        className="w-full mt-10 py-4"
        type="submit"
      >
        Entrar
      </Button>
    </form>
  );
}
