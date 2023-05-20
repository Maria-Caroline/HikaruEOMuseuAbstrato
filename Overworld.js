class Overworld {
    constructor(config){
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.map = null;
    }

    startGameLoop(){
        const step = () => {

            this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);

            const cameraPerson = this.map.gameObjects.hero; 


            Object.values(this.map.gameObjects).forEach(object =>{
                object.update({
                    arrow: this.directionInput.direction,
                    map: this.map,
                })
            })

            this.map.drawMap(this.ctx, cameraPerson);

            Object.values(this.map.gameObjects).forEach(object => {
                object.sprite.draw(this.ctx, cameraPerson);
              })

            requestAnimationFrame(() => {
                step();
            } )
        }
        step();
    }

      bindHeroPositionCheck() {
        document.addEventListener("PersonWalkingComplete", e => {
          if (e.detail.whoId === "hero") {
            //Hero's position has changed
            this.map.checkForFootstepCutscene()
          }
        })
      }

      startMap(mapConfig) {
        this.map = new OverworldMap(mapConfig);
        this.map.overworld = this;
        this.map.mountObjects();
       }

    init(){
        this.startMap(window.OverworldMaps.mainRoom);
        
        this.bindHeroPositionCheck();
        this.map.mountObjects();


        this.directionInput = new DirectionInput();
        this.directionInput.init();

        this.startGameLoop();
        this.map.startCutscene([
            {type:"textMessage", text: "Explore com Hikaru o Museu Abstrato e entenda o conteúdo!"}
        ])
    }
}