import "./styles.js";
import { DeleteMarkModel } from "#features/Marks/DeleteMark/model/index.js";
import { UpdateMarkModel } from "#features/Marks/UpdateMark/model/index.js";
import { API_URL, API_ENDPOINTS } from "#shared/config/constants";
import { FormHandler } from "#shared/lib/plugins/formHandler.js";
import { ApiClient } from "#shared/lib/services/ApiClient.js";
import { StoreService } from "#shared/lib/services/StoreService.js";
import { ChoiceElemModel } from "#shared/ui/ChoiceElem/model/index.js";
import { MapApp } from "#widgets/MapApp/model/index.js";

async function initMSW() {
  if (process.env.NODE_ENV === "development") {
    const { getMocks } = await import("#shared/api/browser");
    await getMocks();

    console.debug("msw ready");
  } else {
    return Promise.resolve();
  }
}

function domReady() {
  return new Promise((res) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", res);
    } else {
      res();
    }
  });
}

Promise.all([initMSW(), domReady()]).then(() => {
  document.addEventListener("submit", (e) => {
    e.preventDefault();
  });
  window.App = {};
  const apiClient = new ApiClient(API_URL);
  new ChoiceElemModel();
  window.App.ChoiceElemModel = ChoiceElemModel;
  window.App.StoreServiceForMap = new StoreService("mapAppStore");
  new MapApp(window.App.StoreServiceForMap, new ApiClient(API_URL));
  apiClient
    .get(API_ENDPOINTS.markers.detail)
    .then((res) => console.debug("!!!!!!!!!!", res));

  new DeleteMarkModel(window.App.StoreServiceForMap);
  new UpdateMarkModel(window.App.StoreServiceForMap);
  new FormHandler();
});
