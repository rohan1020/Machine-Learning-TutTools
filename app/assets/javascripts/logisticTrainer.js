function LogTrainer (tData, pNumClasses) {
    
    this.rawTrainingData = tData;
    this.trainingData = [];
    this.numClasses = pNumClasses;
    this.hypoFunctions = [];  // Hypothetical Functions, one for each class

    this.polyDegree = 1;

    this.ajaxManager = new AjaxManager();

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

    this.train = function()
    {
    	this.requestServerTraining();
    };

    this.processTrainedTheta = function(data)
    {
        console.log(data.finalTheta);
        trainer.hypoFunctions[0].theta = data.finalTheta ;
        plotLines(trainer.hypoFunctions[0].theta[1],trainer.hypoFunctions[0].theta[2],trainer.hypoFunctions[0].theta[0]);
        trainer.heatMap();
    }

    this.requestServerTraining = function()
    {
    	jsonData = JSON.stringify(this);

    	var server_url = '/gradDesc';

        this.ajaxManager.postJSON(server_url, jsonData, this.processTrainedTheta);

    };

    this.predict = function(x,y)
    {
    	var hypoVal = this.hypoFunctions[0].getVal([1,x,y]);

    	if(hypoVal >= 0.5)
    		return 1;
    	else
    		return 0;
    }

    this.heatMap = function()
    {
    	var gridPoints = [];
    	var stepSize = 15;
    	
    	jsonData = JSON.stringify(this);

    	$('rect').remove();
  

    	var server_url = '/heatMapPoints';

    	$.ajax({
		  url: server_url,
		  type: "POST",
		  data: {q : jsonData, gridData : JSON.stringify([heightSvg,widthSvg,stepSize])},
		  dataType: "json",
		  success: function(data){

		  	console.log("Drawing Heat Map");
		  	//console.log(data);

		  	//gridPoints = JSON.parse(data);

		  	drawHeatMat((data), stepSize);

		  }
		});

    	
    }

    this.prepareTrainer();


}
