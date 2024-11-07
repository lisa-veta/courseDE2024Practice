import { getResponseMock } from "./lib/index.js";
import { API_ENDPOINTS } from "../config/constants.js";

export const handlers = [
  getResponseMock({
    type: "GET",
    endpoint: API_ENDPOINTS.markers.detail,
    data: {
      markers: [
        {
          id: "12",
          type: "1",
          cords: [56.5, 57.9],
        },
        {
          id: "13",
          type: "2",
          cords: [56.5, 57.9],
        },
        {
          id: "14",
          type: "3",
          cords: [56.5, 57.9],
        },
        {
          id: "15",
          type: "4",
          cords: [56.5, 57.9],
        },
        {
          id: "16",
          type: "5",
          cords: [56.5, 57.9],
        },
        {
          id: "17",
          type: "5",
          cords: [56.5, 57.9],
        },
        {
          id: "18",
          type: "5",
          cords: [56.5, 57.9],
        },
        {
          id: "19",
          type: "5",
          cords: [56.5, 57.9],
        },
      ],
    },
  }),
];
