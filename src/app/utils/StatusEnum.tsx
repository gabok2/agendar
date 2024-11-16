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
    1: "Ativa",
    2: "Planejamento",
  };

  return options[statusEnum];
}

export function StatusEnumShift({ statusEnum }: StatusEnumProps) {
  const options: { [key: string]: string } = {
    1: "Manhã",
    2: "Tarde",
    3: "Noite",
  };

  return options[statusEnum];
}
