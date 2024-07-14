let temp = {
  audioId: null,
  currentTime: 0,
};
const audioFiles = [
  "audio1.mp3",
  "audio2.mp3",
  "audio3.mp3",
  "audio4.mp3",
  "audio5.mp3",
];
function playAudio(audioId) {
  var audioElement = document.getElementById(audioId);
  var playerSlider = document.getElementById("playerSlider");
  var pauseButton = document.getElementById("player");

  if (audioElement && playerSlider) {
    stopAllAudio();
    audioElement.play();
    pauseButton.classList.remove("fa-play");
    pauseButton.classList.add("fa-pause");
    playerSlider.value =
      (audioElement.currentTime / audioElement.duration) * 100;
    var musicPlayer = document.getElementById("musicPlayer");
    var preview = document.getElementById("preview");
    if (musicPlayer) {
      musicPlayer.style.display = "block";
      preview.style.display = "none";
    }

    playerSlider.addEventListener("input", function () {
      audioElement.currentTime =
        (playerSlider.value / 100) * audioElement.duration;
    });
    volumeSlider.addEventListener("input", function () {
      audioElement.volume = volumeSlider.value;
    });
    audioElement.addEventListener("timeupdate", function () {
      playerSlider.value =
        (audioElement.currentTime / audioElement.duration) * 100;
    });
    var items = document.querySelectorAll(".item");
    items.forEach(function (item) {
      item.classList.remove("playing");
    });
    var currentItems = document.querySelectorAll(
      '[data-audio="' + audioId + '"]'
    );
    currentItems.forEach(function (item) {
      if (currentItems) {
        item.classList.add("playing");
      }
    });
  }
}
function stopAllAudio() {
  var audios = document.querySelectorAll("audio");
  audios.forEach(function (audio) {
    audio.pause();
    audio.currentTime = 0;
  });
}
function resumer(audioId) {
  var audioElement = document.getElementById(audioId);
  var pauseButton = document.getElementById("player");
  if (temp.audioId === audioId && temp.currentTime > 0) {
    audioElement.currentTime = temp.currentTime;
  }
  if (audioElement && playerSlider) {
    audioElement.play();
    pauseButton.classList.remove("fa-play");
    pauseButton.classList.add("fa-pause");
  }
}
function savetime() {
  var audios = document.querySelectorAll("audio");
  audios.forEach(function (audio) {
    if (audio.currentTime > 1) {
      temp.currentTime = audio.currentTime;
    }
    audio.pause();
  });
}
function togglePlayPause() {
  var playButton = document.getElementById("player");
  var checker = document.querySelector(".fa-pause");

  if (checker) {
    playButton.classList.remove("fa-pause");
    playButton.classList.add("fa-play");
    savetime();
  } else {
    if (temp.audioId) {
      resumer(temp.audioId);
    }
  }
}
function playNext() {
  if (document.getElementById("shuffleIcon").classList[2] === "active") {
    playShuffleTrack(temp.audioId);
  } else if (document.getElementById("repeatIcon").classList[2] === "active") {
    playAudio(temp.audioId);
  } else {
    let currentString = temp.audioId;
    let currentNumber = currentString.slice(5);
    let newNumber = (parseInt(currentNumber) % 5) + 1;
    temp.audioId = "audio" + newNumber;
    playAudio(temp.audioId);
  }
}
function playLast() {
  let currentString = temp.audioId;
  let currentNumber = currentString.slice(5);
  let newNumber;
  if (currentNumber == 1) {
    newNumber = 5;
  } else {
    newNumber = parseInt(currentNumber) - 1;
  }
  temp.audioId = "audio" + newNumber;
  playAudio(temp.audioId);
}
function playShuffleTrack(audioID) {
  let currentNumber = audioID.charAt(5);
  let randomIndex;

  do {
    randomIndex = Math.floor(Math.random() * audioFiles.length) + 1;
  } while (randomIndex === parseInt(currentNumber));

  temp.audioId = "audio" + randomIndex;
  playAudio(temp.audioId);
}
document.addEventListener("DOMContentLoaded", function () {
  var items = document.querySelectorAll(".item");
  items.forEach(function (item) {
    item.addEventListener("click", function () {
      var audioId = this.getAttribute("data-audio");
      if (audioId) {
        playAudio(audioId);
        temp.audioId = audioId;
      }
    });
  });
  var audios = document.querySelectorAll("audio");
  audios.forEach(function (audio) {
    audio.addEventListener("ended", function () {
      temp.currentTime = 0;
      audio.currentTime = 0;
      var audioId = this.getAttribute("data-audio");
      if (document.getElementById("shuffleIcon").classList[2] === "active") {
        playShuffleTrack(audioId);
      } else if (
        document.getElementById("repeatIcon").classList[2] === "active"
      ) {
        audio.play();
      } else {
        document.querySelector(".fa-pause").classList.add("fa-play");
        document.querySelector(".fa-pause").classList.remove("fa-pause");
      }
    });
  });
  document.getElementById("shuffleIcon").addEventListener("click", function () {
    var tempc = this.classList[2];
    if (tempc === "active") {
      this.classList.remove("active");
    } else {
      this.classList.add("active");
    }
  });
  document.getElementById("repeatIcon").addEventListener("click", function () {
    var tempc = this.classList[2];
    if (tempc === "active") {
      this.classList.remove("active");
    } else {
      this.classList.add("active");
    }
  });
});
