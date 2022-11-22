let runBtn = document.getElementById('run');
let endBtn = document.getElementById('end');
let pauseBtn = document.getElementById('pause');
let updateBtn = document.getElementById('update');
let particles = [];

runBtn.addEventListener('click', function(){
    clearWorld();
    createWorld();
    var numParString = document.getElementById('particleText').innerText;
    var numParticle = intFromString(numParString);
    var temp = chooseString(document.getElementById('temperatureText').innerText);
    if(temp == ''){
        temp = TEMPERATURE;
    }
    console.log(temp);
    recent = engine.timing.timestamp;
    momentum = 0;
    PARTICLE_SPEED = Math.sqrt(TEMPERATURE) * 13161809.95;
    console.log("particle speed: " + (PARTICLE_SPEED*Math.pow(10,-8)).toString());
    for(var i=0;i<numParticle;i++){
        const particle = makeParticle();
        particles.push(particle);
        Composite.add(engine.world, [particle]);
    }
    console.log('run');
});

window.setInterval(function(){
    var timeText = document.getElementById('timeText');
    timeText.innerHTML = "Pressure: " + Math.pow(10, 7)*(3.4956529 * Math.pow(10,-9) * momentum/ 
    (engine.timing.timestamp - recent));
    console.log(engine.timing.timestamp - recent);
}, 1000);

endBtn.addEventListener('click', function(){
    clearWorld();
    createWorld();
    momentum = 0;
    recent = engine.timing.timestamp;
});

function chooseString(string){
    var index = 0;
    for(var i = 0;i< string.length; i++){
        if(string.codePointAt(i) > 47 && string.codePointAt(i) < 58){
            index = i;
            break;
        }
    }
    var temp = '';
    while(index < string.length){
        temp += string.charAt(index);
        index++;
    }
   return temp; 
}

updateBtn.addEventListener('click', function(){
    var timeString = chooseString(document.getElementById('timeText').innerText);
    console.log(timeString);
    engine.timing.timeScale = timeString;
    console.log(engine);
});



function intFromString(string){
    var index = 0;
    for(var i = 0;i< string.length; i++){
        if(string.codePointAt(i) > 47 && string.codePointAt(i) < 58){
            index = i;
            break;
        }
    }
    var temp = '';
    while(string.codePointAt(index) && index < string.length){
        temp += string.charAt(index);
        index++;
    }
   return temp; 
}


