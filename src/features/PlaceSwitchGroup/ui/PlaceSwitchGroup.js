import { switchConfigDefault } from "../config/index.js";
import { getGeneratedAttrs } from "#shared/lib/utils";
import { Switch } from "#shared/ui/Switch";
/**
 * Компонент PlaceSwitchGroup с прокидываемым конфигом
 * @param {Object} param0 - параметры компонента
 * @param {Array} param0.extraClasses - дополнительные классы
 * @param {Array} param0.extraAttrs - дополнительные аттрибуты
 * @param {Array} param0.switchConfig - конфиг для генерации переключателей
 * @return {String} HTML-строка
 */
export const PlaceSwitchGroup = ({
  extraClasses = [],
  extraAttrs = [],
  switchConfig = switchConfigDefault,
} = {}) => {
  const switchElements = switchConfig
    .map(
      ({ label, name, checked, dataJsFilterItem, dataJsFilterParentName }) => {
        return `
      ${Switch({
        label: label,
        extraClasses: ["switch--isRightLabel"],
        extraInputAttrs: [
          { name: "name", value: name },
          { name: "checked", value: checked.toString() },
          { name: "data-js-filter-item", value: dataJsFilterItem },
          { name: "data-js-filter-parent-name", value: dataJsFilterParentName },
        ],
      })}
    `;
      }
    )
    .join(""); // Собираем все элементы в одну строку
  return `
    <div class="placeSwitchGroup ${extraClasses.join(" ")}" ${getGeneratedAttrs(extraAttrs)}>
      <div class="placeSwitchGroup__items" data-js-filter="marks">
        <label>
          <input class="placeSwitchGroup__input" type="text" name="search" placeholder="Введите адрес" data-js-filter-item="search" data-js-filter-parent-name="marks"/>
        </label>
        ${switchElements}
      </div>
    </div>
  `;
};
