import { Switch } from "#shared/ui/Switch/index.js";
import { PlaceSwitchGroup } from "#features/PlaceSwitchGroup/index.js";

/**
 *
 */
export const MapWindow = () => {
  return `
  <div class="mapWindow">
      ${PlaceSwitchGroup()}
      <div class="mapWindow__map-container">
        <div id="map1" class="yandexMap" style="width: 175rem; height: 82rem; aspect-ratio: 1 / 1 border-radius: 10rem"></div>
      </div>
    </div>
    
  </div>
  `;
};
