
var jsonCircles = [];

var currentClass = 0 ;
classes = ["red", "blue"];

var trainer;


function addCircle(circle)
{

  var numCircles = 20;

  var radius = 50;

  jsonCircles.push({ "x_axis": circle[0], "y_axis": circle[1], "radius": 3, "color" : classes[currentClass], "category" : currentClass });


  for(i=0; i<numCircles; i++)
  {
      var angle = Math.random()*Math.PI*2;
      newx = circle[0] + Math.random()*Math.cos(angle)*radius;
      newy = circle[1] + Math.random()*Math.sin(angle)*radius;
      jsonCircles.push({ "x_axis": newx, "y_axis": newy, "radius": 3, "color" : classes[currentClass], "category" : currentClass });

  }


	drawCircles();
}

function drawCircles()
{
	var circles = svgContainer.selectAll("circle")
                          .data(jsonCircles)
                          .enter()
                          .append("circle");

var circleAttributes = circles
                       .attr("cx", function (d) { return d.x_axis; })
                       .attr("cy", function (d) { return d.y_axis; })
                       .attr("r", function (d) { return d.radius; })
                       .style("fill", function(d) { return d.color; });
}

function mousemove(d, i) {
  addCircle(d3.mouse(this));
}

function changeClass()
{
	currentClass = 1 - currentClass;
}

function trainData()
{
  var tuples = [];

  $.each(jsonCircles, function(i, val){

      tuples.push(new Tuple([val.x_axis,val.y_axis],val.category));
  });


  var dataSet = new DataSet(tuples,2);
  trainer = new LogTrainer(dataSet,2);
  trainer.sendData();
}

function getData()
{

	return jsonCircles ;
}

var lineData ;

function plotLines(a,b,c)
{

  $('path').remove();
  //The data for our line
  lineData = [ { "x": 0,  "y": -c/b },  { "x": 500, "y": (-c -(a*500) )/b}];

//This is the accessor function we talked about above
  var lineFunction = d3.svg.line()
                         .x(function(d) { return d.x; })
                         .y(function(d) { return d.y; })
                         .interpolate("linear");

//The line SVG Path we draw
  var lineGraph = svgContainer.append("path")
                            .attr("d", lineFunction(lineData))
                            .attr("stroke", "blue")
                            .attr("stroke-width", 2)
                            .attr("fill", "none");  
}