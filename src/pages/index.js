import { MapWindow } from "#features/MapWindow/index.js";
import { PlaceSwitchGroup } from "#features/PlaceSwitchGroup/index.js";
import { Button } from "#shared/ui/Button/index.js";
import { ChoiceElem } from "#shared/ui/ChoiceElem/index";
import {
  CheckIcon,
  CancelIcon,
  BarIcon,
  CinemaIcon,
  NightclubIcon,
  RestaurantIcon,
  TheaterIcon,
} from "#shared/ui/icons/index.js";
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
      <main>
      ${MapWindow()}
      <div style="display: none">
        <div id="modalSuccess">
            <p>Успешно!</p>
        </div>
        <div id="modalError">
          <p>Не успешно!</p>
        </div>
      </main>
    </body>
  </html>
`;

export default IndexPage;
