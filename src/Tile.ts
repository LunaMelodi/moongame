import { Container, Sprite } from "pixi.js";

export default class Tile extends Container {
  public mapX;
  public mapY;

  constructor(mapX: number, mapY: number, inputsprite) {
    super();
    this.mapX = mapX;
    this.mapY = mapY;
    let sprite = Sprite.from(inputsprite);
    sprite.anchor.set(0.5);
    this.addChild(sprite);
    this.interactive = true;
    this.on("mousemove", this.onevent);
  }

  onevent = (event) => {
    const target = event.target;
    if (target) {
      const mousePos = event.data.getLocalPosition(target);
      /* const w = 64;
      const h = 32; */
      const w = (target as Sprite).width / 2;
      const h = (target as Sprite).height / 2;
      mousePos.y -= h - 16;
      // console.log("🟩coor:", "(x:", mousePos.x, ", y:", mousePos.y, " ) ");
      if (Math.abs(mousePos.x) * h + Math.abs(mousePos.y) * w <= w * h) {
        event.stopPropagation();

        if (this !== undefined) {
          const mapX = this.mapX;
          const mapY = this.mapY;

          console.log("🟩map:", "(x:", mapX, ", y:", mapY, " ) ");
        }
      }
    }
  };
}
