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
Tras lo cual compilaríamos y ejecutaríamos con las siguientes ordenes:
	
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

 ### 3. Calcula al mismo tiempo los valores máximo y mínimo de la variable 5

En este caso debemos realizar los siguientes cambios en la función Reducer. 


	public class MinMaxReducer extends MapReduceBase implements Reducer<Text, DoubleWritable, Text, DoubleWritable> {
	

		public void reduce(Text key, Iterator<DoubleWritable> values, OutputCollector<Text, DoubleWritable> output, Reporter reporter) throws IOException {
			Double maxValue = Double.MIN_VALUE;
			Double minValue = Double.MAX_VALUE;
			while (values.hasNext()) {
				Double indice = values.next().get();
				maxValue= Math.max(maxValue,indice);
				minValue= Math.min(minValue,indice);
			}
		output.collect(new Text("Minimo:"), new DoubleWritable(minValue));
		output.collect(new Text("Maximo:"), new DoubleWritable(maxValue));
		}
	}

Tras lo cual si compilamos y ejecutamos obtendremos el siguiente resultado, que combina los estadísticos de las anteriores secciones. 

	Minimo:	-11.0
	Maximo:	9.0	### 4. Calcula los valores máximo y mínimo de todas las variables (salvo la última, que es la etiqueta de clase)En este caso si que es necesario modificar la función mapper, además de la reduce, donde deberemos introducir para que el resultado sea más fácilmente entendible la variable a la que representa cada salida. La función Mapper sería la siguiente:

	public class MinMaxAllMapper extends MapReduceBase implements Mapper<LongWritable, Text, Text, DoubleWritable> {
        private static final int MISSING = 9999;

		public void map(LongWritable key, Text value, OutputCollector<Text, DoubleWritable> output, Reporter reporter) throws IOException
    	{
	        String line = value.toString();
	        String[] parts = line.split(",");
	    		int variables=parts.length-1;
	    		for(int i=0; i<variables;i++)
	        	{
	            	output.collect(new Text(String.valueOf(i)), new DoubleWritable(Double.parseDouble(parts[i])));
	    		}
	    }
	}
	
Mientras que la función Reduce sería:

	
	public class MinMaxAllReducer extends MapReduceBase implements Reducer<Text, DoubleWritable, Text, DoubleWritable> {


	public void reduce(Text key, Iterator<DoubleWritable> values, OutputCollector<Text, DoubleWritable> output, Reporter reporter) throws IOException {
		Double maxValue = Double.MIN_VALUE;
		Double minValue = Double.MAX_VALUE;
		while (values.hasNext()) {
			Double indice = values.next().get();
			maxValue= Math.max(maxValue,indice);
			minValue= Math.min(minValue,indice);
		}
		output.collect(new Text("Minimo de la variable "+key+":"), new DoubleWritable(minValue));
		output.collect(new Text("Maximo de la variable "+key+":"), new DoubleWritable(maxValue));
	}
	}

Tras lo cual podremos ver la siguiente salida:

	Minimo de la variable 1:	0.0
	Maximo de la variable 1:	0.154
	Minimo de la variable 2:	-12.0
	Maximo de la variable 2:	10.0
	Minimo de la variable 3:	-11.0
	Maximo de la variable 3:	8.0
	Minimo de la variable 4:	-12.0
	Maximo de la variable 4:	9.0
	Minimo de la variable 5:	-11.0
	Maximo de la variable 5:	9.0
	Minimo de la variable 6:	-13.0
	Maximo de la variable 6:	9.0
	Minimo de la variable 7:	-12.0
	Maximo de la variable 7:	9.0
	Minimo de la variable 8:	-12.0
	Maximo de la variable 8:	7.0
	Minimo de la variable 9:	-13.0
	Maximo de la variable 9:	10.0
	Minimo de la variable 0:	0.094
	Maximo de la variable 0:	0.768
