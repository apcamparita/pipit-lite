const photo=document.getElementById("photo");
const audio=document.getElementById("audio");

const preview=document.getElementById("preview");
const player=document.getElementById("player");

photo.addEventListener("change",()=>{

preview.src=
URL.createObjectURL(photo.files[0]);

});

audio.addEventListener("change",()=>{

player.src=
URL.createObjectURL(audio.files[0]);

});

document
.getElementById("generateBtn")
.addEventListener("click",async()=>{

const loading=
document.getElementById("loading");

loading.classList.remove("hidden");

const formData=new FormData();

formData.append(
"photo",
photo.files[0]
);

formData.append(
"audio",
audio.files[0]
);

formData.append(
"prompt",
document.getElementById("prompt").value
);

const response=await fetch(
"http://localhost:5000/generate",
{
method:"POST",
body:formData
}
);

const data=await response.json();

loading.classList.add("hidden");

document
.getElementById("videoResult")
.src=data.video;

const dl=
document.getElementById("downloadBtn");

dl.href=data.video;

dl.classList.remove("hidden");

});
