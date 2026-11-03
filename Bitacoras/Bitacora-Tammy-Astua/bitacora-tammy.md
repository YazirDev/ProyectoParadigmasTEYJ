# Bitácora individual de desarrollo

- **Estudiante:** Tammy Astua Camacho
- **Proyecto:** Incubadora Inteligente
- **Curso:** Paradigmas de Programación
- **Equipo:** Emmanuel, Yazir, Jordy y Tammy Astua Camacho
- **Repositorio:** [ProyectoParadigmasTEYJ](https://github.com/YazirDev/ProyectoParadigmasTEYJ)

## 2 y 16 de septiembre de 2026 — Definición del proyecto

El 2 de septiembre discutimos qué proyecto podíamos realizar con los componentes disponibles. Yazir propuso construir una incubadora que avisara cuando la temperatura saliera de un rango definido. Emmanuel sugirió guardar las mediciones para poder consultarlas después.

El 16 de septiembre, Yazir nos comunicó que el profesor había aceptado la propuesta con algunos requisitos adicionales. Acordamos desarrollar un prototipo académico para medir la temperatura dentro de la incubadora y generar alertas. También conversamos sobre la posibilidad de regular la temperatura automáticamente, pero esa función quedó fuera de la versión que construimos.

## 7 y 9 de octubre de 2026 — Preparación del montaje

Mientras organizábamos la reunión de trabajo, propuse materiales para armar la estructura y ofrecí herramientas que podíamos usar en mi casa. Yazir ofreció cartón y compartió el esquema de conexiones en el repositorio.

Acordamos reunirnos en mi casa el 12 de octubre. Decidimos probar primero el circuito, porque necesitábamos ver cómo quedarían conectados los componentes antes de cerrar la estructura.

## 12 de octubre de 2026 — Montaje y primeras pruebas

### Actividades realizadas

El equipo se reunió en mi casa, donde trabajamos en el montaje y las pruebas del prototipo que habíamos planificado para la incubadora inteligente. Durante la sesión probamos el esquema inicial, pero no funcionó como esperábamos. Revisamos las conexiones y realizamos un segundo montaje para continuar con las pruebas. También compartí fotografías y videos para dejar evidencia del trabajo de ese día.

### Avances

Con el segundo esquema avanzamos en la lectura de la temperatura y la humedad con el sensor DHT11 y en la visualización de los datos en la pantalla LCD. La alarma sonora quedó pendiente.

### Dificultades encontradas

El primer montaje no respondió como esperábamos. Además, el buzzer seguía sin sonar con el segundo esquema. En ese momento todavía no sabíamos si la falla estaba en el componente, en la conexión o en el código.

### Soluciones implementadas

Como equipo, montamos un esquema alternativo que nos permitió continuar con las pruebas del sensor y de la pantalla. También pedimos otro buzzer para comparar su funcionamiento con el que habíamos utilizado.

### Decisiones técnicas

Decidimos conservar el segundo esquema porque ya nos permitía revisar las mediciones en la pantalla. Así podíamos investigar la falla de la alarma por separado.

### Pruebas efectuadas

- Probamos el montaje inicial y observamos que no respondió como esperábamos.
- Con el montaje alternativo revisamos la lectura del sensor y la visualización de los datos en la pantalla.
- Al probar la alarma, identificamos que el buzzer no emitía sonido.

### Aprendizajes obtenidos

Esta sesión me permitió comprender que un diseño puede necesitar cambios al llevarlo a la práctica. Ver la temperatura en la pantalla mientras el buzzer seguía sin sonar me ayudó a entender por qué conviene probar cada componente por separado.

### Próximos pasos

Quedó pendiente probar otro buzzer en el nuevo montaje y revisar cómo se activaba la alarma desde el código.

## 13 y 14 de octubre de 2026 — Seguimiento de la alarma y de la aplicación web

Después de la reunión en mi casa, Emmanuel probó otros buzzer y la falla continuó. El 14 de octubre compartió la solución. El buzzer era pasivo y necesitaba que el programa generara el tono. Con las funciones `tone()` y `noTone()` pudo iniciar y detener el sonido. Así se resolvió el problema que habíamos observado el día del montaje.

La alarma quedó configurada para avisar mediante el buzzer, el LED y un mensaje en la pantalla cuando la temperatura bajara de 25 °C o superara los 40 °C. Si la lectura era exactamente de 25 °C o de 40 °C, la alarma permanecía apagada.

Durante esos días, Emmanuel también compartió los primeros avances de la aplicación web. En esa etapa la página mostraba mediciones simuladas. Para comprobar la comunicación con nuestra incubadora, todavía hacía falta enviar una lectura desde la ESP32 física.

## 18 y 19 de octubre de 2026 — Revisión de la estructura

El 19 de octubre, Emmanuel compartió fotografías y videos del avance físico. Al revisar la estructura, comenté que, si colocábamos una cubierta de acetato, debíamos dejar una forma de acceder a los componentes. Todavía teníamos pruebas pendientes y cerrar la cubierta podía dificultar la revisión de una conexión. La cubierta quedó como propuesta de mejora.

Durante esos días, Emmanuel preparó el código para enviar las mediciones por WiFi y Jordy organizó el espacio del repositorio donde guardaríamos las bitácoras individuales.

## 24 de octubre de 2026 — Organización de los documentos

Organicé los borradores del artículo y de la documentación técnica, y repartí el trabajo entre los cuatro integrantes. Yo quedé como persona 1, Yazir como persona 2, Emmanuel como persona 3 y Jordy como persona 4. Cada integrante debía aportar las referencias y los anexos correspondientes a su parte.

Me correspondieron el planteamiento del problema, los objetivos, la introducción y la primera parte del marco teórico, donde debía abordar el tema de la temperatura adecuada. Para redactar esa sección era importante explicar qué medía nuestro prototipo. El sensor registraba la temperatura del aire dentro de la incubadora. La temperatura corporal del neonato era un concepto distinto. También debía aclarar que los límites de 25 °C y 40 °C correspondían a los valores programados para probar la alarma.

## 25 de octubre al 1 de noviembre de 2026 — Aporte al repositorio y seguimiento de los escritos

Emmanuel me ayudó a obtener acceso al repositorio. El 26 de octubre incorporé los archivos de dependencias y de entrada del frontend. El archivo de dependencias indicaba qué paquetes necesitaba la aplicación y el archivo de entrada permitía iniciar la interfaz web.

Durante esos días también dimos seguimiento a los escritos. El 30 de octubre, Yazir comunicó que había terminado su parte. El 1 de noviembre, Emmanuel informó que había completado sus secciones en ambos documentos. Ese mismo día, Jordy incorporó los archivos de configuración de TypeScript y del proxy de Vite. Para completar las tablas de resultados aún faltaban mediciones obtenidas con la incubadora física.

## 2 de noviembre de 2026 — Integración final y resultados del equipo

Emmanuel reportó que la ESP32 ya enviaba las lecturas del sensor al servidor. Las mediciones se guardaban en PostgreSQL y se podían consultar desde la aplicación web. Durante la prueba se desactivó el simulador para comprobar de dónde venían los datos. En la pantalla, nuestra incubadora aparecía activa y las demás figuraban como inactivas.

El historial permitía filtrar las mediciones por incubadora y por fecha, así como descargarlas en un archivo CSV para abrirlo en Excel. Emmanuel revisó una descarga de prueba con 892 registros y más adelante confirmó que la base de datos ya contenía más de 1.000 mediciones. Cada lectura quedaba registrada, incluso cuando la temperatura se mantenía igual.

También quedó resuelta la dificultad que habíamos encontrado el 12 de octubre en mi casa. Ese día, la pantalla mostraba la lectura, pero el buzzer seguía sin sonar. En las pruebas finales, el LED parpadeaba al ritmo de los pitidos y las pausas se hacían más cortas cuanto más se alejaba la temperatura del límite. El siguiente paso del equipo era reunir las evidencias para mostrar el funcionamiento del prototipo durante la presentación.
