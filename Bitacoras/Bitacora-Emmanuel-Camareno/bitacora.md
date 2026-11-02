# Bitácora de trabajo — Emmanuel Rodríguez Camareno

## Información general

**Estudiante:** Emmanuel Rodríguez Camareno
**Proyecto:** Incubadora inteligente
**Equipo:** Emmanuel, Yazir, Jordy y Tammy.
**Repositorio:** https://github.com/YazirDev/ProyectoParadigmasTEYJ

## Registro de actividades

### 2026-09-02 y 2026-09-16 — Definición del proyecto

**Objetivo:** seleccionar una propuesta viable con los componentes disponibles.

**Tareas realizadas:** participé en la discusión de ideas. Yazir propuso una incubadora con alertas por cambios de temperatura y sugerí incorporar un registro de datos. El 16 de septiembre Yazir comunicó que el docente había aceptado la propuesta con requisitos adicionales.

**Resultado:** se acordó desarrollar un prototipo académico de monitoreo y alertas. La regulación automática se discutió inicialmente, pero no quedó implementada.

**Próximos pasos:** preparar las conexiones y organizar el montaje.

### 2026-10-07 y 2026-10-09 — Diseño y preparación

**Objetivo:** organizar el esquema, los materiales y la reunión de trabajo.

**Tareas realizadas:** Yazir creó el repositorio e incorporó el esquema de conexiones. Participé en la coordinación de la sesión de montaje. Tammy propuso materiales para la estructura y ofreció herramientas; Yazir ofreció cartón y Jordy participó en la planificación.

**Resultado:** se organizó una reunión para el 12 de octubre en casa de Tammy, priorizando el funcionamiento del circuito.

**Próximos pasos:** montar los componentes y probar el esquema.

### 2026-10-12 — Construcción del prototipo

**Objetivo:** integrar la ESP32, el DHT11, el LCD, el LED y el buzzer.

**Tareas realizadas:** me reuní con Yazir, Jordy y Tammy para montar y probar el circuito. Revisamos el esquema inicial y realizamos correcciones. Compartí el código de lectura de temperatura y humedad, visualización en LCD y alarma por temperatura superior a 40 °C. Tammy compartió fotografías y videos del trabajo. Continué avanzando el montaje y compartí el resultado durante la noche.

**Problemas o bloqueos:** el esquema inicial presentó fallos y el buzzer no funcionaba correctamente.

**Resultado:** se avanzó en la lectura del sensor, la visualización y la estructura física; la alarma sonora quedó pendiente.

**Próximos pasos:** investigar el buzzer y completar los acabados.

### 2026-10-13 y 2026-10-14 — Corrección del buzzer y alarma inferior

**Objetivo:** resolver la alarma sonora y detectar temperaturas altas y bajas.

**Tareas realizadas:** probé otros buzzer y revisé conexiones y programación. Yazir y Jordy aportaron sugerencias para el diagnóstico. El 14 de octubre resolví el control del buzzer pasivo mediante tone() y noTone() y compartí el código corregido.

**Problemas o bloqueos:** cambiar los componentes no resolvía el problema; era necesario corregir la generación del sonido.

**Resultado:** quedó funcionando la alarma por temperatura mayor de 40 °C o menor de 25 °C, junto con el LED y el mensaje en pantalla. Exactamente a 25 °C y 40 °C no se activa esa condición.

**Próximos pasos:** conectar el prototipo con un sistema de monitoreo web.

### 2026-10-13 y 2026-10-14 — Desarrollo inicial de la web

**Objetivo:** visualizar las mediciones mediante una aplicación web.

**Tareas realizadas:** propuse aprovechar el WiFi de la ESP32. Trabajé con apoyo de asistentes de IA en una solución con React y TypeScript, NestJS, PostgreSQL y Socket.IO. Preparé el entorno local y compartí los avances con el equipo.

**Problemas o bloqueos:** aparecieron errores de tipos e importaciones, comandos ejecutados desde carpetas incorrectas y un conflicto con el puerto 3000.

**Resultado:** se corrigió la compilación y se configuraron backend y proxy en el puerto 3001. La web funcionó con incubadoras simuladas; esta etapa todavía no demostraba el envío desde la placa física.

**Próximos pasos:** integrar el código en el repositorio del equipo y conectar el ESP32 real.

### 2026-10-18 y 2026-10-19 — Organización del código y avance físico

**Objetivo:** preparar la integración y compartir el estado del prototipo.

**Tareas realizadas:** preparé la estructura de carpetas del repositorio y añadí firmware con WiFi y envío de telemetría. Jordy creó la estructura compartida de bitácoras. El 19 de octubre compartí fotografías y videos del avance físico y solicité completar los archivos para realizar la conexión final.

