# Práctica 4

Computación Distribuida y Escalable con Hadoop

## Enunciado y objetivos

El objetivo de esta práctica es realizar programas escalables para mejorar la eficiencia en entornos Big Data. Para ello, haremos uso del entorno que se ha convertido en un estándar de facto como es Hadoop, utilizando **HDFS** como sistema de archivos distribuido y **Hadoop- MapReduce** como mecanismo de ejecución.


Una vez realizado los primeros pasos para compilar nuestro código en java correspondiente, y tener localizado los datos con los que vamos a trabajar, concretamente ``/tmp/BDCC/datasets/ECBDL14/ECBDL14_10tst.data`` estamos en posición de comenzar a realizar los siguientes ejercicios con Hadoop. 


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


En este caso es necesario modificar todas las funciones, incluidos el mail y el mapper. En la función mapper deberemos mandar en el argumento values, los cálculos por filas de los parámetros que necesitaremos para calcular el acumulado en el reducer. Como esto es un cambio de los parámetros deberemos modificar también el main.

Las funciones serían por tanto las siguientes:

	public class Correlation {
		public static void main(String[] args) throws IOException {
			if (args.length != 2) {
				System.err.println("Usage: Correlation <input path> <output path>");
				System.exit(-1);
			}
			JobConf conf = new JobConf(Correlation.class);
			conf.setJobName("Correlation");
			FileInputFormat.addInputPath(conf, new Path(args[0]));
			FileOutputFormat.setOutputPath(conf, new Path(args[1]));
			conf.setMapperClass(CorrelationMapper.class);
			conf.setReducerClass(CorrelationReducer.class);
			conf.setMapOutputKeyClass(Text.class);
			conf.setMapOutputValueClass(Text.class);
			conf.setOutputKeyClass(Text.class);
			conf.setOutputValueClass(DoubleWritable.class);
			JobClient.runJob(conf);
		}
	} 
	
Mapper:

	public class CorrelationMapper extends MapReduceBase implements Mapper<LongWritable, Text, Text, Text> {
	        private static final int MISSING = 9999;
	
			public void map(LongWritable key, Text value, OutputCollector<Text, Text> output, Reporter reporter) throws IOException {
	                String line = value.toString();
	                String[] parts = line.split(",");
	                double xy=0, xx=0, yy=0;
	                String str_xy, str_xx, str_yy;
	
	                int variables = parts.length-1;
	                for(int i=0; i<variables; i++)
	                {
	                    for(int j=0; j<variables; j++)
	                    {
	                          xy=Double.parseDouble(parts[i])*Double.parseDouble(parts[j]);
	                          xx=Double.parseDouble(parts[i])*Double.parseDouble(parts[i]);
	                          yy=Double.parseDouble(parts[j])*Double.parseDouble(parts[j]);
	
	                          str_xy=Double.toString(xy);
	                          str_xx=Double.toString(xx);
	                          str_yy=Double.toString(yy);
	
	                          output.collect(new Text(Integer.toString(i)+","+Integer.toString(j)),
	                              new Text(parts[i]+"," + parts[j]+","+str_xy+","+str_xx+","+str_yy));
	                    }
	
	                }
	
	        }
	}
	
Reducer:

	public class CorrelationReducer extends MapReduceBase implements Reducer<Text, Text, Text, DoubleWritable>
		{
				public void reduce(Text key, Iterator<Text> values, OutputCollector<Text, DoubleWritable> output, Reporter reporter) throws IOException {
	
							double sumX = 0, sumY = 0, sumXX = 0, sumYY = 0, sumXY = 0, tam = 0;
							double medX=0, medY=0, covarianza=0, desX=0, desY=0, correlation=0;
	
							while (values.hasNext())
							{
									String line = values.next().toString();
									String[] parts = line.split(",");
									double x = Double.parseDouble(parts[0]);
									double y = Double.parseDouble(parts[1]);
									double xy = Double.parseDouble(parts[2]);
									double xx = Double.parseDouble(parts[3]);
									double yy = Double.parseDouble(parts[4]);
	
									sumX+=x;
									sumY+=y;
									sumXX+=xx;
									sumXY+=xy;
									sumYY+=yy;
									tam++;
							}
	
							medX=sumX/tam;
							medY=sumY/tam;
							covarianza=sumXY/tam;
							desX=Math.sqrt((sumXX/tam)-(medX*medX));
							desY=Math.sqrt((sumYY/tam)-(medY*medY));
							correlation=covarianza/(desX*desY);
	
							output.collect(new Text("Correlacion de las variables "+key+":"), new DoubleWritable(correlation));
				}
		}	
	
	
