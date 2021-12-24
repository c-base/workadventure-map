/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

import {bootstrapExtra} from "@workadventure/scripting-api-extra";

// The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure.
bootstrapExtra().catch(e => console.error(e));

// Flashlight in darkness
WA.room.onEnterZone('darkness', () => {
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

export class Event {
  assembly: string
  conference: string
  description: string
  id: string
  kind: string
  language: string
  name: string
  room: string
  scheduleDuration: string
  scheduleEnd: Date
  scheduleStart: Date
  slug: string
  track: any
  url: string

  constructor( jsonData: any )
  {
    this.assembly = jsonData.assembly
    this.conference = jsonData.conference
    this.description = jsonData.description
    this.id = jsonData.id
    this.kind = jsonData.kind
    this.language = jsonData.language
    this.name = jsonData.name
    this.room = jsonData.room
    this.scheduleDuration = jsonData.schedule_duration
    this.scheduleEnd = new Date(jsonData.schedule_end)
    this.scheduleStart = new Date(jsonData.schedule_start)
    this.slug = jsonData.slug
    this.track = jsonData.track
    this.url = jsonData.url
  }
}

// get JSON from URL
function getJSON(url:string, callback:Function) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = function() {
    var status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
}

function nextEvent(data:any):Event {
  console.log(data);
  var lastEvent:Event = new Event({
    name: 'No further event',
    schedule_start: new Date("2021-12-31 00:00"),
    schedule_end: new Date()
  });
  var now:Date = new Date("2021-12-28 18:30:30");

  data.forEach( (obj:any) => {
    let event = new Event(obj);

    if(event.scheduleEnd >= now) {
      if (event.scheduleStart < lastEvent.scheduleStart) {
        lastEvent = event;
      }
    }
  })

  return(lastEvent);
}

function formatTime(date:Date):string {
  var hours:number = date.getHours()
  var minutes:any = date.getMinutes()

  if(minutes < 10) {
    minutes = '0' + minutes
  }

  return hours + ':' + minutes
}

// Get Events for c-base from API
getJSON("https://api.rc3.world/api/c/rc3_21/assembly/c-base/events", (err:any, data:any) => {
  if (err !== null) {
      alert('Something went wrong: ' + err);
    } else {
      let e:Event = nextEvent(data)
      WA.ui.openPopup("nextEventPopup", e.scheduleStart.getDate() + '.' + ( e.scheduleStart.getMonth()+1 ) + ' ' + formatTime(e.scheduleStart) + '-' + formatTime(e.scheduleEnd) + "\n" + e.name, []);
    }
})
