# Práctica 3

## Enunciado y objetivos

El objetivo de esta práctica es familiarizarse con el uso de un sistema de gestión de bases de datos en entornos Big Data. Para ello, haremos uso de la base de datos noSQL más conocida como es, MongoDB.


## Creación del contenedor Docker con MongoDB

Nos decantamos por la imagen de ``mvertes/alpine-mongo`` ya que es mucho más ligera que otras como la oficial de MongoDB.

	docker run -d --name mongo-p4-jose -p 14029:27017 -v /tmp/mongo/insertar_pedidos.js:/home/insertar_pedidos.js mvertes/alpine-mongo

Una vez creado el contenedor conectamos a el siguiente comando:

	docker exec -ti mongo sh
	
Una vez dentro debemos iniciar la consola de MongoDb para ello, simplemente introducimos en la terminal ``mongo``. Por último para cargar la colección de prueba que usaremos introducimos el siguiente comando:

	load('/home/insertar_pedidos.js');
	

## Objetivo 1

Crear la colección pedidos en cada BD asociada a vuestro usuario, sobre la que se realizarán diversas operaciones CRUD. Para crear la colección abre y ejecuta el script ``insertar_pedidos.js`` (accesible en ``/tmp/mongo``). Las tareas a realizar son las siguientes:

### 1- Visualiza la colección pedidos y familiarízate con ella. Observa los distintos tipos de datos y sus estructuras dispares.

		db.pedidos.find().pretty();
		
