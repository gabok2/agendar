import React, { InputHTMLAttributes } from "react";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";
import { Icons } from "./icons";
import { IconType } from "@/app/utils/types/inputTypes";

interface InputProps<TFieldValues extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  name: Path<TFieldValues>;
  label: string;
  register: UseFormRegister<TFieldValues>;
  error?: string;
  icon?: IconType;
  placeholder?: string;
  type?: string;
  showPassword?: boolean;
  togglePasswordVisibility?: () => void;
}

export function Input<TFieldValues extends FieldValues>({
  name,
  label,
  register,
  error,
  icon,
  className = "",
  placeholder,
  type = "text",
  showPassword,
  togglePasswordVisibility,
  ...rest
}: Readonly<InputProps<TFieldValues>>) {
  const baseClasses =
    "flex items-center border border-grayPrimary rounded-lg p-4 w-full";

  const inputClasses = `
    ${baseClasses}
    ${error ? "border-cancel" : ""}
    ${className}
  `;

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <div className={inputClasses}>
        {icon && (
          <Icons
            type={icon}
            size={22}
            weight="regular"
            className="text-gray-400 mr-2"
          />
        )}
        <input
          id={name}
          placeholder={placeholder}
          {...register(name)}
          type={inputType}
          className="w-full text-xs text-gray-400 bg-inherit focus:outline-none "
          {...rest}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="focus:outline-none"
          >
            <Icons
              type={showPassword ? "EyeSlash" : "Eye"}
              size={22}
              weight="regular"
              className="text-gray-400 ml-2"
            />
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-cancelSecondary">{error}</p>}
    </div>
  );
}
