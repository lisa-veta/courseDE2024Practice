import { Button } from "#shared/ui/Button";
import { ChoiceElem } from "#shared/ui/ChoiceElem/index";
import {
  CinemaIcon,
  RestaurantIcon,
  NightclubIcon,
  TheaterIcon,
  BarIcon,
  CheckIcon,
} from "#shared/ui/Icons/index";

/**
 * Контент модалки обновления метки
 */
export const getUpdateMarkModalContent = ({
  markInfo,
  url,
  method = "post",
  iconColor = "var(--colorBlack)",
}) => {
  return `<div class="updateModalContent">
  <form class="updateModalContent__form" action="${url}" method="${method}">
    <h3 class="updateModalContent__title">Редактировать метку</h3>
    <p>${markInfo.title}</p>
    <div>
      <label>Комментарий пользователя
        <input type="comment" value="${markInfo.comment}" />
      </label>
      ${ChoiceElem({
        extraAttrs: [
          {
            name: "data-js-update-mark-info-select-type",
            value: markInfo.id,
          },
        ],
        cfg: {
          preset: "default",
          itemSelectText: "",
          searchEnabled: false,
          choices: [
            {
              value: "Бaр",
              label: "Бар",
              selected: markInfo.type === "bars",
              customProperties: {
                icon: BarIcon("var(--colorRed)"),
              },
            },
            {
              value: "Ресторан",
              label: "Ресторан",
              selected: markInfo.type === "restaurant",
              customProperties: {
                icon: RestaurantIcon("var(--colorOrange)"),
              },
            },
            {
              value: "Ночной клуб",
              label: "Ночной клуб",
              selected: markInfo.type === "trk",
              customProperties: {
                icon: NightclubIcon("var(--colorBlue)"),
              },
            },
            {
              value: "Театр",
              label: "Театр",
              selected: markInfo.type === "theatre",
              customProperties: {
                icon: TheaterIcon("var(--colorViolet)"),
              },
            },
            {
              value: "Кино",
              label: "Кино",
              selected: markInfo.type === "cinema",
              customProperties: {
                icon: CinemaIcon("var(--colorLimeGreen)"),
              },
            },
          ],
        },
      })}
      ${Button({
        text: "Сохранить",
        extraAttrs: [
          {
            name: "type",
            value: "submit",
          },
        ],
        iconSlot: CheckIcon("var(--colorGreenLight)"),
      })}
    </div>
  </form>
  </div>`;
};