Esto nos ofrecerá la siguiente salida, donde podemos apreciar la coleccion pedidos, compuesta de **documentos** clientes, que a su vez pueden contener pedidos, que vuelve a ser un **documento**  y a su vez se compone de Productos. 
	
	{
		"_id" : ObjectId("590a4bd049da4408ab69910b"),
		"id_cliente" : 1111,
		"Nombre" : "Pedro Ramirez",
		"Direccion" : "Calle Los Romeros 14",
		"Localidad" : "Sevilla",
		"Fnacimiento" : ISODate("1963-04-03T00:00:00Z"),
		"Facturacion" : 5000,
		"Pedidos" : [
			{
				"id_pedido" : 1,
				"Productos" : [
					{
						"id_producto" : 1,
						"Nombre" : "Pentium IV",
						"Fabricante" : "Intel",
						"Precio_unidad" : 390,
						"Cantidad" : 1
					},
					{
						"id_producto" : 2,
						"Nombre" : "Tablet 8 pulgadas",
						"Precio_unidad" : 95,
						"Cantidad" : 1
					}
				]
			},
			{
				"id_pedido" : 2,
				"Productos" : [
					{
						"id_producto" : 77,
						"Nombre" : "Impresora Laser",
						"Fabricante" : "Canon",
						"Precio_unidad" : 115,
						"Cantidad" : 3
					}
				]
			}
		]
	}
	{
		"_id" : ObjectId("590a4bd049da4408ab69910c"),
		"id_cliente" : 2222,
		"Nombre" : "Juan Gomez",
		"Direccion" : "Perpetuo Socorro 9",
		"Localidad" : "Salamanca",
		"Fnacimiento" : ISODate("1960-08-17T00:00:00Z"),
		"Facturacion" : 6500,
		"Pedidos" : [
			{
				"id_pedido" : 1,
				"Productos" : [
					{
						"id_producto" : 1,
						"Nombre" : "Pentium IV",
						"Fabricante" : "Intel",
						"Precio_unidad" : 100,
						"Cantidad" : 1
					},
					{
						"id_producto" : 42,
						"Nombre" : "Portatil ASM Mod. 254",
						"Fabricante" : "Intel",
						"Precio_unidad" : 455,
						"Cantidad" : 2
					},
					{
						"id_producto" : 27,
						"Nombre" : "Cable USB",
						"Precio_unidad" : 11,
						"Cantidad" : 12
					}
				]
			},
			{
				"id_pedido" : 2,
				"Productos" : [
					{
						"id_producto" : 77,
						"Nombre" : "Impresora Laser",
						"Fabricante" : "Canon",
						"Precio_unidad" : 128,
						"Cantidad" : 3
					},
					{
						"id_producto" : 42,
						"Nombre" : "Portatil ASM Mod. 254",
						"Fabricante" : "Intel",
						"Precio_unidad" : 451,
						"Cantidad" : 5
					},
					{
						"id_producto" : 21,
						"Nombre" : "Disco Duro 500GB",
						"Precio_unidad" : 99,
						"Cantidad" : 10
					}
				]
			},
			{
				"id_pedido" : 3,
				"Productos" : [
					{
						"id_producto" : 1,
						"Nombre" : "Pentium IV",
						"Fabricante" : "Intel",
						"Precio_unidad" : 94,
						"Cantidad" : 5
					},
					{
						"id_producto" : 95,
						"Nombre" : "SAI 5H Mod. 258",
						"Precio_unidad" : 213,
						"Cantidad" : 2
					},
					{
						"id_producto" : 21,
						"Precio_unidad" : 66,
						"Nombre" : "Disco Duro 500GB",
						"Cantidad" : 10
					}
				]
			}
		]
	}
	{
		"_id" : ObjectId("590a4bd049da4408ab69910d"),
		"id_cliente" : 3333,
		"Nombre" : "Carlos Montes",
		"Direccion" : "Salsipuedes 13",
		"Localidad" : "Jaen",
		"Fnacimiento" : ISODate("1967-11-25T00:00:00Z"),
		"Facturacion" : 8000
	}
	{
		"_id" : ObjectId("590a4bd049da4408ab69910e"),
		"id_cliente" : 4444,
		"Nombre" : "Carmelo Coton",
		"Direccion" : "La Luna 103",
		"Localidad" : "Jaen",
		"Fnacimiento" : ISODate("1969-01-06T00:00:00Z"),
		"Facturacion" : 12300
	}
	{
		"_id" : ObjectId("590a4bd049da4408ab69910f"),
		"id_cliente" : 5555,
		"Nombre" : "Cristina Miralles",
		"Direccion" : "San Fernando 28",
		"Localidad" : "Granada",
		"Fnacimiento" : ISODate("1970-07-12T00:00:00Z"),
		"Facturacion" : 16500,
		"Pedidos" : [
			{
				"id_pedido" : 1,
				"Productos" : [
					{
						"id_producto" : 95,
						"Nombre" : "SAI 5H Mod. 258",
						"Precio_unidad" : 211,
						"Cantidad" : 2
					},
					{
						"id_producto" : 42,
						"Nombre" : "Portatil ASM Mod. 254",
						"Precio_unidad" : 460,
						"Fabricante" : "Intel",
						"Cantidad" : 2
					},
					{
						"id_producto" : 77,
						"Nombre" : "Impresora Laser",
						"Fabricante" : "Canon",
						"Precio_unidad" : 119,
						"Cantidad" : 2
					}
				]
			}
		]
	}
	{
		"_id" : ObjectId("590a4bd049da4408ab699110"),
		"id_cliente" : 6666,
		"Nombre" : "Chema Pamundi",
		"Direccion" : "Recogidas 54",
		"Localidad" : "Granada",
		"Fnacimiento" : ISODate("1969-02-04T00:00:00Z"),
		"Facturacion" : 5000
	}
	{
		"_id" : ObjectId("590a4bd049da4408ab699111"),
		"id_cliente" : 777,
		"Nombre" : "Alberto Matero",
		"Direccion" : "Pelayo 4",
		"Localidad" : "Sevilla",
		"Facturacion" : 2500,
		"Pedidos" : null
	}



### 2-  Visualiza sólo el primer documento de la colección. Utiliza los métodos ``.limit()`` y ``.findOne()``.

	db.pedidos.findOne();
	
	db.pedidos.find().limit(1).pretty();

``Limit`` funciona de manera similar a SQL y findOne() podemos compararlo con ``SELECT TOP 1 FROM...``	La salida es la siguiente:

	{
		"_id" : ObjectId("590a4bd049da4408ab69910b"),
		"id_cliente" : 1111,
		"Nombre" : "Pedro Ramirez",
		"Direccion" : "Calle Los Romeros 14",
		"Localidad" : "Sevilla",
		"Fnacimiento" : ISODate("1963-04-03T00:00:00Z"),
		"Facturacion" : 5000,
		"Pedidos" : [
			{
				"id_pedido" : 1,
				"Productos" : [
					{
						"id_producto" : 1,
						"Nombre" : "Pentium IV",
						"Fabricante" : "Intel",
						"Precio_unidad" : 390,
						"Cantidad" : 1
					},
					{
						"id_producto" : 2,
						"Nombre" : "Tablet 8 pulgadas",
						"Precio_unidad" : 95,
						"Cantidad" : 1
					}
				]
			},
			{
				"id_pedido" : 2,
				"Productos" : [
					{
						"id_producto" : 77,
						"Nombre" : "Impresora Laser",
						"Fabricante" : "Canon",
						"Precio_unidad" : 115,
						"Cantidad" : 3
					}
				]
			}
		]
	}
