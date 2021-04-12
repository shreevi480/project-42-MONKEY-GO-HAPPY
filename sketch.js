 // adding variables
 var monkey, monkey_running, monkeyCollide;

 var ground, Background, backgroundImage;
 var banana, bananaImage, obstacle, obstacleImage;

 var FoodGroup, obstacleGroup;

 var survivalTime = 0;
 var bananaScore = 0;

 var PLAY = 0;
 var END = 1;

 var gameState = PLAY;

 var gameOverSound, jumpSound;



 function preload() {
   // loading images and animation

   backgroundImage = loadImage("jungle.jpg")
   monkey_running = loadAnimation("monkey_0.png", "monkey_1.png", "monkey_2.png", "monkey_3.png", "monkey_4.png", "monkey_5.png", "monkey_6.png", "monkey_7.png", "monkey_8.png", "monkey_9.png")

   monkeyCollide = loadAnimation("monkey_1.png");

   bananaImage = loadImage("banana.png");
   obstacleImage = loadImage("obstacle.png");
   gameOverSound = loadSound("game over.mp3");
   jumpSound = loadSound("jump.mp3");
 }



 function setup() {

   // creating canvas
   createCanvas(735, 400);

   // creatting obstacle and banana group
   obstacleGroup = createGroup();
   bananaGroup = createGroup();

   // creatting background sprite
   Background = createSprite(0, 0, 800, 400);
   Background.addImage(backgroundImage);
   Background.scale = 1.5;
   Background.x = Background.width / 2;
   Background.velocityX = -4;


   // creatting  monkey and adding animation
   monkey = createSprite(75, 375, 10, 10);
   monkey.scale = 0.12;
   monkey.addAnimation("monkey", monkey_running);
   monkey.addAnimation("collide", monkeyCollide);

   // creatting ground and adding animation 
   ground = createSprite(75, 375, 50, 10)
   ground.visible = false;



 }



 function draw() {

  
   background("cyan");



    
   if (gameState === PLAY) {

     obstacles();
     bananas();

     
     survivalTime = survivalTime + Math.round(getFrameRate() / 60);

     
     Background.velocityX = -(4 + survivalTime * 3 / 100);


     
     if (keyDown("space") && monkey.collide(ground)) {
       monkey.velocityY = -20;
       jumpSound.play();
     }

     
     if (Background.x < 0) {
       Background.x = Background.width / 2;
     }

     
     if (bananaGroup.isTouching(monkey)) {
       bananaScore = bananaScore + 2;

       bananaGroup.destroyEach();
       switch (bananaScore) {
         case 2:
           monkey.scale = 0.13;
           break;
         case 5:
           monkey.scale = 0.14;
           break;
         case 10:
           monkey.scale = 0.16;
           break;
         case 15:
           monkey.scale = 0.18;
           break;
         case 20:
           monkey.scale = 0.20;
           break;
         case 25:
           monkey.scale = 0.25;
           break;
         case 30:
           monkey.scale = 0.27;
           break;
         case 40:
           monkey.scale = 0.3;
           break;
         case 50:
           monkey.scale = 0.32;
           break;
         default:
           break;
       }
     }


     // when obstacle is touching monkey game went to end
     if (obstacleGroup.isTouching(monkey)) {
       gameState = END
       gameOverSound.play();
     }

   }

   if (gameState === END) {

     // stopping Ground to move
     ground.velocityX = 0;
     Background.velocityX = 0;

     // adding monkey when it collide
     monkey.scale = 0.12;
     monkey.changeAnimation("collide", monkeyCollide);


     obstacleGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);

     obstacleGroup.setLifetimeEach(-1);
     bananaGroup.setLifetimeEach(-1);


     // adding if condition for restart
     if (keyDown("r")) {
       reset();
     }
   }

   // adding gravity
   monkey.velocityY = monkey.velocityY + 1;

   // making monkey collide to ground
   monkey.collide(ground);

   drawSprites();

   // adding text for Game over and restart
   if (gameState === END) {

     fill(rgb(30, 255, 34));
     textSize(44);
     stroke("black");
     strokeWeight(4)
     text("Game Over !", 245, 180);
     text("Press R to Restart", 200, 230);
   }

   // adding Score and Survival time
   textSize(20);
   fill("red");
   stroke("yellow");
   strokeWeight("5");
   text("survival Time :  " + survivalTime, 550, 50);
   text("Score  :  " + bananaScore, 25, 50);


 }

 // declaring bananas function
 function bananas() {
   if (frameCount % 100 === 0) {

     banana = createSprite(730, 200, 50, 50)
     banana.addAnimation("banana", bananaImage);
     banana.scale = 0.15;
     banana.y = Math.round(random(150, 100));
     banana.velocityX = -(6 + survivalTime * 2 / 100);
     banana.lifetime = 125;
     bananaGroup.add(banana);
     bananaGroup.add(banana);
     //banana.debug = true ;
     banana.setCollider("circle", 0, 0, 180);

   }
 }


 // declaring obstacles function
 function obstacles() {
   if (frameCount % 150 === 0) {

     obstacle = createSprite(800, 350, 50, 50);
     obstacle.addAnimation("rock", obstacleImage);
     //obstacle.debug = true;
     obstacle.setCollider("circle", 0, 0, 180);
     obstacle.scale = 0.15;
     obstacle.velocityX = -(6 + survivalTime * 2 / 100);
     obstacle.lifetime = 125;
     obstacleGroup.add(obstacle);

   }
 }

 // declaring reset function
 function reset() {
   bananaGroup.destroyEach();
   obstacleGroup.destroyEach();
   monkey.changeAnimation("monkey", monkey_running);

   bananaScore = 0;
   survivalTime = 0;
   gameState = PLAY;
 }