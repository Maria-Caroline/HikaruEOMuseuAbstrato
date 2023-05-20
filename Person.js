class Person extends GameObject{
  constructor(config) {
      super(config);
      this.movingProgressRemaining = 0;

      this.isPlayerControlled = config.isPlayerControlled || false;

      this.directionUpdate = {
        "up": ["y", -3],
        "down": ["y", 3],
        "left": ["x", -3],
        "right": ["x", 3],
      }
  }

  update(state) {
    if (this.movingProgressRemaining > 0) {
      this.updatePosition();
    } else {
      if (!state.map.isCutscenePlaying && this.isPlayerControlled && state.arrow) {
        this.startBehavior(state, {
          type: "walk",
          direction: state.arrow
        })
      }
      this.updateSprite(state);
    }
  }

  startBehavior(state, behavior) {
    this.direction = behavior.direction;
    
    if (behavior.type === "walk") {
      //Stop here if space is not free
      if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {

        behavior.retry && setTimeout(() => {
          this.startBehavior(state, behavior)
        }, 10);

        return;
      }

      //Ready to walk!
      state.map.moveWall(this.x, this.y, this.direction);
      this.movingProgressRemaining = 57;
      this.updateSprite(state);
    }

    if (behavior.type === "stand") {
      this.isStanding = true;
      setTimeout(() => {
        utils.emitEvent("PersonStandComplete", {
          whoId: this.id
        })
        this.isStanding = false;
      }, behavior.time)
    }

  }
  
  updatePosition() {
      const [property, change] = this.directionUpdate[this.direction];
      this[property] += change;
      this.movingProgressRemaining -= 3;

      if (this.movingProgressRemaining === 0) {
        //We finished the walk!
        utils.emitEvent("PersonWalkingComplete", {
          whoId: this.id
        })

      }
  }

  updateSprite() {
    if (this.movingProgressRemaining > 0) {
      this.sprite.setAnimation("walk-"+this.direction);
      return;
    }
    this.sprite.setAnimation("idle-"+this.direction);    
  }
  
}

