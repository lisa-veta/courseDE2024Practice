/**
 *
 */
export const getAttr = (str) => {
  return str.replace(/^\[|\]$/g, "").trim(); // Убираем скобки и обрезаем пробелы
};
