# Práctica 3

## Enunciado y objetivos

El objetivo de esta práctica es familiarizarse con el uso de un sistema de gestión de bases de datos en entornos Big Data. Para ello, haremos uso de la aplicación más conocida como es MongoDB.


## Objetivo 1

Crear la colección pedidos en cada BD asociada a vuestro usuario, sobre la que se realizarán diversas operaciones CRUD. Para crear la colección abre y ejecuta el script ``insertar_pedidos.js`` (accesible en ``/tmp/mongo``). Las tareas a realizar son las siguientes:















11. Ídem anterior pero ordenando los documentos por Localidad (ascendente) e id_cliente (descendente).

## Objetivo 2

A partir de la colección pedidos utilizaremos consultas más complejas por medio de los operadores de agregación (pipeline). Por facilidad se indica la consulta en formato SQL estándar. Las tareas a realizar en este caso obtener:

		SELECT COUNT(*) "NUMERO DE CLIENTES" FROM pedidos;
	

		

		

		
		
## Objetivo 3

Vamos a utilizar la base de datos libre GeoWorldMap de GeoBytes. Es una base de datos de países, con sus estados/regiones y ciudades importantes. Sobre esta Base de datos vamos a obtener el par de ciudades que se encuentran más cercanas en cada país, excluyendo a los EEUU.





2. ¿Cómo podríamos obtener la ciudades más distantes en cada país?


