import { GameObject } from "../GameObject";
import { MapWall } from "./MapWall"

export default class GameMap extends GameObject {
  constructor(ctx, parent, mapType) {
    super();
    this.ctx = ctx;
    this.parent = parent;
    this.pixel = 0;
    // this.snake = new Snake(this.ctx, this);
    this.color_a = "#AAD751"; // green
    this.color_b = "#A2D149"; // green

    // default map settings
    let row = 13;
    let col = 13;
    let wall_cnt = 40;
    if(mapType === "small") {
      row = 10;
      col = 10;
      wall_cnt = 15;
    } else if (mapType === "large") {
      row = 20;
      col = 20;
      wall_cnt = 150;
    }
    this.row = row;
    this.col = col;
    this.wall_cnt = wall_cnt;
    this.walls = [];
    this.timeout_cnt = 10000;
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
      if(wall_cor[i][j] || wall_cor[this.row - j - 1][this.col - i - 1]) continue;
      wall_cor[i][j] = wall_cor[this.row - j - 1][this.col - i - 1] = true;
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
    let timeout_cnt = 0;
    do {
      wall_cor = this.generate_random_walls();
      timeout_cnt++;
    } while(!this.check_walls(wall_cor) && timeout_cnt < this.timeout_cnt);

    console.log(timeout_cnt);

    for(let i = 0; i < this.row; i++) {
      for(let j = 0; j < this.col; j++) {
        if(wall_cor[i][j]) 
          this.walls.push(new MapWall(i, j, this));
      }
    }
  }

  start() {
    this.generate_valid_walls();
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
  }
}