prediction1=""
prediction2=""
Webcam.set({
   width:350,
   height:300,
image_format:'png',
png_quality:90
});

camera=document.getElementById("camera");

Webcam.attach('#camera');

function takesnapshot(){
Webcam.snap(function(data_uri){
document.getElementById("result").innerHTML='<img id="capturedimage" src="'+data_uri+'"/>';    
}); 
}

console.log('ml5 version: ',ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/j4zSr_uGF/model.json',modelloaded);
function modelloaded(){
 console.log('modelloaded');
}

function speak(){
 var synth=window.speechSynthesis;
 speakdata1="The first prediction is "+prediction1;
 speakdata2="The second prediction is "+prediction2;
 var utterThis=new SpeechSynthesisUtterance(speakdata1+speakdata2);
 synth.speak(utterThis);

}
  
  function check(){
     img=document.getElementById("capturedimage");
     classifier.classify(img,gotresult);
  
  }
  
  function gotresult(error,result){
    if(error){
     console.log(error);
    } 
  
    else{
    console.log(result);
    document.getElementById("resultname").innerHTML=result[0].label;
    document.getElementById("resultname2").innerHTML=result[1].label;
    prediction1=result[0].label;
    prediction2=result[1].label;
    speak();
   if(result[0].label=="Amazing"){
    document.getElementById("updateemoji").innerHTML="&#128076";
   }
   if(result[0].label=="Victory"){
     document.getElementById("updateemoji").innerHTML="&#9996;";
    }
    if(result[0].label=="Best"){
     document.getElementById("updateemoji").innerHTML="&#128077;";
    }
     if(result[1].label=="Amazing"){
      document.getElementById("updateemoji2").innerHTML="&#128076;";
    }
    if(result[1].label=="Victory"){
      document.getElementById("updateemoji2").innerHTML="&#9996;";
     }
     if(result[1].label=="Best"){
      document.getElementById("updateemoji2").innerHTML="&#128077;";
     }
    }
  }