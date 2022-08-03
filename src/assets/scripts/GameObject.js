// A simple game engine

const GLOBAL_OBJECTS = [];

export class GameObject {
  constructor() {
    GLOBAL_OBJECTS.push(this);
    this.timedelta = 0;
    this.started = false;
  }

  start() {

  }


  update() {
  }

  _destroy() {

  }

  destroy() {
    this._destroy();
    for (let i in GLOBAL_OBJECTS) {
      if(GLOBAL_OBJECTS[i] === this) {
        GLOBAL_OBJECTS.splice(i, 1);
        break;
      }
    }
  }
}

let last_frame_time;

const draw_frame = timestamp => {
  for (let obj of GLOBAL_OBJECTS) {
    if(!obj.started) {
      obj.start();
      obj.started = true;
    } else {
      obj.timedelta = timestamp - last_frame_time
      obj.update();
    }
  }
  last_frame_time = timestamp
  requestAnimationFrame(draw_frame);
}

requestAnimationFrame(draw_frame);