function LogTrainer (tData, pNumClasses) {
    
    this.rawTrainingData = tData;
    this.trainingData = [];
    this.numClasses = pNumClasses;
    this.hypoFunctions = [];  // Hypothetical Functions, one for each class

    this.polyDegree = 1;

    

    this.initHypoFunctions = function()
    {
    	if(this.numClasses == 2)
    		this.numClasses = this.numClasses - 1;

    	for(i=0; i<this.numClasses; i++)
    	{
    		var tmpFunc = new HypoFunction(i+1, this.trainingData.numParams);
    		this.hypoFunctions.push(tmpFunc);

    	}
    };

    this.mapFeatures = function()
    {
    	fMapper = new FeatureMapper(this.polyDegree);
    	//this.trainingData = fMapper.mapFeature(this.rawTrainingData);
    	this.trainingData = (this.rawTrainingData);
    	console.log(this.trainingData);

    }

    this.prepareTrainer = function()
    {
    	this.mapFeatures();	
    	this.initHypoFunctions();
    };


    this.gradientDescent = function(hypoFunc, rate, numIter)
    {
    	var m = this.trainingData.samples.length;

    	for(k=0; k<numIter; k++)
    	{
	    	var newTheta = [];

	    	
	    	for(j=0; j < hypoFunc.numParams; j++)
	    	{
	    		var inSum = 0;

	    		
	    		for(i=0;i<m;i++)
	    		{

	    			var curSample = this.trainingData.samples[i] ;
	    			var curVal = (hypoFunc.getVal(curSample.inputVector) - curSample.outputVal);
	    			tmpSum = curSample.inputVector[j]*curVal;
	    			inSum = inSum + tmpSum;

	    		}

	    		var dJdQ = inSum / m;

	    		newTheta.push(hypoFunc.theta[j] - rate*dJdQ);

	    	}

	    	hypoFunc.theta = newTheta ;
	    	console.log(hypoFunc.theta);
	    }
    }

    this.train = function()
    {
    	this.gradientDescent(this.hypoFunctions[0], 0.1, 50);

    	console.log("FINAL THETA = ");
    	console.log(this.hypoFunctions[0].theta);

    	plotLines(this.hypoFunctions[0].theta[0],this.hypoFunctions[0].theta[1],this.hypoFunctions[0].theta[2]);
    };

    this.sendData = function()
    {
    	jsonData = JSON.stringify(this);

    	var server_url = '/gradDesc';

    	$.ajax({
		  url: server_url,
		  type: "POST",
		  data: {q : jsonData},
		  dataType: "json",
		  success: function(data){
		  	console.log(data.finalTheta);
		  	trainer.hypoFunctions[0].theta = data.finalTheta ;
		  	plotLines(trainer.hypoFunctions[0].theta[1],trainer.hypoFunctions[0].theta[2],trainer.hypoFunctions[0].theta[0]);

		  }
		});

    	return jsonData;
    };

    this.prepareTrainer();


}
