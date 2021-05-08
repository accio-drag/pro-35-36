class Food{
constructor(){
this.foodStock=0
this.lastFed = 0 
this.image=loadImage("images/Milk.png")
}
updateFoodStock(fs){
    console.log(fs)
    this.foodStock=fs;
}

getFoodStock(){
return(this.foodStock)

}
display(){
    background("black")
imageMode(CENTER)
var y = 100;
var x = 80;
if(this.foodStock!==0){
    console.log("inside display")
    for(var i = 0 ; i < this.foodStock ; i++ ){
if(i%10===0){
    
x = 50
y = y + 50

}
image(this.image,x,y,50,50)
x = x+ 30
    }
}


}
bedRoom(){
background(bedroom1,500,500)
}
garden(){
background(garden1,500,500)
}
washroom(){
background(washroom1,500,500)
}
}