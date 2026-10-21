MISION M3 - Reactor Core - Web Development I
=============================================

_«Todo es un componente.»_

## Como probarlo

Utiliza el cmd para hacer npm run dev en el proyecto y asi lanzar la página. Mi web tiene una pagina central que es la base de datos de superheroes, con su nombre, su imagen y su balance de poder general. Tambien tiene un buscador y unos filtros para encontrar al superheroe que quiera. Puedes clickar un personaje para que te salga una tarjeta del mismo, esta tarjeta tiene la información de antes mas un desglose de sus estadísticas y algo más de informaciónw sobre él mismo.
Tambien tiene un comparador entre 2 superhéroes por si quieres ver como se comparan.

## Uso de IA

He utilizado la IA para que me ayude ligeramente a adaptar los archivos de mi antigua pagina web a react pero sobretodo a como hacer los componentes y los hooks. Las adiciones a la pagina web, que componentes van a haber y que hooks lo he hecho yo pero la IA me ha hecho el código de dentro de estos nuevos archivos. Este ha sido el prompt que utilice tanto en Claude como en ChatGPT para comparar los resultados y escoger: 

Quiero reconstruir y adaptar mi página web DC Hero Database utilizando JavaScript, React 19 y Vite. El objetivo es mantener una aplicación funcional, organizada y visualmente atractiva, con código claro, sencillo y fácil de entender, propio de un alumno de tercero de Ingeniería.

La aplicación será una base de datos de personajes de DC que permita consultar sus características, buscar personajes, filtrarlos, ordenarlos y comparar sus estadísticas.

1. Criterios generales de desarrollo

Utiliza React 19 con componentes funcionales y JSX.

Escribe el código en inglés: nombres de componentes, variables, funciones y comentarios técnicos.

Mantén los textos que ve el usuario en español.

Prioriza la claridad y la sencillez frente a soluciones demasiado sofisticadas.

Separa responsabilidades cuando tenga sentido, evitando componentes excesivamente grandes o componentes que concentren toda la lógica.

Utiliza props claras y coherentes para comunicar los componentes.

Gestiona el estado con useState, procurando guardar únicamente los datos necesarios y calcular el resto a partir de ellos.

Utiliza useEffect solamente cuando sea necesario, con dependencias correctas y limpieza de recursos cuando corresponda.

Emplea listas con claves estables y renderizado condicional fácil de leer.

Evita duplicar código, introducir abstracciones innecesarias o añadir dependencias sin justificación.

Mantén la aplicación accesible, adaptable a distintos tamaños de pantalla y coherente con el diseño existente.

2. Funcionalidades de la aplicación

La página debe incluir:

Un catálogo de personajes de DC con sus imágenes, nombres, tipos y puntuaciones de poder.

Búsqueda por nombre.

Filtrado por tipo de personaje.

Ordenación por poder o nombre.

Un resumen con estadísticas generales del catálogo.

Una ventana de detalles de cada personaje, con información y estadísticas.

Un sistema para seleccionar hasta dos personajes y comparar sus estadísticas.

Estados de carga, error y ausencia de resultados.

Persistencia local cuando sea útil, por ejemplo, para conservar las preferencias o selecciones del usuario.

Los datos de los personajes deben obtenerse mediante el servicio existente que consulta la API de Superhero. Mantén la obtención de datos separada de la presentación de la interfaz.

3. Componentes que debe tener

Crea o adapta los siguientes componentes, manteniendo para cada uno una responsabilidad concreta:

Header.jsx: cabecera de la aplicación y acceso a la comparación.

StatsOverview.jsx: resumen de las estadísticas del catálogo.

SearchBar.jsx: campo de búsqueda controlado mediante props.

HeroFilters.jsx: controles de filtrado y ordenación.

HeroCatalog.jsx: presentación de la lista de personajes y del estado sin resultados.

HeroCard.jsx: tarjeta individual de un personaje y acciones relacionadas.

HeroModal.jsx: ventana con los detalles y las estadísticas de un personaje.

HeroComparison.jsx: selección y comparación de dos personajes.

LoadingState.jsx: estado de carga.

ErrorState.jsx: mensaje de error y opción para volver a intentarlo.

EmptyState.jsx: mensaje y acción para recuperar los resultados cuando no hay coincidencias.

Los componentes deben recibir por props los datos y las funciones que necesitan. El estado compartido debe mantenerse en el nivel adecuado, sin introducir comunicación innecesariamente compleja.

4. Hooks personalizados

Crea estos hooks reutilizables:

