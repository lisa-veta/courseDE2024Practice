import { API_ENDPOINTS } from "#shared/config/constants.js";
import { yandexMapCustomEventNames } from "#shared/ui/Map/config/constants";
import { YandexMap } from "#shared/ui/Map/model/index.js";
/**
 *
 */
export class MapApp {
  constructor(storeService, apiClient) {
    this.storeService = storeService;
    this.apiClient = apiClient;

    this.yandexMap = new YandexMap({
      containerSelector: "#map1",
      apiUrl: "https://api-maps.yandex.ru/2.1/?apikey",
      apiKey: "ebf7d794-539b-460a-b8d5-68c3b9f6df05",
      lang: "ru_RU",
      center: [54.5, 57.9],
      zoom: 10,
    });

    this.yandexMap
      .initMap()
      .then(async () => {
        this.yandexMap.renderMarks(this.storeService.getMarkers());
        const markers = await this.getMarkers();
        this.storeService.updateStore("addMarkers", markers);
        //мб рендерить тут тоже
      })
      .catch((e) => console.error(e));
    this.#bindYandexMapEvents();
    this.subscribeForStoreService();
    console.debug(
      "Тут будем реализовывать логику нашего виджета, вот готовый стор сервис ->",
      this.storeService
    );
  }

  handleMarkersChanged() {
    console.debug("markers changed", this.storeService.getMarkers());
    this.yandexMap.renderMarks(this.storeService.getMarkers());
  }

  handleFiltersChanged() {
    console.debug("filters changed", this.storeService.getFilters());
  }

  subscribeForStoreService() {
    this.markerSubscription = this.storeService.subscribeToMarkers(() => {
      this.handleMarkersChanged();
    });
    this.filterSubscription = this.storeService.subscribeToFilters(() => {
      this.handleFiltersChanged();
    });
  }

  unsubscribeFromStoreService() {
    this.markerSubscription?.();
    this.filterSubscription?.();
  }

  async getMarkers() {
    return this.apiClient
      .get(API_ENDPOINTS.markers.list)
      .then((res) => res?.data?.markers);
  }

  async handleMarkerClick(e) {
    const {
      detail: { id, mark },
    } = e;
    try {
      const res = await this.apiClient.get(API_ENDPOINTS.markers.detail, {
        id: id,
      });
      const layout = this.yandexMap.getLayoutContentForBallon(res.data[id]);
      this.yandexMap.renderCustomBallon(id, mark, layout);
    } catch (e) {
      console.error(e);
    }
  }

  #bindYandexMapEvents() {
    document.addEventListener(yandexMapCustomEventNames.markClicked, (e) => {
      this.handleMarkerClick(e);
    });
  }
}
