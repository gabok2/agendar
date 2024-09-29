export const maskCPF = (value: string): string => {
  let v = value.replace(/\D/g, "");
  v = v.slice(0, 11);
  v = v.replace(/(\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return v;
};

export const maskDate = (value: string): string => {
  let v = value.replace(/\D/g, "");
  v = v.slice(0, 8);
  v = v.replace(/(\d{2})(\d)/, "$1/$2");
  v = v.replace(/(\d{2})(\d)/, "$1/$2");
  return v;
};
