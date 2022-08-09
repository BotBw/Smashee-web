import { GameObject } from "../GameObject";
import { SnakeCell } from "./SnakeCell";

export class Snake extends GameObject {
  constructor(map, color, begin_i, begin_j, init_len) {
    super();
    this.map = map;
    this.color = color;
    this.cells = [new SnakeCell(begin_i, begin_j)];
    this.speed = 2/1000
    this.dir = -1; // -1: not moving, 0, 1, 2, 3, up, right, down, left
    this.state = Snake.StateEnum.idling;
    this.next_cell = null;
    this.step = 0;
    this.init_len = init_len;
  }

  start() {}

  set_dir(new_dir) {
    this.dir = new_dir
  }

  next_step() {
    const d = this.dir;
    const dx = Snake.dx, dy = Snake.dy;
    
    this.next_cell = new SnakeCell(this.cells[0].x + dx[d], this.cells[0].y + dy[d]);
    this.dir = -1;
    
    let new_cells = [];
    new_cells.push(new SnakeCell(this.cells[0].x, this.cells[0].y));
    for(let cell of this.cells) {
      new_cells.push(cell);
    }
    this.cells = new_cells;

    this.state = Snake.StateEnum.moving;
    this.step++;

    if(!this.map.check_valid(this.next_cell)) this.state = Snake.StateEnum.died;
  }

  update_move() {
    const eps = Snake.eps;
    const xx = this.next_cell.x - this.cells[0].x, yy = this.next_cell.y - this.cells[0].y;
    const dis = Math.sqrt(xx*xx + yy*yy);
    const isIncreasing = this.check_longer_snake();
    if(dis < eps) {
      this.state = Snake.StateEnum.idling;
      this.cells[0] = this.next_cell;
      this.next_cell = null;
      if(!isIncreasing) this.cells.pop();
    } else {
      const delta = this.speed * this.timedelta;
      const delta_x = delta * xx / dis, delta_y = delta * yy / dis;
      this.cells[0].x += delta_x;
      this.cells[0].y += delta_y;
      if(!isIncreasing) {
        let i = this.cells.length - 1;
        const delta_x_tail = delta * (this.cells[i-1].x - this.cells[i].x) / dis;
        const delta_y_tail = delta * (this.cells[i-1].y - this.cells[i].y) / dis;
        this.cells[i].x += delta_x_tail;
        this.cells[i].y += delta_y_tail;
      }
    }
  }

  check_longer_snake() {
    if(this.cells.length <= this.init_len) return true;
    else if(this.step != this.init_len && (this.step - this.init_len) % 5 == 0) return true;
    return false;
  }

  update_draw() {
    const pixel = this.map.pixel;
    const ctx = this.map.ctx;

    ctx.fillStyle = this.color;
    if(this.state === Snake.StateEnum.died) ctx.fillStyle = "grey";
    for(let cell of this.cells) {
      ctx.beginPath();
      ctx.arc((cell.y + 0.5) * pixel, (cell.x + 0.5) * pixel, pixel/2 - 1, 0, 2 * Math.PI);
      ctx.fill();
    }
    for(let i = 1; i < this.cells.length; i++) {
      const a = this.cells[i-1], b = this.cells[i];
      if(a.x === b.x) ctx.fillRect((Math.min(a.y, b.y) + 0.5)*pixel, a.x * pixel, Math.abs(a.y - b.y)*pixel, pixel);
      else ctx.fillRect(a.y*pixel, (Math.min(a.x, b.x) + 0.5)*pixel, pixel, Math.abs(a.x - b.x)*pixel);
    }
  }

  update() {
    if (this.state === Snake.StateEnum.moving) {
      this.update_move();
    }
    this.update_draw();
  }
}

Snake.StateEnum = Object.freeze({"idling": 0, "moving": 1, "died": 2});

Snake.dx = [
  -1, // up
  0, // right
  1, // down
  0 // left
];

Snake.dy = [0, 1, 0, -1];
Snake.eps = 0.01;
