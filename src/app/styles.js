import "choices.js/public/assets/styles/choices.css";
const files = await import.meta.webpackContext("../", {
  regExp: /\.pcss/,
  mode: "eager",
});

// Определите массив с приоритетами
const priorityOrder = [
  "./app/styles/reset.pcss",
  "./app/styles/vars.pcss",
  "./app/styles/palette.pcss",
  "./app/styles/fonts.pcss",
  "./app/styles/global.pcss",
  "./app/styles/utils.pcss",
];

// Получите все файлы
const allFiles = files.keys();

// Фильтруйте файлы, чтобы разделить на те, которые в приоритете, и остальные
const prioritizedStyles = priorityOrder.filter(
  (name) => allFiles.includes(name) // Проверяем на соответствие полному пути
);

// Отфильтруйте остальные стили
const otherStyles = allFiles.filter(
  (path) => !prioritizedStyles.includes(path)
);

// Объедините массивы, чтобы сначала загружались приоритетные стили
const orderedFiles = [...prioritizedStyles, ...otherStyles];

const styles = await Promise.all(orderedFiles.map((path) => files(path)));
export { styles };
