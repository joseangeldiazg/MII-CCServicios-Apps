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
		
Esto nos ofrecerá la siguiente salida, donde podemos apreciar la colección pedidos, compuesta de **documentos** clientes, que a su vez pueden contener pedidos, que vuelve a ser un **documento**  y a su vez se compone de Productos. 
	
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
### 8. Visualiza los clientes que hayan pedido algún producto fabricado por Canon y algún producto cuyo precio sea inferior a 15 euros.

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


La salida es:

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
	
La consulta en MongoDB sería ``db.pedidos.find().count();`` cuyo resultado sería el número de clientes en la **colección** pedidos en este caso, **7**.	
	
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
	
Para esta consulta de nuevo tendremos que crear un ``aggregate`` que contenga las distintas clausuras. Las cláusulas que reduzcan el conjunto objetivo como por ejemplo Match, deberán ir en las primeras posiciones para evitar, por ejemplo, ordenar datos que luego no formarán parte de la salida. Por lo que aunque hay diversas maneras de realizar esta consulta, el orden óptimo sería el siguiente, ya que aunque en este ejemplo tenemos pocos resultados, en un entorno de BigData sobre los que Mongo obtiene toda su potencia, este pequeño cambio podría suponer ahorrarnos mucho tiempo de computo. La salida es la siguiente:

		
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


Para poder hacer mongoimport, debemos tener el fichero csv en el contenedor para ello usamos el comando:

	 docker exec -i mongo-p4-jose sh -c 'cat > /home/Cities.csv' < /tmp/mongo/Cities.csv
	 
El anterior comando alojará el home de nuestro contenedor el fichero csv con la base de datos. El siguiente paso es acceder al contenedor. 

	docker exec -it mongo-p4-jose sh

Antes de comenzar a importar, deberemos instalar las herramientas de mongo, para ello podemos usar el siguiente comando una vez dentro de nuestro contenedor.

	apk update && apk upgrade && apk add mongodb-tools


Por último importamos la base de datos:

	mongoimport  --db mongobd --collection cities --type csv --headerline --file /home/Cities.csv

Una vez hecho esto ya estamos en posición de realizar las siguientes tareas. 
### 1. Encontrar las ciudades más cercanas sobre la colección recién creada mediante un enfoque MapReduce conforme a los pasos que se ilustran en el tutorial práctico.

El primer paso será la función ``emit()`` esta recibe dos parámetros, la clave, que será el elemento por el que dividiremos o agruparemos y el valor, que podrá ser una estructura que contenga todos los valores que necesitemos para procesar en siguientes puntos.


	var mapCode = function() {
	    emit(
	        this.CountryID,
	        { 
	            "data":
	            [
	                {
	                    "city": this.City,
	                    "lat":  this.Latitude,
	                    "lon":  this.Longitude
	                }
	            ]
	        }
	    );
	}
	
	
Ahora que tenemos completa la etapa **MAP** tendremos que implementar una función para la etapa **REDUCE**. 

	var reduceCode = function(key, values) {
		var reduced = { 
	        "data": [] 
	    };
		for (var i in values) {
			var inter = values[i];
			for (var j in inter.data) {
				reduced.data.push(inter.data[j]);
			}
		}
		return reduced;
	}	
	
Por último en la función **finalice** se encarga de aplicar la logica a lo que queremos calcular. 

	var finalize =  function (key, reduced) {
		if (reduced.data.length == 1) {
			return { 
	            "message" : "Este país solo contiene una ciudad" 
	        };
		}
		var min_dist = 999999999999;
		var city1 = { 
	        "city": ""
	    };
		var city2 = { 
	        "city": "" 
	    };
		var c1;
		var c2;
		var d;
		for (var i in reduced.data) {
			for (var j in reduced.data) {
				if (i >= j) {
	                continue;
	            }
				c1 = reduced.data[i];
				c2 = reduced.data[j];
				d = (c1.lat - c2.lat) * (c1.lat - c2.lat) + (c1.lon - c2.lon) * (c1.lon - c2.lon);
				if (d < min_dist && d > 0) {
					min_dist = d;
					city1 = c1;
					city2 = c2;
				}
			}
		}
		return {
	        "city1": city1.city, 
	        "city2": city2.city, 
	        "dist": Math.sqrt(min_dist) 
	    };
	}

