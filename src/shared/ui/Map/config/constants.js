import {
  BarIcon,
  CinemaIcon,
  NightclubIcon,
  RestaurantIcon,
  TheaterIcon,
  EditIcon,
  DeleteIcon,
} from "#shared/ui/icons/index.js";

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
};

export const iconShapeCfg = {
  type: "Circle",
  coordinates: [0, 0],
  radius: 88,
};

export const iconsPresets = {
  ["1"]: BarIcon("var(--colorRed)"),
  ["2"]: CinemaIcon("var(--colorLimeGreen)"),
  ["3"]: NightclubIcon("var(--colorBlue)"),
  ["4"]: RestaurantIcon("var(--colorOrange)"),
  ["5"]: TheaterIcon("var(--colorViolet)"),
  ["6"]: EditIcon("var(--colorBlack)"),
  ["7"]: DeleteIcon("var(--colorRed)"),
};

export const typeNames = {
  ["1"]: "Бар",
  ["2"]: "Кино",
  ["3"]: "Ночной клуб",
  ["4"]: "Ресторан",
  ["5"]: "Театр",
};

export const yandexMapCustomEventNames = {
  markClicked: "yandexMap::markClicked",
};
