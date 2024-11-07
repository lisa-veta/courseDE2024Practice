import Choices from "choices.js";
import { getCfg } from "#shared/lib/utils";

/**
 *
 */
export class ChoiceElemModel {
  selectors = {
    instance: "[data-js-custom-select]",
  };

  static instances = [];

  static presets = {
    default: {
      createItem: (
        { classNames },
        data,
        { strToEl, escapeForTemplate, getClassNames }
      ) => {
        return strToEl(`
          <div class="${getClassNames(classNames.item).join(" ")} 
          ${getClassNames(
            data.highlighted
              ? classNames.highlightedState
              : classNames.itemSelectable
          ).join(" ")} 
          ${data.placeholder ? classNames.placeholder : ""}" 
          data-item 
          data-id="${data.id}" 
          data-value="${data.value}" 
          ${data.active ? 'aria-selected="true"' : ""}
          ${data.disabled ? 'aria-disabled="true"' : ""}>
            <span class="customSelect__choiceIcon">${data?.customProperties?.icon ?? ""}</span><span>${data.label}</span>
          </div>
        `);
      },
      createChoice: (
        { classNames },
        data,
        { strToEl, escapeForTemplate, getClassNames },
        itemSelectText
      ) => {
        console.debug(data, "!!!");
        return strToEl(`
          <div class="${getClassNames(classNames.item).join(" ")} 
            ${getClassNames(classNames.itemChoice).join(" ")} 
            ${getClassNames(
              data.disabled
                ? classNames.itemDisabled
                : classNames.itemSelectable
            ).join(" ")}" 
            data-select-text="${itemSelectText}" 
            data-choice 
            ${data.disabled ? 'data-choice-disabled aria-disabled="true"' : "data-choice-selectable"}
            data-id="${data.id}" 
            data-value="${data.value}">
            <span class="customSelect__choiceIcon">${data?.customProperties?.icon ?? ""}</span><span>${data.label}</span>
          </div>
        `);
      },
    },
    fancy: {
      createItem: (
        { classNames },
        data,
        { strToEl, escapeForTemplate, getClassNames }
      ) => {
        return strToEl(`
          <div class="${getClassNames(classNames.item).join(" ")} 
          ${getClassNames(data.highlighted ? classNames.highlightedState : classNames.itemSelectable).join(" ")} 
          ${data.placeholder ? classNames.placeholder : ""}" 
          data-item 
          data-id="${data.id}" 
          data-value="${data.value}"
          ${data.active ? 'aria-selected="true"' : ""}
          ${data.disabled ? 'aria-disabled="true"' : ""}>
            🌟 ${data.label}
          </div>
        `);
      },
      createChoice: (
        { classNames },
        data,
        { strToEl, escapeForTemplate, getClassNames },
        itemSelectText
      ) => {
        return strToEl(`
          <div class="${getClassNames(classNames.item).join(" ")} 
          ${getClassNames(classNames.itemChoice).join(" ")} 
          ${getClassNames(data.disabled ? classNames.itemDisabled : classNames.itemSelectable).join(" ")}"
          data-choice 
          data-select-text="${itemSelectText}" 
          ${data.disabled ? 'data-choice-disabled aria-disabled="true"' : "data-choice-selectable"}
          data-id="${data.id}" 
          data-value="${data.value}">
            🌟 ${data.label}
          </div>
        `);
      },
    },
  };

  static defaultCfg = {
    itemSelectText: "",
    classNames: {
      containerOuter: ["choices", "customSelect"],
      itemChoice: ["choices__item--choice", "customSelect__choice"],
      containerInner: ["choices__inner", "customSelect__inner"],
      list: ["choices__list", "customSelect__list"],
      itemSelectable: [
        "choices__item--selectable",
        "customSelect__item--selectable",
      ],
    },
    callbackOnCreateTemplates: function (
      strToEl,
      escapeForTemplate,
      getClassNames,
      { preset, itemSelectText }
    ) {
      const presetName = preset || "default";
      const { createItem, createChoice } =
        ChoiceElemModel.presets[presetName] || ChoiceElemModel.presets.default;
      return {
        item: (classNames, data) =>
          createItem(classNames, data, {
            strToEl,
            escapeForTemplate,
            getClassNames,
          }),
        choice: (classNames, data) =>
          createChoice(
            classNames,
            data,
            {
              strToEl,
              escapeForTemplate,
              getClassNames,
            },
            itemSelectText
          ),
      };
    },
  };

  static createCustomSelect(node) {
    const cfg = getCfg(node, "data-js-custom-select");
    const { disableTemplates, preset, ...restCfg } = cfg;
    const choicesConfig = {
      ...ChoiceElemModel.defaultCfg,
      ...restCfg,
    };
    if (disableTemplates) {
      delete choicesConfig.callbackOnCreateTemplates;
    }
    choicesConfig.callbackOnCreateTemplates = ((originalCallback) => {
      return function (...args) {
        return originalCallback.apply(this, [
          ...args,
          { preset, itemSelectText: choicesConfig.itemSelectText },
        ]);
      };
    })(choicesConfig.callbackOnCreateTemplates);
    ChoiceElemModel.instances.push(
      new Choices(node, {
        ...choicesConfig,
      })
    );
  }

  static getInstance(node) {
    return ChoiceElemModel.instances.find(
      (instance) => instance.passedElement.element === node
    );
  }

  constructor() {
    this.selects = document.querySelectorAll(this.selectors.instance);
    this.selects.forEach((select) => {
      ChoiceElemModel.createCustomSelect(select);
    });
  }
}