**Colaboración:** Tammy aportó observaciones sobre la cubierta de acetato y el acceso para las pruebas; el equipo revisó el avance.

**Resultado:** quedaron organizadas las carpetas y el firmware de comunicación. La cubierta seguía siendo una mejora discutida y la integración completa debía comprobarse.

**Próximos pasos:** completar los archivos asignados y desarrollar los escritos.

### 2026-10-18 y 2026-10-24 — Investigación y reparto de documentos

**Objetivo:** relacionar el prototipo con la investigación y la documentación técnica.

**Tareas realizadas:** propuse preguntas de investigación sobre las alteraciones de temperatura en neonatos. El 24 de octubre Tammy organizó los borradores y el reparto: Tammy, persona 1; Yazir, persona 2; Emmanuel, persona 3; Jordy, persona 4.

**Mi responsabilidad:** documentar componentes, conexiones, arquitectura, funcionamiento, código, paradigmas de programación, implementación y manual de uso. Cada integrante debía aportar referencias y anexos; Jordy coordinaría las pruebas y resultados con apoyo del equipo.

**Problemas o bloqueos:** era necesario diferenciar artículo y documentación técnica, además de distinguir temperatura ambiental y corporal y monitoreo y regulación.

**Resultado:** quedaron definidos el enfoque y las responsabilidades de los escritos.

**Próximos pasos:** desarrollar las secciones y reunir evidencias del funcionamiento.

### 2026-10-25 al 2026-11-01 — Aportes del equipo y documentos

**Objetivo:** reunir el código y completar las secciones documentales.

**Tareas realizadas:** gestioné el acceso de Tammy al repositorio y coordiné la integración. Tammy incorporó archivos de dependencias y entrada del frontend el 26 de octubre. Yazir agregó configuración de entorno y Nest y comunicó la terminación de su parte de los escritos el 30 de octubre. Jordy incorporó configuración de TypeScript y el proxy de Vite el 1 de noviembre.

**Mi aporte:** el 1 de noviembre comuniqué que había terminado mi parte en ambos Google Docs y solicité completar los archivos para probar el sistema integrado.

**Problemas o bloqueos:** hubo dudas sobre la distribución de los documentos y faltaban datos reales para las tablas de resultados.

**Resultado:** se reunieron los aportes de configuración y se reportaron avances en los escritos. La finalización documental se registra según los mensajes y el trabajo previo, sin afirmar que se revisaron nuevamente las versiones actuales de Google Docs.

**Próximos pasos:** ejecutar el repositorio final con el hardware y obtener mediciones.

### 2026-11-02 — Conexión del prototipo con la web final

**Objetivo:** ejecutar el proyecto con mediciones de la ESP32 física.

**Tareas realizadas:** Gestione el repositorio con los compañeros,  Se completaron archivos fuente vacíos, se instalaron dependencias y se verificó la compilación. Se configuraron privadamente el WiFi, la dirección del servidor y la clave de API y se cargó el firmware en la ESP32 mediante Arduino IDE, puerto COM5.

**Problemas o bloqueos:** había archivos incompletos y diferencias de configuración. También se corrigió la confusión entre el depurador de Arduino y la carga normal.

**Resultado:** la placa envió datos al backend del puerto 3001, se guardaron en PostgreSQL y se visualizaron en la web del puerto 5173. Se desactivó el simulador para distinguir los datos físicos y se mostraron las otras incubadoras como inactivas.

**Próximos pasos:** habilitar la consulta del historial y mejorar las alarmas.

### 2026-11-02 — Historial y ajuste final de alarmas

**Objetivo:** consultar las mediciones y mejorar la alerta del prototipo.

**Tareas realizadas:** solicité y comprobé un historial con filtros por incubadora y fecha, paginación y descarga CSV compatible con Excel. Se verificó que cada medición recibida se guardara aunque repitiera valores. Se revisó un CSV de prueba con 892 registros y posteriormente se comprobaron más de 1.000 mediciones almacenadas.

**Ajuste del prototipo:** integre pitidos repetidos y parpadeo sincronizado del LED. Después de probarlo, acepté pitidos de 350 ms, tono de 3.000 a 4.000 Hz y pausas más cortas cuanto mayor sea la desviación respecto del límite. El firmware se compiló y cargó correctamente.

**Resultado:** quedaron operativos el historial descargable y la alarma progresiva. Se modificaron duración, tono y ritmo, sin aumentar el voltaje del circuito.

**Próximos pasos:** conservar la versión final y preparar las evidencias de presentación.