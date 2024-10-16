"use client";

import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { Controller, FieldValues, Path, Control } from "react-hook-form";
import { Icons } from "./icons";

interface InputSelectProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  arrayItens: { id: number; name: string }[];
  control: Control<TFieldValues>;
  label: string;
}

export function InputSelect<TFieldValues extends FieldValues>({
  name,
  arrayItens,
  control,
  label,
}: Readonly<InputSelectProps<TFieldValues>>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const selectedPerson = arrayItens.find(
          (item) => item.id === field.value
        );

        return (
          <Listbox
            value={selectedPerson}
            onChange={(item) => field.onChange(item.id)}
          >
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              {label}
            </Label>
            <div className="relative">
              <ListboxButton className="flex items-center border border-grayPrimary rounded-lg p-4 w-full">
                <span className="text-xs text-gray-400 bg-inherit focus:outline-none">
                  {selectedPerson?.name}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <Icons
                    type="CaretDown"
                    size={20}
                    aria-hidden="true"
                    className="text-gray-400"
                  />
                </span>
              </ListboxButton>

              <ListboxOptions
                transition
                className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
              >
                {arrayItens.map((item) => (
                  <ListboxOption
                    key={item.id}
                    value={item}
                    className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-primary data-[focus]:text-white"
                  >
                    <span className="block truncate font-normal group-data-[selected]:font-semibold">
                      {item.name}
                    </span>

                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden"></span>
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </div>
          </Listbox>
        );
      }}
    />
  );
}