El paso final es ejecutar el modelo que hemos creado:

	db.runCommand({
	    mapReduce: "cities",
	    map: mapCode,
	    reduce: reduceCode,
	    finalize: finalize,
	    query: { CountryID: { $ne: 254 } },
	    out: { merge: "ciudades_proximas" }
	});
	
	db.ciudades_proximas.find().pretty();

La salida, limitada a los primeros 20 resultados es:

	{
		"_id" : 1,
		"value" : {
			"city1" : "Kabul",
			"city2" : "Mazar-e Sharif",
			"dist" : 3.0173461849777947
		}
	}
	{
		"_id" : 2,
		"value" : {
			"city1" : "Korce",
			"city2" : "Tirane",
			"dist" : 1.1860178118392657
		}
	}
	{
		"_id" : 3,
		"value" : {
			"city1" : "Oran",
			"city2" : "Mascara",
			"dist" : 0.8365004482963547
		}
	}
	{
		"_id" : 4,
		"value" : {
			"city1" : "",
			"city2" : "",
			"dist" : 999999.9999995
		}
	}
	{
		"_id" : 5,
		"value" : {
			"city1" : "Andorra La Vella",
			"city2" : "Escaldes",
			"dist" : 0.016000000000000014
		}
	}
	{
		"_id" : 6,
		"value" : {
			"city1" : "Benguela",
			"city2" : "Sumbe",
			"dist" : 1.4439615645854298
		}
	}
	{
		"_id" : 7,
		"value" : {
			"city1" : "",
			"city2" : "",
			"dist" : 999999.9999995
		}
	}
	{
		"_id" : 8,
		"value" : {
			"city1" : "Molodesjnaja",
			"city2" : "McMurdo Station",
			"dist" : 183.962470629202
		}
	}
	{
		"_id" : 9,
		"value" : {
			"city1" : "Saint Johns",
			"city2" : "Falmouth",
			"dist" : 0.12037026210821469
		}
	}
	{
		"_id" : 10,
		"value" : {
			"city1" : "Turdera",
			"city2" : "Lomas De Zamora",
			"dist" : 0.015999999999998238
		}
	}
	{
		"_id" : 11,
		"value" : {
			"city1" : "Vanadzor",
			"city2" : "Spitak",
			"dist" : 0.2200460179144342
		}
	}
	{
		"_id" : 12,
		"value" : {
			"city1" : "",
			"city2" : "",
			"dist" : 999999.9999995
		}
	}
	{
		"_id" : 14,
		"value" : {
			"city1" : "Kalgoorlie",
			"city2" : "Williamstown",
			"dist" : 0.016000000000005343
		}
	}
	{
		"_id" : 15,
		"value" : {
			"city1" : "Neudörfl",
			"city2" : "Wiener Neustadt",
			"dist" : 0.03712142238654041
		}
	}
	{
		"_id" : 16,
		"value" : {
			"city1" : "",
			"city2" : "",
			"dist" : 999999.9999995
		}
	}
	{
		"_id" : 17,
		"value" : {
			"city1" : "Freetown",
			"city2" : "Old Bight",
			"dist" : 0.07468600939935845
		}
	}
	{
		"_id" : 18,
		"value" : {
			"city1" : "Al Manamah",
			"city2" : "Muharraq",
			"dist" : 0.035805027579939586
		}
	}
	{
		"_id" : 20,
		"value" : {
			"city1" : "Comilla",
			"city2" : "Dhaka",
			"dist" : 0.8367855161270389
		}
	}
	{
		"_id" : 21,
		"value" : {
			"city1" : "Christchurch",
			"city2" : "Warrens",
			"dist" : 0.024041630560339342
		}
	}
	{
		"_id" : 23,
		"value" : {
			"city1" : "Minsk",
			"city2" : "Molodechno",
			"dist" : 0.8294443923494809
		}
	}

### 2. ¿Cómo podríamos obtener la ciudades más distantes en cada país?

