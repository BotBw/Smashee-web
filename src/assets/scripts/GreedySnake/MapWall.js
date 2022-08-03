import { GameObject } from "../GameObject";

export class MapWall extends GameObject {
  constructor(x, y, map) {
    super();
    this.x = x;
    this.y = y;
    this.map = map;
    this.color = "#FF7F50"; // orange
  }

  update_wall() {
    const pixel = this.map.pixel;
    const ctx = this.map.ctx;

    ctx.fillStyle = this.color;
    ctx.fillRect(pixel * this.y, pixel * this.x, pixel, pixel);
  }

  update() {
    this.update_wall();
  }
}