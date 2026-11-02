# Monitor de incubadoras IoT

Sistema para monitorear incubadoras con ESP32: el ESP32 envía temperatura y humedad al
backend, el backend evalúa reglas y las guarda en PostgreSQL, y el dashboard web se actualiza
en tiempo real. Incluye un simulador para trabajar sin hardware.

```
React + TypeScript  <-- HTTP + WebSocket -->  NestJS  <-->  PostgreSQL
 (dashboard)                                   ^  ^
                                               |  +-- Simulador (incubadoras virtuales)
                                     HTTP POST |
                                            ESP32 (incubadora física)
```

## Estructura

| Carpeta | Contenido |
|---|---|
| `backend/` | API NestJS, reglas, simulador, WebSocket |
| `frontend/` | Dashboard React + TypeScript (Vite) |
| `firmware/esp32_incubadora/` | Sketch de Arduino para el ESP32 |
| `docker-compose.yml` | Base de datos PostgreSQL local |

## Cómo correrlo

Requisitos: Node.js 20+, Docker Desktop y Git.

```bash
# 1. Base de datos
docker compose up -d

# 2. Backend (terminal 1)
cd backend
cp .env.example .env        # en Windows PowerShell: copy .env.example .env
npm install
npm run start:dev

# 3. Frontend (terminal 2)
cd frontend
npm install
npm run dev
```

Abre http://localhost:5173. Con `SIMULATOR_ENABLED=true` aparecen 3 incubadoras simuladas;
`sim-3` falla de vez en cuando para que veas las alertas.

## Conectar el ESP32

1. En `firmware/esp32_incubadora/` copia `secrets.example.h` como `secrets.h` y completa WiFi, IP del
   computador y la API key (la misma de `DEVICE_API_KEY` en `backend/.env`).
2. El ESP32 y el computador deben estar en la misma red WiFi. En Windows, permite el puerto 3001 en el firewall.
3. Sube el sketch desde el Arduino IDE (placa ESP32 Dev Module).

Prueba sin hardware:

```bash
curl -X POST http://localhost:3001/api/telemetry \
  -H "Content-Type: application/json" -H "x-api-key: cambia-esta-clave" \
  -d '{"incubatorId":"incubadora-1","temperature":41.2,"humidity":55}'
```

## API

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/telemetry` | Una medición (requiere `x-api-key`) |
| POST | `/api/telemetry/batch` | Varias mediciones `{ "items": [...] }` |
| GET | `/api/incubators` | Estado actual de cada incubadora |
| GET | `/api/incubators/:id/history?limit=100` | Historial desde PostgreSQL |
| GET | `/api/health` | Comprobar que el servidor responde |

WebSocket (Socket.IO): `incubators:snapshot` al conectar e `incubator:update` en cada medición.

## Paradigmas y dónde están

| Paradigma | Dónde |
|---|---|
| Orientado a objetos | `backend/src/domain/` (`Incubator`, `Sensor`, `Actuator`, `Simulation`) |
| Funcional | `backend/src/functional/measurements.ts` (validación, media móvil, tendencia) |
| Declarativo | Reglas como datos en `backend/src/rules/rules.ts` y componentes React en `frontend/src/` |
| Reactivo | `Subject` de RxJS en `incubators.service.ts`, WebSocket y hook `useIncubators` |
| Concurrente | `Promise.allSettled` en `ingestMany` y el simulador con varias incubadoras |
| Lógico (opcional) | `evaluateRules`: hechos (`Fact`) contra condiciones, con alertas como conclusión |

## Pendiente (siguientes pasos)

- Usuarios y login (hoy el dashboard es abierto; solo el ESP32 usa API key).
- Migraciones de TypeORM en lugar de `synchronize: true`.
- Comandos hacia el ESP32 (hoy solo envía telemetría).
- Pruebas automáticas y despliegue (HTTPS real).

## Integración local del prototipo (Windows)

El backend utiliza el puerto 3001; el frontend utiliza 5173. Puede usarse PostgreSQL
instalado en Windows en lugar de Docker. Configure `backend/.env` copiando
`.env.example` solo si todavía no existe. El simulador está desactivado por defecto:
una pantalla sin mediciones antes de conectar la placa es normal.

En una terminal, desde `backend`: `npm ci` y `npm run start:dev`.
En otra terminal, desde `frontend`: `npm ci` y `npm run dev`.
No es necesario repetir `npm ci` en cada arranque.

Para el ESP32, complete únicamente el archivo privado `secrets.h`: WiFi, IPv4 LAN
del computador, puerto 3001 y API key coincidente con `DEVICE_API_KEY`. No publique
`.env` ni `secrets.h`. Abra `esp32_incubadora.ino` en Arduino IDE y cargue el programa
con las bibliotecas DHT sensor library, Adafruit Unified Sensor y LiquidCrystal I2C.
Abra el monitor serie a 115200 baudios: una respuesta `POST -> 201` indica que la
API aceptó la lectura. Compruebe también que el dashboard muestre `incubadora-1`.
Un HTTP 401 indica diferencia entre claves; un fallo de conexión requiere revisar
WiFi, IP, backend y acceso al puerto 3001 desde la red local.

Los estados de LED/buzzer del dashboard se calculan a partir de las mediciones;
no son confirmación eléctrica de las salidas físicas. La placa controla su alarma
local con temperatura menor de 25 °C o mayor de 40 °C.
## Historial y descarga

Debajo de las tarjetas, «Historial de mediciones» permite seleccionar una incubadora,
filtrar por fecha y navegar por páginas de 25 filas. La primera página se actualiza
cada 10 segundos. El CSV compatible con Excel incluye todo el período seleccionado,
no solo las filas visibles; sin fechas exporta todo el historial de esa incubadora.
Las columnas incluyen fecha local de Costa Rica, fecha UTC, temperatura, humedad,
alarma térmica calculada y origen. La fecha corresponde a la recepción en el servidor.
Se conservan todas las mediciones recibidas, aunque los valores se repitan.
El historial no registra períodos sin conexión ni recupera lecturas que la placa no envió.
Los datos persisten en PostgreSQL después de reiniciar el servidor.
API paginada: GET /api/incubators/:id/records?page=1&limit=25&since=ISO&until=ISO.

## Alarma local progresiva

Fuera del intervalo [25, 40] °C, el buzzer pasivo emite pulsos de 140 ms y el LED
parpadea sincronizado, con encendido completo durante el pulso. La pausa disminuye
de 800 ms a 120 ms conforme la temperatura se aleja hasta 10 °C del límite; el tono
pasa de 2000 a 3000 Hz. Al regresar al intervalo ambos se apagan. Una tarea FreeRTOS
independiente mantiene el patrón durante las peticiones HTTP. No aumenta el voltaje
ni garantiza mayor volumen o luminosidad: estos dependen del circuito.