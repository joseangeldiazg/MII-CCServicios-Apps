// 1- Visualiza la colección pedidos y familiarízate con ella. Observa los distintos tipos de datos y sus estructuras dispares.

		db.pedidos.find().pretty();

// 2-  Visualiza sólo el primer documento de la colección. Utiliza los métodos ``.limit()`` y ``.findOne()``.

	db.pedidos.findOne();

	db.pedidos.find().limit(1).pretty();


// 3- Visualiza el cliente con id_cliente = 2222

	db.pedidos.find({id_cliente: 2222}).pretty();


// 4- Visualiza los clientes que hayan pedido algún producto de más de 94 euros.

	db.pedidos.find({"Pedidos.Productos.Precio_unidad":{$gt:94}}).pretty();

// 5. Visualiza los clientes de Jaén o Salamanca (excluye los datos de los pedidos). Utiliza los operador ``$or e $in``


	db.pedidos.find({Localidad:{$in:["Jaen","Salamanca"]}},
		{Pedidos:0}).pretty();

	db.pedidos.find({$or:[{Localidad: "Salamanca"},{Localidad: "Jaen"}]}, {Pedidos:0}).pretty();


  // 6. Visualiza los clientes no tienen campo pedidos.

	db.pedidos.find({Pedidos:{$exists:false}}).pretty();


  // 7. Visualiza los clientes que hayan nacido en 1963.


	db.pedidos.find({Fnacimiento:{$gte: ISODate("1963-01-01T00:00:00.000Z"), $lt: ISODate("1964-01-01T00:00:00.000Z") }},{Pedidos:0}).pretty();


  // 8. Visualiza los clientes que hayan pedido algún producto fabricado por Canon y algún producto cuyo precio sea inferior a 15 euros.

	db.pedidos.find({"Pedidos.Productos.Fabricante":"Canon", "Pedidos.Productos.Precio_unidad":{$lt:15}}).pretty();


  // 9. Datos personales (id_cliente, Nombre, Direccion, Localidad y Fnacimiento) de los clientes cuyo nombre empieza por la cadena "c" (No distinguir entre mayusculas y minúsculas).

	db.pedidos.find({"Nombre": /^c/i}, {"_id": 0, "Pedidos":0} ).pretty();

  //10. Visualiza los datos personales de los clientes (excluyendo _id). Limita los documentos a 4.

	db.pedidos.find({},{"_id": 0, "Pedidos":0}).limit(4).pretty();


  // 11. Ídem anterior pero ordenando los documentos por Localidad (ascendente) e id_cliente (descendente).

	db.pedidos.find({},{"_id": 0, "Pedidos":0}).sort({Localidad: 1}).limit(4).pretty();

	db.pedidos.find({},{"_id": 0, "Pedidos":0}).sort({id_cliente: -1}).limit(4).pretty();