### 5. Realizar la media de la variable 5Para este punto, podemos usar el mismo mapper usado para el mínimo o el máximo y tendremos que modificar por tanto el proceso reduce. 


	public class MinReducer extends MapReduceBase implements Reducer<Text, DoubleWritable, Text, DoubleWritable> {
		
	
		public void reduce(Text key, Iterator<DoubleWritable> values, OutputCollector<Text, DoubleWritable> output, Reporter reporter) throws IOException {
			Double avg =0.0;
			Double total=0.0;
			int cuenta=0;
			while (values.hasNext()) {
				total+= values.next().get();
				cuenta+=1;
			}
	
			avg=total/cuenta;
		output.collect(new Text("Media:"), new DoubleWritable(avg));	}
	}


La salida que obtenemos es la siguiente:

	Media:	-1.282261707288373
		### 6. Obtener la media de todas las variables (salvo la clase)

Para este punto, al igual que en el objetivo 4, tenemos que obtener un reducer que itere sobre todas las variables exceptuando la clase. El código es:


	public class MinMapper extends MapReduceBase implements Mapper<LongWritable, Text, Text, DoubleWritable> {
	        private static final int MISSING = 9999;
	
			public void map(LongWritable key, Text value, OutputCollector<Text, DoubleWritable> output, Reporter reporter) throws IOException {
	                String line = value.toString();
	                String[] parts = line.split(",");
			int variables=parts.length-1;
			for(int i=0; i<variables; i++){
				output.collect(new Text(String.valueOf(i)), new DoubleWritable(Double.parseDouble(parts[i])));
			}
			}
        }




Por otro lado, el dódigo de la función reducer sería:

	public class MinReducer extends MapReduceBase implements Reducer<Text, DoubleWritable, Text, DoubleWritable> {
		
	
		public void reduce(Text key, Iterator<DoubleWritable> values, OutputCollector<Text, DoubleWritable> output, Reporter reporter) throws IOException {
			Double avg =0.0;
			Double total=0.0;
			int cuenta=0;
			while (values.hasNext()) {
				total+= values.next().get();
				cuenta+=1;
			}
	
			avg=total/cuenta;
		output.collect(new Text("Media de la variable"+key+":"), new DoubleWritable(avg));	}
	}


La salida es:

	Media de la variable1:	0.052127765909443624
	Media de la variable2:	-2.188240380935686
	Media de la variable3:	-1.408876789776933
	Media de la variable4:	-1.7528724942777865
	Media de la variable5:	-1.282261707288373
	Media de la variable6:	-2.293434905140485
	Media de la variable7:	-1.5875789403216172
	Media de la variable8:	-1.7390052924221087
	Media de la variable9:	-1.6989002790625127
	Media de la variable0:	0.2549619599174071
### 7. Comprobar si el conjunto de datos ECBDL es balanceado o no balanceado, es decir, que el ratio entre las clases sea menor o mayor que 1.5 respectivamente.

Para saber si estamos haciendo bien este calculo primero haremos una sencilla prueba matemática para tener una estimación del valor que el ratio de balanceo deberá tener: Estamos trabajando con el dataset ECBDL, que se compone de un total de 32.000.000 de instancias. Para nuestra práctica nos quedamos con el 10% es decir, finalmente trabajamos con 3.200.000 instancias, de las cuales, sabemos por las especificaciones del dataset que el 98% corresponden a clase negativa (ya sabemos que será no balanceado, pero vamos a comprobarlo) por lo que tenemos sobre 3.136.000 de una clase y 64.000 de la otra, si hacemos el cálculo del ratio obtenemos un ratio de **49**. Vamos a ver si nuestro cálculo se parece:

