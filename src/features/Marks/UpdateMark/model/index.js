import { getUpdateMarkModalContent } from "../ui/getUpdateMarkModalContent.js";
import { API_ENDPOINTS, API_URL } from "#shared/config/constants.js";
import { ModalManager } from "#shared/lib/plugins/modalManager.js";
import { ChoiceElemModel } from "#shared/ui/ChoiceElem/model/index.js";

/**
 *
 */
export class UpdateMarkModel {
  attrs = {
    updateMark: "data-js-update-mark-info",
    selectTypeMark: "data-js-update-mark-info-select-type",
  };

  constructor(storeService) {
    this.storeService = storeService;
    this.#bindEvents();
  }

  #handleClick(e) {
    const parent = e.target.closest(`[${this.attrs.updateMark}]`);
    if (!parent) return;

    try {
      const markInfoJson = parent.getAttribute(this.attrs.updateMark);
      const markInfo = JSON.parse(decodeURIComponent(markInfoJson));
      console.debug("markInfo!!!!!!!!!!!", markInfo);
      ModalManager.getInstance().open(
        getUpdateMarkModalContent({
          markInfo,
          url: `${API_URL}/${API_ENDPOINTS.markers.update}`,
        }),
        {
          on: {
            reveal: () => {
              ChoiceElemModel.createCustomSelect(
                document.querySelector(
                  `[${this.attrs.selectTypeMark}="${markInfo.id}"]`
                )
              );
            },
          },
          closeButton: false,
        }
      );
    } catch (error) {
      console.error("Ошибка при открытии модалки обновления метки:", error);
    }
  }

  #handleSubmit() {}

  #bindEvents() {
    document.addEventListener("click", (e) => {
      this.#handleClick(e);
    });
  }
}
