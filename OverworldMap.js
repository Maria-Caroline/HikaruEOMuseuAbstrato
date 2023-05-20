class OverworldMap {
    constructor(config){
        this.gameObjects = config.gameObjects;
        this.cutsceneSpaces = config.cutsceneSpaces || {};
        this.walls = config.walls || {};
        this.map = new Image();
        this.map.src = config.mapSrc;

        this.isCutscenePlaying = false;
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
        Object.keys(this.gameObjects).forEach(key => {
            let object = this.gameObjects[key];
            object.id = key;
            object.mount(this);
    
        })
      }

      async startCutscene(events){
        this.isCutscenePlaying= true;

        for(let i= 0;i<events.length; i++ ){
          const eventHandler = new OverworldEvent({
            event: events[i],
            map: this,
          })
          await eventHandler.init();
        }
        this.isCutscenePlaying = false;

        Object.values(this.gameObjects).forEach(object => object.doBehaviorEvent(this))
      }
    
      checkForFootstepCutscene() {
        const hero = this.gameObjects["hero"];
        const match = this.cutsceneSpaces[ `${hero.x},${hero.y}` ];
        if (!this.isCutscenePlaying && match) {
          this.startCutscene( match[0].events )
        }
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
        },
        cutsceneSpaces:{
          [utils.asGridCoord(3,3)] : [
          {
            events: [
              {type:"textMessage", text: "Obra composicaoAmareloAzulVermelho = \n new Quadro ('Composicao em Amarelo, Azul e Vermelho', 'Piet Mondrian', 1930, 'Óleo sobre tela')"},
            ]
          }
          ],
          [utils.asGridCoord(2,3)] : [
            {
              events: [
                {type:"textMessage", text: "Esse é um quadro, ele não é legal?"},
              ]
            }
            ],
            [utils.asGridCoord(7,3)] : [
              {
                events: [
                  {type:"textMessage", text: "Esse é um quadro, ele não é legal?"},
                ]
              }
              ],
              [utils.asGridCoord(10,3)] : [
                {
                  events: [
                    {type:"textMessage", text: "Quadro numero5 = new Quadro ('n° 5', 'Jackson Pollock', 1948, 'Oleo sobre cartão de fibra'"},
                  ]
                }
                ],
                [utils.asGridCoord(4,5)] : [
                  {
                    events: [
                      {type:"textMessage", text: "Você observa a escultura... ela é engraçada"},
                    ]
                  }
                  ],
                  [utils.asGridCoord(6,6)] : [
                    {
                      events: [
                        {type:"textMessage", text: "Obra balloonDog = new Escultura ('Balloon Dog', 'Jeff Koons', 1994, 'Porcelana'"},
                      ]
                    }
                    ]
        }
    }
}