La salida que ofrece es la que podemos ver a continuación:

	Correlacion de las variables 4,9:	0.28951401227448026
	Correlacion de las variables 5,8:	0.2932577563538439
	Correlacion de las variables 6,7:	0.48464624276968454
	Correlacion de las variables 7,6:	0.48464624276968454
	Correlacion de las variables 8,5:	0.2932577563538439
	Correlacion de las variables 9,4:	0.28951401227448026
	Correlacion de las variables 5,9:	0.26732880414476834
	Correlacion de las variables 6,8:	0.4723708923477761
	Correlacion de las variables 7,7:	1.2904528448343608
	Correlacion de las variables 8,6:	0.4723708923477761
	Correlacion de las variables 9,5:	0.26732880414476834
	Correlacion de las variables 6,9:	0.45369677663566166
	Correlacion de las variables 7,8:	-0.01930115553186774
	Correlacion de las variables 8,7:	-0.01930115553186774
	Correlacion de las variables 9,6:	0.45369677663566166
	Correlacion de las variables 0,0:	9.238504786717295
	Correlacion de las variables 7,9:	0.3615923952107711
	Correlacion de las variables 8,8:	1.3306850594790478
	Correlacion de las variables 9,7:	0.3615923952107711
	Correlacion de las variables 0,1:	6.757986765100972
	Correlacion de las variables 1,0:	6.757986765435912
	Correlacion de las variables 8,9:	0.3989695582660335
	Correlacion de las variables 9,8:	0.3989695582660335
	Correlacion de las variables 0,2:	-1.8863381648198956
	Correlacion de las variables 1,1:	6.768724360523812
	Correlacion de las variables 2,0:	-1.8863381647731121
	Correlacion de las variables 9,9:	1.2551517912496273
	Correlacion de las variables 0,3:	-1.3047631102867614
	Correlacion de las variables 1,2:	-1.6580150419400022
	Correlacion de las variables 2,1:	-1.6580150419150723
	Correlacion de las variables 3,0:	-1.304763110362681
	Correlacion de las variables 0,4:	-1.5178888907944856
	Correlacion de las variables 1,3:	-1.1409972267449517
	Correlacion de las variables 2,2:	1.4747937247540117
	Correlacion de las variables 3,1:	-1.14099722681717
	Correlacion de las variables 4,0:	-1.5178888908935797
	Correlacion de las variables 0,5:	-1.25879753673482
	Correlacion de las variables 1,4:	-1.2509834324604725
	Correlacion de las variables 2,3:	0.31278384494556577
	Correlacion de las variables 3,2:	0.31278384494556577
	Correlacion de las variables 4,1:	-1.2509834325646993
	Correlacion de las variables 5,0:	-1.2587975367855877
	Correlacion de las variables 0,6:	-1.7767399242727606
	Correlacion de las variables 1,5:	-1.1467716981429337
	Correlacion de las variables 2,4:	0.393968857992932
	Correlacion de las variables 3,3:	1.2294271544525375
	Correlacion de las variables 4,2:	0.393968857992932
	Correlacion de las variables 5,1:	-1.1467716981087366
	Correlacion de las variables 6,0:	-1.776739924175114
	Correlacion de las variables 0,7:	-1.3676865400541747
	Correlacion de las variables 1,6:	-1.6796909115550054
	Correlacion de las variables 2,5:	0.357383969603115
	Correlacion de las variables 3,4:	0.2769710009725587
	Correlacion de las variables 4,3:	0.2769710009725587
	Correlacion de las variables 5,2:	0.357383969603115
	Correlacion de las variables 6,1:	-1.6796909116013496
	Correlacion de las variables 7,0:	-1.3676865402765044
	Correlacion de las variables 0,8:	-1.5843150448137409
	Correlacion de las variables 1,7:	-1.2944449453209963
	Correlacion de las variables 2,6:	0.513904856696898
	Correlacion de las variables 3,5:	0.2477489967604067
	Correlacion de las variables 4,4:	1.2974108434137177
	Correlacion de las variables 5,3:	0.2477489967604067
	Correlacion de las variables 6,2:	0.513904856696898
	Correlacion de las variables 7,1:	-1.294444945321578
	Correlacion de las variables 8,0:	-1.5843150447403864
	Correlacion de las variables 0,9:	-1.3115805595185028
	Correlacion de las variables 1,8:	-1.3652760375655453
	Correlacion de las variables 2,7:	0.4094987082957938
	Correlacion de las variables 3,6:	0.35457836229160017
	Correlacion de las variables 4,5:	0.33496418195706285
	Correlacion de las variables 5,4:	0.33496418195706285
	Correlacion de las variables 6,3:	0.35457836229160017
	Correlacion de las variables 7,2:	0.4094987082957938
	Correlacion de las variables 8,1:	-1.365276037533275
	Correlacion de las variables 9,0:	-1.3115805596087982
	Correlacion de las variables 1,9:	-1.2299496284057423
	Correlacion de las variables 2,8:	0.4213187142937814
	Correlacion de las variables 3,7:	0.2769341534764189
	Correlacion de las variables 4,6:	0.3924252714850838
	Correlacion de las variables 5,5:	1.2338339385198749
	Correlacion de las variables 6,4:	0.3924252714850838
	Correlacion de las variables 7,3:	0.2769341534764189
	Correlacion de las variables 8,2:	0.4213187142937814
	Correlacion de las variables 9,1:	-1.229949628409885
	Correlacion de las variables 2,9:	0.3756074111413685
	Correlacion de las variables 3,8:	0.29157210664348937
	Correlacion de las variables 4,7:	0.3137541703353481
	Correlacion de las variables 5,6:	0.3637685726837432
	Correlacion de las variables 6,5:	0.3637685726837432
	Correlacion de las variables 7,4:	0.3137541703353481
	Correlacion de las variables 8,3:	0.29157210664348937
	Correlacion de las variables 9,2:	0.3756074111413685
	Correlacion de las variables 3,9:	0.2601190627210383
	Correlacion de las variables 4,8:	0.3258527992060872
	Correlacion de las variables 5,7:	0.2935902957339941
	Correlacion de las variables 6,6:	1.4707170942525576
	Correlacion de las variables 7,5:	0.2935902957339941
	Correlacion de las variables 8,4:	0.3258527992060872
	Correlacion de las variables 9,3:	0.2601190627210383
	