Para este paso, solo tendremos que modificar la función **finalice** ya las funciones **emit** y **reduced** se mantienen.  

	var finalize =  function (key, reduced) {
		if (reduced.data.length == 1) {
			return { 
	            "message" : "Este país solo contiene una ciudad" 
	        };
		}
		var max_dist = 0;
		var city1 = { 
	        "city": ""
	    };
		var city2 = { 
	        "city": "" 
	    };
		var c1;
		var c2;
		var d;
		for (var i in reduced.data) {
			for (var j in reduced.data) {
				if (i >= j) {
	                continue;
	            }
				c1 = reduced.data[i];
				c2 = reduced.data[j];
				d = (c1.lat - c2.lat) * (c1.lat - c2.lat) + (c1.lon - c2.lon) * (c1.lon - c2.lon);
				if (d > max_dist && d > 0) {
					max_dist = d;
					city1 = c1;
					city2 = c2;
				}
			}
		}
		return {
	        "city1": city1.city, 
	        "city2": city2.city, 
	        "dist": Math.sqrt(min_dist) 
	    };
	}


Para ejecutarlo haríamos lo siguiente:


	db.runCommand({
		    mapReduce: "cities",
		    map: mapCode,
		    reduce: reduceCode,
		    finalize: finalize,
		    query: { CountryID: { $ne: 254 } },
		    out: { merge: "ciudades_lejanas" }
		});
	
	db.ciudades_lejanas.find().pretty();


Y tendremos la siguiente salida:

	{
		"_id" : 1,
		"value" : {
			"city1" : "Herat",
			"city2" : "Kabul",
			"dist" : 6.98542375235748
		}
	}
	{
		"_id" : 2,
		"value" : {
			"city1" : "Korce",
			"city2" : "Tirane",
			"dist" : 1.1860178118392657
		}
	}
	{
		"_id" : 3,
		"value" : {
			"city1" : "Oran",
			"city2" : "Annaba",
			"dist" : 8.495467144307016
		}
	}
	{
		"_id" : 4,
		"value" : {
			"message" : "Este país solo contiene una ciudad"
		}
	}
	{
		"_id" : 5,
		"value" : {
			"city1" : "Andorra La Vella",
			"city2" : "Escaldes",
			"dist" : 0.016000000000000014
		}
	}
	{
		"_id" : 6,
		"value" : {
			"city1" : "Lubango",
			"city2" : "Luanda",
			"dist" : 7.976476540428111
		}
	}
	{
		"_id" : 7,
		"value" : {
			"message" : "Este país solo contiene una ciudad"
		}
	}
	{
		"_id" : 8,
		"value" : {
			"city1" : "Molodesjnaja",
			"city2" : "McMurdo Station",
			"dist" : 183.962470629202
		}
	}
	{
		"_id" : 9,
		"value" : {
			"city1" : "Saint Johns",
			"city2" : "Falmouth",
			"dist" : 0.12037026210821469
		}
	}
	{
		"_id" : 10,
		"value" : {
			"city1" : "San Rafael",
			"city2" : "Ushuaia",
			"dist" : 30.929864031385584
		}
	}
	{
		"_id" : 11,
		"value" : {
			"city1" : "Gyumri",
			"city2" : "Yerevan",
			"dist" : 0.9049468989946328
		}
	}
	{
		"_id" : 12,
		"value" : {
			"message" : "Este país solo contiene una ciudad"
		}
	}
	{
		"_id" : 14,
		"value" : {
			"city1" : "Byron Bay",
			"city2" : "Shark Bay",
			"dist" : 40.16699782159477
		}
	}
	{
		"_id" : 15,
		"value" : {
			"city1" : "Gänserndorf",
			"city2" : "Götzis",
			"dist" : 7.172467427601189
		}
	}
	{
		"_id" : 16,
		"value" : {
			"message" : "Este país solo contiene una ciudad"
		}
	}
	{
		"_id" : 17,
		"value" : {
			"city1" : "Matthew Town",
			"city2" : "Freeport",
			"dist" : 7.516713244497227
		}
	}
	{
		"_id" : 18,
		"value" : {
			"city1" : "Muharraq",
			"city2" : "Jasra",
			"dist" : 0.18866372200293755
		}
	}
	{
		"_id" : 20,
		"value" : {
			"city1" : "Comilla",
			"city2" : "Saginaw",
			"dist" : 94.16656784655582
		}
	}
	{
		"_id" : 21,
		"value" : {
			"city1" : "Bridgetown",
			"city2" : "Speightstown",
			"dist" : 0.15056227947264958
		}
	}
	{
		"_id" : 23,
		"value" : {
			"city1" : "Brest",
			"city2" : "Mahilyow",
			"dist" : 6.8794688748478245
		}
	}

