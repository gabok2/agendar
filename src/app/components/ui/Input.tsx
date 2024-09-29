import React, { ChangeEvent, InputHTMLAttributes } from "react";
import {
  UseFormRegister,
  FieldValues,
  Path,
  UseFormSetValue,
  PathValue,
} from "react-hook-form";
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
  inputMask?: (value: string) => string;
  setValue: UseFormSetValue<TFieldValues>;
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
  inputMask,
  togglePasswordVisibility,
  setValue,
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (inputMask) {
      value = inputMask(value);
    }
    setValue(name, value as PathValue<TFieldValues, Path<TFieldValues>>, {
      shouldValidate: true,
    });
  };

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
        {inputMask && (
          <input
            id={name}
            placeholder={placeholder}
            {...register(name, { onChange: handleChange })}
            type={inputType}
            className="w-full text-xs text-gray-400 bg-inherit focus:outline-none "
            {...rest}
          />
        )}

        {!inputMask && (
          <input
            id={name}
            placeholder={placeholder}
            {...register(name)}
            type={inputType}
            className="w-full text-xs text-gray-400 bg-inherit focus:outline-none "
            {...rest}
          />
        )}

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
