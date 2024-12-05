import {
  BarIcon,
  CinemaIcon,
  NightclubIcon,
  RestaurantIcon,
  TheaterIcon,
  EditIcon,
  DeleteIcon,
  CenterMapIcon,
} from "#shared/ui/Icons/index.js";

export const classNames = {
  ballonContent: "yandexMap__ballonContent",
  ballonLayout: "yandexMap__ballonLayout",
  mark: "yandexMap__mark",
  contentContainer: "yandexMap__contentContainer",
  info: "yandexMap__info",
  title: "yandexMap__title",
  typeMark: "yandexMap__typeMark",
  typeMarkText: "yandexMap__typeMarkText",
  street: "yandexMap__street",
  description: "yandexMap__description",
  buttons: "yandexMap__buttons",
  button: "yandexMap__button",
  centerMarker: "yandexMap__centerMarker",
};

export const iconShapeCfg = {
  type: "Circle",
  coordinates: [0, 0],
  radius: 50,
};

export const iconsPresets = {
  ["bars"]: BarIcon("var(--colorRed)"),
  ["cinema"]: CinemaIcon("var(--colorLimeGreen)"),
  ["club"]: NightclubIcon("var(--colorBlue)"),
  ["restaurant"]: RestaurantIcon("var(--colorOrange)"),
  ["theatre"]: TheaterIcon("var(--colorViolet)"),
  ["6"]: EditIcon("var(--colorBlack)"),
  ["7"]: DeleteIcon("var(--colorRed)"),
  centerMarker: CenterMapIcon({ iconColor: "var(--colorGray)" }),
};

export const typeNames = {
  ["bars"]: "Бар",
  ["cinema"]: "Кино",
  ["club"]: "Ночной клуб",
  ["restaurant"]: "Ресторан",
  ["theatre"]: "Театр",
};

export const yandexMapCustomEventNames = {
  markClicked: "yandexMap::markClicked",
};
