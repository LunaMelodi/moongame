import { Application, BitmapText, Container, Sprite, Point } from "pixi.js";
import { ColorOverlayFilter, GlowFilter } from "pixi-filters";

import { indexToMapPoint, mapToScreen, screenToMap } from "./utils";
import {
  generateNoiseMap,
  generateVoronoiMap,
  getTerrainType,
} from "./backend/services/mapGenService";

import { getSpriteFilename } from "./backend/services/spritePicker";

import Tile from "./Tile";

const app = new Application({
  view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
  backgroundColor: 0x522e92,
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
  resizeTo: window,
});

document.body.onresize = () => {
  const screenWidth = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  const screenHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );
  app.screen.width = document.documentElement.clientWidth;
  app.screen.height = document.documentElement.clientWidth;
};

const MAP_HEIGHT = 12;
const MAP_WIDTH = 12;
const MAP_SIZE = MAP_HEIGHT * MAP_WIDTH;

const colorMap = generateVoronoiMap(
  0,
  MAP_WIDTH,
  MAP_HEIGHT,
  ["white", "green", "black"],
  [
    { x: 0, y: 0 },
    { x: 12, y: 8 },
    { x: 8, y: 12 },
  ]
);

const noiseMap = generateNoiseMap(MAP_WIDTH, MAP_HEIGHT);

const map: Container = new Container();
map.x = window.innerWidth / 2;
map.y = -50;
app.stage.addChild(map);

for (let i = 0; i < colorMap.length; i += 1) {
  const mapPoint = indexToMapPoint(i, MAP_WIDTH);
  const screenPoint = mapToScreen(mapPoint);

  const terrainType = getTerrainType(colorMap[i], noiseMap[i]);
  console.log("colorMap[i] :>> ", colorMap[i]);
  console.log("noiseMap[i] :>> ", noiseMap[i]);
  console.log("terrainType :>> ", terrainType);

  const spriteFilename = getSpriteFilename(colorMap[i], terrainType);
  const tile: Sprite = Sprite.from(`${spriteFilename}.png`);

  tile.anchor.set(0.5);
  tile.width = 128;
  tile.height = 128;
  tile.x = screenPoint.x;
  tile.y = screenPoint.y;

  if (spriteFilename.includes("black")) {
    tile.filters = [new GlowFilter({ outerStrength: 0.2, innerStrength: 0.2 })];
  }

  if (spriteFilename === "blackForestTile1") {
    tile.tint = 0x616161;
  }

  /* if (spriteFilename === "whiteGroundTile1") {
    tile.tint = 0xa6f6f7;
  } */

  /* const tile = new Tile(mapPoint.x, mapPoint.y, "whiteTile.png");
  tile.x = screenPoint.x;
  tile.y = screenPoint.y; */

  map.addChild(tile);
}

const warriorPos = mapToScreen({ x: 5, y: 5 });
const warrior: Sprite = Sprite.from("warrior.png");
warrior.height = 70;
warrior.width = warrior.height / 1.5;
warrior.anchor.set(0.5, 1);
warrior.x = warriorPos.x;
warrior.y = warriorPos.y + 15;
//map.addChild(warrior);

const printScreenAndMapCoordinates = (e) => {
  const clientX = e.clientX;
  const clientY = e.clientY;
  console.log(`MousePos: (${clientX}, ${clientY})`);

  /* const mapPoint = screenToMap({
    x: clientX - map.x,
    y: clientY - map.y,
  }); */

  const mousePoint = map.toLocal(new Point(clientX, clientY));
  const mapPoint = screenToMap({ x: mousePoint.x, y: mousePoint.y });

  console.log(
    `MapCoordinates: (${Math.round(mapPoint.x)}, ${Math.round(mapPoint.y)})`
  );
};

let isDragging = false;
let prevX;
let prevY;

const onMouseDown = (e) => {
  prevX = e.clientX;
  prevY = e.clientY;
  isDragging = true;

  /* const warriorPos = mapToScreen({ x: 8, y: 8 });
  const warrior: Sprite = Sprite.from("warrior.png");
  warrior.height = 70;
  warrior.width = warrior.height / 1.5;
  warrior.anchor.set(0.5, 1);
  warrior.x = warriorPos.x;
  warrior.y = warriorPos.y + 15;
  map.addChild(warrior); */
};

