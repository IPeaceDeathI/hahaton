var audio = document.getElementById("myMusic1");

var storageVolume = localStorage.getItem('volume')
if(storageVolume === null){
    localStorage.setItem('volume', 0.5)
    storageVolume = 0.5
}
audio.volume = storageVolume;
var range = document.getElementById('range');
range.onmousemove = function(){
    audio.volume = this.value/100
    var volume = this.value/100
    localStorage.setItem('volume', volume)
}
