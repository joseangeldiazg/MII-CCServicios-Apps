#! /bin/bash

hdfs dfs -rm output_RF*/*
hdfs dfs -rm salida*/*
hdfs dfs -rm stats*/*

hdfs dfs -rmdir output_RF* salida* stats*
