var audio = document.getElementById("myMusic2");
var volume = localStorage.getItem('volume')
console.log(volume)
audio.volume = volume;
