import { Button } from "#shared/ui/Button";
import { EditIcon } from "#shared/ui/Icons/index.js";

/**
 * Кнопка для открытия модалки для обновления метки
 * @return {String}
 */
export const UpdateMarkBtn = ({
  markInfo,
  text = "Редактировать",
  iconColor = "var(--colorBlack)",
}) => {
  return Button({
    text,
    iconSlot: EditIcon(iconColor),
    extraAttrs: [
      {
        name: "data-js-update-mark-info",
        value: encodeURIComponent(JSON.stringify(markInfo)),
      },
    ],
  });
};
