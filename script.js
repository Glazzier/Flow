/**
 * Initializes the song list container by fetching the list of songs from the music folder.
 *
 * @return {void} This function does not return anything.
 */
window.onload = function () {
    const songListContainer = document.getElementById('song-list-container');
    const musicFolder = '/music/';

    fetch(musicFolder)
        .then(response => response.text())
        .then(data => {
            const fileList = data.split('\n').filter(file => file.trim().endsWith('.mp3'));

            if (fileList.length === 0) {
                const errorMessage = document.createElement('li');
                errorMessage.textContent = '¡El lector de música no pudo encontrar ninguna canción! ¡Nuestros DJ están buscando el vinilo perdido! 🎵';
                songListContainer.appendChild(errorMessage);
            } else {
                fileList.forEach(file => {
                    const fileName = file.split('/').pop(); // Obtener solo el nombre del archivo
                    const listItem = document.createElement('li');
                    listItem.textContent = fileName;
                    songListContainer.appendChild(listItem);
                });
            }
        })
        .catch(error => console.error('Error al obtener la lista de canciones:', error));
};