### 3. ¿Qué ocurre si en un país hay dos parejas de ciudades que están a la misma distancia mínima? ¿Cómo harías para que aparecieran todas?

Lo que ocurre es que solo mantendríamos la primera opción, ya que se evalúa la condición para coger las ciudades como < estricto en el caso de las más cercanas o > en el caso de las más lejanas, lo que hará que si aparece otra con el mismo valor no se coja. Podríamos cambiar los signos por >=  o <= pero entonces solo nos quedaríamos con la última que cumpliera el requisito, por lo tanto necesitamos crear una estructura y guardarlas. 


	var finalize =  function (key, reduced) {
    if (reduced.data.length == 1) {
        return { 
            "message" : "Este país solo contiene una ciudad" 
        };
    }
    var min_dist = 999999999999;
    var city1 = { 
        "city": ""
    };
    var city2 = { 
        "city": "" 
    };
    var c1;
    var c2;
    var d;
    var cities = [];
    for (var i in reduced.data) {
        for (var j in reduced.data) {
            if (i >= j) {
                continue;
            }
            c1 = reduced.data[i];
            c2 = reduced.data[j];
            d = (c1.lat - c2.lat) * (c1.lat - c2.lat) + (c1.lon - c2.lon) * (c1.lon - c2.lon);
            if (d < min_dist && d > 0) {
                min_dist = d;
                cities = [];
                cities.push([c1.city, c2.city]);
                
            }else if (else if (d == min_dist))
            {
                	cities.push([c1.city, c2.city]);
            }
        }
    }
    return {
        "cities": cities,
        "dist": Math.sqrt(min_dist) 
    };
	}


Y ejecutariamos con el mismo comando visto en la consulta 1 de este objetivo. 

	{
		"_id" : 1,
		"value" : {
			"cities" : [
				[
					"Kabul",
					"Mazar-e Sharif"
				]
			],
			"dist" : 3.0173461849777947
		}
	}
	{
		"_id" : 2,
		"value" : {
			"cities" : [
				[
					"Korce",
					"Tirane"
				]
			],
			"dist" : 1.1860178118392657
		}
	}
	{
		"_id" : 3,
		"value" : {
			"cities" : [
				[
					"Oran",
					"Mascara"
				]
			],
			"dist" : 0.8365004482963547
		}
	}
	{
		"_id" : 4,
		"value" : {
			"message" : "Este país solo contiene una ciudad"
		}
	}
	{
		"_id" : 5,
		"value" : {
			"cities" : [
				[
					"Andorra La Vella",
					"Escaldes"
				]
			],
			"dist" : 0.016000000000000014
		}
	}
	{
		"_id" : 6,
		"value" : {
			"cities" : [
				[
					"Benguela",
					"Sumbe"
				]
			],
			"dist" : 1.4439615645854298
		}
	}
	{
		"_id" : 7,
		"value" : {
			"message" : "Este país solo contiene una ciudad"
		}
	}
	{
		"_id" : 8,
		"value" : {
			"cities" : [
				[
					"Molodesjnaja",
					"McMurdo Station"
				],
				[
					"Reading",
					"McMurdo Station"
				]
			],
			"dist" : 183.962470629202
		}
	}
	{
		"_id" : 9,
		"value" : {
			"cities" : [
				[
					"Saint Johns",
					"Falmouth"
				]
			],
			"dist" : 0.12037026210821469
		}
	}
	{
		"_id" : 10,
		"value" : {
			"cities" : [
				[
					"Turdera",
					"Lomas De Zamora"
				]
			],
			"dist" : 0.015999999999998238
		}
	}
	{
		"_id" : 11,
		"value" : {
			"cities" : [
				[
					"Vanadzor",
					"Spitak"
				]
			],
			"dist" : 0.2200460179144342
		}
	}
	{
		"_id" : 12,
		"value" : {
			"message" : "Este país solo contiene una ciudad"
		}
	}
	{
		"_id" : 14,
		"value" : {
			"cities" : [
				[
					"Kalgoorlie",
					"Williamstown"
				]
			],
			"dist" : 0.016000000000005343
		}
	}
	{
		"_id" : 15,
		"value" : {
			"cities" : [
				[
					"Neudörfl",
					"Wiener Neustadt"
				]
			],
			"dist" : 0.03712142238654041
		}
	}
	{
		"_id" : 16,
		"value" : {
			"message" : "Este país solo contiene una ciudad"
		}
	}
	{
		"_id" : 17,
		"value" : {
			"cities" : [
				[
					"Freetown",
					"Old Bight"
				]
			],
			"dist" : 0.07468600939935845
		}
	}
	{
		"_id" : 18,
		"value" : {
			"cities" : [
				[
					"Al Manamah",
					"Muharraq"
				],
				[
					"Manama",
					"Muharraq"
				]
			],
			"dist" : 0.035805027579939586
		}
	}
	{
		"_id" : 20,
		"value" : {
			"cities" : [
				[
					"Comilla",
					"Dhaka"
				]
			],
			"dist" : 0.8367855161270389
		}
	}
	{
		"_id" : 21,
		"value" : {
			"cities" : [
				[
					"Christchurch",
					"Warrens"
				]
			],
			"dist" : 0.024041630560339342
		}
	}
	{
		"_id" : 23,
		"value" : {
			"cities" : [
				[
					"Minsk",
					"Molodechno"
				],
				[
					"Minsk",
					"Molodechno"
				]
			],
			"dist" : 0.8294443923494809
		}
	}

