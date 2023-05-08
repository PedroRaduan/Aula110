//https://teachablemachine.withgoogle.com/models/VkgXD2kkn/

previsao1 = '';
previsao2 = '';


Webcam.set({
    width:350,
    height:300,
    imageFormat : 'png',
    pngQuality: 90
});

camera = document.getElementById('camera');

Webcam.attach('#camera');

function tirar_foto(){
    console.log(1);

    Webcam.snap(function(data_uri) { 
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>'; 
    }); }


console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/VkgXD2kkn/model.json', modelo_carregado);

function modelo_carregado(){
    console.log('model Loaded!');
}

function speak(){
    var synth = window.speechSynthesis;
    fala1 = "A primeira previsão é " + previsao1;
    fala2 = "A segunda previsão é " + previsao2;

    var falas = new SpeechSynthesisUtterance(fala1 + fala2);
    synth.speak(falas);
}

function check(){
    imagem = document.getElementById('captured_image');
    classifier.classify(imagem, resultado);
}

function resultado(error, results){
    if(error){
        console.error(error);
    } else{
        console.log(results);
        document.getElementById('previsao1').innerHTML = results[0].label;
        document.getElementById('previsao2').innerHTML = results[1].label;

        previsao1 = results[0].label;
        previsao2 = results[1].label;
        speak();
    if(results[0].label == 'Feliz'){
        document.getElementById('emoji1').innerHTML = '&#128522;';
    }
    else if(results[0].label == 'Raiva'){
        document.getElementById('emoji1').innerHTML = '&#128548';
    }
    else if(results[0].label == 'Triste'){
        document.getElementById('emoji1').innerHTML = '&#128532';
    }
    if(results[1].label == 'Feliz'){
        document.getElementById('emoji2').innerHTML = '&#128522;';
    }
    else if(results[1].label == 'Triste'){
        document.getElementById('emoji2').innerHTML = '&#128532;';
    }
    else if(results[1].label == 'Raiva'){
        document.getElementById('emoji2').innerHTML = '&#128548;';
    }
    }
    

}