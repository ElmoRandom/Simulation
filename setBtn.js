let setBtn = document.getElementById('setBtn');
console.log(setBtn);
setBtn.addEventListener('click', function(){
    let numParticle = document.getElementById('numParticle');
    let particleText = document.getElementById('particleText');
    if(numParticle.value != "")particleText.innerText = "Number of Particle: " + numParticle.value;
    let temp = document.getElementById('temperature');
    let tempText = document.getElementById('temperatureText');
    if(temp.value != "")tempText.innerText = "Number of Particle: " + temp.value;
    let inter = document.getElementById('inter');
    let interText = document.getElementById('interText');
    if(inter.value != "")interText.innerText = "Number of Particle: " + inter.value;
    let time = document.getElementById('time');
    let timeText = document.getElementById('timeText');
    if(time.value != "")timeText.innerText = "Time Scale: " + time.value;
});
