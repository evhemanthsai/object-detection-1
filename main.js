var canvas = "";
stats = "";
objects = [];

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerText = " STATUS : Detecting Objects"
    video = createCapture(VIDEO);
    video.hide()
}
  

function preload(){
    img = loadImage("dog_cat.jpg");
}

function draw (){
    image(img,0,0,640,420);
    
    if (stats != ""){
        for(i=0; i<objects.length; i++){
        fill("FF0000");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%" , objects[i].x , objects[i].y);
        document.getElementById("status").innerHTML = "Status : Object Detected";
        noFill();
        stroke("#FF0000");
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    }
}
}


function modelLoaded(){
    console.log('MODEL LOADED');
    stats = "true";
    objectDetector.detect(img,gotResult);
}

function gotResult(error, results){
    if(error){
        console.log(error);
    } else {
        console.log(results);
        objects = results;
    }
}