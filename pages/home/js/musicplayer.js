// ===================================================
// Music Player JS – totalmente funcional Shine~
// ===================================================

document.addEventListener("DOMContentLoaded", function() {

    // Variables existentes en tu HTML
    let track_name = document.querySelector(".songtitle");
    let playpause_btn = document.querySelector(".playpause-track");
    let next_btn = document.querySelector(".next-track");
    let prev_btn = document.querySelector(".prev-track");
    let seek_slider = document.querySelector(".seek_slider");
    let curr_time = document.querySelector(".current-time");
    let total_duration = document.querySelector(".total-duration");
    let curr_track = document.getElementById("music");

    let track_index = 0;
    let isPlaying = false;
    let updateTimer;

    // ===================================================
    // LISTA DE CANCIONES – ya incluidas
    // ===================================================
    let track_list = [
        { name: "BAD BUNNY - PIToRRO DE COCO", path: "/pages/home/music/pitorro.mp3" },
        { name: "CA7RIEL & Paco Amoroso - #TETAS", path: "/pages/home/music/tetas.mp3" },
        { name: "Chappell Roan - Good Luck, Babe!", path: "/pages/home/music/babe.mp3" },
        { name: "Tainy, Bad Bunny - MOJABI GHOST", path: "/pages/home/music/mojabi.mp3" },
        { name: "Rauw Alejandro - DIME QUIEN????", path: "/pages/home/music/dimequien.mp3" },
        { name: "Mora, C. Tangana - DROGA", path: "/pages/home/music/droga.MP3" }
    ];

    // ===================================================
    // FUNCIONES PRINCIPALES
    // ===================================================

    function loadTrack(index) {
        clearInterval(updateTimer);
        resetValues();

        curr_track.src = track_list[index].path;
        curr_track.load();

        track_name.textContent = "🎵 " + track_list[index].name;

        updateTimer = setInterval(seekUpdate, 1000);

        curr_track.addEventListener("ended", nextTrack);
    }

    function resetValues() {
        curr_time.textContent = "0:00";
        total_duration.textContent = "0:00";
        seek_slider.value = 0;
    }

    function playpauseTrack() {
        if (!isPlaying) playTrack();
        else pauseTrack();
    }

    function playTrack() {
        curr_track.play();
        isPlaying = true;
        playpause_btn.innerHTML = '<i class="fas fa-pause"></i>';
    }

    function pauseTrack() {
        curr_track.pause();
        isPlaying = false;
        playpause_btn.innerHTML = '<i class="fas fa-play"></i>';
    }

    function nextTrack() {
        track_index = (track_index + 1) % track_list.length;
        loadTrack(track_index);
        playTrack();
    }

    function prevTrack() {
        track_index = (track_index - 1 + track_list.length) % track_list.length;
        loadTrack(track_index);
        playTrack();
    }

    function seekTo() {
        let seekto = curr_track.duration * (seek_slider.value / 100);
        curr_track.currentTime = seekto;
    }

    function seekUpdate() {
        if (!isNaN(curr_track.duration)) {
            let seekPosition = curr_track.currentTime * (100 / curr_track.duration);
            seek_slider.value = seekPosition;

            let currentMinutes = Math.floor(curr_track.currentTime / 60);
            let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
            let durationMinutes = Math.floor(curr_track.duration / 60);
            let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

            if (currentSeconds < 10) currentSeconds = "0" + currentSeconds;
            if (durationSeconds < 10) durationSeconds = "0" + durationSeconds;

            curr_time.textContent = currentMinutes + ":" + currentSeconds;
            total_duration.textContent = durationMinutes + ":" + durationSeconds;
        }
    }

    // ===================================================
    // EVENT LISTENERS PARA BOTONES
    // ===================================================
    playpause_btn.addEventListener("click", playpauseTrack);
    next_btn.addEventListener("click", nextTrack);
    prev_btn.addEventListener("click", prevTrack);
    seek_slider.addEventListener("input", seekTo);

    // ===================================================
    // CARGAR PRIMERA CANCION AL INICIO
    // ===================================================
    loadTrack(track_index);
});