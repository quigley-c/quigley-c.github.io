export class player {
  constructor(x, y) {
    this.typename = 'player';
    
    // props
    this.x = x;
    this.y = y;
    this.width = 32;
    this.height = 64;

    // movement
    this.y_vel = 0;
    this.x_vel = 0;
    this.jump_vel = -30;
    this.accel = 1;
    this.decel = 2;
    this.max_speed = 10
    this.wants_left = false;
    this.wants_right = false;
    this.gravity = 2;
    this.max_y_vel = 20;

    // state
    this.on_ground = false;
    this.jump_lock = false;
    this.shoot_cooldown = 5;
    this.shoot_timer = 0;
    this.shoot_lock = false;    

    // anim
    this.img_idle = new Image();
    this.img_idle.src = 'game/img/robo-guy.png';
    this.img_run = new Image();
    this.img_run.src = 'game/img/robo-guy-run.png';
    this.anim_frame = 0;
    this.frame_timer = 0;
    this.frame_time = 5;
    this.anim_direction = 0;
    this.children = [];

    let self = this;
    document.addEventListener('keydown', function(event) {
      if (event.keyCode == 37) self.wants_left = true;
      if (event.keyCode == 39) self.wants_right = true;
      if (event.keyCode == 90) {
        if (!self.jump_lock) {
          self.wants_jump = true;
          self.jump_lock = true;
        }
      }
      if (event.keyCode == 88) {
        if (!self.shoot_lock && !self.shoot_timer > 0) {
          self.wants_shoot = true;
          self.shoot_lock = true;
        }
      }
    });

    document.addEventListener('keyup', function(event) {
      if (event.keyCode == 37) self.wants_left = false;
      if (event.keyCode == 39) self.wants_right = false;
      if (event.keyCode == 90) {
        self.wants_jump = false;
        self.jump_lock = false;
      }
    });
  }
  
  update(context) {
    // update children
    for (let i = 0; i < this.children.length; i++) this.children[i].update(context);

    // movement
    if (this.wants_left)  {
      if (this.x_vel > 0) this.x_vel = 0;
      this.x_vel = this.x_vel - this.accel;
      if (this.x_vel < -this.max_speed) this.x_vel = -this.max_speed;
    }
    if (this.wants_right)  {
      if (this.x_vel < 0) this.x_vel = 0;
      this.x_vel = this.x_vel + this.accel;
      if (this.x_vel > this.max_speed) this.x_vel = this.max_speed;
    }
    
    if ((!this.wants_left && !this.wants_right) || (this.wants_left && this.wants_right)) {
      if (this.x_vel > 0) this.x_vel = this.x_vel - this.decel;
      if (this.x_vel < 0) this.x_vel = this.x_vel + this.decel;
      if (this.x_vel < this.decel && this.x_vel > -this.decel) this.x_vel = 0;
    }

    // resolve state
    if (!this.on_ground) this.y_vel = this.y_vel + this.gravity;
    if (this.wants_jump && this.on_ground) {
      this.y_vel = this.jump_vel;
      this.on_ground = false;
      this.wants_jump = false;
    }
    if (this.y_vel > this.max_y_vel) this.y_vel = this.max_y_vel;

    let shot_dir = 1
    if (this.wants_shoot) {
      if (this.anim_direction)
        shot_dir = -1;
     
      // reuse object if available 
      this.reused_shot = false
      for (let i = 0; i < this.children.length; i++) {
        if (this.children[i].speed === 0) {
          this.children[i].go(this.x + (32 - (32 * this.anim_direction)), this.y + this.height/5*2, shot_dir);
          this.reused_shot = true;
          this.shoot_timer = this.shoot_cooldown;
          break;
        }
      }

      if (!this.reused_shot && this.children.length <= 5) {
        this.children.push(new shot(this.x + (32 - (32 * this.anim_direction)), this.y + this.height/5 * 2, shot_dir));
        this.shoot_timer = this.shoot_cooldown;
      }
      this.wants_shoot = false;
    }

    if (this.shoot_timer > 0)
      this.shoot_timer -= 1;
    else
      this.shoot_lock = false;

    // update position
    this.x = this.x + this.x_vel;
    this.y = this.y + this.y_vel;

    // draw
    if (this.x_vel != 0) {
      if (this.x_vel < 0)
        this.anim_direction = 1
      else if (this.x_vel > 0)
        this.anim_direction = 0

      context.drawImage(this.img_run, 32 * this.anim_frame, 32 * this.anim_direction, 32, 32, this.x-this.height/4, this.y, this.height, this.height);

      if (this.frame_timer != 0) {
        this.frame_timer -= 1;
        return
      }
      if (this.anim_frame < 5)
        this.anim_frame += 1;
      else
        this.anim_frame = 0;
      this.frame_timer = this.frame_time;
    }
    else
      context.drawImage(this.img_idle, 0, 32 * this.anim_direction, 32, 32, this.x-this.height/4, this.y, this.height, this.height);
  } 
}

class shot {
  constructor(x, y, dir){
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 10;
    this.speed = 20;
    this.dir = dir; // 1 or -1
    this.lifetime = 30;
    this.life_timer = this.lifetime;
    this.color = 'white';
  }
  update(context) {
    if (this.life_timer <= 0) {
      this.reset();
    }

    this.x += this.speed*this.dir
    this.life_timer -= 1;

    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }
  reset() {
    // collect object for reuse
    this.width = 0;
    this.height = 0;
    this.speed = 0;
    this.color = 'red';
  }

  go(x, y, dir) {
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 10;
    this.speed = 20;
    this.dir = dir;
    this.life_timer = this.lifetime;
  }
}
