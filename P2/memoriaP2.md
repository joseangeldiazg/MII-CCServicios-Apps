# Práctica 2

## Enunciado y objetivos

En esta práctica se estudiaran los PaaS. Se desarrollaran actividades relacionadas con contenedores y la gestión de los mismos con los siguientes objetivos. 

1. Crear un contenedor docker (A) con APACHE, SSL, y PHP5.	
	a. ¿Cuál es el puerto SSL?
	
	b. ¿Cómo redirigir el puerto SSL a vuestro puerto asignado?
	2. Crear un contenedor docker (B) con MySQL
3. Crear una página en el servidor Web (A) que se conecte al servicio MySQL en el contenedor (B)
4. Duplicar los contenedores A y B y discutir o mostrar qué pasaría si uno de ellos cayese.
5. Desplegar un servicio OwnCloud o NewCloud en otro contenedor (o eliminar alguno de los ya utilizados) y chequear su correcto funcionamiento almacenando archivos.

6. Elaborar un breve documento detallando el todo trabajo realizado.

## Conexión

Para conectar:

	ssh usuario@hadoop.ugr.es 
	
La contraseña es: **CC.2017pw**

Para comprobar que docker funciona correctamente podemos usar:

	docker run hello-world
	

# Creación de los contenedores

## Contenedores para alojar las apps

Como la aplicación realizada en la práctica anterior está basada en Node y Express, hemos bajado la siguiente imagen de [Docker Hub](https://hub.docker.com/_/node/), que contiene todo lo necesario para ejecutar nuestra app, a excepcion de Express que deberemos instalar. Para ello el primer paso es:
	
	docker pull node
	
Tras esto deberemos crear el contenedor con el siguiente comando:

	docker run -d -p 14027:80 --name appjose bitnami/express
		
	
Dado que también necesitaremos un servidor web, y los contenedores deben tener tendencia a ser lo más ligeros posibles crearemos otro contenedor con Nginx como servidor web al que llegaran las peticiones. 

	docker pull nginx	
	
Tras esto crearemos el contenedor con el siguiente comando:

	docker run -d -p 14025:80 --name web nginx	
Y ya lo tendremos activo a través de la dirección ```hadoop.ugr.es/14025/```.

## Contenedor para alojar la base de datos

La base de datos que hemos utilizado en la anterior práctica es MongoDB. En Docker Hub tenemos varios contenedores que pueden servirnos para montar esta base de datos como por ejemplo [este](https://hub.docker.com/_/mongo/). Tras localizar el que nos es útil, solo tenemos que hacer pull. 

	docker pull mongo

El siguiente paso como en los contenedores anteriores pasa por levantar este contenedor y dejarlo listo para acceder desde el contenedor de la app. 

	docker run -d -p 14026:27017 --name databasejose mongo


# Configuración 


El primer paso será crear y ejecutar el servidor mongo, como en su propia pagina en DockerHub indican, esta imagen ya lleva el puerto 27017 abierto por lo que no tendremos nada más que hacer lo siguiente:

	docker run -d --name databasejose mongo
	
	



# Servidor ownCloud en Docker


Para favorecer la robusted del servidor ownCloud, en lugar de montar la base de datos para persistencia en el mismo contenedor donde alojaremos ownCloud, montaremos un servidor de BD PostgreSQL por lo que nuestra arquitectura será la que podemos ver en la siguiente imagen:

![Arquitectura ownCloud](images/1.png "Arquitectura ownCloud")


Como el servidor ownCloud se conectará al de PostgreSQL, tendremos que crear este primero. Para ello: miraremos en DockerHub una imagen de PostgreSQL que se adapte a nuestros requerimientos como por ejemplo [esta](https://hub.docker.com/_/postgres/) y ejecutamos los siguientes comandos para hacernos con la imagen y ponerla en producción. 

	docker pull postgres
	
	docker run --name owncloud-postgres-jose -e POSTGRES_PASSWORD=pass -d postgres
	
Con esto tendremos lista nuestra base de datos, por lo que ahora deberemos crear el servidor ownCloud. Para ello solo tendremos que ejecutar el siguiente comando que ejecuta la imagen y la conecta con el contenedor de la base de datos. 

	docker run -d  --link owncloud-postgres-jose:owncloud-db --name owncloudserverjose -p 14028:80 owncloud
	
Una vez hecho esto ya podremos acceder a nuestro servidor ownCloud y configurarlo. Para ello accedemos a [hadoop.ugr.es/14028](hadoop.ugr.es/14028) y creamos una nueva cuenta de administrador. Cuando llegue el momento de configurar la base de datos introduciremos los siguientes datos:

* user: postgres
* pass: contraseña dada al crear el contenedor
* database: postgres
* host: owncloud-db

Una vez hecho todo esto podremos ver que nuestro ownCloud está funcionando correctamente. 





![Owncloud funcionando](images/own.png "Owncloud funcionando")

