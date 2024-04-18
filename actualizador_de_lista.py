import os
import json

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

def listar_mp3(carpetas):
    canciones = []
    for carpeta in carpetas:
        if os.path.exists(carpeta):
            for archivo in os.listdir(carpeta):
                if archivo.endswith(".mp3"):
                    nombre_cancion = os.path.splitext(archivo)[0]
                    nombre_cancion_limpio = limpiar_nombre(nombre_cancion)
                    if nombre_cancion_limpio not in canciones:
                        canciones.append(nombre_cancion_limpio)
                    else:
                        print(f"El nombre de la canción '{nombre_cancion_limpio}' ya está en la lista.")
        else:
            print(f"La carpeta '{carpeta}' no existe.")
    print("Archivos encontrados:", canciones)
    return canciones

def generar_json(carpetas, nombre_archivo):
    canciones = listar_mp3(carpetas)
    datos = {"songs": canciones}
    with open(nombre_archivo, "w") as archivo_json:
        json.dump(datos, archivo_json, indent=4)

if __name__ == "__main__":
    carpetas = ["music"]
    nombre_archivo = "songs.json"
    generar_json(carpetas, nombre_archivo)