### 4. ¿Cómo podríamos obtener adicionalmente la cantidad de parejas de ciudades evaluadas para cada país consultado?.

Este punto es sencillo, solo tendríamos que incrementar un contador y devolverlo en el return de la función ``finalize``. 


		var finalize =  function (key, reduced) {
			if (reduced.data.length == 1) {
				return { 
		            "message" : "Este país solo contiene una ciudad" 
		        };
			}
			var min_dist = 999999999999;
			var city1 = { 
		        "city": ""
		    };
			var city2 = { 
		        "city": "" 
		    };
			var c1;
			var c2;
			var d;
			var contador=0;
			for (var i in reduced.data) {
				for (var j in reduced.data) {
					if (i >= j) {
		                continue;
		            }
					c1 = reduced.data[i];
					c2 = reduced.data[j];
					d = (c1.lat - c2.lat) * (c1.lat - c2.lat) + (c1.lon - c2.lon) * (c1.lon - c2.lon);
					if (d > 0) {
						contador=contador+1;
						if(d < min_dist){
							min_dist = d;
							city1 = c1;
							city2 = c2;
						}
					}
				}
			}
			return {
		        "city1" : city1.city, 
		        "city2" : city2.city, 
		        "evaluations": contador,
		        "dist": Math.sqrt(min_dist)        
		    };
		}
		
