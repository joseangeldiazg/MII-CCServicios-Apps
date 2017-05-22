package oldapi;
import java.io.IOException;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.DoubleWritable;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapred.OutputCollector;
import org.apache.hadoop.mapred.Reporter;
import java.util.List;
import java.util.ArrayList;
import java.util.Collections;

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
