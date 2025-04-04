const utils = {
    withGrid(n) {
        return n*57;
    },
    asGridCoord(x,y) {
        return `${x*57},${y*57}`
      },
      nextPosition(initialX, initialY, direction) {
        let x = initialX;
        let y = initialY;
        const size = 57;
        if (direction === "left") { 
          x -= size;
        } else if (direction === "right") {
          x += size;
        } else if (direction === "up") {
          y -= size;
        } else if (direction === "down") {
          y += size;
        }
        return {x,y};
      },
      oppositeDirection(direction) {
        if (direction === "left") { return "right" }
        if (direction === "right") { return "left" }
        if (direction === "up") { return "down" }
        return "up"
      },
      emitEvent(name, detail){
        const event = new CustomEvent(name, {
            detail
        });
        document.dispatchEvent(event);
      }
}