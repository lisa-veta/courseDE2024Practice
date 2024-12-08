import { Button } from "#shared/ui/Button";
import { ChoiceElem } from "#shared/ui/ChoiceElem/index";
import {
  CinemaIcon,
  RestaurantIcon,
  NightclubIcon,
  TheaterIcon,
  BarIcon,
  PhotoIcon,
  SaveIcon,
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
  <form class="updateModalContent__form" data-js-form=${JSON.stringify({ url, method, showModalAfterSuccess: "#modalSuccess" })}>
    <h3 class="updateModalContent__title">Редактировать метку</h3>
    <p>${markInfo.address.street}, ${markInfo.address.house}, ${markInfo.address.city}</p>
    <div class="updateModalContent__pairedElements">
          <p class="updateModalContent__firstElem">Тип метки</p>
          <div class="updateModalContent__secondElem">
           ${ChoiceElem({
          extraAttrs: [
            {
              name: "data-js-update-mark-info-select-type",
              value: markInfo.id,
            },
            {
              name: "name",
              value: "typeMark",
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
      </div>
    </div>
    <div class="updateModalContent__pairedElements">
      <p class="updateModalContent__firstElem">Комментарий пользователя</p>
      <label class="updateModalContent__secondElem">
        <textarea class="updateModalContent__input" >${markInfo.comment}</textarea>
      </label>
    </div>
    
    <div class="updateModalContent__pairedElements">
      <p class="updateModalContent__firstElem">Фотографии</p>
      <div class="updateModalContent__secondElem">
        <div class="updateModalContent__photo"></div>
        <div class="updateModalContent__photo"></div>
        <div class="updateModalContent__photo"></div>
      </div>
    </div>
    
    <div class="updateModalContent__pairedElements">
      <p class="updateModalContent__firstElem">Добавить фото</p>
      <div class="updateModalContent__secondElem">
        <div class="updateModalContent__columnElem">
          <div>
                  ${PhotoIcon({iconColor:"var(--colorBlack)", fillOpacity: "0.4"})}
          </div>
          <p class="updateModalContent__text">Перетащите файл в эту область</p>
          <p class="updateModalContent__text">.jpg, .png, bmp, до 5 Мб</p>
        </div>
      </div>
    </div>
      <div class="updateModalContent__btns">
       ${Button({
    text: "Отменить",
    extraClasses: [ "btn--isRedText" ],
  })}
       ${Button({
    text: "Сохранить",
    extraAttrs: [
      {
        name: "type",
        value: "submit",
      },
    ],
    iconSlot: SaveIcon("var(--colorBlack)"),
  })}
  </div>
  </form>
  </div>`;
};
