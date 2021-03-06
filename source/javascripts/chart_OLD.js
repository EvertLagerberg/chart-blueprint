var data;

var pymChild = new pym.Child();

function create_Chart(){
var maxWidth = 960;
rightPadding = 5;
var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 700 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
var barWidth =width/data.length;


var x = d3.scale.ordinal()
    .domain(["A", "B", "C", "D", "E", "F"])
    .rangeBands([0, width], .1);

var y = d3.scale.linear()
	.domain([0, 10])
    .range([height,0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(5);



var chart = d3.select(".chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



var bar = chart.selectAll("g").data(data).enter().append("g").attr("transform", function(d,i){
	return "translate(" +(i*barWidth+20) + ",0)"; 
});

  bar.append("rect")
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
      .attr("width", x.rangeBand());

  bar.append("text")
      .attr("x", barWidth / 2)
      .attr("y", function(d) { return y(d.value) + 3; })
      .attr("dy", ".75em")
      .text(function(d) { return d.value; });


chart.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);
bar.style("fill", "steelblue");


chart.append("g")
    .attr("class", "y axis")
    .call(yAxis)
  .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Frequency");



}


 window.onload = function () { pymChild.sendHeight(); }

$(document).ready(function () {
	console.log("ready");
    data = AUTOTUNE.data;
    console.log(data);
    create_Chart();
  });


