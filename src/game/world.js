import {player} from './player.js';
import {aabb} from './util.js';

export class world {
  constructor() {
    this.geometry = [];
    this.entities = [];

    this.geometry.push(new block(200, 700, 900, 50));
    this.geometry.push(new block(200, 200, 50, 500));
    this.geometry.push(new block(625, 150, 50, 200));
    this.geometry.push(new block(525, 500, 250, 50));
    this.geometry.push(new block(1050, 200, 50, 500));

    this.entities.push(new player(500, 10));
  }
  
  update(context) {
    for (let i = 0; i < this.entities.length; i++) {
      this.doWorldCollisions(this.entities[i]);
      this.entities[i].update(context);
    }
    for (let i = 0; i < this.geometry.length; i++) this.geometry[i].update(context);
  }

  doWorldCollisions(entity) {
    entity.on_ground = false;
    for (let i = 0; i < this.geometry.length; i++) {
      if (aabb(entity, this.geometry[i])) {
        let x_axis_depth = 0
        let y_axis_depth = 0
        let top_depth = entity.y + entity.height - this.geometry[i].y;
        let bot_depth = entity.y - this.geometry[i].y - this.geometry[i].height;
        let left_depth = entity.x + entity.width - this.geometry[i].x;
        let right_depth = entity.x - this.geometry[i].x - this.geometry[i].width;

        // compute the closest edge
        if (math.abs(top_depth) < math.abs(bot_depth))
          y_axis_depth = top_depth;
        else
          y_axis_depth = bot_depth;

        if (math.abs(left_depth) < math.abs(right_depth))
          x_axis_depth = left_depth;
        else
          x_axis_depth = right_depth;

        //place the entity on the edge
        if (math.abs(x_axis_depth) <= math.abs(y_axis_depth)) {
          entity.x -= x_axis_depth;
          entity.x_vel = 0;
        } else {
          entity.y -= y_axis_depth;
          entity.y_vel = 0;
          if (y_axis_depth === top_depth)
            entity.on_ground = true;
        }
      }
    }
  }
}

class block {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  update(context) {
    context.fillStyle = '#525252';
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
