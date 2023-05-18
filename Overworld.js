class Overworld {
    constructor(config){
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");

    }

    startGameLoop(){
        const step = () => {

            this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);

            this.map.drawMap(this.ctx);

            Object.values(this.map.gameObjects).forEach(object =>{
                object.update({
                    arrow: this.directionInput.direction
                })
                object.sprite.draw(this.ctx);
            })

            requestAnimationFrame(() => {
                step();
            } )
        }
        step();
    }

    init(){
        this.map = new OverworldMaps(window.OverworldMaps.mainRoom);
        this.directionInput = new DirectionInput();
        this.directionInput.init();

        this.startGameLoop();
        
    }
}