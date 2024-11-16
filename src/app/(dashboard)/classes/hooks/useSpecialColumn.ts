interface SpecialColumn {
  statusAdministration: string;
  colors: {
    active: string;
    planning: string;
    default: string;
  };
}

export function useSpecialColumn({
  statusAdministration,
  colors,
}: SpecialColumn) {
  switch (statusAdministration) {
    case "Ativa":
      return { color: colors.active, text: statusAdministration };
    case "Planejamento":
      return { color: colors.planning, text: statusAdministration };
    default:
      return { color: colors.default, text: statusAdministration };
  }
}