### 3- Visualiza el cliente con id_cliente = 2222

	db.pedidos.find({id_cliente: 2222}).pretty();
	
Para simular la clausula WHERE de SQL, introduciremos las restricciones dentro de llaves en la instrucción ``find``. La salida es la siguiente:

	{
		"_id" : ObjectId("590a4bd049da4408ab69910c"),
		"id_cliente" : 2222,
		"Nombre" : "Juan Gomez",
		"Direccion" : "Perpetuo Socorro 9",
		"Localidad" : "Salamanca",
		"Fnacimiento" : ISODate("1960-08-17T00:00:00Z"),
		"Facturacion" : 6500,
		"Pedidos" : [
			{
				"id_pedido" : 1,
				"Productos" : [
					{
						"id_producto" : 1,
						"Nombre" : "Pentium IV",
						"Fabricante" : "Intel",
						"Precio_unidad" : 100,
						"Cantidad" : 1
					},
					{
						"id_producto" : 42,
						"Nombre" : "Portatil ASM Mod. 254",
						"Fabricante" : "Intel",
						"Precio_unidad" : 455,
						"Cantidad" : 2
					},
					{
						"id_producto" : 27,
						"Nombre" : "Cable USB",
						"Precio_unidad" : 11,
						"Cantidad" : 12
					}
				]
			},
			{
				"id_pedido" : 2,
				"Productos" : [
					{
						"id_producto" : 77,
						"Nombre" : "Impresora Laser",
						"Fabricante" : "Canon",
						"Precio_unidad" : 128,
						"Cantidad" : 3
					},
					{
						"id_producto" : 42,
						"Nombre" : "Portatil ASM Mod. 254",
						"Fabricante" : "Intel",
						"Precio_unidad" : 451,
						"Cantidad" : 5
					},
					{
						"id_producto" : 21,
						"Nombre" : "Disco Duro 500GB",
						"Precio_unidad" : 99,
						"Cantidad" : 10
					}
				]
			},
			{
				"id_pedido" : 3,
				"Productos" : [
					{
						"id_producto" : 1,
						"Nombre" : "Pentium IV",
						"Fabricante" : "Intel",
						"Precio_unidad" : 94,
						"Cantidad" : 5
					},
					{
						"id_producto" : 95,
						"Nombre" : "SAI 5H Mod. 258",
						"Precio_unidad" : 213,
						"Cantidad" : 2
					},
					{
						"id_producto" : 21,
						"Precio_unidad" : 66,
						"Nombre" : "Disco Duro 500GB",
						"Cantidad" : 10
					}
				]
			}
		]
	}
	
### 4- Visualiza los clientes que hayan pedido algún producto de más de 94 euros.

	db.pedidos.find({"Pedidos.Productos.Precio_unidad":{$gt:94}}).pretty();
		