La función mapper, se mantiene igual que en las del mínimo o máximo pero pasando la columna 10 que es la que contiene nuestra clase. Por otro lado, la función Reducer será:

	public class MinReducer extends MapReduceBase implements Reducer<Text, DoubleWritable, Text, DoubleWritable> {
		
	
		public void reduce(Text key, Iterator<DoubleWritable> values, OutputCollector<Text, DoubleWritable> output, Reporter reporter) throws IOException {
			int class0=0;
			int class1=1;
			double valActual;
			double ratio=0.0;
			while (values.hasNext()) {
				valActual= values.next().get();
				if(valActual==0){
					class0+=1;
				}
				else if(valActual==1){
					class1+=1;
				}
			}
			
			if(class1>class0){
				ratio=class1/class0;
			}
			else if(class0>class1){
				ratio=class0/class1;
			}
			if(ratio>1.5 || class0==class1){
				output.collect(new Text("Conjunto no balanceado. Ratio:"), new DoubleWritable(ratio));
			}
			else if(ratio<=1.5){
				output.collect(new Text("Conjunto balanceado. Ratio:"), new DoubleWritable(ratio));	
			}
	
		}
	}


Tras su compilado y ejecución obtenemos:

	Conjunto no balanceado. Ratio:	58.0
	
Que como podemos comprobar está dentro del rango del cálculo hecho antes. 	### 8. Cálculo del coeficiente de correlación entre todas las parejas de variables



## Opcionales

En el tutorial de Hadoop se propone la realización de algunos otros objetivos, en este primer punto realizaremos tres de ellos al mismo tiempo:

Unir todos los estadísticos en un mismo código, hacerlo sobre todas las variables y etiquetar los experimentos. La función Mapper es la misma que hemos usado en las anteriores ocasiones que queriamos calcular algo sobre todas las muestras. Por otro lado, la función Reduce si que tiene cambios:

public class StatAllReducer extends MapReduceBase implements Reducer<Text, DoubleWritable, Text, DoubleWritable> {


	public void reduce(Text key, Iterator<DoubleWritable> values, OutputCollector<Text, DoubleWritable> output, Reporter reporter) throws IOException {
				Double maxValue = Double.MIN_VALUE;
				Double minValue = Double.MAX_VALUE;
				Double avg =0.0;
				Double total=0.0;
				int cuenta=0;

				while (values.hasNext()) {
						Double indice = values.next().get();
						maxValue= Math.max(maxValue,indice);
						minValue= Math.min(minValue,indice);
						total+= indice;
						cuenta+=1;
				}
				avg=total/cuenta;

			output.collect(new Text("Media de la variable "+key+":"), new DoubleWritable(avg));
			output.collect(new Text("Minimo de la variable "+key+":"), new DoubleWritable(minValue));
			output.collect(new Text("Maximo de la variable "+key+":"), new DoubleWritable(maxValue));
		}
	}


La salida sería:

	Media de la variable 1:	0.052127765909225854
	Minimo de la variable 1:	0.0
	Maximo de la variable 1:	0.154
	Media de la variable 2:	-2.188240380935686
	Minimo de la variable 2:	-12.0
	Maximo de la variable 2:	10.0
	Media de la variable 3:	-1.408876789776933
	Minimo de la variable 3:	-11.0
	Maximo de la variable 3:	8.0
	Media de la variable 4:	-1.7528724942777865
	Minimo de la variable 4:	-12.0
	Maximo de la variable 4:	9.0
	Media de la variable 5:	-1.282261707288373
	Minimo de la variable 5:	-11.0
	Maximo de la variable 5:	9.0
	Media de la variable 6:	-2.293434905140485
	Minimo de la variable 6:	-13.0
	Maximo de la variable 6:	9.0
	Media de la variable 7:	-1.5875789403216172
	Minimo de la variable 7:	-12.0
	Maximo de la variable 7:	9.0
	Media de la variable 8:	-1.7390052924221087
	Minimo de la variable 8:	-12.0
	Maximo de la variable 8:	7.0
	Media de la variable 9:	-1.6989002790625127
	Minimo de la variable 9:	-13.0
	Maximo de la variable 9:	10.0
	Media de la variable 0:	0.2549619599168005
	Minimo de la variable 0:	0.094
	Maximo de la variable 0:	0.768



