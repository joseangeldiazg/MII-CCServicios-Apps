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