Como vemos es más sencillo que SQL, ya que en ese caso tendríamos que haber realizado reuniones por claves entre tablas para haber obtenido todo. 

	{
		"_id" : ObjectId("590a4bd049da4408ab69910b"),
		"id_cliente" : 1111,
		"Nombre" : "Pedro Ramirez",
		"Direccion" : "Calle Los Romeros 14",
		"Localidad" : "Sevilla",
		"Fnacimiento" : ISODate("1963-04-03T00:00:00Z"),
		"Facturacion" : 5000,
		"Pedidos" : [
			{
				"id_pedido" : 1,
				"Productos" : [
					{
						"id_producto" : 1,
						"Nombre" : "Pentium IV",
						"Fabricante" : "Intel",
						"Precio_unidad" : 390,
						"Cantidad" : 1
					},
					{
						"id_producto" : 2,
						"Nombre" : "Tablet 8 pulgadas",
						"Precio_unidad" : 95,
						"Cantidad" : 1
					}
				]
			},
			{
				"id_pedido" : 2,
				"Productos" : [
					{
						"id_producto" : 77,
						"Nombre" : "Impresora Laser",
						"Fabricante" : "Canon",
						"Precio_unidad" : 115,
						"Cantidad" : 3
					}
				]
			}
		]
	}
	{
		"_id" : ObjectId("590a4bd049da4408ab69910c"),
		"id_cliente" : 2222,
		"Nombre" : "Juan Gomez",
		"Direccion" : "Perpetuo Socorro 9",
		"Localidad" : "Salamanca",
		"Fnacimiento" : ISODate("1960-08-17T00:00:00Z"),
		"Facturacion" : 6500,
		"Pedidos" : [
			{
				"id_pedido" : 1,
				"Productos" : [
					{
						"id_producto" : 1,
						"Nombre" : "Pentium IV",
						"Fabricante" : "Intel",
						"Precio_unidad" : 100,
						"Cantidad" : 1
					},
					{
						"id_producto" : 42,
						"Nombre" : "Portatil ASM Mod. 254",
						"Fabricante" : "Intel",
						"Precio_unidad" : 455,
						"Cantidad" : 2
					},
					{
						"id_producto" : 27,
						"Nombre" : "Cable USB",
						"Precio_unidad" : 11,
						"Cantidad" : 12
					}
				]
			},
			{
				"id_pedido" : 2,
				"Productos" : [
					{
						"id_producto" : 77,
						"Nombre" : "Impresora Laser",
						"Fabricante" : "Canon",
						"Precio_unidad" : 128,
						"Cantidad" : 3
					},
					{
						"id_producto" : 42,
						"Nombre" : "Portatil ASM Mod. 254",
						"Fabricante" : "Intel",
						"Precio_unidad" : 451,
						"Cantidad" : 5
					},
					{
						"id_producto" : 21,
						"Nombre" : "Disco Duro 500GB",
						"Precio_unidad" : 99,
						"Cantidad" : 10
					}
				]
			},
			{
				"id_pedido" : 3,
				"Productos" : [
					{
						"id_producto" : 1,
						"Nombre" : "Pentium IV",
						"Fabricante" : "Intel",
						"Precio_unidad" : 94,
						"Cantidad" : 5
					},
					{
						"id_producto" : 95,
						"Nombre" : "SAI 5H Mod. 258",
						"Precio_unidad" : 213,
						"Cantidad" : 2
					},
					{
						"id_producto" : 21,
						"Precio_unidad" : 66,
						"Nombre" : "Disco Duro 500GB",
						"Cantidad" : 10
					}
				]
			}
		]
	}
	{
		"_id" : ObjectId("590a4bd049da4408ab69910f"),
		"id_cliente" : 5555,
		"Nombre" : "Cristina Miralles",
		"Direccion" : "San Fernando 28",
		"Localidad" : "Granada",
		"Fnacimiento" : ISODate("1970-07-12T00:00:00Z"),
		"Facturacion" : 16500,
		"Pedidos" : [
			{
				"id_pedido" : 1,
				"Productos" : [
					{
						"id_producto" : 95,
						"Nombre" : "SAI 5H Mod. 258",
						"Precio_unidad" : 211,
						"Cantidad" : 2
					},
					{
						"id_producto" : 42,
						"Nombre" : "Portatil ASM Mod. 254",
						"Precio_unidad" : 460,
						"Fabricante" : "Intel",
						"Cantidad" : 2
					},
					{
						"id_producto" : 77,
						"Nombre" : "Impresora Laser",
						"Fabricante" : "Canon",
						"Precio_unidad" : 119,
						"Cantidad" : 2
					}
				]
			}
		]
	}


### 5. Visualiza los clientes de Jaén o Salamanca (excluye los datos de los pedidos). Utiliza los operador ``$or e $in``

Las consultas serían las siguientes:

	db.pedidos.find({Localidad:{$in:["Jaen","Salamanca"]}},
		{Pedidos:0}).pretty();
	
	db.pedidos.find({$or:[{Localidad: "Salamanca"},{Localidad: "Jaen"}]}, {Pedidos:0}).pretty();
	
Por otro lado la salida sería:

	{
		"_id" : ObjectId("590a4bd049da4408ab69910c"),
		"id_cliente" : 2222,
		"Nombre" : "Juan Gomez",
		"Direccion" : "Perpetuo Socorro 9",
		"Localidad" : "Salamanca",
		"Fnacimiento" : ISODate("1960-08-17T00:00:00Z"),
		"Facturacion" : 6500
	}
	{
		"_id" : ObjectId("590a4bd049da4408ab69910d"),
		"id_cliente" : 3333,
		"Nombre" : "Carlos Montes",
		"Direccion" : "Salsipuedes 13",
		"Localidad" : "Jaen",
		"Fnacimiento" : ISODate("1967-11-25T00:00:00Z"),
		"Facturacion" : 8000
	}
	{
		"_id" : ObjectId("590a4bd049da4408ab69910e"),
		"id_cliente" : 4444,
		"Nombre" : "Carmelo Coton",
		"Direccion" : "La Luna 103",
		"Localidad" : "Jaen",
		"Fnacimiento" : ISODate("1969-01-06T00:00:00Z"),
		"Facturacion" : 12300
	}	
