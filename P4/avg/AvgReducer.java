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
	
	public class AvgReducer extends MapReduceBase implements Reducer<Text, DoubleWritable, Text, DoubleWritable> {


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
