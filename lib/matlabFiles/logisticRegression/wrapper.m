#! /bin/octave -qf

cd '/Users/rohanraja/Dropbox/Machine Learning/AndrewNg/mlclass-ex2-005/mlclass-ex2'

data = csvread('data.csv');
finalTheta = logreg(data);
fprintf('[%f,%f,%f]', finalTheta(1),finalTheta(2),finalTheta(3));