### 6. Visualiza los clientes no tienen campo pedidos.

	db.pedidos.find({Pedidos:{$exists:false}}).pretty();
	
Lo que nos ofrecería la siguiente salida:

	{
		"_id" : ObjectId("590a4bd049da4408ab69910d"),
		"id_cliente" : 3333,
		"Nombre" : "Carlos Montes",
		"Direccion" : "Salsipuedes 13",
		"Localidad" : "Jaen",
		"Fnacimiento" : ISODate("1967-11-25T00:00:00Z"),
		"Facturacion" : 8000
	}
	{
		"_id" : ObjectId("590a4bd049da4408ab69910e"),
		"id_cliente" : 4444,
		"Nombre" : "Carmelo Coton",
		"Direccion" : "La Luna 103",
		"Localidad" : "Jaen",
		"Fnacimiento" : ISODate("1969-01-06T00:00:00Z"),
		"Facturacion" : 12300
	}
	{
		"_id" : ObjectId("590a4bd049da4408ab699110"),
		"id_cliente" : 6666,
		"Nombre" : "Chema Pamundi",
		"Direccion" : "Recogidas 54",
		"Localidad" : "Granada",
		"Fnacimiento" : ISODate("1969-02-04T00:00:00Z"),
		"Facturacion" : 5000
	}
	
### 7. Visualiza los clientes que hayan nacido en 1963.

Para los rangos de fecha deberemos crear un nuevo "objeto" fecha ya que de otro modo se comportarán como strings. 

	db.pedidos.find({Fnacimiento:{$gte: ISODate("1963-01-01T00:00:00.000Z"), $lt: ISODate("1964-01-01T00:00:00.000Z") }},{Pedidos:0}).pretty();
	
Por lo que la salida será solo el siguiente usuario:

	{
		"_id" : ObjectId("590a4bd049da4408ab69910b"),
		"id_cliente" : 1111,
		"Nombre" : "Pedro Ramirez",
		"Direccion" : "Calle Los Romeros 14",
		"Localidad" : "Sevilla",
		"Fnacimiento" : ISODate("1963-04-03T00:00:00Z"),
		"Facturacion" : 5000
	}	
### 8. Visualiza los clientes que hayan pedido algún producto fabricado por Canon y algún producto cuyo precio sea inferior a 15 euros

	db.pedidos.find({"Pedidos.Productos.Fabricante":"Canon", "Pedidos.Productos.Precio_unidad":{$lt:15}}).pretty();
	
Si queremos solo los clientes, deberemos añadir, Productos:0 como hemos visto en secciones anteriores. En nuestro caso, lo mostramos todo:

	{
		"_id" : ObjectId("590a4bd049da4408ab69910c"),
		"id_cliente" : 2222,
		"Nombre" : "Juan Gomez",
		"Direccion" : "Perpetuo Socorro 9",
		"Localidad" : "Salamanca",
		"Fnacimiento" : ISODate("1960-08-17T00:00:00Z"),
		"Facturacion" : 6500,
		"Pedidos" : [
			{
				"id_pedido" : 1,
				"Productos" : [
					{
						"id_producto" : 1,
						"Nombre" : "Pentium IV",
						"Fabricante" : "Intel",
						"Precio_unidad" : 100,
						"Cantidad" : 1
					},
					{
						"id_producto" : 42,
						"Nombre" : "Portatil ASM Mod. 254",
						"Fabricante" : "Intel",
						"Precio_unidad" : 455,
						"Cantidad" : 2
					},
					{
						"id_producto" : 27,
						"Nombre" : "Cable USB",
						"Precio_unidad" : 11,
						"Cantidad" : 12
					}
				]
			},
			{
				"id_pedido" : 2,
				"Productos" : [
					{
						"id_producto" : 77,
						"Nombre" : "Impresora Laser",
						"Fabricante" : "Canon",
						"Precio_unidad" : 128,
						"Cantidad" : 3
					},
					{
						"id_producto" : 42,
						"Nombre" : "Portatil ASM Mod. 254",
						"Fabricante" : "Intel",
						"Precio_unidad" : 451,
						"Cantidad" : 5
					},
					{
						"id_producto" : 21,
						"Nombre" : "Disco Duro 500GB",
						"Precio_unidad" : 99,
						"Cantidad" : 10
					}
				]
			},
			{
				"id_pedido" : 3,
				"Productos" : [
					{
						"id_producto" : 1,
						"Nombre" : "Pentium IV",
						"Fabricante" : "Intel",
						"Precio_unidad" : 94,
						"Cantidad" : 5
					},
					{
						"id_producto" : 95,
						"Nombre" : "SAI 5H Mod. 258",
						"Precio_unidad" : 213,
						"Cantidad" : 2
					},
					{
						"id_producto" : 21,
						"Precio_unidad" : 66,
						"Nombre" : "Disco Duro 500GB",
						"Cantidad" : 10
					}
				]
			}
		]
	}