## Opcionales

En el tutorial de Hadoop se propone la realización de algunos otros objetivos, en este primer punto realizaremos tres de ellos al mismo tiempo:

Unir todos los estadísticos en un mismo código, hacerlo sobre todas las variables y etiquetar los experimentos. La función Mapper es la misma que hemos usado en las anteriores ocasiones que queríamos calcular algo sobre todas las muestras. Por otro lado, la función Reduce si que tiene cambios:

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


### Repite el proceso sobre un conjunto de mayor volumen (Ej: /user/ isaac/datasets/higgs...” ¿Hay grandes diferencias de tiempo?


En este punto hemos usado de nuevo el código del cálculo del mínimo. Primero hemos ejecutado sobre nuestro problema ECBDL14 y tras ello, sobre el dataset ``higgsImb10-5-fold/higgsImb10.data`` el cual es de menor tamaño. Los resultados son estos:

**ECBDL14**

Tiempo en las tareas relacionadas con el proceso mapper 16s, mientras que con el proceso mapper 40s. En total el tiempo ha sido de casi un minuto, pero debemos remarcar que hemos notado el servidor algo saturado por lo que los experimentos pueden haberse visto afectados por ello. 

**HIGGS**

En este caso, el tiempo en las tareas relacionadas con el proceso mapper ha sido de 11 segundos mientras que el proceso reduce ha ocupado 36 segundos. 

