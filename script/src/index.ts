/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

import {bootstrapExtra} from "@workadventure/scripting-api-extra";

// The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure.
bootstrapExtra().catch(e => console.error(e));

// Flashlight in darkness
WA.room.onEnterZone('darkness', () => {
// WA.room.onEnterLayer('darkness').subscribe(() => {
  let old_x: number = 0;
  let old_y: number = 0;

  WA.player.onPlayerMove((e) => {
    let x: number = Math.round(e.x/32);
    let y: number = Math.round(e.y/32);

    WA.room.setTiles([
      {x: old_x-1, y: old_y-1, tile: 'darkOverlay', layer: 'darkness'},
      {x: old_x-1, y: old_y, tile: 'darkOverlay', layer: 'darkness'},
      {x: old_x-1, y: old_y+1, tile: 'darkOverlay', layer: 'darkness'},
      {x: old_x, y: old_y-1, tile: 'darkOverlay', layer: 'darkness'},
      {x: old_x, y: old_y, tile: 'darkOverlay', layer: 'darkness'},
      {x: old_x, y: old_y+1, tile: 'darkOverlay', layer: 'darkness'},
      {x: old_x+1, y: old_y-1, tile: 'darkOverlay', layer: 'darkness'},
      {x: old_x+1, y: old_y, tile: 'darkOverlay', layer: 'darkness'},
      {x: old_x+1, y: old_y+1, tile: 'darkOverlay', layer: 'darkness'},
      {x: x-1, y: y-1, tile: 'darkCircle0', layer: 'darkness'},
      {x: x, y: y-1, tile: 'darkCircle1', layer: 'darkness'},
      {x: x+1, y: y-1, tile: 'darkCircle2', layer: 'darkness'},
      {x: x-1, y: y, tile: 'darkCircle3', layer: 'darkness'},
      {x: x, y: y, tile: 'darkCircle4', layer: 'darkness'},
      {x: x+1, y: y, tile: 'darkCircle5', layer: 'darkness'},
      {x: x-1, y: y+1, tile: 'darkCircle6', layer: 'darkness'},
      {x: x, y: y+1, tile: 'darkCircle7', layer: 'darkness'},
      {x: x+1, y: y+1, tile: 'darkCircle8', layer: 'darkness'}
    ]);

    old_x = x
    old_y = y
  })
})

WA.room.onEnterZone('customSound', () => {
  console.log('play custom Sound');
  let volume = 1;
  WA.sound.loadSound("sounds/depressed.mp3").play({
    volume,
  });
})

// WA.room.onEnterLayer('darkness').subscribe(() => {
//   WA.chat.sendChatMessage("Hello!", 'Mr Robot');
// });

// example code and testing ground - remove if advanced with own script

let currentPopup: any = undefined;
const today = new Date();
const time = today.getHours() + ":" + today.getMinutes();

WA.room.onEnterZone('clock', () => {
  currentPopup =  WA.ui.openPopup("clockPopup","It's " + time,[]);

  //WA.chat.sendChatMessage('I didn\'t ask to be made: no one consulted me or considered my feelings in the matter. I don\'t think it even occurred to them that I might have feelings. After I was made, I was left in a dark room for six months... and me with this terrible pain in all the diodes down my left side. I called for succour in my loneliness, but did anyone come? Did they hell. My first and only true friend was a small rat. One day it crawled into a cavity in my right ankle and died. I have a horrible feeling it\'s still there...', 'Marvin');
})

WA.room.onLeaveZone('clock', closePopUp)

function closePopUp(){
  if (currentPopup !== undefined) {
    currentPopup.close();
    currentPopup = undefined;
  }
}
