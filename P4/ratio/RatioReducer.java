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

public class RatioReducer extends MapReduceBase implements Reducer<Text, DoubleWritable, Text, DoubleWritable> {


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
