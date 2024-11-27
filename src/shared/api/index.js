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
  ...mockData.markerDetail.map((markInfo) => {
    return getResponseMock({
      type: "GET",
      endpoint: `${API_ENDPOINTS.markers.detail}`, // Убираем query-параметр из endpoint
      queryParams: { id: markInfo.id }, // Передаем параметр id для проверки
      data: markInfo,
    });
  }),
  getResponseMock({
    type: "GET",
    endpoint: API_ENDPOINTS.config.list,
    data: mockData.filerCfg,
  }),
];
