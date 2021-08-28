var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload() {
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(400,600);
  
  // Moving background
  path=createSprite(200,100);
  path.addImage(pathImg);
  path.velocityY = 4;
  path.scale = 0.8;
  path.height = 5000;

  //creating boy running
  boy = createSprite(70,580,20,20);
  boy.addAnimation("SahilRunning",boyImg);
  boy.scale=0.08;
    
  cashG= new Group();
  diamondsG= new Group();
  jwelleryG= new Group();
  swordGroup= new Group();
} 

function draw() {

  if(gameState === PLAY){
    background(0);
    boy.x = World.mouseX;
    
    edges= createEdgeSprites();
    boy.collide(edges);
  
    //code to reset the background
    if(path.y > 2000){
      path.y = height/2;
    }
  
    createItems(cashG, cashImg, 0.12, 200)
    createItems(diamondsG, diamondsImg, 0.03, 320)
    createItems(jwelleryG, jwelleryImg, 0.13, 410)
    createItems(swordGroup, swordImg, 0.1, 530)

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection + 50;
    } else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();` `
      treasureCollection = treasureCollection + 150
    } else if (jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
    } else {
      if(swordGroup.isTouching(boy)) {
        gameState = END
        boy.addAnimation("SahilRunning", endImg)
        boy.x = 200
        boy.y = 300
        cashG.destroyEach();
        cashG.setVelocityYEach(0)
        boy.scale = 0.8
      }
    }
  
    drawSprites();
    textSize(20);
    fill("orange");
    text("Treasure: "+ treasureCollection,150,30);
  }
}

function createItems(group, image, scale, interval) {
  if (World.frameCount % interval == 0) {
    var item = createSprite(Math.round(random(50, 350),40, 10, 10));
    item.addImage(image);
    item.scale=scale;
    item.velocityY = 3;
    item.lifetime = 180;
    group.add(item);
  }
}