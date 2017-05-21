package oldapi;
	import java.io.IOException;
	import java.util.Iterator;
	import org.apache.hadoop.io.IntWritable;
	import org.apache.hadoop.io.DoubleWritable;
	import org.apache.hadoop.io.Text;
	import org.apache.hadoop.mapred.MapReduceBase;
	import org.apache.hadoop.mapred.OutputCollector;
	import org.apache.hadoop.mapred.Reducer;
	import org.apache.hadoop.mapred.Reporter;

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