useHeroes.js: se encarga de cargar los personajes mediante el servicio, gestionar los estados de carga y error y permitir volver a realizar la petición. Debe utilizar useEffect y cancelar la petición cuando corresponda.

useLocalStorage.js: permite guardar y recuperar un valor de localStorage utilizando una interfaz similar a useState, gestionando los posibles errores de almacenamiento.

No conviertas cada operación en un hook personalizado si no aporta una ventaja real.

5. Archivos de datos, servicios y utilidades

Mantén separados estos archivos:

heroes.js: catálogo de personajes de DC que se utilizará para seleccionar y clasificar los personajes de la API.

heroService.js: comunicación con la API y transformación de sus datos al formato utilizado por la aplicación.

heroUtils.js: funciones auxiliares para calcular puntuaciones, filtrar, ordenar y obtener estadísticas.

Estas funciones deben ser independientes de los componentes siempre que sea razonable, para facilitar su comprensión y reutilización.

6. Archivos principales y configuración

Adapta también los siguientes archivos cuando sea necesario:

App.jsx: coordina la aplicación, mantiene el estado compartido y conecta los componentes.

main.jsx: punto de entrada de React.

styles.css: estilos globales, componentes y diseño adaptable.

index.html: documento HTML principal y metadatos.

public/favicon.svg: icono de la aplicación.

README.md: descripción, instalación, ejecución, tecnologías utilizadas y declaración del uso de IA.

package.json y package-lock.json: dependencias y configuración coherentes con el proyecto.

Respeta los archivos existentes que sigan siendo válidos y modifica únicamente los que lo necesiten.

7. Gestión del estado y calidad del código

La interfaz debe reaccionar al estado de React. No manipules directamente el DOM para actualizar resultados que deberían representarse mediante JSX.

La búsqueda, los filtros, la ordenación y las estadísticas deben derivarse de los datos disponibles siempre que sea posible, sin mantener copias redundantes en el estado.

Utiliza key estables en las listas, eventos claros y condicionales legibles. Evita efectos que puedan sustituirse por cálculos normales o por el propio flujo de renderizado de React.

La selección de personajes para comparar debe ser coherente en toda la aplicación, y las ventanas modales deben poder cerrarse correctamente. Gestiona también las respuestas fallidas de la API y las imágenes que no se puedan cargar.

8. Organización del trabajo

Antes de escribir código, revisa la estructura y el contenido de los archivos existentes. Identifica cuáles se pueden reutilizar, cuáles deben modificarse y cuáles hay que crear.

Genera el contenido completo de los archivos nuevos o modificados, respetando las importaciones, las rutas y los nombres de las funciones entre archivos. No des por terminado el trabajo hasta comprobar que las piezas encajan entre sí y que no hay errores evidentes de sintaxis o incompatibilidades.

No añadas funcionalidades, patrones de diseño o herramientas que no aporten valor claro al proyecto. Si existe una solución más sencilla y comprensible, elige esa solución.

El resultado debe ser una aplicación React 19 funcional, modular, coherente y desacoplada.

## Autopsia

- Uno de las partes más discutibles de mi código es la selección de personajes para compararlos, Claude me recomendó gestionar la selección dentro de HeroComparison.jsx, que tuviese su propio estado, así el componente es más independiente y necesita menos comunicación con el padre, el problema es que sincronizar la selección con las tarjetas y la cabecera puede no coincidir y requerir más lógica. Por otra parte ChatGPT recomendó mantener en la App.jsx un array llamado comparisonIds, con los IDs de los personajes seleccionado y pasar ese array a HeroComparison.jsx mediante props, esto soluciona la desventaja de la opción de Claude pues la selección la comparte entre las tarjetas, la cabecera y la comparación, el único problema es que App.jsx debe hacer más trabajo. Terminé escogiendo el método de ChatGPT por la ventaja de que todos los componentes que utilizan la selección tengan la misma.  

- Otra de las partes más discutibles es como calcular los resultados de búsqueda, filtros y ordenación. ChatGPT me dijo que guardase únicamente los criterios y calcular la lista visible resultado con las funciones de heroUtils.js, esto hace que solo se almacene el estado necesario, hay una única lista y las funciones de filtrado y ordenación pueden reutilizarse pero en contraparte los cálculos tienen que ejecutarse de nuevo cada vez que se renderiza App.jsx, si fuese una base de datos más grande podría resultar un problema. Claude por otra parte sugirió crear un estado extra que guardase los resultados filtrados, y aunque ofrecía más control cuando se actualizan resultados, en mi página web no contendría información nueva, es un resultado que ya se puede obtener a partir del catálogo y los filtros, y no es necesario.
