// 1. No total de clientes:

		// SELECT COUNT(*) "NUMERO DE CLIENTES" FROM pedidos;

    db.pedidos.find().count()


// 2. No total de clientes de Jaén:

		// SELECT COUNT(*) "NUMERO DE CLIENTES" FROM pedidos WHERE Localidad = "Jaen";

    db.pedidos.find({Localidad:"Jaen"}).count()


// 3. Facturación total clientes por localidad

		// SELECT Localidad, SUM (Facturacion) "TOTAL" FROM pedidos GROUP BY Localidad;

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



//  4. Facturación media de clientes por localidad para las localidades distintas a "Jaen" con facturación media mayor de 5000. Ordenación por Localidad descendente. Eliminar el _id y poner el nombre en mayúsculas.

	//	SELECT Localidad, AVG (Facturacion) "FACTURACION MEDIA" FROM pedido WHERE Localidad <> "Jaen" GROUP BY Localidad HAVING AVG (Facturacion) > 5000 ORDER BY Localidad ASC;


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


    // 5. Calcula la cantidad total facturada por cada cliente (uso de “unwind”)

		// SELECT id_cliente "IDENTIFICADOR", nombre "NOMBRE COMPLETO", SUM (Precio_unidad * Pedidos) "TOTAL CLIENTE" FROM pedidos GROUP BY id_cliente, nombre ORDER BY 2 DESC


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
    
