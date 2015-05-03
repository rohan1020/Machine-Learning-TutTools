function theta = logreg(data)

	%data = load('ex2data1.txt');
	X = data(:, [1, 2]); y = data(:, 3);


	[m, n] = size(X);

	% Add intercept term to x and X_test
	X = [ones(m, 1) X];

	% Initialize fitting parameters
	initial_theta = zeros(n+1, 1);
	

	% options = optimset('GradObj', 'on', 'MaxIter', 500);

	% lambda = 0;

	% [theta, cost] = ...
	% 	fminunc(@(t)(costFunction(t, X, y)), initial_theta, options);

	lambda = 0.1;

	options = optimset('GradObj', 'on', 'MaxIter', 500);

	[theta] = ...
         fminunc (@(t)(costFunction(t, X, y)), ...
                 initial_theta, options);



	% Print theta to screen
	%fprintf('Cost at theta found by fminunc: %f\n', cost);
	%fprintf('theta: \n');
	%fprintf(' %f \n', theta);

	% Plot Boundary
	plotDecisionBoundary(theta, X, y);

	% Put some labels 
	%hold on;
	% Labels and Legend
	%xlabel('Exam 1 score')
	%ylabel('Exam 2 score')

	% Specified in plot order
	%legend('Admitted', 'Not admitted')
	%hold off;

	%fprintf('\nProgram paused. Press enter to continue.\n');
	%pause;


end