La salida sería:

	{
		"_id" : 1,
		"value" : {
			"city1" : "Kabul",
			"city2" : "Mazar-e Sharif",
			"evaluations" : 3,
			"dist" : 3.0173461849777947
		}
	}
	{
		"_id" : 2,
		"value" : {
			"city1" : "Korce",
			"city2" : "Tirane",
			"evaluations" : 1,
			"dist" : 1.1860178118392657
		}
	}
	{
		"_id" : 3,
		"value" : {
			"city1" : "Oran",
			"city2" : "Mascara",
			"evaluations" : 15,
			"dist" : 0.8365004482963547
		}
	}
	{
		"_id" : 4,
		"value" : {
			"message" : "Este país solo contiene una ciudad"
		}
	}
	{
		"_id" : 5,
		"value" : {
			"city1" : "Andorra La Vella",
			"city2" : "Escaldes",
			"evaluations" : 1,
			"dist" : 0.016000000000000014
		}
	}
	{
		"_id" : 6,
		"value" : {
			"city1" : "Benguela",
			"city2" : "Sumbe",
			"evaluations" : 10,
			"dist" : 1.4439615645854298
		}
	}
	{
		"_id" : 7,
		"value" : {
			"message" : "Este país solo contiene una ciudad"
		}
	}
	{
		"_id" : 8,
		"value" : {
			"city1" : "Molodesjnaja",
			"city2" : "McMurdo Station",
			"evaluations" : 2,
			"dist" : 183.962470629202
		}
	}
	{
		"_id" : 9,
		"value" : {
			"city1" : "Saint Johns",
			"city2" : "Falmouth",
			"evaluations" : 1,
			"dist" : 0.12037026210821469
		}
	}
	{
		"_id" : 10,
		"value" : {
			"city1" : "Turdera",
			"city2" : "Lomas De Zamora",
			"evaluations" : 1431,
			"dist" : 0.015999999999998238
		}
	}
	{
		"_id" : 11,
		"value" : {
			"city1" : "Vanadzor",
			"city2" : "Spitak",
			"evaluations" : 6,
			"dist" : 0.2200460179144342
		}
	}
	{
		"_id" : 12,
		"value" : {
			"message" : "Este país solo contiene una ciudad"
		}
	}
	{
		"_id" : 14,
		"value" : {
			"city1" : "Kalgoorlie",
			"city2" : "Williamstown",
			"evaluations" : 26105,
			"dist" : 0.016000000000005343
		}
	}
	{
		"_id" : 15,
		"value" : {
			"city1" : "Neudörfl",
			"city2" : "Wiener Neustadt",
			"evaluations" : 1377,
			"dist" : 0.03712142238654041
		}
	}
	{
		"_id" : 16,
		"value" : {
			"message" : "Este país solo contiene una ciudad"
		}
	}
	{
		"_id" : 17,
		"value" : {
			"city1" : "Freetown",
			"city2" : "Old Bight",
			"evaluations" : 170,
			"dist" : 0.07468600939935845
		}
	}
	{
		"_id" : 18,
		"value" : {
			"city1" : "Al Manamah",
			"city2" : "Muharraq",
			"evaluations" : 20,
			"dist" : 0.035805027579939586
		}
	}
	{
		"_id" : 20,
		"value" : {
			"city1" : "Comilla",
			"city2" : "Dhaka",
			"evaluations" : 10,
			"dist" : 0.8367855161270389
		}
	}
	{
		"_id" : 21,
		"value" : {
			"city1" : "Christchurch",
			"city2" : "Warrens",
			"evaluations" : 6,
			"dist" : 0.024041630560339342
		}
	}
	{
		"_id" : 23,
		"value" : {
			"city1" : "Minsk",
			"city2" : "Molodechno",
			"evaluations" : 9,
			"dist" : 0.8294443923494809
		}
	}		### 5. ¿Cómo podríamos obtener la distancia media entre las ciudades de cada país?

Como ya tenemos un contador con el número total de ciudades evaluadas, solo tendríamos que acumular todas las distancias de las ciudades que se comparen y a la hora de devolverlas haremos el total entre el número de ciudades. 


	var finalize =  function (key, reduced) {
			if (reduced.data.length == 1) {
				return { 
		            "message" : "Este país solo contiene una ciudad" 
		        };
			}
			var min_dist = 999999999999;
			var city1 = { 
		        "city": ""
		    };
			var city2 = { 
		        "city": "" 
		    };
			var c1;
			var c2;
			var d;
			var contador=0;
			var distancia_total=0;
			for (var i in reduced.data) {
				for (var j in reduced.data) {
					if (i >= j) {
		                continue;
		            }
					c1 = reduced.data[i];
					c2 = reduced.data[j];
					d = (c1.lat - c2.lat) * (c1.lat - c2.lat) + (c1.lon - c2.lon) * (c1.lon - c2.lon);
					if (d > 0) {
						contador=contador+1;
						distancia_total=distancia_total+d;
						if(d < min_dist){
							min_dist = d;
							city1 = c1;
							city2 = c2;
						}
					}
				}
			}
			return {
		        "city1" : city1.city, 
		        "city2" : city2.city, 
		        "Distancia Media" : distancia_total/contador,
		        "dist": Math.sqrt(min_dist)        
		    };
		}

