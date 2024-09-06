interface StatusEnumProps {
  statusEnumTeacher: number | string;
}

export function StatusEnumTeacher({ statusEnumTeacher }: StatusEnumProps) {
  const options: { [key: string]: string } = {
    0: "Titular",
    1: "Auxiliar",
  };

  return options[statusEnumTeacher];
}
