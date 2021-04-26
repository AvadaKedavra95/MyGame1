var ironMan;
var bg;
var city,cityImage;
var ironManAnimation,ironManAnimation2;
var enemy,enemyAnimation1;
var enemyGroup;
var repulsor;
var COUNT=0;
var NOTCOUNT=1;
var STATE=NOTCOUNT;
var no=800;
var count = 500;
var Animation1=4;
var Animation2=5;
var Anim = 4;
var BM;



function preload(){
  ironManAnimation=loadAnimation("Ironman1/1.png","Ironman1/2.png","Ironman1/3.png",
  "Ironman1/4.png");

  ironManAnimation2=loadAnimation("Ironman2/1.png","Ironman2/2.png","Ironman2/3.png",
  "Ironman2/4.png","Ironman2/5.png","Ironman2/6.png","Ironman2/7.png","Ironman2/8.png",
  "Ironman2/9.png","Ironman2/10.png","Ironman2/11.png");

  cityImage=loadImage("Background/1.png");

  enemyFly=loadAnimation("Enemy/1.png","Enemy/2.png");

  skyImage=loadImage("Background/1.png");

  shoot=loadImage("fire.png");

  BM=loadSound("1.flac");

}



function setup(){

  createCanvas(1200,500);
  sky=createSprite(-3500,height/2,500,500);
  sky.scale=50;
  sky.addImage("skies",skyImage)
  sky.velocityX=2;
  
  city=createSprite(width/2,300,width*2,10);
  city.scale=5;
  city.addImage("City",cityImage);
  city.velocityX=80;
  enemyGroup=new Group();
  repulsorGroup=new Group();
  ironMan=createSprite(900,270,30,30);
  ironMan.addAnimation("Iron Man",ironManAnimation);
  ironMan.addAnimation("fires",ironManAnimation2);
  ironMan.scale=0.35;
  

  
}


function draw(){
console.log(Anim);
  background("white");
  BM.play

  // scrolling city
  if(city.x>4900){
    city.x=-3600;
  }


  //scrolling sky
  if(sky.x>3000){
    city.x=-3500;
  }
  
  
// move ironman up
  if(keyDown(UP_ARROW)){
    ironMan.y-=10;
  }

  //move iron man down
  if(keyDown(DOWN_ARROW)){
    ironMan.y+=10;
  }


  // functions to create repulsor
  Repulsor()

  // function to create enemy
  Enemy()

  if(Anim===Animation1){
    ironMan.changeAnimation("Iron Man",ironManAnimation);
    count=800;
    if(keyDown("space")&&STATE===NOTCOUNT){
      Anim=Animation2;
    }
    }


    if(Anim===Animation2){
     
      count-=20;
      if(count<0){
        Anim =Animation1;
      }
    }
  
  if(STATE===NOTCOUNT){
    no=500;
    count=800;
    if(keyDown("space")){
      STATE=COUNT;
    }
    }


    if(STATE===COUNT){
      no-=1;
      count-=1;
      if(no===0){
        STATE=NOTCOUNT;
      }
    }

  




    for(var i=0;i<enemyGroup.length;i++){
      if(enemyGroup.get(i).isTouching(repulsorGroup)){
        enemyGroup.get(i).destroy();
     }
    }
   

  

  drawSprites();
  
  textSize(30);
  stroke("black");

}





function Enemy(){
  if(frameCount%Math.round(random(400,800))===0){
    enemy = createSprite(-100,random(100,400),50,80);
    enemy.addAnimation("Enemy",enemyFly);
    enemy.debug=true;
    enemy.setCollider("rectangle",-400,100,850,500);
    enemy.scale=0.27;
    enemy.velocityX=1;
    enemyGroup.add(enemy);
  }
 
}

function Repulsor(){
  if(keyDown("space")&&STATE===NOTCOUNT){
    repulsor=createSprite(900,ironMan.y,20,20);
    repulsor.addImage("shhots",shoot);
    repulsor.debug=true;
    repulsor.setCollider("circle",-60,0,100);
    repulsor.scale=0.4;
    repulsor.velocityX=-10

    repulsor.lifetime=150;
    repulsorGroup.add(repulsor)

    ironMan.changeAnimation("fires",ironManAnimation2);
    
    }

    


}