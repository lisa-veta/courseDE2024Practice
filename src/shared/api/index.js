import { getResponseMock } from "./lib/index.js";
import { API_ENDPOINTS } from "../config/constants.js";
import { mockData } from "./mockData.js"

export const handlers = [
  getResponseMock({
    type: "GET",
    endpoint: API_ENDPOINTS.markers.detail,
    data: mockData.markersList,
  }),
  getResponseMock({
    type: "GET",
    endpoint: API_ENDPOINTS.markers.detail,
    data: mockData.markerDetail,
  }),
];
