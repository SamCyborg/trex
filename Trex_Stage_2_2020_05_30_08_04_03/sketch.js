 var trex,trex_running,trex_collided;
var ground,invisibleground,groundimage;
var cloudsGrp,cloudimage;
var obstaclesGrp,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var PLAY=1;
var END=0;
var gameState=PLAY;
var score=0;
var go,restart,goimage,restartimage;
var a,b,c;

function preload() {
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided=loadAnimation("trex_collided.png");
  groundimage=loadImage("ground2.png");
  cloudimage=loadImage("cloud.png");
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
  goimage=loadImage("gameOver.png");
  restartimage=loadImage("restart.png");
  a=loadSound("checkPoint.mp3");
  b=loadSound("die.mp3");
  c=loadSound("jump.mp3");
}

function setup() {
  createCanvas(600, 200);
  trex=createSprite(50,130,20,60);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale=0.5;
  ground=createSprite(200,130,400,20);
  ground.addImage("ground",groundimage);
  cloudsGrp = new Group();
  obstaclesGrp = new Group();
  go=createSprite(380,100);
  go.addImage(goimage);
  go.visible=false;
  go.scale=0.5;
  restart=createSprite(380,120);
  restart.addImage(restartimage);
  restart.visible=false;
  restart.scale=0.5;
  ground.x=ground.width/2;
  ground.velocityX=-(6+3*score/100);
}

function draw() {
  background(180);
  text("score:"+score,500,50);
  trex.collide(ground); 
   
  if(gameState===PLAY){
  if(frameCount%5===0)
    score=score+1;
    
  if(keyDown("space")){
  trex.velocityY=-10;
  c.play();
  }  
  trex.velocityY=trex.velocityY+0.8;
  
  ground.velocityX=-6;
  if(ground.x<0)
  ground.x=200;
    
 if(score>0 && score%100===0){
   a.play();
 }
   spawnObstacles();
   spawnClouds();
    
   if(obstaclesGrp.isTouching(trex)){
      gameState=END;
  }
   
  }
  else if(gameState===END){
    ground.velocityX=0;
    b.play();
    obstaclesGrp.setVelocityXEach(0);
    cloudsGrp.setVelocityXEach(0);
    obstaclesGrp.setLifetimeEach(-1);
    cloudsGrp.setLifetimeEach(-1);
    trex.velocityY=0;
    trex.changeAnimation("collided",trex_collided);
    go.visible=true;
    restart.visible=true;
    if(mousePressedOver(restart))
    reset();
  }
  
  
  
  drawSprites();
}
function spawnObstacles(){
  if(frameCount%60===0){
    var obstacle=createSprite(600,115,40,40);
    obstacle.velocityX=-6;
    var r= Math.round(random(1,6));
    switch(r){
      case 1:obstacle.addImage(obstacle1);
        break;
      case 2:obstacle.addImage(obstacle2);
        break;
      case 3:obstacle.addImage(obstacle3);
        break;
      case 4:obstacle.addImage(obstacle4);
        break;
      case 5:obstacle.addImage(obstacle5);
        break;
      case 6:obstacle.addImage(obstacle6);
        break;
    }
    obstacle.scale=0.4;
    obstacle.lifetime=200;
    obstacle.depth=trex.depth;
    trex.depth=trex.depth+1;
    
    obstaclesGrp.add(obstacle);
  }
  
}
function spawnClouds(){
  if(frameCount%60===0){
    var cloud=createSprite(600,Math.round(random(50,80)),40,40);
    
    cloud.velocityX=-5;
    cloud.addImage(cloudimage);
    cloud.scale=0.4;
    cloud.lifetime=200;
    cloudsGrp.add(cloud);
    cloud.depth=trex.depth;
    trex.depth=trex.depth+1;
  }
}
function reset(){
  gameState=PLAY;
  go.visible=false;
  restart.visible=false;
  obstaclesGrp.destroyEach();
  cloudsGrp.destroyEach();
  trex.changeAnimation("running",trex_running);
  score=0;
}