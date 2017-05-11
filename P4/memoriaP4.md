# Práctica 4

Computación Distribuida y Escalable con Hadoop

## Enunciado y objetivos

El objetivo de esta práctica es realizar programas escalables para mejorar la eficiencia en entornos Big Data. Para ello, haremos uso del entorno que se ha convertido en un estándar de facto como es Hadoop, utilizando **HDFS** como sistema de archivos distribuido y **Hadoop- MapReduce** como mecanismo de ejecución.


Una vez realizado los primeros pasos para compilar nuestro código en java correspondiente, y tener localizado los datos con los que vamos a trabajar, concretamente ``tmp/tmp/BDCC/datasets/ECBDL14/ECBDL14_10tst.data`` estamos en posición de comenzar a realizar los siguientes ejercicios con Hadoop. 


### 1. Calcula el valor mínimo de la variable (columna) 5

Para este apartado la función mapper debería ser la siguiente:
	
	public class MinMapper extends MapReduceBase implements Mapper<LongWritable, Text, Text, DoubleWritable> {
        private static final int MISSING = 9999;
        public static int col=5;

		public void map(LongWritable key, Text value, OutputCollector<Text, DoubleWritable> output, Reporter reporter) throws IOException {
                String line = value.toString();
                String[] parts = line.split(",");
                output.collect(new Text("1"), new DoubleWritable(Double.parseDouble(parts[col])));
        }
	}
	
	
Por otro lado la función reduce sería como sigue:

	public class MinReducer extends MapReduceBase implements Reducer<Text, DoubleWritable, Text, DoubleWritable> {
	
		public void reduce(Text key, Iterator<DoubleWritable> values, OutputCollector<Text, DoubleWritable> output, Reporter reporter) throws IOException {
				Double minValue = Double.MAX_VALUE;
				while (values.hasNext()) {
					minValue = Math.min(minValue, values.next().get());
				}
			output.collect(key, new DoubleWritable(minValue));
			}
	}	
Tras lo cual compilariamos y ejecutariamos con las siguientes ordenes:
	
	javac -cp /usr/lib/hadoop/*:/usr/lib/hadoop-mapreduce/* -d java_classes Min*
	
	jar -cvf stat.jar -C java_classes / .
	
	hadoop jar stat.jar oldapi.Min /tmp/BDCC/datasets/ECBDL14/ECBDL14_10tst.data ./stat/output/
	
	hdfs dfs -cat stat/output/*
	
Lo que nos ofrecerá el siguiente resultado:

	1 -11.0		
	
El cual corresponde a un conjunto clave(etiqueta)/valor(número mínimo de la columna 5). 
	### 2. Calcula el valor máximo de la variable (columna) 5En este caso el código es parecido al anterior, y solo tendremos que cambiar la función reducer, aunque por motivos de presentación también crearemos nuevas versiones de los archivos ``main`` y la el archivo ``Mapper.java``. 


	public class MinReducer extends MapReduceBase implements Reducer<Text, DoubleWritable, Text, DoubleWritable> {
	

		public void reduce(Text key, Iterator<DoubleWritable> values, OutputCollector<Text, DoubleWritable> output, Reporter reporter) throws IOException {
			Double maxValue = Double.MIN_VALUE;
			while (values.hasNext()) {
				maxValue= Math.max(maxValue, values.next().get());
			}
		output.collect(key, new DoubleWritable(maxValue));
		}
	}


Una vez hecho esto, compilaremos y ejecutaremos, teniendo cuidado de elegir como directorio uno distinto al usado en la anterior ocasión ya que de otro modo nos dará un error.

	hadoop jar stat.jar oldapi.Min /tmp/BDCC/datasets/ECBDL14/ECBDL14_10tst.data ./stat/outputMax/
	
	hdfs dfs -cat stat/outputMax/*
	
Tras lo cual tendremos como resultado:

	1	9.0	

 ### 3. Calcula al mismo tiempo los valores máximo y mínimo de la variable 5### 4. Calcula los valores máximo y mínimo de todas las variables (salvo la última, que es la etiqueta de clase)### 5. Realizar la media de la variable 5### 6. Obtener la media de todas las variables (salvo la clase)### 7. Comprobar si el conjunto de datos ECBDL es balanceado o no balanceado, es decir, que el ratio entre las clases sea menor o mayor que 1.5 respectivamente.### 8. Cálculo del coeficiente de correlación entre todas las parejas de variables
