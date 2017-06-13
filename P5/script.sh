#! /bin/bash

#Obtenemos el tamaño del fichero de entranamiento
FILE_SIZE=( `hadoop fs -ls /user/ahilario/datasets/BNG_heart/BNG_heart-5-1tra.dat | awk '{print $5}'`)

#Descriptor
echo "Es la primera vez que creas el descriptor y/n"
read des
control="y"


#Leemos el número de maps
echo "Introduce el número de maps: "
read MAPS

#Leemos el número de trees
echo "Introduce el número de árboles"
read TREES

typeset -i MAPS
typeset -i TREES

BYTES_BY_PARTITION=$(($FILE_SIZE/$MAPS))

MAX_BYTES_BY_PARTITION=$(($BYTES_BY_PARTITION+1))

salida="salida_rf_$TREES$MAPS"
salida2="stats_$TREES$MAPS"


DATAPATH="/user/mcc76139799/"
DATASET="BNG_heart"

if [ $control = $des ];
	then
		hadoop jar /tmp/mahout-distribution-sige.jar \
 		org.apache.mahout.classifier.df.tools.Describe \
 		-p $DATAPATH/$DATASET/$DATASET-5-1tra.dat \
 		-f $DATASET.info -d N C 3 N 2 C N C N 3 C L;
fi

hadoop jar /tmp/mahout-distribution-sige.jar
 org.apache.mahout.classifier.df.mapreduce.BuildForest \
 -Dmapreduce.input.fileinputformat.split.minsize=$BYTES_BY_PARTITION \
 -Dmapreduce.input.fileinputformat.split.maxsize=$MAX_BYTES_BY_PARTITION \
 -o output_RF_${TREES}_${MAPS} \
 -d $DATAPATH/$DATASET/$DATASET-5-1tra.dat \
 -ds $DATASET.info \
 -sl 13 -p -t $TREES;

hadoop jar /tmp/mahout-distribution-sige.jar org.apache.mahout.classifier.df.mapreduce.TestForest \
 -i $DATAPATH/$DATASET/$DATASET-5-1tst.dat \
-ds $DATASET.info \
-m $salida \
-a -mr -o $salida2;
