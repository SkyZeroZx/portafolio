<h1 align="center">Portafolio</h1>
  <p align="center">
 Portafolio Web de presentación creado como una PWA presentar los conocimientos y experiencia adquiridos
  </p>

_Puede visualizar el proyecto desplegado en la web https://skyzerozx.com_

 ## :ledger: Index

- [Pre-Requisitos](#pre-requisitos-)
- [Instalación](#instalación-)
- [PWA](#ejecutando-como-pwa-)
- [Analisis de Codigo](#analisis-de-codigo-)
- [PageSpeed](#page-speed)
- [Construido](#construido-con-)


## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

### Instalación 🔧

_Para ejecutar un entorno de desarrollo_

_Previamente ejecutar el comando en la terminal para descargar "node_modules" para el funcionamiento del proyecto_

```
npm install
```

_Para ejecutar un servidor de pruebas local usar el comando donde **"PUERTO"** sera el puerto donde deseamos ejecutar el proyecto , por default **ng serve** ejecuta el puerto 4200_

```
ng serve --port [PUERTO]
```

_Dirigirse a la ruta http://localhost:4200_


## Ejecutando como PWA 👨🏻‍💻

_Para ejecutar como PWA(Progressive Web App) , previamente debe tenerse instalado la libreria http-serve_

```
npm install --global http-server
```

_Una vez instalada proceder a ejecutar el siguiente comando , que nos permite ejecutar en entorno local nuestra PWA_

```
npm run start-pwa
```

_Este comando se encuentra configurado en el archivo *package.json de la raiz del proyecto por default ejecuta el puerto 8080*_


## PageSpeed

_Haciendo uso de la herramienta *https://pagespeed.web.dev/* , se evaluo el tiempo de carga y renderizado por primera vez de la web_

_Obtuviendo un puntaje de **97** en rendimiento en mobile y **100** en desktop_

![Performance PageSpeed 1](/docs/performance/performance-mobile.png)

![Performance PageSpeed 2](/docs/performance/performance-desktop.png)


# Analisis de Codigo 🔩

_**Pre requisitos**_

_En la raiz del proyecto se tiene el archivo *sonar-project.properties* el cual tiene las propiedades necesarias para ejecutarlo sobre un SonarQube_

_Configurar los apartados : *sonar.host.url* , *sonar.login* *sonar.password* con los datos de su instancia correspondiente o usar SonarCloud con su token correspondiente_

```
Sonaqube >= 9.X
```

![SonarQube Properties](/docs/sonar/sonar-properties.png)

_Las pruebas fueron realizas sobre *SonarQube 9.8* para ejecutar el analisis de codigo ejecutar el comando para la instancia local:_

```
npm run sonar
```

_Reporte de Cobertura en SonarQube_

![SonarQube 1](/docs/sonar/sonarqube-1.png)


## Construido con 🛠️

_Las herramientas utilizadas son:_

- [Angular](https://angular.io/docs) - El Framework para Desarrollo Web
- [NPM](https://www.npmjs.com/) - Manejador de dependencias
- [TailwindCSS](https://tailwindui.com/) -Framework de CSS de código abierto​ para el diseño de páginas web
- [Visual Studio Code](https://code.visualstudio.com/) - Editor de Codigo
- [SonarQube](https://www.sonarqube.org/) - Evaluacion de codigo on premise
- [Prettier](https://prettier.io/) - Formateador de Codigo
- [TabNine](https://www.tabnine.com/) - Autocompletador de Codigo

## Versionado 📌

Usamos [GIT](https://git-scm.com/) para el versionado.

## Autor✒️

- **Jaime Burgos Tejada** - _Developer_
- [SkyZeroZx](https://github.com/SkyZeroZx)
- Email : jaimeburgostejada@gmail.com