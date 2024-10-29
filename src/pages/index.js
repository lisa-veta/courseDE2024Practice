import { Button } from "#shared/ui/Button/index.js";
import { ChoiceElem } from "#shared/ui/ChoiceElem/index";
import { CheckIcon, CancelIcon } from "#shared/ui/icons/index.js";
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
        
        ${Button({ text: "Отменить", iconSlot: CancelIcon(), extraClasses: ["btn--isRedIcon"] })}
        ${Button({ text: "Подтвердить", iconSlot: CheckIcon(), extraClasses: ["btn--isGreenIcon"] })}
        
        ${Switch({
          label: "привет мир",
          extraInputAttrs: [
            { name: "name", value: "form" },
            { name: "form", value: "formAuth" },
          ],
        })}
        <div>${ChoiceElem({
          options: [
            { label: "test", value: "1" },
            { label: "test2", value: "2" },
          ],
        })}</div>

      </main>
    </body>
  </html>
`;

export default IndexPage;
