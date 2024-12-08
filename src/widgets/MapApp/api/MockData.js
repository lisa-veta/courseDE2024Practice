export const mockData = {
  markerDetail: [
    {
      id: "1",
      title: "Al Capone",
      type: "bars",
      address: {
        city: "Челябинск",
        house: "12a",
        street: "ул. Братьев Кашириных",
      },
      comment:
        "Хороший бар и караоке, по средам у них специальные акции с коктейлями",
      images: [
        "/assets/markDetail/bar.png",
        "/assets/markDetail/bar.png",
        "/assets/markDetail/bar.png",
      ],
    },
    {
      id: "2",
      title: "Ресторан",
      type: "restaurant",
      address: {
        city: "Челябинск",
        house: "12a",
        street: "ул. Молодогвардейцев",
      },
      comment: "Ресторан с вкусной едой",
      images: [
        "/assets/markDetail/bar.png",
        "/assets/markDetail/bar.png",
        "/assets/markDetail/bar.png",
      ],
    },
    {
      id: "3",
      title: "Al Capone 3",
      type: "theatre",
      address: {
        city: "Челябинск",
        house: "12a",
        street: "пр. Победы",
      },
      comment: "Прекрасный театр, с известными постановками",
      images: [
        "/assets/markDetail/bar.png",
        "/assets/markDetail/bar.png",
        "/assets/markDetail/bar.png",
      ],
    },
    {
      id: "4",
      title: "Al Capone 4",
      type: "cinema",
      address: {
        city: "Челябинск",
        house: "12a",
        street: "ул. Братьев Кашириных",
      },
      comment: "Кинотеатр с мягкими креслами",
      images: [
        "/assets/markDetail/bar.png",
        "/assets/markDetail/bar.png",
        "/assets/markDetail/bar.png",
      ],
    },
    {
      id: "5",
      title: "Al Capone 5",
      type: "club",
      address: {
        city: "Челябинск",
        house: "12a",
        street: "ул. Братьев Кашириных",
      },
      comment: "Ночной клуб открывается с 21:00",
      images: [
        "/assets/markDetail/bar.png",
        "/assets/markDetail/bar.png",
        "/assets/markDetail/bar.png",
      ],
    },
  ],
  markersList: {
    markers: [
      {
        id: "1",
        type: "bars",
        cords: [52.5, 57.9],
      },
      {
        id: "2",
        type: "restaurant",
        cords: [53.5, 57.9],
      },
      {
        id: "3",
        type: "theatre",
        cords: [54.5, 57.9],
      },
      {
        id: "4",
        type: "cinema",
        cords: [55.5, 57.9],
      },
      {
        id: "5",
        type: "club",
        cords: [56.5, 57.9],
      },
    ],
  },
  filerCfg: {
    inputs: {
      search: {
        value: null,
        isChecked: true,
        isDisabled: false,
      },
      bars: {
        value: null,
        isChecked: true,
        isDisabled: false,
      },
      restaurant: {
        value: null,
        isChecked: true,
        isDisabled: false,
      },
      club: {
        value: null,
        isChecked: true,
        isDisabled: false,
      },
      theatre: {
        value: null,
        isChecked: true,
        isDisabled: false,
      },
      cinema: {
        value: null,
        isChecked: true,
        isDisabled: false,
      },
    },
  },
};