const onMouseMove = (e) => {
  //printScreenAndMapCoordinates(e);

  if (!isDragging) {
    return;
  }
  var dx = e.clientX - prevX;
  var dy = e.clientY - prevY;

  map.x += dx;
  map.y += dy;
  prevX = e.clientX;
  prevY = e.clientY;
};

const onMouseUp = () => {
  isDragging = false;
};

document.addEventListener("mousedown", onMouseDown);
document.addEventListener("mousemove", onMouseMove);
document.addEventListener("mouseup", onMouseUp);

function zoom(e) {
  console.log("e >> ", e);

  const direction = e.deltaY < 0 ? 1 : -1;
  const factor = 1 + direction * 0.1;
  map.scale.x *= factor;
  map.scale.y *= factor;
  map.x;
}

document.addEventListener("wheel", zoom);

/* 
  ElementalCode [pixijs] — Today at 6:50 AM
The canned solution I don't really like: pixi-viewport

What I would do: fix the map centering every time that I zoom + use toLocal to convert the screen coords to map coords and then check what is the tile under the mouse



const tile: Sprite = Sprite.from("whiteTile.png");
  tile.anchor.set(0.5);
  tile.x = screenPoint.x;
  tile.y = screenPoint.y;
  tile.interactive = true;
  tile.on("mousemove", (e: MouseEvent) => {
    const target = e.target as unknown as Sprite;
    if (target) {
      const fixX = map.x; // because not use map.pivot.x for center
      const fixY = map.y; // because not use map.pivot.y for center
      const coor = app.stage.toLocal(target.position);
      console.log(
        "🟩coor:",
        "(x:",
        (coor.x + fixX),
        ", y:",
        (coor.y + fixY),
        " ) ",
        map.scale.x.toFixed(2)
      );
    }
  });
  map.addChild(tile);
}

update(mouse){
        const Master = this.child.Master;
        const bubblePin = this.child.bubblePin;
      
        const pos2 = $stage.toLocal(this.target.position3d,$camera.view);
        pox = this._pox = pos2.x;
        poy = this._poy = pos2.y;
        pox = pox-mouse.x-this._pinX;
        poy = poy-mouse.y-this._pinY;

        bubblePin.clear();
        bubblePin.lineStyle(0);
        bubblePin.beginFill(0xffffff, 1)
        bubblePin.moveTo(40,0);
        bubblePin.quadraticCurveTo(this._curvX, poy/this._curvY, pox, poy);
        bubblePin.quadraticCurveTo(0, poy/this._curvY, 0, 0);
        bubblePin.endFill();

        bubblePin.position.set(this._pinX,this._pinY);
    }

    // add debug mouse coord from background
    createMouseCoor(){
        const C = new PIXI.Container();
        const [coorX,coorY] = [
            new PIXI.Text("",{fontSize:20,strokeThickness:2,stroke:0x000000}),
            new PIXI.Text("",{fontSize:20,strokeThickness:2,stroke:0x000000}),
            ];
        const point = new PIXI.Sprite(PIXI.Texture.WHITE);
        point.anchor.set(0.5);
        [coorX.x,coorY.x] = [16,80];
        C.addChild(coorX,coorY,point);
        $stage.addChild(C);
        console.log($app.renderer.plugins.interaction);
        $app.ticker.add(function(){
            C.position.set(this.mouse.global.x,this.mouse.global.y);
            let pos = this.mouse.getLocalPosition($stage.scene.bg, new PIXI.Point(), this.mouse.global);
            let inX = Math.abs(~~pos.x)>$stage.scene.bg.width/2?"#ff0000":"#ffffff";
            let inZ = Math.abs(~~pos.y)>$stage.scene.bg.height/2?"#ff0000":"#ffffff";
            coorX.style.fill = inX;
            coorY.style.fill = inZ;
            coorX.text = `x:${~~pos.x}`;
            coorY.text = `z:${~~pos.y}`;
        },$app.renderer.plugins.interaction);
    };
*/