La salida sería:

	{
		"_id" : 1,
		"value" : {
			"city1" : "Kabul",
			"city2" : "Mazar-e Sharif",
			"Distancia Media" : 5.148174719390839,
			"dist" : 3.0173461849777947
		}
	}
	{
		"_id" : 2,
		"value" : {
			"city1" : "Korce",
			"city2" : "Tirane",
			"Distancia Media" : 1.1860178118392657,
			"dist" : 1.1860178118392657
		}
	}
	{
		"_id" : 3,
		"value" : {
			"city1" : "Oran",
			"city2" : "Mascara",
			"Distancia Media" : 4.592117250388198,
			"dist" : 0.8365004482963547
		}
	}
	{
		"_id" : 4,
		"value" : {
			"message" : "Este país solo contiene una ciudad"
		}
	}
	{
		"_id" : 5,
		"value" : {
			"city1" : "Andorra La Vella",
			"city2" : "Escaldes",
			"Distancia Media" : 0.016000000000000014,
			"dist" : 0.016000000000000014
		}
	}
	{
		"_id" : 6,
		"value" : {
			"city1" : "Benguela",
			"city2" : "Sumbe",
			"Distancia Media" : 4.011856586626525,
			"dist" : 1.4439615645854298
		}
	}
	{
		"_id" : 7,
		"value" : {
			"message" : "Este país solo contiene una ciudad"
		}
	}
	{
		"_id" : 8,
		"value" : {
			"city1" : "Molodesjnaja",
			"city2" : "McMurdo Station",
			"Distancia Media" : 183.962470629202,
			"dist" : 183.962470629202
		}
	}
	{
		"_id" : 9,
		"value" : {
			"city1" : "Saint Johns",
			"city2" : "Falmouth",
			"Distancia Media" : 0.12037026210821469,
			"dist" : 0.12037026210821469
		}
	}
	{
		"_id" : 10,
		"value" : {
			"city1" : "Turdera",
			"city2" : "Lomas De Zamora",
			"Distancia Media" : 7.516723478942258,
			"dist" : 0.015999999999998238
		}
	}
	{
		"_id" : 11,
		"value" : {
			"city1" : "Vanadzor",
			"city2" : "Spitak",
			"Distancia Media" : 0.5826373265925909,
			"dist" : 0.2200460179144342
		}
	}
	{
		"_id" : 12,
		"value" : {
			"message" : "Este país solo contiene una ciudad"
		}
	}
	{
		"_id" : 14,
		"value" : {
			"city1" : "Kalgoorlie",
			"city2" : "Williamstown",
			"Distancia Media" : 13.523198216104323,
			"dist" : 0.016000000000005343
		}
	}
	{
		"_id" : 15,
		"value" : {
			"city1" : "Neudörfl",
			"city2" : "Wiener Neustadt",
			"Distancia Media" : 2.48556192868551,
			"dist" : 0.03712142238654041
		}
	}
	{
		"_id" : 16,
		"value" : {
			"message" : "Este país solo contiene una ciudad"
		}
	}
	{
		"_id" : 17,
		"value" : {
			"city1" : "Freetown",
			"city2" : "Old Bight",
			"Distancia Media" : 2.8268589972830935,
			"dist" : 0.07468600939935845
		}
	}
	{
		"_id" : 18,
		"value" : {
			"city1" : "Al Manamah",
			"city2" : "Muharraq",
			"Distancia Media" : 0.10929194178280277,
			"dist" : 0.035805027579939586
		}
	}
	{
		"_id" : 20,
		"value" : {
			"city1" : "Comilla",
			"city2" : "Dhaka",
			"Distancia Media" : 38.22592916882991,
			"dist" : 0.8367855161270389
		}
	}
	{
		"_id" : 21,
		"value" : {
			"city1" : "Christchurch",
			"city2" : "Warrens",
			"Distancia Media" : 0.08047164379109523,
			"dist" : 0.024041630560339342
		}
	}
	{
		"_id" : 23,
		"value" : {
			"city1" : "Minsk",
			"city2" : "Molodechno",
			"Distancia Media" : 3.3298240952743003,
			"dist" : 0.8294443923494809
		}
	}

### 6. ¿Mejoraría el rendimiento si creamos un índice? ¿Sobre que campo? Comprobadlo.


El campo apropiado para crear un indice son aquellos por los que se va a recorrer o buscar recurrentemente, podríamos montar un indice sobre CountryID que es un identificador único para cada país, pero esto no mejoraría, ya que mongo directamente monta un indice por el _id de cada elemento, por lo que esta acción implicaría mantener dos indices que realmente se usarian para lo mismo por lo que no es útil. Por otro lado, los indices en problemas con MapReduce pueden ser contraproducentes ya que al dividir el problema en pequeñas partes y recombinar puede conllevar problemas de gestión de la estructura del indice. 

Para probarlo podemos usar:

	db.cities.ensureIndex({CountryID: 1});

Tras lo cual ejecutamos el problema como hemos venido haciendo en puntos anteriores. 


## Conclusiones

MongoDB es una herramienta muy útil y sencilla de utilizar. Pese a no haber tenido contacto con la herramienta antes, en unos pocos minutos de aprendizaje puedes estar formulando consultas complejas. Por otro lado, la potencia frente a SQL cuando trabajamos con cantidades de datos muy grandes es notable. 