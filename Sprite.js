class Sprite {
  constructor(config){

  this.image = new Image();
  this.image.src = config.src;
  this.image.onload = () => {
    this.isLoaded = true;
  }

  this.animations = config.animations || {
    "idle-down" : [ [0,0] ],
    "idle-right": [ [0,1] ],
    "idle-up"   : [ [0,2] ],
    "idle-left" : [ [1,3] ],
    "walk-down" : [ [1,0],[0,0],[3,0],[0,0], ],
    "walk-right": [ [1,1],[0,1],[3,1],[0,1], ],
    "walk-up"   : [ [1,2],[0,2],[3,2],[0,2], ],
    "walk-left" : [ [2,3],[1,3],[0,3],[1,3], ]
  }
  this.currentAnimation = "walk-left"; //config.currentAnimation || "idle-down";
  this.currentAnimationFrame = 0;

  this.animationFrameLimit= config.animationFrameLimit || 8;
  this.animationFrameProgress = this.animationFrameLimit;

  this.gameObject = config.gameObject;
}

get frame(){
  return this.animations[this.currentAnimation][this.currentAnimationFrame]
}

setAnimation(key) {
  if (this.currentAnimation !== key) {
    this.currentAnimation = key;
    this.currentAnimationFrame = 0;
    this.animationFrameProgress = this.animationFrameLimit;
  }
}

updateAnimationProgress() {
  if (this.animationFrameProgress > 0) {
    this.animationFrameProgress -= 1;
    return;
  }

  this.animationFrameProgress = this.animationFrameLimit;
  this.currentAnimationFrame += 1;

  if (this.frame === undefined) {
    this.currentAnimationFrame = 0
  }
}

draw(ctx,cameraPerson) {
  const x = this.gameObject.x - 28.5 + utils.withGrid(10.5) - cameraPerson.x;
  const y = this.gameObject.y - 64 + utils.withGrid(6) - cameraPerson.y;

  const [frameX,frameY] = this.frame;

  this.isLoaded && ctx.drawImage(this.image,
    frameX * 114,frameY * 114,
    114,114,
    x,y,
    114,114
  )

  this.updateAnimationProgress();
}


}
