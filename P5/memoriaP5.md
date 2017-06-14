#Práctica 5

Ciencia de Datos con Hadoop

## Enunciado y objetivos. 

El objetivo de esta práctica es conocer las alternativas para realizar experimentaciones de Ciencia de Datos. Para ello, haremos uso del entorno que se ha convertido en un estándar de facto como es Hadoop, utilizando HDFS como sistema de archivos distribuido y Hadoop- MapReduce como mecanismo de ejecución. Por último, aplicaremos la biblioteca Mahout para lanzar algoritmos de clasificación sobre conjuntos tipo Big Data.


Los objetivos serán:

	
- Ejecutar el algoritmo “Random Forest” sobre el conjunto de datos BNG_heart y comprueba el rendimiento alcanzado de acuerdo a los siguientes casos:

	- Número de Maps: 64, 128, 256
	- Número de árboles: 10, 100, 1000

- Obtener una tabla de resultados sobre las combinaciones anteriores que contenga los siguientes datos:

	- Características del modelo: número de nodos (total y promedio), profundidad máxima del árbol.	- Tiempo de ejecución para entrenamiento.	-  Medidas de calidad Accuracy estándar y media geométrica tanto para la partición de entrenamiento como para test.

## Ejecución 

## Tabla de resultados


| Maps | Arboles | nº nodos total | nº nodos promedio | profundidad máxima | t training | Acc Train  | Media Train | Acc Test   | Media Test |
|:----:|---------|:--------------:|-------------------|--------------------|------------|------------|-------------|------------|------------|
| 64   | 10      | 12755          | 1275              | 18                 | 2910ms     | 0.87549564 | 0.87549564  | 0,87876    | 0,87776    |
| 64   | 100     | 128343         | 1283              | 18                 | 6490ms     | 0,8986458  | 0,8976458   | 0,894145   | 0,894145   |
| 64   | 1000    | 1285247        | 1285              | 18                 | 55210ms    | 0,907864   | 0,907864    | 0,8966     | 0,89422704 |
| 128  | 10      | 6983           | 698               | 16                 | 2760ms     | 0,870909   | 0,879001    | 0,87000921 | 0,87000921 |
| 128  | 100     | 69456          | 694               | 15                 | 5820ms     | 0,88203    | 0,88203     | 0,88203    | 0,87962005 |
| 128  | 1000    | 680308         | 680               | 15                 | 44070ms    | 0,897445   | 0,897445    | 0,894445   | 0,89214368 |
| 256  | 10      | 3583           | 358               | 14                 | 2800ms     | 0,8689     | 0,867975    | 0,8677     | 0,86554533 |
| 256  | 100     | 36996          | 369               | 14                 | 5140ms     | 0,87778    | 0.87702736  | 0,87778    | 0,87602736 |
| 256  | 1000    | 362562         | 362               | 13                 | 34030ms    | 0,89208    | 0.88797009  | 0,89208    | 0,88997009 |
	
	
## Conlusiones		