# Guía para la presentación

## Arranque en este equipo

1. Mantener PostgreSQL iniciado y conectar la ESP32 por USB.
2. Usar la red WiFi configurada en el archivo privado `secrets.h`.
3. Abrir dos terminales PowerShell. Si el proyecto ya está corriendo, no iniciar otra copia.

Terminal del backend:

```powershell
cd C:\Users\emman\Documents\Codex\2026-10-14\c\work\ProyectoParadigmasTEYJ\backend
$env:PORT = "3001"
npm run start:dev
```

Terminal del frontend:

```powershell
cd C:\Users\emman\Documents\Codex\2026-10-14\c\work\ProyectoParadigmasTEYJ\frontend
npm run dev -- --host 127.0.0.1 --port 5173 --strictPort
```

Abrir http://127.0.0.1:5173/. Dejar ambas terminales abiertas.
No hace falta volver a cargar el firmware en cada encendido.

## Orden sugerido de la demostración

1. Mostrar «En vivo», «ESP32 física» y las lecturas de Incubadora #1.
2. Explicar que #2 y #3 están inactivas porque no hay otras placas enviando datos.
3. Explicar el recorrido: DHT11 → ESP32 → WiFi/HTTP → NestJS → PostgreSQL y WebSocket → React.
4. Mostrar LCD y lecturas del dashboard. El valor visible puede tener algunos segundos de diferencia por el intervalo de envío.
5. Demostrar la alarma con el procedimiento de prueba del equipo: temperatura menor de 25 °C o mayor de 40 °C. Exactamente a 25 y 40 °C no se activa la alarma crítica.
6. Mostrar los pitidos de 350 ms y el LED sincronizado. La pausa pasa de 800 a 120 ms conforme la lectura se aleja del límite hasta 10 °C; el tono pasa de 3000 a 4000 Hz.
7. Volver al intervalo normal y mostrar que se apaga la alarma local. La web puede mostrar avisos preventivos o de humedad sin activar la alarma crítica local.
8. Bajar a «Historial de mediciones», seleccionar incubadora y fechas y descargar «CSV para Excel». Abrir el archivo descargado en Excel.

## Qué se guarda

Cada medición recibida se guarda en PostgreSQL, aunque repita temperatura y humedad.
El historial sobrevive al reinicio del backend. No se guardan lecturas durante períodos
sin conexión que la placa no haya enviado. El CSV incluye el período completo seleccionado,
no solamente las 25 filas de la página visible. Las fechas de la tabla se muestran en
hora de Costa Rica; el archivo incluye también la fecha UTC.

Los indicadores de LED y buzzer de la web son estados calculados con las mediciones;
no confirman eléctricamente las salidas físicas. El prototipo mide temperatura ambiental,
no corporal, y corresponde a una demostración académica.

## Si algo falla

- Web sin datos: comprobar que backend y ESP32 estén conectados. Revisar el Monitor serie a 115200 baudios; `POST -> 201` indica una medición aceptada.
- HTTP 401: `API_KEY` de `secrets.h` debe coincidir con `DEVICE_API_KEY` de `backend/.env`.
- No conecta al servidor: verificar la IPv4 actual con `ipconfig`; si cambia, actualizar `API_URL` en `secrets.h` al puerto 3001 y volver a cargar el firmware.
- `EADDRINUSE`: ya hay otro proceso usando el puerto. No iniciar varias copias de los servidores.
- `ENOENT package.json`: entrar a la carpeta backend o frontend antes de usar npm.
- En otro equipo, instalar las dependencias con `npm ci` en cada carpeta, preparar PostgreSQL y crear los archivos privados a partir de sus ejemplos.

## Guardado y entrega

El código se mantiene en el repositorio `YazirDev/ProyectoParadigmasTEYJ`, rama `main`.
`backend/.env` y `firmware/esp32_incubadora/secrets.h` están excluidos de Git y de la
copia ZIP generada desde Git. Conservarlos privadamente en este equipo.
No afirmar que los commits estén en GitHub hasta confirmar un `git push` exitoso.
