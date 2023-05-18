class Sprite {
    constructor(config){

    this.image = new Image();
    this.image.src = config.src;
    this.image.onload = () => {
      this.isLoaded = true;
    }

    this.animations = config.animations || {
      idleDown: [
        [0,0]
      ]
    }
    this.currentAnimation = config.currentAnimation || "idleDown";
    this.currentAnimationFrame = 0;

    this.gameObject = config.gameObject;
  }

  draw(ctx) {
    const x = this.gameObject.x;
    const y = this.gameObject.y;

    this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);

    this.isLoaded && ctx.drawImage(this.image,
      0,0,
      120,120,
      x,y,
      150,150
    )
  }

}
