window.onload = function () {
    fetch('songs.json')
        .then(response => response.json())
        .then(data => {
            const songListContainer = document.getElementById('song-list-container');
            data.songs.forEach(song => {
                const li = document.createElement('li');
                li.textContent = song;
                songListContainer.appendChild(li);
            });
        })
        .then(() => {
            const songListContainer = document.getElementById("song-list-container");
            const audioPlayer = document.getElementById("audio-player");
            
            // Función para reproducir una canción
            function reproducirCancion(nombreCancion) {
                const rutaCancion = "canciones/" + nombreCancion + ".mp3"; // Ruta a la canción
                audioPlayer.src = rutaCancion; // Establecer la nueva fuente del reproductor de audio
                audioPlayer.play(); // Reproducir la canción
            }

            // Agregar un evento de clic a cada elemento de la lista de canciones
            songListContainer.addEventListener("click", function(event) {
                const elementoClicado = event.target;
                if (elementoClicado.tagName === "LI") {
                    const nombreCancion = elementoClicado.textContent; // Obtener el nombre de la canción
                    reproducirCancion(nombreCancion); // Reproducir la canción
                }
            });
        });
};