<p align="center">
    <img src="docs/images/banner.png" />
</p>

<p align="center">
    <img src="https://img.shields.io/badge/nodejs-20.14-green.svg" alt="Node Version">
    <img src="https://img.shields.io/badge/Status-It's%20Complicated-yellow.svg" alt="Estado del Proyecto">
    <img src="https://img.shields.io/badge/Código%20Level%3F-1000!!!-green.svg" alt="Nivel de Código">
</p>

# Acerca de Planets API

¡Bienvenido a Planets API! 🌌 Una API donde los planetas de Star Wars cobran vida en un abrir y cerrar de parsecs. ¿Quieres saber todo sobre Tatooine o descubrir datos desconocidos de Endor? Esta app conecta con SWAPI para obtener información estelar en tiempo real, almacenando los planetas que visitas en DynamoDB y acelerando tus exploraciones con Redis para que nunca tengas que esperar por la fuerza... ¡A explorar la galaxia sin límites (y sin servidores)!

# Inicio rapido

Si deseas iniciar rrapidamente de forma local puede seguir estas instrucciones para probarlo.

**dependencias**

- [Docker](https://www.docker.com/)
- [Docker-Compose](https://docs.docker.com/compose/)
- [NodeJs](https://nodejs.org/)


*Paso 1:* Instala las dependencias
```bash
npm install
```

*Paso 2:* Inicia Redis localmente mediante `docker-compose`
```bash
docker-compose up -d
```

*Paso 3:* Instala DynamoDb local
```bash
npm run sls:db:install
```

*Paso 4:* Inicia DynamoDb local
```bash
npm run sls:db:start
```

*Paso 5:* Crea un archivo `.env` desde `.env.example` para que la aplicacion pueda leer las variables de entorno. Puedes hacerlo manualmente o copiando este comando
```bash
cp .env.example .env
```

*Paso 6:* Inicia la aplicacion de forma local
```bash
npm run sls:offline
```

# Caracteristicas

**Puntos principales**

- [x] Mínimo 2 endpoints, GET para recuperar la información y POST para crear un elemento
  - `GET /api/healthcheck` para verificar la salud de la aplicacion
  - `POST /api/planets` para crear un nuevo planeta
  - `GET /api/planets/:ref` para obtener un planeta en especifico
  - `GET /api/planets` para obtener todo los planetas
- [x] Integración con una base de datos (DynamoDB o MySQL)
  - La integracion se realizo con DynamoDB utilizando la libreria [dynamoose](https://github.com/dynamoose/dynamoose)
- [x] Integración con SWAPI
  - La integracion se realizo con [axios](https://github.com/axios/axios) en el archivo `http.service.ts`, utilizando un microframework propio implementado dentro del mismo como monorepo para su estudio y evaluacion.
- [x] Uso de Serverless Framework
  - La implementacion esta configurada tanto para local como para el despligue segun la documentacion de [serverless](https://www.serverless.com/framework)
- [x] Uso de Node.js
  - La version utilizada de [Node](https://nodejs.org/) utilizada fue `v20.14.0`
- [x] Respeto de las buenas prácticas de desarrollo
  - Para poder realizar las practicas correctamente y de una manera mas limpia, se creo un microframework inspirado en [NestJs](https://nestjs.com), esta se puede encontrar en la carpeta `packages/(common|core|paths)`
- [x] Traducción de campos de inglés a español
  - El mismo microframework anteriormente mencionado integra traduccion automatica en la salida y entrada de datos, esta require su configuracion en la carpeta `i18n`

**Puntos Extra**

- [ x ] Documentación de uso
  - Para la documentacion se creo una [Wiki](https://github.com/heaveless/AWS-Solved-Exams/wiki) para su facilidad de lectura
- [x] Pruebas unitarias
  - Para realizar las pruebas unitarias y de integracion se configuro [Jest](https://jestjs.io/)
- [x] Documentación en Open API/Swagger
  - Para evitar ensuciar el codigo, la documentacion se realizo en `docs/swagger.yml`, esta se puede visualizar con una extension de `VSCode` llamada [Swagger Viewer](https://marketplace.visualstudio.com/items?itemName=Arjun.swagger-viewer).
- [x] Desplegar sin errores en AWS con el comando deploy del framework serverless
- [x] Mayor complejidad de Integración
  - Para agregarle mas complejidad se agrego una redis para su respuesta mas rrapida, un microframework que puede encontrarse como [@heaveless/common](https://www.npmjs.com/package/@heaveless/common), [@heaveless/core](https://www.npmjs.com/package/@heaveless/core), [@heaveless/paths](https://www.npmjs.com/package/@heaveless/paths)
  - Todos los mencionados tienen una responsabilidad en en funcionamientos de la applicacion.
# Arquitectura Base

<p align="center">
    <img src="docs/images/arquitectura.png" />
</p>

# Documentacion
Para poder comprender mejor el funcionamiento de la aplicacion es recomendamente leer la [Wiki](https://github.com/heaveless/AWS-Solved-Exams/wiki)  creada para ese proposito.


# Creditos

El microframework esta inspirado en [NestJs](https://nestjs.com), esta creada de una forma ultra ligera para maximizar la velocidad mientras siga funcionando como el [NestJs](https://nestjs.com) de siempre.
