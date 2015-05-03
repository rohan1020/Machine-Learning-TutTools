#! /bin/octave -qf

cd 'lib/matlabFiles/logisticRegression'

data = csvread('data.csv');
finalTheta = logreg(data);
fprintf('[%f,%f,%f]', finalTheta(1),finalTheta(2),finalTheta(3));