### 9. Datos personales (id_cliente, Nombre, Direccion, Localidad y Fnacimiento) de los clientes cuyo nombre empieza por la cadena "c" (No distinguir entre mayusculas y minúsculas).


	db.pedidos.find({"Nombre": /^c/i}, {"_id": 0, "Pedidos":0} ).pretty();
	
La salida es la siguiente:

	{
		"id_cliente" : 3333,
		"Nombre" : "Carlos Montes",
		"Direccion" : "Salsipuedes 13",
		"Localidad" : "Jaen",
		"Fnacimiento" : ISODate("1967-11-25T00:00:00Z"),
		"Facturacion" : 8000
	}
	{
		"id_cliente" : 4444,
		"Nombre" : "Carmelo Coton",
		"Direccion" : "La Luna 103",
		"Localidad" : "Jaen",
		"Fnacimiento" : ISODate("1969-01-06T00:00:00Z"),
		"Facturacion" : 12300
	}
	{
		"id_cliente" : 5555,
		"Nombre" : "Cristina Miralles",
		"Direccion" : "San Fernando 28",
		"Localidad" : "Granada",
		"Fnacimiento" : ISODate("1970-07-12T00:00:00Z"),
		"Facturacion" : 16500
	}
	{
		"id_cliente" : 6666,
		"Nombre" : "Chema Pamundi",
		"Direccion" : "Recogidas 54",
		"Localidad" : "Granada",
		"Fnacimiento" : ISODate("1969-02-04T00:00:00Z"),
		"Facturacion" : 5000
	}
### 10. Visualiza los datos personales de los clientes (excluyendo _id). Limita los documentos a 4.

	db.pedidos.find({},{"_id": 0, "Pedidos":0}).limit(4).pretty();


	{
		"id_cliente" : 1111,
		"Nombre" : "Pedro Ramirez",
		"Direccion" : "Calle Los Romeros 14",
		"Localidad" : "Sevilla",
		"Fnacimiento" : ISODate("1963-04-03T00:00:00Z"),
		"Facturacion" : 5000
	}
	{
		"id_cliente" : 2222,
		"Nombre" : "Juan Gomez",
		"Direccion" : "Perpetuo Socorro 9",
		"Localidad" : "Salamanca",
		"Fnacimiento" : ISODate("1960-08-17T00:00:00Z"),
		"Facturacion" : 6500
	}
	{
		"id_cliente" : 3333,
		"Nombre" : "Carlos Montes",
		"Direccion" : "Salsipuedes 13",
		"Localidad" : "Jaen",
		"Fnacimiento" : ISODate("1967-11-25T00:00:00Z"),
		"Facturacion" : 8000
	}
	{
		"id_cliente" : 4444,
		"Nombre" : "Carmelo Coton",
		"Direccion" : "La Luna 103",
		"Localidad" : "Jaen",
		"Fnacimiento" : ISODate("1969-01-06T00:00:00Z"),
		"Facturacion" : 12300
	}


### 11. Ídem anterior pero ordenando los documentos por Localidad (ascendente) e id_cliente (descendente).

	db.pedidos.find({},{"_id": 0, "Pedidos":0}).sort({Localidad: 1}).limit(4).pretty();

	db.pedidos.find({},{"_id": 0, "Pedidos":0}).sort({id_cliente: -1}).limit(4).pretty();

Salida ordenado por localidad ascendente:

	{
		"id_cliente" : 5555,
		"Nombre" : "Cristina Miralles",
		"Direccion" : "San Fernando 28",
		"Localidad" : "Granada",
		"Fnacimiento" : ISODate("1970-07-12T00:00:00Z"),
		"Facturacion" : 16500
	}
	{
		"id_cliente" : 6666,
		"Nombre" : "Chema Pamundi",
		"Direccion" : "Recogidas 54",
		"Localidad" : "Granada",
		"Fnacimiento" : ISODate("1969-02-04T00:00:00Z"),
		"Facturacion" : 5000
	}
	{
		"id_cliente" : 3333,
		"Nombre" : "Carlos Montes",
		"Direccion" : "Salsipuedes 13",
		"Localidad" : "Jaen",
		"Fnacimiento" : ISODate("1967-11-25T00:00:00Z"),
		"Facturacion" : 8000
	}
	{
		"id_cliente" : 4444,
		"Nombre" : "Carmelo Coton",
		"Direccion" : "La Luna 103",
		"Localidad" : "Jaen",
		"Fnacimiento" : ISODate("1969-01-06T00:00:00Z"),
		"Facturacion" : 12300
	}



