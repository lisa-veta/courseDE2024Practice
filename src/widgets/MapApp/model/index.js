import { API_ENDPOINTS } from "#shared/config/constants.js";

/**
 *
 */
export class MapApp {
  constructor(storeService, apiClient) {
    this.storeService = storeService;
    this.apiClient = apiClient;

    this.subscribeForStoreService();
    console.debug(
      "Тут будем реализовывать логику нашего виджета, вот готовый стор сервис ->",
      this.storeService
    );

    // setTimeout(() => {
    //   this.storeService.updateStore("addMarker", { id: 33144, value: "test" });
    // }, 5000);
  }

  handleMarkersChanged() {
    console.debug("markers changed", this.storeService.getMarkers());
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

  async addMarkers() {
    try {
      const resp = await this.apiClient.get(API_ENDPOINTS.markers.detail);
      console.debug("markers!!!:", resp.data.markers);
      this.storeService.updateStore("addMarkers", resp.data.markers);
    } catch (error) {
      console.error("Ошибка при получении меток:", error);
    }
  }
}
