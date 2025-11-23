let pianokeys = document.querySelectorAll(".piano-keys .key");
let vol = document.querySelector(".vol-slider input");
let key = document.querySelector(".key-checkbox input");
//
let allKeys = [],
  audio = new Audio("./sounds/52.mp3");

let showKeyDiv = document.createElement("div");
showKeyDiv.id = "showKey";
showKeyDiv.style.position = "fixed";
showKeyDiv.style.bottom = "0";
showKeyDiv.style.left = "0";
showKeyDiv.style.width = "100%";

showKeyDiv.style.fontFamily = "h1";
showKeyDiv.style.fontSize = "6rem";
showKeyDiv.style.fontWeight = "bold";
showKeyDiv.style.textAlign = "center";
showKeyDiv.style.color = "yellow";
showKeyDiv.style.margin = " 1rem";
const applyVolume = () => {
  audio.volume = vol.value; // IMPORTANT FIX
};
document.body.appendChild(showKeyDiv);
const playTune = (key, code = "") => {
  audio.src = `./sounds/${key}.mp3`;
  audio.play();
  applyVolume();
  document.getElementById(
    "showKey"
  ).innerHTML = `<span style="color:fuchsia;"> Key: ${key}</span>
  <span style="color:aqua;"> ( CharCode  : ${code} )</span>  `;

  const clickedKey = document.body.querySelector(`[data-key="${key}]`);

  clickedKey.classList.add("active");
  setTimeout(() => {
    clickedKey.classList.remove("active");
  }, 150);
};

// Add to body

pianokeys.forEach((key) => {
  allKeys.push(key.dataset.key);
  key.addEventListener("click", () =>
    playTune(key.dataset.key, key.dataset.key.charCodeAt(0))
  );
});
const showHideCheck = () => {
  pianokeys.forEach((key) => key.classList.toggle("hide"));
};
const handleVol = () => {
  audio.volume = e.target.value;
};
const pressKey = (e) => {
  let char = e.key;

  let code = e.key.charCodeAt(0); // 🔥 charCode here

  showKeyDiv.innerHTML = ` Event: ${e.type} <span style="color:aqua;">Key: ${char}</span><span style="color:fuchsia;"> ( CharCode  : ${code} )</span> `;
  applyVolume();
  if (allKeys.includes(e.key, code)) {
    playTune(e.key, code);
  } else {
    audio = new Audio("./sounds/52.mp3");
    audio.play();
    applyVolume();
  }
};

document.body.addEventListener("keypress", pressKey);
vol.addEventListener("input", handleVol);
key.addEventListener("click", showHideCheck);
