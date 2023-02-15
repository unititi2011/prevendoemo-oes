previsao="";
previsao2="";

Webcam.set({
    width:350,
    height:300,
    imageFormat:"png",
    pngQuality:90
});
camera=document.getElementById("camera");
Webcam.attach("#camera");
function tirarfoto(){
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML='<img id="imagecapiturada" src="'+data_uri+'"/>';
    });
}
//https://teachablemachine.withgoogle.com/models/26rocpPuYJ/
console.log("versao ml5",ml5.version);
classfier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/26rocpPuYJ/model.json",modelLoaded);
function modelLoaded(){
    console.log("modelocarregado")
}

function speak(){
    var synth=window.speechSynthesis;
    speakdata1="a primeira previsão é"+previsao1;
    speakdata2="a segunda previsão é"+previsao2;
    var utterThis = new SpeechSynthesisUtterance(speakdata1 + speakdata2); synth.speak(utterThis);
}
function check(){
    img=document.getElementById("imagecapiturada");
    classfier.classify(img,gotResult);
}
function gotResult(error, results) 
{ if (error) { console.error(error); } 
else { console.log(results);
     document.getElementById("resultado").innerHTML = results[0].label; 
     document.getElementById("resultado2").innerHTML = results[1].label;
      previsao1 = results[0].label; previsao2 = results[1].label; speak();
      if(results[0].label == "happy:)") { document.getElementById("atualizaremoji").innerHTML = "&#128522;";
     } if(results[0].label == "sad:(") { document.getElementById("atualizaremoji").innerHTML = "&#128532;";
     } if(results[0].label == "angry>:|") { document.getElementById("atualizaremoji").innerHTML = "&#128548;";
     } if(results[1].label == "happy:)") { document.getElementById("atualizaremoji2").innerHTML = "&#128522;";
     } if(results[1].label == "sad:(") { document.getElementById("atualizaremoji2").innerHTML = "&#128532;";
     } if(results[1].label == "angry>:|") { document.getElementById("atualizaremoji2").innerHTML = "&#128548;";
     } } }