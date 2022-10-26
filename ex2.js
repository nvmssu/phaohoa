const WIDTH = 1400;
const HEIGHT = 590;
const SIZE = 6;
const particle_size_change = 0.07;
const particle_size_change_seed = 0.6;
const ACCLERATION = 0.13;
const DOT_CHANG_SIZE_PEED = 0.3;
const DOT_CHANG_ALPHA_PEED = 0.06;
const PARTICLE_MIN_SPEED = 13;
const NUM_PARTICLE_BULEST = 60;
class particle {
  constructor(bullet, deg) {
    this.bullet = bullet;
    this.ctx = this.bullet.ctx;
    this.ctx = this.bullet.ctx;
    this.deg = deg;
    this.x = this.bullet.x;
    this.y = this.bullet.y;
    this.color = this.bullet.color;
    this.size = SIZE;
    this.speed = Math.random() * 4 + PARTICLE_MIN_SPEED;
    this.speedx = 0;
    this.speedy = 0;
    this.fallspeed = 0;
    this.dots = [
      // {
      //   // x:10,y:10,alpha:1,size:10
      // },
    ];
  }
  update() {
    this.speed -= particle_size_change_seed;
    if (this.speed < 0) {
      this.speed = 0;
    }
    this.fallspeed += ACCLERATION;
    this.speedx = this.speed * Math.cos(this.deg);
    this.speedy = this.speed * Math.sin(this.deg) + this.fallspeed;

    this.x += this.speedx;
    this.y += this.speedy;
    // console.log(this.x);

    if (this.size > particle_size_change) {
      this.size -= particle_size_change;
    }
    if (this.size > 0) {
      this.dots.push({
        x: this.x,
        y: this.y,
        alpha: 1,
        size: this.size,
      });
    }
    this.dots.forEach((dot) => {
      dot.size -= DOT_CHANG_SIZE_PEED;
      dot.alpha -= DOT_CHANG_ALPHA_PEED;
    });
    this.dots = this.dots.filter((dot) => {
      return dot.size > 0;
    });
    // if(this.dots.length==0){
    //   this.remove()
    // }
  }
  // remove(){
  //   this.bullet.particle.
  // }
  draw() {
    this.dots.forEach((dot) => {
      this.ctx.fillStyle = "rgba(" + this.color + "," + dot.alpha + ")";
      this.ctx.beginPath();
      this.ctx.arc(dot.x, dot.y, dot.size, 0, 2 * Math.PI);
      this.ctx.fill();
    });
  }
}

class bullet {
  constructor(fireworks) {
    this.fireworks = fireworks;
    this.ctx = fireworks.ctx;
    this.x = Math.random() * WIDTH;
    this.y = (Math.random() * HEIGHT) / 2;
    this.color =
      Math.floor(Math.random() * 255) +
      "," +
      Math.floor(Math.random() * 255) +
      "," +
      Math.floor(Math.random() * 255);
    this.particle = [];
    let bulletdeg = (Math.PI * 2) / NUM_PARTICLE_BULEST;
    for (let i = 0; i < NUM_PARTICLE_BULEST; i++) {
      let newparticle = new particle(this, i * bulletdeg);
      this.particle.push(newparticle);
    }
  }
  update() {
    this.particle.forEach((particle) => particle.update());
  }
  draw() {
    this.particle.forEach((particle) => particle.draw());
  }
}
class fireworks {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = WIDTH;
    this.canvas.height = HEIGHT;
    document.body.appendChild(this.canvas);
    this.bullet = [];
    setInterval(() => {
      let newbullet = new bullet(this);
      this.bullet.push(newbullet);
    }, 600);
    this.loop();
  }
  loop() {
    // console.log("loop");
    this.bullet.forEach((bullet) => bullet.update());
    this.draw();
    setTimeout(() => this.loop(), 20);
  }
  clearscreen() {
    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(0, 0, WIDTH, HEIGHT);
  }
  draw() {
    this.clearscreen();
    this.bullet.forEach((bullet) => bullet.draw());
  }
}

var f = new fireworks();
