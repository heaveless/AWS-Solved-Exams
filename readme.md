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
- Respeto de las buenas prácticas de desarrollo
- Traducción de campos de inglés a español

**Puntos Extra**

- Documentación de uso
- Pruebas unitarias
- Documentación en Open API/Swagger
- Desplegar sin errores en AWS con el comando deploy del framework serverless
- Mayor complejidad de Integración

# Arquitectura Base

<p align="center">
    <img src="docs/images/arquitectura.png" />
</p>
