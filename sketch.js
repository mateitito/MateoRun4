var GameState = "PLAY";

var invisibleGround, BackGround,backGround, BackGround2, backGround22;
var playerStop, PlayerStop;
var player,playerRun;
var playerJump, Jump;
var SuperJump, SJump;
var SuperSpeed, SSpeed;
var PlayerDown, Down;
var playerFall, Fall;
var moneyScore;
var money, Money;
var GameOver, GameOverText, Button, resetButton;
var obstacle1,obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, obstaclesDownGroup, obstaclesUpGroup;



function preload(){
  BackGround=loadImage("BackGround.jpeg");
  BackGround2 = loadImage("floor.jpg");

  player=loadAnimation("playerRun1.jpeg","Run2.jpeg","Run3.jpeg");
  playerStop = loadImage("player.jpeg");
  playerJump = loadImage("Jump.jpeg");
  PlayerDown = loadImage("down.jpeg");
  playerFall = loadImage("fall.jpeg");

  money = loadImage("Money.jpeg");
  GameOver = loadImage("GAME_OVER.jpeg");
  Button = loadImage("resetButton.jpeg");
  SuperJump = loadImage("SuperJump.jpeg");
  SuperSpeed = loadImage("SuperSpeed.jpeg");

  obstacle1 = loadImage("obstacle1.jpeg");
  obstacle2 = loadImage("obstacle2.jpeg");
  obstacle3 = loadImage("grandMother.jpeg");
  obstacle4 = loadImage("stroller.jpeg");
  obstacle5 = loadImage("badBird.jpeg");
  obstacle6 = loadImage("bomb.jpeg");

  money = loadImage("Money.jpeg");

}

function setup(){
  createCanvas(950,950)
  backGround = createSprite(400,200);
  backGround.addImage(BackGround);

  backGround22 = createSprite(100,1200);
  backGround22.addImage(BackGround2);

  invisibleGround = createSprite(500,695,950,10);
  invisibleGround.visible = false;
  
  playerRun = createSprite(150,630);
  playerRun.addAnimation("Run",player);
  playerRun.addAnimation("Down",PlayerDown);
  playerRun.addAnimation("Jump", playerJump);
  playerRun.addAnimation("Fall", playerFall);
  playerRun.debug = true;
  //playerRun.setCollider()
  
  obstaclesDownGroup = new Group();
  obstaclesUpGroup = new Group();

  GameOverText = createSprite(480, 300);
  GameOverText.scale = 0.5;
  GameOverText.addImage("endText", GameOver);

  resetButton = createSprite(450, 600);
  resetButton.scale = 0.2;
  resetButton.addImage("reset", Button);
  
  Money = createSprite(550, 80);
  Money.addImage(money)
  Money.scale = 0.5
  moneyScore = 0;
}


function draw(){

if(GameState === "PLAY"){

  GameOverText.visible = false;
  resetButton.visible = false;

  playerRun.scale = 1
  
  backGround.velocityX=-2;
  backGround22.velocityX=-2;
  if(backGround.x < 0){
    backGround.x = width/4;
  }
  if(backGround22.x < 0){
    backGround22.x = width/4;
  }
  if(keyDown("UP_ARROW") && playerRun.y > 600){
    playerRun.velocityY = -20;
    playerRun.changeAnimation("Jump");
  }

  if(playerRun.y < 500){
    playerRun.changeAnimation("Run");
  }

  if(keyDown("DOWN_ARROW")){
    playerRun.changeAnimation("Down");
  }
  playerRun.velocityY = playerRun.velocityY +0.8;
  spawnObstacles();
  spawnUpObstacles();

  if(obstaclesDownGroup.isTouching(playerRun) || obstaclesUpGroup.isTouching(playerRun)){
    playerRun.velocityY =0;
    
    backGround.velocityX = 0;
    backGround22.velocityX = 0;
    obstaclesDownGroup.setVelocityXEach(0);
    obstaclesDownGroup.setLifetimeEach(-1);
    obstaclesUpGroup.setVelocityXEach(0);
    obstaclesUpGroup.setLifetimeEach(-1);
    GameState = "END";
  }
}

if(GameState === "END"){
  GameOverText.visible = true;
  resetButton.visible = true;

  playerRun.changeAnimation("Fall");
    playerRun.scale = 0.1
    //crear animacion de perder

  if(mousePressedOver(resetButton)){
    reset();
  }
}
  
  drawSprites();
  moneyScore = moneyScore +1;
  textSize(30);
  fill(0);
  text("Money Score: " + moneyScore, 600,100);
  playerRun.collide(invisibleGround);

  
}

function spawnObstacles (){
  if(frameCount % 300 === 10) { 
    var obstacle = createSprite(950,650,10,40);
    obstacle.velocityX = -6 // + score/100;

    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              obstacle.scale = 0.6
              break;
      case 2: obstacle.addImage(obstacle2);
              obstacle.scale = 0.5
              break;
      case 3: obstacle.addImage(obstacle3);
              obstacle.scale = 0.07
              break;
      case 4: obstacle.addImage(obstacle4);
              obstacle.scale = 0.07
              break;
      
      
      default: break;
    }
    obstacle.lifetime = 200;
    obstaclesDownGroup.add(obstacle);
  }
}

function spawnUpObstacles (){
  if(frameCount % 200 === 0) { 
    var obstacle = createSprite(950,565 ,10,40);
    obstacle.velocityX = -6 // + score/100;

    var rand = Math.round(random(1,2));
    switch(rand) {

      case 1: obstacle.addImage(obstacle5);
              obstacle.scale = 0.1
              break;
      case 2: obstacle.addImage(obstacle6);
              obstacle.scale = 0.07
              break;
      default: break;
    }
    obstacle.lifetime = 200;

    obstaclesUpGroup.add(obstacle);
  }
}

  function reset(){
    GameState = "PLAY";
    obstaclesDownGroup.destroyEach();
    obstaclesUpGroup.destroyEach();
    moneyScore = 0;
  }