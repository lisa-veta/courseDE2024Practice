import { getGeneratedAttrs } from "#shared/lib/utils";
import { Button } from "#shared/ui/Button/index.js";
import { CancelIcon, CheckIcon } from "#shared/ui/Icons/index.js";

/**
 * Компонент свитч - кнопки
 * @return {string}
 */
export const ConfirmModal = ({
  message = "",
  extraClasses = [],
  extraAttrs = [],
} = {}) => {
  return `
      <div class="confirmModal" ${extraClasses.join(" ")}" ${getGeneratedAttrs(extraAttrs)}>
        <p class="confirmModal__title">${message}</p>
        <div class="confirmModal__buttons">
           ${Button({ text: "Да", iconSlot: CheckIcon("var(--colorGreenLight)"), extraClasses: ["btn--isGreenLightIcon"], extraAttrs: [{ name: "data-js-confirm-btn", value: "" }] })} 
          ${Button({ text: "Нет", iconSlot: CancelIcon({ iconColor: "var(--colorRed)" }), extraClasses: ["btn--isRedIcon"], extraAttrs: [{ name: "data-js-cancel-btn", value: "" }] })}
        </div>
      </div>`;
};
