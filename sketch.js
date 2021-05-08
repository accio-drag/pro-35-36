//Create variables here
var dogimg, dogimg1, dog;
var foodStock;
var lastFed
var database;
var gameState;
function preload()
{
  
  dogimg= loadImage("images/dogImg.png")
  dogimg1= loadImage("images/dogImg1.png")
  garden1= loadImage("images/Garden.png")
  washroom1= loadImage("images/Washroom.png")
  bedroom1= loadImage("images/bedroom.png")
	//load images here
}

function setup() {
	createCanvas(1200, 500);
  dog = createSprite(800,200,150,150);
dog.addImage(dogimg1);
dog.scale=0.2;
database = firebase.database();
var ref = database.ref("food");
ref.on("value",readOP)
add = createButton("addFood");
add.position(700,95)
add.mousePressed(addBottle);
database.ref("gameState").on("value",function(data){
  gameState=data.val()
})


feed = createButton("feed");
feed.position(800,95)
feed.mousePressed(feedDog);
foodObj = new Food()
}

function readOP(data){
foodStock=data.val();
foodObj.updateFoodStock(foodStock);



}
function draw() {  
//background(46, 139, 87)
database.ref("feedTime").on("value",function(data){
  lastFed = data.val()
})
textSize(20);
fill("white")

if(lastFed>=12)
  text("last fed:"+lastFed%12+"pm",300,100)
else if (lastFed===0)
text("last Fed:12 am",300,100)
else
text("last fed:"+lastFed+"am",300,100)

  //foodObj.display()
  drawSprites()
  var currentTime=hour()+2;
  console.log(currentTime)
  if(currentTime===(lastFed+1)){
update("playing")
foodObj.garden()

  }
else if(currentTime===(lastFed+2)){
  update("sleeping")
  foodObj.bedRoom();
}
else if(currentTime>(lastFed+2)&&currentTime<=(lastFed+4)){
  update("washroom")
  foodObj.washroom();
}
else{
  foodObj.display()
  update("hungry")
}
if(gameState!="hungry"){
  add.hide()
  feed.hide()
  dog.remove()
}
else{
  feed.show()
  add.show()
  dog.addImage(dogimg1)

}


  //add styles here
/*if (keyWentDown(UP_ARROW)){
writeStock(foodStock);
dog.addImage(dogimg);




}*/
}

/*function writeStock(x){
if(x<=0)
x=0;
else
x-=1;

database.ref("/").update({
food:x,
}
)
}
*/
function addBottle(){
foodStock++
database.ref("/").update({
  food: foodStock
})
}
function feedDog(){
dog.addImage(dogimg);
if(foodObj.getFoodStock()<=0){
foodObj.updateFoodStock(0)
}
else{
foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
}
database.ref("/").update({
  food:foodObj.getFoodStock(),
  feedTime:hour(),
  gameState:"hungry"

})


}

function update(state){
  database.ref("/").update({
    gameState:state
  })
}










