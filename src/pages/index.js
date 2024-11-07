import { Button } from "#shared/ui/Button/index.js";
import { ChoiceElem } from "#shared/ui/ChoiceElem/index";
import { CheckIcon, CancelIcon, BarIcon, CinemaIcon, NightclubIcon, RestaurantIcon, TheaterIcon } from "#shared/ui/icons/index.js";
import { Switch } from "#shared/ui/Switch/index";

/**
 * import {
 *   BarIcon,
 *   RestaurantIcon,
 *   TheaterIcon,
 *   NightclubIcon,
 *   CinemaIcon,
 * } from "#shared/ui/Icons/index";
 *
 */
const IndexPage = () => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Home Page</title>
    </head>
    <body>
      <header>
        <h1>Welcome to the Home Page</h1>
      </header>
      <main>
        <p>Hello world!</p>
        <div>
        ${Button({ text: "Да", iconSlot: CheckIcon(), extraClasses: ["btn--isGreenIcon"] })}
        ${Button({ text: "Нет", iconSlot: CancelIcon(), extraClasses: ["btn--isRedIcon"] })}
        </div>
        <div>
        ${Switch({
          label: "привет мир",
          extraInputAttrs: [
            { name: "name", value: "form" },
            { name: "form", value: "formAuth" },
          ],
        })}
        </div>
        <div>${ChoiceElem({
          cfg: {
            preset: "default",
            itemSelectText: "",
            searchEnabled: false,
            choices: [
              {
                value: "Бар",
                label: "Бар",
                selected: false,
                customProperties: {
                  icon: BarIcon("var(--colorRed)"),
                },
              },
              {
                value: "Ресторан",
                label: "Ресторан",
                selected: false,
                customProperties: {
                  icon: RestaurantIcon("var(--colorOrange)"),
                },
              },
              {
                value: "Театр",
                label: "Театр",
                selected: false,
                customProperties: {
                  icon: TheaterIcon("var(--colorViolet)"),
                },
              },
              {
                value: "Кино",
                label: "Кино",
                selected: false,
                customProperties: {
                  icon: CinemaIcon("var(--colorGreen)"),
                },
              },
              {
                value: "Ночной клуб",
                label: "Ночной клуб",
                selected: false,
                customProperties: {
                  icon: NightclubIcon("var(--colorBlue)"),
                },
              },
            ],
          },
        })}
        </div>

      </main>
    </body>
  </html>
`;

export default IndexPage;
