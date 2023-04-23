var audio = document.getElementById("myMusic3");
var storageVolume = localStorage.getItem('volume')
if(storageVolume === null){
    localStorage.setItem('volume', 0.2)
    storageVolume = 0.2
}
audio.volume = storageVolume;
