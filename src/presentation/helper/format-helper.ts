export const formatDay = (date: Date) => {
  return date.getDate().toString().padStart(2, '0');
};

export const formatMonth = (date: Date) => {
  return date
    .toLocaleString('pt-BR', { month: 'short' })
    .replace('.', '')
    .toString()
    .toLocaleLowerCase();
};

export const formatYear = (date: Date) => {
  return date.getFullYear();
};
