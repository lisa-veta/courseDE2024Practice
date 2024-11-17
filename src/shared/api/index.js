import { getResponseMock } from "./lib/index.js";
import { API_ENDPOINTS } from "../config/constants.js";
import { mockData } from "#widgets/MapApp/api/MockData.js";

export const handlers = [
  getResponseMock({
    type: "GET",
    endpoint: API_ENDPOINTS.markers.list,
    data: mockData.markersList,
  }),
  getResponseMock({
    type: "GET",
    endpoint: API_ENDPOINTS.markers.detail,
    data: mockData.markerDetail,
  }),
];
