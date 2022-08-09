import { GameObject } from "../GameObject";
import { MapWall } from "./MapWall"
import { Snake } from "./Snake";

export default class GameMap extends GameObject {
  constructor(ctx, parent, mapType) {
    super();
    this.ctx = ctx;
    this.parent = parent;
    this.pixel = 0;

    this.color_a = "#AAD751"; // green
    this.color_b = "#A2D149"; // green

    // default map settings
    // row num and col num (it must satisfy (row + col) % 2 === 1)
    let row = 13;
    let col = 14;
    // num of walls
    let wall_cnt = 40;

    if(mapType === GameMap.mapType.small) {
      row = 10;
      col = 11;
      wall_cnt = 15;
    } else if (mapType === GameMap.mapType.large) {
      row = 20;
      col = 21;
      wall_cnt = 150;
    }
    this.row = row;
    this.col = col;
    this.wall_cnt = wall_cnt;

    this.walls = [];
    this.timeout_cnt = 10000;
    this.snakes = [new Snake(this, "#00CCFF", 1, 1, 3), new Snake(this, "#FF0066", this.row - 2, this.col - 2, 3)];
    this.add_listening_event();
    this.walls = this.generate_valid_walls();
  }

  generate_random_walls() {
    const wall_cor = []; // true means there is a wall
    for(let i = 0; i < this.row; i++) {
      wall_cor.push([]);
      for(let j = 0; j < this.col; j++) {
        wall_cor[i].push(false);
      }
    }
    // fill the corner and edge
    for(let i = 0; i < this.row; i++) {
      wall_cor[i][0] = wall_cor[i][this.col - 1] = true;
    }
    for(let i = 0; i < this.row; i++) {
      wall_cor[0][i] = wall_cor[this.row - 1][i] = true;
    }

    // randomly generate some walls 
    let cnt = 0;
    let timeout_cnt = 0;
    while(cnt < this.wall_cnt/2 && timeout_cnt < this.timeout_cnt) {
      timeout_cnt++;
      let i = parseInt(this.row * Math.random());
      let j = parseInt(this.col * Math.random());
      if((i == 1 && j == 1) || (i == this.row - 2 && j == this.col - 2)) continue;
      if(wall_cor[i][j] || wall_cor[this.row - i - 1][this.col - j - 1]) continue;
      wall_cor[i][j] = wall_cor[this.row - i - 1][this.col - j - 1] = true;
      cnt++;
    }
    return wall_cor;
  }

  check_walls(wall_cor) {
    const dx = [-1, 0, 1, 0];
    const dy = [0, 1, 0, -1];
    let q = [];
    const vis = [];
    for(let i = 0; i < this.row; i++) {
      vis.push([]);
      for(let j = 0; j < this.col; j++) {
        vis[i].push(false);
      }
    }
    vis[1][1] = true;
    q.push([1, 1]); 
    while(q.length > 0) {
      let frt = q.shift();
      let x = frt[0], y = frt[1];
      for(let k = 0; k < 4; k++) {
        let xx = x + dx[k], yy = y + dy[k];
        if(xx < 0 || yy < 0 || xx >= this.row || yy >= this.col || vis[xx][yy] || wall_cor[xx][yy]) continue;
        if(xx == this.row - 2 && yy == this.col - 2) return true;
        vis[xx][yy] = true;
        q.push([xx, yy]);
      }
    }
    return false;
  }
  
  generate_valid_walls() {
    var wall_cor;
    let walls = [];
    let timeout_cnt = 0;
    do {
      wall_cor = this.generate_random_walls();
      timeout_cnt++;
    } while(!this.check_walls(wall_cor) && timeout_cnt < this.timeout_cnt);

    for(let i = 0; i < this.row; i++) {
      for(let j = 0; j < this.col; j++) {
        if(wall_cor[i][j]) 
          walls.push(new MapWall(i, j, this));
      }
    }
    return walls;
  }

  check_valid(cell) {
    for (const wall of this.walls) {
      if(wall.x === cell.x && wall.y === cell.y) return false;
    }
    for(const snake of this.snakes) {
      let n = snake.cells.length;
      if(!snake.check_longer_snake()) n--;
      for(let i = 0; i < n; i++) {
        const c = snake.cells[i];
        if(c.x === cell.x && c.y === cell.y) return false;
      }
    }
    return true;
  }


  start() {}

  add_listening_event() {
    this.ctx.canvas.focus();
    const mapper = e => {
      if(e.key === 'w') this.snakes[0].set_dir(0);
      else if(e.key === 'd') this.snakes[0].set_dir(1);
      else if(e.key === 's') this.snakes[0].set_dir(2);
      else if(e.key === 'a') this.snakes[0].set_dir(3);
      else if(e.key === 'ArrowUp') this.snakes[1].set_dir(0);
      else if(e.key === 'ArrowRight') this.snakes[1].set_dir(1);
      else if(e.key === 'ArrowDown') this.snakes[1].set_dir(2);
      else this.snakes[1].set_dir(3);
    };
    this.ctx.canvas.addEventListener("keydown", mapper);
  }

  check_snakes_ready() {
    for(let snake of this.snakes) {
      // snake died or is moving (not idling)
      if(snake.state !== Snake.StateEnum.idling) return false;
      // next direction hasn't been set
      if(snake.dir === -1) return false;
    }
    return true;
  }

  next_step() {
    for(let snake of this.snakes) {
      snake.next_step();
    }
  }

  update_size() {
    this.pixel = parseInt(Math.min(this.parent.clientWidth/this.col, this.parent.clientHeight/this.row));
    this.ctx.canvas.width = this.pixel*this.col;
    this.ctx.canvas.height = this.pixel*this.row;
  }

  update_grid() {
    for(let i = 0; i < this.row; i++) {
      for(let j = 0; j < this.col; j++) {
        if((i + j) % 2 == 0) {
          this.ctx.fillStyle = this.color_a;
        } else {
          this.ctx.fillStyle = this.color_b;
        }
        this.ctx.fillRect(this.pixel * j, this.pixel * i, this.pixel, this.pixel);
      }
    }
  }

  update() {
    this.update_size();
    this.update_grid();
    if(this.check_snakes_ready()) {
      this.next_step();
    }
  }
}

GameMap.mapType = Object.freeze({"default": 0, "small": 1, "large": 3});