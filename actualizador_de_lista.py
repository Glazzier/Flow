import os
import json
import eyed3

def limpiar_nombre(nombre):
    palabras = nombre.split('-')  # Dividimos el nombre en palabras separadas por "-"
    palabras_formateadas = []
    for palabra in palabras:
        # Eliminamos los números al final de la palabra
        while palabra and palabra[-1].isdigit():
            palabra = palabra[:-1]
        # Convertimos la primera letra de la palabra a mayúscula
        palabra_formateada = palabra.capitalize()
        palabras_formateadas.append(palabra_formateada)
    nuevo_nombre = " ".join(palabras_formateadas)  # Unimos las palabras formateadas con espacios
    return nuevo_nombre

def obtener_nombre_artista(archivo):
    audiofile = eyed3.load(archivo)
    if audiofile.tag and audiofile.tag.artist:
        return audiofile.tag.artist
    else:
        return None

def listar_mp3(carpetas):
    canciones = []
    for carpeta in carpetas:
        if os.path.exists(carpeta):
            for archivo in os.listdir(carpeta):
                if archivo.endswith(".mp3"):
                    nombre_cancion = os.path.splitext(archivo)[0]
                    nombre_cancion_limpio = limpiar_nombre(nombre_cancion)
                    nombre_artista = obtener_nombre_artista(os.path.join(carpeta, archivo))
                    # Creamos un diccionario para cada canción con las claves "title", "artist" y "filename"
                    cancion = {"title": nombre_cancion_limpio, "artist": nombre_artista, "filename": archivo}
                    if cancion not in canciones:
                        canciones.append(cancion)
                        print(f"Se ha añadido la canción '{nombre_cancion_limpio}'.")
                    else:
                        print(f"El nombre de la canción '{nombre_cancion_limpio}' ya está en la lista.")
        else:
            print(f"La carpeta '{carpeta}' no existe.")
            return []  # Devuelve una lista vacía si la carpeta no existe
    return canciones

def generar_json(carpetas, nombre_archivo):
    canciones = listar_mp3(carpetas)
    if not canciones:  # Verifica si no se encontraron canciones
        if os.path.exists(nombre_archivo):
            os.remove(nombre_archivo)  # Elimina el archivo JSON si existe
            print(f"El archivo '{nombre_archivo}' ha sido eliminado porque no se encontraron canciones.")
        return
    datos = {"songs": canciones}
    with open(nombre_archivo, "w") as archivo_json:
        json.dump(datos, archivo_json, indent=4)

if __name__ == "__main__":
    carpetas = ["music"]
    nombre_archivo = "songs.json"
    generar_json(carpetas, nombre_archivo)