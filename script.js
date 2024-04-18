window.onload = function () {
    fetch('songs.json')
        .then(response => response.json())
        .then(data => {
            const songListContainer = document.getElementById('song-list-container');
            data.songs.forEach(song => {
                const li = document.createElement('li');
                const title = document.createElement('span');
                const artist = document.createElement('span');
                title.textContent = song.title;
                artist.textContent = song.artist;
                li.appendChild(title);
                li.appendChild(document.createTextNode(' - '));
                li.appendChild(artist);
                li.dataset.filename = song.filename;
                songListContainer.appendChild(li);
            });
        })
        .then(() => {
            const audioPlayer = document.getElementById("audio-player");
            const playButton = document.querySelector(".play-button");
            const progressBar = document.querySelector(".progress");

            let isPlaying = false;
            let isDragging = false;

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

            progressBar.addEventListener("mousedown", function(event) {
                isDragging = true;
                actualizarBarra(event);
            });

            document.addEventListener("mousemove", function(event) {
                if (isDragging) {
                    actualizarBarra(event);
                }
            });

            document.addEventListener("mouseup", function() {
                isDragging = false;
            });

            function actualizarBarra(event) {
                const progressBarRect = progressBar.getBoundingClientRect();
                const offsetX = event.clientX - progressBarRect.left;
                const percent = Math.min(100, Math.max(0, (offsetX / progressBarRect.width) * 100));
                progressBar.style.width = percent + "%";
                const newTime = (percent / 100) * audioPlayer.duration;
                audioPlayer.currentTime = newTime;
            }

            const songListContainer = document.getElementById("song-list-container");

            function reproducirCancion(nombreArchivo, nombreCancion, nombreArtista) {
                const rutaCancion = "music/" + nombreArchivo;
                audioPlayer.src = rutaCancion;
                audioPlayer.play();
                playButton.textContent = "⏸️";
                isPlaying = true;
                document.querySelector(".song-title").textContent = nombreCancion;
                document.querySelector(".artist").textContent = nombreArtista;
            }

            songListContainer.addEventListener("click", function(event) {
                const elementoClicado = event.target;
                if (elementoClicado.tagName === "SPAN") {
                    const li = elementoClicado.parentNode;
                    const nombreArchivo = li.dataset.filename;
                    const nombreCancion = li.querySelector('span:first-child').textContent;
                    const nombreArtista = li.querySelector('span:last-child').textContent;
                    reproducirCancion(nombreArchivo, nombreCancion, nombreArtista);
                }
            });
        })
        .catch(error => console.error("Error:", error));
};