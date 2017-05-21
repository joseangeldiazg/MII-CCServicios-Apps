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
