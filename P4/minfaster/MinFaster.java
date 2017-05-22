package oldapi;
import java.io.IOException;
import java.lang.InterruptedException;
import java.lang.ClassNotFoundException;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.DoubleWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.mapred.JobClient;
import org.apache.hadoop.mapred.JobConf;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.conf.Configured;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.util.Tool;
import org.apache.hadoop.util.ToolRunner;


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
