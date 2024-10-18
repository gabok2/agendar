interface StatusEnumProps {
  statusEnum: number | string;
}

export function StatusEnumTeacher({ statusEnum }: StatusEnumProps) {
  const options: { [key: string]: string } = {
    1: "Titular",
    2: "Auxiliar",
  };

  return options[statusEnum];
}

export function StatusEnumClass({ statusEnum }: StatusEnumProps) {
  const options: { [key: string]: string } = {
    0: "Ativa",
    1: "Planejamento",
  };

  return options[statusEnum];
}
