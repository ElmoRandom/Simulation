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
        temp = PARTICLE_SPEED;
    }
    console.log(temp);
    var vel = Math.sqrt(3 * parseInt(temp) * 8.31/ 0.15999);
    PARTICLE_SPEED = vel;
    console.log("particle speed: " + PARTICLE_SPEED.toString());
    for(var i=0;i<numParticle;i++){
        const particle = makeParticle();
        particles.push(particle);
        Composite.add(engine.world, [particle]);
    }
    console.log('run');
});

endBtn.addEventListener('click', function(){
    clearWorld();
    createWorld();
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


