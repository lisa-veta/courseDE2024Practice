/**
 *генерирует атрибуты для компонентов
 */
export const getGeneratedAttrs = (attrs = []) => {
  return attrs.map((attr) => `${attr.name}="${attr.value}"`).join(" ");
};
