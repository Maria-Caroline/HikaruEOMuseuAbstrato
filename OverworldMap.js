class OverworldMap {
    constructor(config){
        this.gameObjects = config.gameObjects;
        this.walls = config.walls || {};
        this.map = new Image();
        this.map.src = config.mapSrc;
    }

    drawMap(ctx, cameraPerson) {
        ctx.drawImage(
          this.map, 
          utils.withGrid(10.5) - cameraPerson.x, 
          utils.withGrid(6) - cameraPerson.y
          )
      }

    isSpaceTaken(currentX, currentY, direction) {
        const {x,y} = utils.nextPosition(currentX, currentY, direction);
        return this.walls[`${x},${y}`] || false;
      }
    
      mountObjects() {
        Object.values(this.gameObjects).forEach(o => {
          o.mount(this);
    
        })
      }

      addWall(x,y) {
        this.walls[`${x},${y}`] = true;
      }
      removeWall(x,y) {
        delete this.walls[`${x},${y}`]
      }
      moveWall(wasX, wasY, direction) {
        this.removeWall(wasX, wasY);
        const {x,y} = utils.nextPosition(wasX, wasY, direction);
        this.addWall(x,y);
      }
}

window.OverworldMaps = {
    mainRoom: {
        mapSrc: "images/map/map.png",
        gameObjects:{
            hero: new Person({
            isPlayerControlled: true,
            x: utils.withGrid(0),
            y: utils.withGrid(5),
            })
        },
        walls: {
            //parede
          [utils.asGridCoord(3,2)] : true,
          [utils.asGridCoord(2,2)] : true,
          [utils.asGridCoord(1,2)] : true,
          [utils.asGridCoord(4,2)] : true,
          [utils.asGridCoord(5,2)] : true,
          [utils.asGridCoord(6,2)] : true,
          [utils.asGridCoord(7,2)] : true,
          [utils.asGridCoord(8,2)] : true,
          [utils.asGridCoord(9,2)] : true,
          [utils.asGridCoord(10,2)] : true,
          [utils.asGridCoord(11,2)] : true,

          //escultura
          [utils.asGridCoord(5,5)] : true,
          [utils.asGridCoord(6,5)] : true,
          [utils.asGridCoord(5,4)] : true,
          [utils.asGridCoord(6,4)] : true,

            //box
          [utils.asGridCoord(-1,5)] : true,
          [utils.asGridCoord(0,6)] : true,
          [utils.asGridCoord(0,7)] : true,
          [utils.asGridCoord(0,4)] : true,
          [utils.asGridCoord(0,3)] : true,
          [utils.asGridCoord(0,7)] : true,
        
          [utils.asGridCoord(1,8)] : true,
          [utils.asGridCoord(2,8)] : true,
          [utils.asGridCoord(3,8)] : true,
          [utils.asGridCoord(1,8)] : true,
          [utils.asGridCoord(2,8)] : true,
          [utils.asGridCoord(3,8)] : true,
          [utils.asGridCoord(1,8)] : true,
          [utils.asGridCoord(2,8)] : true,
          [utils.asGridCoord(3,8)] : true,
          [utils.asGridCoord(4,8)] : true,
          [utils.asGridCoord(5,8)] : true,
          [utils.asGridCoord(6,8)] : true,
          [utils.asGridCoord(7,8)] : true,
          [utils.asGridCoord(8,8)] : true,
          [utils.asGridCoord(9,8)] : true,
          [utils.asGridCoord(10,8)] : true,

          [utils.asGridCoord(11,5)] : true,
          [utils.asGridCoord(11,6)] : true,
          [utils.asGridCoord(11,7)] : true,
          [utils.asGridCoord(11,4)] : true,
          [utils.asGridCoord(11,3)] : true,
          [utils.asGridCoord(11,7)] : true,
        }
    }
}