**Conclusiones**

Si analizamos los resultados el proceso sobre el dataset HIGSS ha tardado 9 segundos menos que el proceso sobre el dataset ECBDL14, teniendo en cuenta que este último es bastante mayor, la mejora de tiempo no es significativa. 


### Acelera el proceso de cómputo descargando al Reducer de parte de la tarea.

Para esta parte nos basaremos en el código de ejemplo visto en el manual de Hadoop. Concretamente en el código de ejemplo del problema de las palabras vacias. En este punto, deberemos modificar de nuevo todas las funciones implicadas en el proceso Mapreduce sobre hadoop. El proceso que hemos seguido para descargar al reducer de parte de la tarea, es que el minimo, sera finalmente obtenido por la funcion ``cleanup``del mapper, de una manera tan simple como ordenando un ArrayList y mostrando el primer elemento. 

Debemos llevar cuidado con la definiciond de la clase y los import ya que estos ya no seran MapReduceBase.

El código de **main** sería el siguiente:


	public class MinFaster extends Configured implements Tool {
	
		public static void main(String args[]) throws Exception
		{
	      int res = ToolRunner.run(new Configuration(), new MinFaster(), args);
	      System.exit(res);
	  }
	
		public int run(String[] args) throws IOException,  InterruptedException, ClassNotFoundException {
			if (args.length != 2) {
				System.err.println("Usage: MinFaster <input path> <output path>");
				System.exit(-1);
			}
			Configuration conf = new Configuration(1);
			Job job = Job.getInstance(conf, "MinFaster");
			job.setJarByClass(MinFaster.class);
			job.setMapperClass(MinFasterMapper.class);
			job.setReducerClass(MinFasterReducer.class);
			job.setOutputKeyClass(Text.class);
			job.setOutputValueClass(DoubleWritable.class);
			FileInputFormat.addInputPath(job, new Path(args[0]));
			FileOutputFormat.setOutputPath(job, new Path(args[1]));
			return job.waitForCompletion(true) ? 0 : 1;
		}
	}

El código del **mapper** sería:

	public class MinFasterMapper extends Mapper<LongWritable, Text, Text, DoubleWritable> {
	        private static final int MISSING = 9999;
	        public static int col=5;
	        public ArrayList<Double> elementos = new ArayList<>();
	
			    public void map(LongWritable key, Text value, Context context) throws IOException {
	                String line = value.toString();
	                String[] parts = line.split(",");
	                elementos.add(Double.parseDouble(parts[col]));
	        }
	        @Override
	        protected void cleanup(Context context) throws IOException, InterruptedException {
	                Collections.sort(elementos);
	                context.write(new Text("Min"), new DoubleWritable(elementos.get(0)));
	        }
	}

Y por último el código del proceso **reduce**:

	public class MinFasterReducer extends Reducer<Text, DoubleWritable, Text, DoubleWritable> {

		public void reduce(Text key, Iterator<DoubleWritable> values, Context context) throws IOException, InterruptedException {

			Double minValue = Double.MAX_VALUE;
			while (values.hasNext())
			{
					minValue =values.next().get();
			}
			context.write(key, new DoubleWritable(minValue));
		}
	}


## Conclusiones

Hadoop nos ofrece de manera simple y sencilla una forma de computo distribuida muy avanzada y potente. Solo tenemos que fijarnos en el dataset **ECBDL14** usado que pese a corresponder con el 10% del dataset real, es bastante grande y los cálculos sobre el no llevan mucho tiempo. Si estos cálculos los hiciéramos con las técnicas tradicionales de programación estas nos tomarían mucho tiempo por lo que harían del tiempo de computo un factor privativo.