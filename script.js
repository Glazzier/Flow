window.onload = function () {
    fetch('songs.json')
        .then(response => response.json())
        .then(data => {
            const songListContainer = document.getElementById('song-list-container');
            data.songs.forEach(song => {
                const li = document.createElement('li');
                li.textContent = song.title;
                li.dataset.filename = song.filename;
                songListContainer.appendChild(li);
            });
        })
        .then(() => {
            const audioPlayer = document.getElementById("audio-player");
            const playButton = document.querySelector(".play-button");
            const progressBar = document.querySelector(".progress");

            let isPlaying = false;

            playButton.addEventListener("click", function() {
                if (isPlaying) {
                    audioPlayer.pause();
                    playButton.textContent = "▶️";
                } else {
                    audioPlayer.play();
                    playButton.textContent = "⏸️";
                }
                isPlaying = !isPlaying;
            });

            audioPlayer.addEventListener("timeupdate", function() {
                const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
                progressBar.style.width = percent + "%";
            });

            const songListContainer = document.getElementById("song-list-container");

            function reproducirCancion(nombreArchivo, nombreCancion) {
                const rutaCancion = "music/" + nombreArchivo;
                audioPlayer.src = rutaCancion;
                audioPlayer.play();
                playButton.textContent = "⏸️";
                isPlaying = true;
                // Actualizar el título de la canción
                document.querySelector(".song-title").textContent = nombreCancion;
            }

            songListContainer.addEventListener("click", function(event) {
                const elementoClicado = event.target;
                if (elementoClicado.tagName === "LI") {
                    const nombreArchivo = elementoClicado.dataset.filename;
                    const nombreCancion = elementoClicado.textContent;
                    reproducirCancion(nombreArchivo, nombreCancion);
                }
            });
        })
        .catch(error => console.error("Error:", error));
};