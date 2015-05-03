%#! /bin/octave -qf

cd '/Users/rohanraja/Dropbox/Machine Learning/AndrewNg/mlclass-ex2-005/mlclass-ex2'


data = csvread('heatPoints.csv');
theta = data(1,:);
height = data(2,1);
width = data(2,2);
step = data(2,3);


gridPoints = zeros((height*width)/(step*step), 4);

n = 1;

% grid = zeros((height*width)/(step*step), 2);

% for i=1:step:height

% 	tmp = [i*ones(2,1),[1:step:width]'];

% end

for i = 1:step:width
        for j = 1:step:height

        	[val, inte] = predict(theta',[1,i,j]);

        	if(inte < 0.5)
        		inte = 1 - inte ;
        	end

        	inte = inte - 0.4;

        	gridPoints(n,:) = [i,j,val,inte];
        	n = n + 1;

        end
end

csvwrite('heatPoints.csv',gridPoints)