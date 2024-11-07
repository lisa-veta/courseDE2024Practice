const API_ENDPOINTS = {
  config: {
    list: "config/list/",
  },
  markers: {
    list: "markers/list/",
    detail: "markers/detail",
    create: "markers/create/",
    update: "markers/update/",
    delete: "markers/delete",
  },
  routes: {
    list: "routes/list/",
    detail: "routes/detail",
    create: "routes/create/",
    delete: "routes/delete",
  },
};

const API_URL = process.env.API_URL;

const BASE_URL = window.location.origin;

export { API_ENDPOINTS, API_URL, BASE_URL };
