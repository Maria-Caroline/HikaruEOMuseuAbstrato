class OverworldMaps {
    constructor(config){
        this.gameObjects = config.gameObjects;

        this.map = new Image();
        this.map.src = config.mapSrc;
    }

    drawMap(ctx){
        ctx.drawImage(this.map,0,0)
    }
}

window.OverworldMaps = {
    mainRoom: {
        mapSrc: "images/map/map.png",
        gameObjects:{
            hero: new Person({
                isPlayerControlled: true,
            x: utils.withGrid(4),
            y: utils.withGrid(5),
            })
        }
    }
}