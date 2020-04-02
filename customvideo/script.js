const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');
const volume = document.getElementById('volume');
//play and pause

function toggleVideoStatus() {
    video.paused ? video.play() : video.pause();
}

function toggleSound() {
    video.volume == 1 ? video.volume = 0 : video.volume = 1;
}

function updatePlayIcon() {
    video.paused ? play.innerHTML = `<i class="fa fa-play fa-2x"></i>` :
        play.innerHTML = `<i class="fa fa-pause fa-2x"></i>`;
}

function updateProgress() {
    progress.value = (video.currentTime / video.duration) * 100;
    //get minutes
    let mins = Math.floor(video.currentTime / 60);
    if (mins < 10) {
        mins = '0' + String(mins);
    }

    let secs = Math.floor(video.currentTime % 60);
    if (secs < 10) {
        secs = '0' + String(secs);
    }

    timestamp.innerHTML = `${mins}:${secs}`;
}

function setVideoProgress() {
    video.currentTime = (+progress.value * video.duration) / 100;
}

function stopVideo() {
    video.currentTime = 0;
    video.pause();
}


video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);
stop.addEventListener('click', stopVideo);
volume.addEventListener('click', toggleSound);
progress.addEventListener('change', setVideoProgress);


