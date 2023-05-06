function setup() {
  canvas = createCanvas(250, 200);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier("MobileNet", modelLoaded);
}

function modelLoaded() {
  console.log("Model Loaded!");
}

function draw() {
  image(video, 0, 10, 250, 200);
  classifier.classify(video, gotResult);
}

previous_result = "";

function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else if ((results[0].confidence > 0.5) && (previous_result != results[0].label)) {
    console.log(results);
    previous_result = results[0].label;

    var synth = window.speechSynthesis;
    speech_data = "The detected object is " + results[0].label;
    var utter_this = new SpeechSynthesisUtterance(speech_data);
    synth.speak(utter_this);

    document.getElementById("result_object_name").innerHTML = "Object: " + results[0].label;
    document.getElementById("result_object_accuracy").innerHTML = "Accuracy: " + (results[0].confidence * 100).toFixed(3) + "%";
  }
}