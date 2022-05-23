export const formatMonth = (date: Date) => {
  return date
    .toLocaleString('pt-BR', { month: 'short' })
    .replace('.', '')
    .toString()
    .toLocaleLowerCase();
};
