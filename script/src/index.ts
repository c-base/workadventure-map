/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

import {
  bootstrapExtra,
  getLayersMap,
  Properties,
} from "@workadventure/scripting-api-extra";

// The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure.
bootstrapExtra().catch((e) => console.error(e));

// // Flashlight in darkness
// WA.room.onEnterZone('darkness', () => {
//   let old_x: number = 0;
//   let old_y: number = 0;
//
//   WA.player.onPlayerMove((e) => {
//     let x: number = Math.round(e.x/32);
//     let y: number = Math.round(e.y/32);
//
//     WA.room.setTiles([
//       {x: old_x-1, y: old_y-1, tile: 'darkOverlay', layer: 'darkness'},
//       {x: old_x-1, y: old_y, tile: 'darkOverlay', layer: 'darkness'},
//       {x: old_x-1, y: old_y+1, tile: 'darkOverlay', layer: 'darkness'},
//       {x: old_x, y: old_y-1, tile: 'darkOverlay', layer: 'darkness'},
//       {x: old_x, y: old_y, tile: 'darkOverlay', layer: 'darkness'},
//       {x: old_x, y: old_y+1, tile: 'darkOverlay', layer: 'darkness'},
//       {x: old_x+1, y: old_y-1, tile: 'darkOverlay', layer: 'darkness'},
//       {x: old_x+1, y: old_y, tile: 'darkOverlay', layer: 'darkness'},
//       {x: old_x+1, y: old_y+1, tile: 'darkOverlay', layer: 'darkness'},
//       {x: x-1, y: y-1, tile: 'darkCircle0', layer: 'darkness'},
//       {x: x, y: y-1, tile: 'darkCircle1', layer: 'darkness'},
//       {x: x+1, y: y-1, tile: 'darkCircle2', layer: 'darkness'},
//       {x: x-1, y: y, tile: 'darkCircle3', layer: 'darkness'},
//       {x: x, y: y, tile: 'darkCircle4', layer: 'darkness'},
//       {x: x+1, y: y, tile: 'darkCircle5', layer: 'darkness'},
//       {x: x-1, y: y+1, tile: 'darkCircle6', layer: 'darkness'},
//       {x: x, y: y+1, tile: 'darkCircle7', layer: 'darkness'},
//       {x: x+1, y: y+1, tile: 'darkCircle8', layer: 'darkness'}
//     ]);
//
//     old_x = x
//     old_y = y
//   })
// })

// Open c-base jitsi

export async function initCustomJitsis(): Promise<void> {
  const layersMap = await getLayersMap();
  let coWebsite: any = undefined;
  let triggerMessage: any = undefined;

  let openJitsi = async (roomName : string, userName : string) => {
    coWebsite = await WA.nav.openCoWebSite(
      "https://jitsi.c-base.org/" +
        roomName +
        '#userInfo.displayName="' +
        userName +
        '"',
      false,
      "fullscreen;camera;microphone;display-capture"
    );
  }

  for (const layer of layersMap.values()) {
    const properties = new Properties(layer.properties);
    const roomName = properties.getString("customJitsiRoom");

    if (roomName && layer.type === "tilelayer") {

      WA.room.onEnterLayer(layer.name).subscribe(async () => {
        const userName = WA.player.name;

        if(properties.getString("jitsiTrigger") == "onaction") {
          triggerMessage = WA.ui.displayActionMessage({
            message: properties.getString("jitsiTriggerMessage") || "Press SPACE or touch here to enter video conference",
            callback: () => {
              openJitsi(roomName, userName);
            }
          });
        } else {
          openJitsi(roomName, userName);
        }
      });

      WA.room.onLeaveLayer(layer.name).subscribe(() => {
        if(coWebsite) {
          coWebsite.close();
          coWebsite = undefined;
        }
        if(triggerMessage) {
          triggerMessage.remove();
          triggerMessage = undefined;
        }
      });

    }
  }
}

initCustomJitsis();
