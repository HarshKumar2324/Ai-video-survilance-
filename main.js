video="";
status="";
objects=[];

function preload(){
    video=createVideo('video.mp4');
    video.hide();
}

function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
}

function draw(){
    image(video,0,0,480,380);
    if(status!=""){
        object_dector.detect(video, gotresult);
        for(index=0; index<objects.length; index++){
            document.getElementById("status").innerHTML="Status : objectsdetected";
            document.getElementById("number_of_objects").innerHTML="Number of Objects Detected are : "+objects.length;
            fill("#FF0000");
            percent=floor(objects[index].confidence*100);
            object_name=object[index].label;
            text(object_name+"  "+percent+"%",object[index].x,object[index].y);
            noFill();
            stroke("#FF0000");
            rect(object[index].x,object[index].y,object[index].width,object[index].height);
        }
    }
}

function gotresult(error, result){
    if(error){
        console.log(error);
    }
           console.log(result);
           objects=result;
}

function start(){
    object_dector=ml5.objectDetector('cocossd',modelloaded);
    document.getElementById("status").innerHTML="Status : detecting objects"
}

function modelloaded(){
    console.log("modelloaded");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}