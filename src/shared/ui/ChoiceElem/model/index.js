import Choices from "choices.js";
import { getCfg } from "#shared/lib/utils";

/**
 *
 */
export class ChoiceElemModel {
  selectors = {
    instance: "[data-js-custom-select]",
  };

  static defaultCfg = {
    itemSelectText: "",
  };

  constructor() {
    this.selects = document.querySelectorAll(this.selectors.instance);
    this.instances = [];
    this.selects.forEach((select) => {
      const cfg = getCfg(select, "data-js-custom-select");
      this.instances.push(
        new Choices(select, {
          ...ChoiceElemModel.defaultCfg,
          ...cfg,
        })
      );
    });
  }
}
