objects = [];
status = "";

function preload(){
    video = createVideo('video.mp4');
}

function setup(){
    canvas = createCanvas(480, 350);
    canvas.center();
    video.hide();
}
function draw(){
    image(video, 0, 0, 480, 350);
    if(status != ""){
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of object detected are : "+objects.length;

            fill(255,0,0);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 14, objects[i].y + 15);
            noFill();
            stroke(255,0,0);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0.7);
}
function gotResult(error,results){
    if (error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}