Salida ordenado por id_cliente descendente:

	{
		"id_cliente" : 6666,
		"Nombre" : "Chema Pamundi",
		"Direccion" : "Recogidas 54",
		"Localidad" : "Granada",
		"Fnacimiento" : ISODate("1969-02-04T00:00:00Z"),
		"Facturacion" : 5000
	}
	{
		"id_cliente" : 5555,
		"Nombre" : "Cristina Miralles",
		"Direccion" : "San Fernando 28",
		"Localidad" : "Granada",
		"Fnacimiento" : ISODate("1970-07-12T00:00:00Z"),
		"Facturacion" : 16500
	}
	{
		"id_cliente" : 4444,
		"Nombre" : "Carmelo Coton",
		"Direccion" : "La Luna 103",
		"Localidad" : "Jaen",
		"Fnacimiento" : ISODate("1969-01-06T00:00:00Z"),
		"Facturacion" : 12300
	}
	{
		"id_cliente" : 3333,
		"Nombre" : "Carlos Montes",
		"Direccion" : "Salsipuedes 13",
		"Localidad" : "Jaen",
		"Fnacimiento" : ISODate("1967-11-25T00:00:00Z"),
		"Facturacion" : 8000
	}



## Objetivo 2

A partir de la colección pedidos utilizaremos consultas más complejas por medio de los operadores de agregación (pipeline). Por facilidad se indica la consulta en formato SQL estándar. Las tareas a realizar en este caso obtener:
### 1. No total de clientes:	
		SELECT COUNT(*) "NUMERO DE CLIENTES" FROM pedidos;
	
La consulta en MongoDB sería ``db.pedidos.find().count();`` cuyo resltado sería el número de clientes en la **colección** pedidos en este caso, **7**.	
	
	### 2. No total de clientes de Jaén:
		SELECT COUNT(*) "NUMERO DE CLIENTES" FROM pedidos WHERE Localidad = "Jaen";
		
La consulta en MongoDB sería ``db.pedidos.find({Localidad:"Jaen"}).count()`` que nos dará como resultado **2**.
		### 3. Facturación total clientes por localidad		SELECT Localidad, SUM (Facturacion) "TOTAL" FROM pedidos GROUP BY Localidad;
		
Para esta consulta en lugar de find, deberemos usar aggregate. 		
		
		db.pedidos.aggregate(
			[
				{
					$group:{
						"_id": "$Localidad",
						TOTAL: {$sum: "$Facturacion"}
					}
				}
			]
		)
		
La salida es la siguiente:

	{ "_id" : "Granada", "TOTAL" : 21500 }
	{ "_id" : "Jaen", "TOTAL" : 20300 }
	{ "_id" : "Salamanca", "TOTAL" : 6500 }
	{ "_id" : "Sevilla", "TOTAL" : 7500 }	### 4. Facturación media de clientes por localidad para las localidades distintas a "Jaen" con facturación media mayor de 5000. Ordenación por Localidad descendente. Eliminar el _id y poner el nombre en mayúsculas.
		SELECT Localidad, AVG (Facturacion) "FACTURACION MEDIA" FROM pedido WHERE Localidad <> "Jaen" GROUP BY Localidad HAVING AVG (Facturacion) > 5000 ORDER BY Localidad ASC;
	
