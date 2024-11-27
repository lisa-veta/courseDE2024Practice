import { FilterManager } from "#features/Filter/model";
import { API_ENDPOINTS } from "#shared/config/constants.js";
import { getDebouncedFn } from "#shared/lib/utils";
import { yandexMapCustomEventNames } from "#shared/ui/Map/config/constants";
import { YandexMap } from "#shared/ui/Map/model/index.js";

/**
 *
 */
export class MapApp {
  constructor(storeService, apiClient) {
    this.storeService = storeService;
    this.apiClient = apiClient;
    this.apiGeoUrl = "https://geocode-maps.yandex.ru/1.x/?apikey";
    this.apiKey = "ebf7d794-539b-460a-b8d5-68c3b9f6df05";
    this.inputAddress = document.querySelector("#searchAddress"); //TODO: вынести в фильтр.
    this.yandexMap = new YandexMap({
      containerSelector: "#map1",
      apiUrl: "https://api-maps.yandex.ru/2.1/?apikey",
      apiKey: "ebf7d794-539b-460a-b8d5-68c3b9f6df05",
      lang: "ru_RU",
      center: [54.5, 57.9],
      zoom: 10,
    });

    this.filterManager = new FilterManager({
      filterName: `marks`,
      onUpdate: (changedData) => this.handleFilterChanged(changedData),
    });

    this.filterManager.applyFilters(this.storeService.getFilters());
    this.loadAndUpdateFilters(); //подгружаем инфу по конфигу фильтров
    this.yandexMap
      .initMap()
      .then(async () => {
        this.yandexMap.renderMarks(this.getFilteredMarkers()); //Рендерим метки из стора по фильтрам
        const marks = await this.getMarkers();
        this.storeService.updateStore("setMarkers", marks);
      })
      .catch((e) => console.error(e));

    this.#bindYandexMapEvents();
    this.subscribeForStoreService();
    this.#bindEvents();
    console.debug(
      "Тут будем реализовывать логику нашего виджета, вот готовый стор сервис ->",
      this.storeService
    );
  }

  //Обработчик изменения фильтров
  handleFilterChanged(changeData) {
    //TODO: есть замечение, касательно того, что мы всегда подвязываемся к полю inputs, а если у нас будет несколько фильтров? Нужно будет подумать над этим.
    //Тут же необходимо делать проверку если менялось поле ввода адреса и центрировать карту
    if (changeData.search) {
      this.handleCenterMapByAddress(changeData.search.value);
    }
    const currentState = this.storeService.getFilters().inputs;
    const updatedState = { ...currentState, ...changeData };
    this.storeService.updateStore("setFilters", { inputs: updatedState });
  }

  getFilteredMarkers() {
    // Получаем активные фильтры из состояния хранилища
    const activeFilters = this.storeService.getFilters().inputs;
    console.debug(activeFilters);
    // Фильтруем метки, оставляем только те, для которых фильтры включены (isChecked: true)
    const filteredMarkers = this.storeService.getMarkers().filter((marker) => {
      // Проверяем, включен ли фильтр для типа метки
      return activeFilters[marker.type]?.isChecked;
    });
    console.debug("VFFFFFFFFFrijvsienvsnjvjsn", filteredMarkers);

    return filteredMarkers;
  }

  loadAndUpdateFilters() {
    (async () => {
      try {
        const filters = await this.getFiltersCfg();
        this.storeService.updateStore("setFilters", filters);
        this.filterManager.applyFilters(filters);
      } catch (error) {
        console.error("Ошибка при получении конфигурации фильтров:", error);
      }
    })();
  }

  handleMarkersChanged() {
    console.debug("markers changed", this.storeService.getMarkers());
    this.yandexMap.renderMarks(this.storeService.getMarkers());
  }

  handleFiltersChanged() {
    this.yandexMap.renderMarks(this.getFilteredMarkers());
  }

  subscribeForStoreService() {
    this.markerSubscription = this.storeService.subscribeToMarkers(() => {
      this.handleMarkersChanged();
    });
    this.filterSubscription = this.storeService.subscribeToFilters(() => {
      this.handleFiltersChanged();
    });
  }

  handleCenterMapByAddress(address) {
    console.debug(address, "address");
    //TODO: как-то проверять что yandexMap и переписать на apiClient (добавить параметр ingoreBaseUrl)
    // this.apiClient.get(this.apiGeoUrl, {
    //   apikey: this.apiKey,
    //   geocode: encodeURIComponent(address),
    //   format: "json",
    // });

    fetch(
      `${this.apiGeoUrl}=${this.apiKey}&geocode=${encodeURIComponent(address)}&format=json`
    )
      .then((res) => res.json())
      .then((data) => {
        const coords =
          data.response.GeoObjectCollection.featureMember[0]?.GeoObject?.Point?.pos?.split(
            " "
          );
        if (coords) {
          const lat = parseFloat(coords[1]);
          const lon = parseFloat(coords[0]);
          this.yandexMap.centerMapByCords([lat, lon]);
        }
      })
      .catch((e) => console.error(e));
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

  async getFiltersCfg() {
    return this.apiClient
      .get(API_ENDPOINTS.config.list)
      .then((res) => res?.data);
  }

  async handleMarkerClick(e) {
    const {
      detail: { id, mark },
    } = e;
    try {
      const res = await this.apiClient.get(API_ENDPOINTS.markers.detail, {
        id: id,
      });
      const info = this.yandexMap.getLayoutContentForBallon(
        res.data.find((item) => item.id === id) //пока не работает mock
      );
      this.yandexMap.updateBallonContent(id, mark, info);
    } catch (e) {
      console.error(e);
    }
  }

  #bindYandexMapEvents() {
    document.addEventListener(yandexMapCustomEventNames.markClicked, (e) => {
      this.handleMarkerClick(e);
    });
  }

  //TODO: переписать на фильтры
  #bindEvents() {
    const debouncedHandleMapByAddress = getDebouncedFn(
      this.handleCenterMapByAddress,
      1000
    ).bind(this);
    if (this.inputAddress)
      this.inputAddress.addEventListener("input", (e) => {
        debouncedHandleMapByAddress(e.target.value);
      });
  }
}
