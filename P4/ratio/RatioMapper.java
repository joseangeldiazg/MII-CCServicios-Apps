package oldapi;
import java.io.IOException;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.DoubleWritable;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapred.MapReduceBase;
import org.apache.hadoop.mapred.Mapper;
import org.apache.hadoop.mapred.OutputCollector;
import org.apache.hadoop.mapred.Reporter;

public class RatioMapper extends MapReduceBase implements Mapper<LongWritable, Text, Text, DoubleWritable> {
        private static final int MISSING = 9999;

		public void map(LongWritable key, Text value, OutputCollector<Text, DoubleWritable> output, Re
porter reporter) throws IOException {
                String line = value.toString();
                String[] parts = line.split(",");
                output.collect(new Text("Ratio"), new DoubleWritable(Double.parseDouble(parts[10])));
        }
}