Para esta consulta de nuevo tendremos que crear un ``aggregate`` que contenga las distintas clausuras. Las clausulas que reduzcan el conjunto objetivo como por ejemplo Match, deberán ir en las primeras posiciones para evitar, por ejemplo, ordenar datos que luego no formarán parte de la salida. Por lo que aunque hay diversas maneras de realizar esta consulta, el orden óptimo sería el siguiente, ya que aunque en este ejemplo tenemos pocos resultados, en un entorno de BigData sobre los que Mongo obtiene toda su potencia, este pequeño cambio podria suponer ahorrarnos mucho tiempo de computo. La salida es la siguiente:

		
		db.pedidos.aggregate(
			[
				{
					$group:{
						"_id": "$Localidad",
						"FACTURACION MEDIA": {$avg: "$Facturacion"}
					}
				},
				{	
					$match:{
						"_id":{$ne: "Jaen"},
						"FACTURACION MEDIA":{$gt: 5000}
					}
				},
				{
					$project:{
						 "_id":0,
						 "Localidad": {$toUpper: "$_id"},
						 "FACTURACION MEDIA": 1
					}
				},
				{
					$sort:{
						"_id":1
					}
				}
			]
		)
		
					### 5. Calcula la cantidad total facturada por cada cliente (uso de “unwind”)
		SELECT id_cliente "IDENTIFICADOR", nombre "NOMBRE COMPLETO", SUM (Precio_unidad * Pedidos) "TOTAL CLIENTE" FROM pedidos GROUP BY id_cliente, nombre ORDER BY 2 DESC
		
La consulta en mongo ahora sería la siguiente:		
		
		
		db.pedidos.aggregate(
			[
				{ 
					$unwind:"$Pedidos"
				},
				{ 
					$unwind:"$Pedidos.Productos"
				},
				{
					$group:{
						"_id": {
							"ID":"$id_cliente",
							"NOM":"$Nombre"
						},	
						"TOTAL CLIENTE": {
							$sum: {
								$multiply:
								 ["$Pedidos.Productos.Precio_unidad",
								 "$Pedidos.Productos.Cantidad"]
							}
						}
					}
				},
				{
					$project:{
						 "_id":0,
						 "IDENTIFICADOR":"$_id.ID",
						 "NOMBRE COMPLETO":"$_id.NOM" ,
						 "TOTAL CLIENTE": 1
					}
				},
				{
					$sort:{
						"NOMBRE COMPLETO":-1
					}
				}
			]
		)
		

Tras ejecutarla tendríamos la siguiente salida. 

	{ "TOTAL CLIENTE" : 830, "IDENTIFICADOR" : 1111, "NOMBRE COMPLETO" : "Pedro Ramirez" }
	{ "TOTAL CLIENTE" : 6327, "IDENTIFICADOR" : 2222, "NOMBRE COMPLETO" : "Juan Gomez" }
	{ "TOTAL CLIENTE" : 1580, "IDENTIFICADOR" : 5555, "NOMBRE COMPLETO" : "Cristina Miralles" }
		
		
## Objetivo 3

Vamos a utilizar la base de datos libre GeoWorldMap de GeoBytes. Es una base de datos de países, con sus estados/regiones y ciudades importantes. Sobre esta Base de datos vamos a obtener el par de ciudades que se encuentran más cercanas en cada país, excluyendo a los EEUU.Vamos a importar en nuestra BD de MongoDB un archivo con 37245 ciudades del mundo que está en formato csv (``/tmp/mongo/Cities.csv``):
		mongoimport  --db mongobd --collection cities --type csv --headerline --file /home/Cities.csv

Para poder hacer mongoimport, debemos tener el fichero csv en el contendor para ello usamos el comando:

	 docker exec -i mongo-p4-jose sh -c 'cat > /home/Cities.csv' < /tmp/mongo/Cities.csv
	 
El anterior comando alojará el home de nuestro contenedor el fichero csv con la base de datos. El siguiente paso es acceder al contenedor. 

	docker exec -it mongo-p4-jose sh

Antes de comenzar a importar, deberemos instalar las herramientas de mongo, para ello podemos usar el siguiente comando una vez dentro de nuestro contenedor.

	apk update && apk upgrade && apk add mongodb-tools


Por último importamos la base de datos:

	mongoimport  --db mongobd --collection cities --type csv --headerline --file /home/Cities.csv

Una vez hecho esto ya estamos en posición de realizar las siguientes tareas. 
### 1. Encontrar las ciudades más cercanas sobre la colección recién creada mediante un enfoque MapReduce conforme a los pasos que se ilustran en el tutorial práctico.

### 2. ¿Cómo podríamos obtener la ciudades más distantes en cada país?
### 3. ¿Qué ocurre si en un país hay dos parejas de ciudades que están a la misma distancia mínima? ¿Cómo harías para que aparecieran todas?
### 4. ¿Cómo podríamos obtener adicionalmente la cantidad de parejas de ciudades evaluadas para cada país consultado?.### 5. ¿Cómo podríamos obtener la distancia media entre las ciudades de cada país?.
### 6. ¿Mejoraría el rendimiento si creamos un índice? ¿Sobre que campo? Comprobadlo.