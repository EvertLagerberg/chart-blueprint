

var wrapper = $('#wrapper');

var data = AUTOTUNE.data;

var pymChild = new pym.Child();

var Chart = (function(window, d3) {

  //svg width
  var width;
  var height;

  //svg margins
  var margin = {};

  updateDimensions(window.innerWidth);



  var x = d3.scale.ordinal()
    .rangeBands([0, width], 0.1);

  var y = d3.scale.linear()
    .range([height, 0]);

  var yAxis;
  var xAxis;

  var svg;
  var chart;
  var bar;




  function create_chart() {

    console.log("ran once");


    //initialize domains
    x.domain(data.map(function(d) {
      return d.name;
    }));
    y.domain([0, d3.max(data, function(d) {
      return d.value;
    })]);

    //initialize axises
    xAxis = d3.svg.axis().scale(x).orient("bottom");
    yAxis = d3.svg.axis().scale(y).orient("left").ticks(5);

    //create a variable for a svg:group to the chart-div
    svg = d3.select(".svg");
    chart = svg.append("g");

    //create a svg:group for each datapoint in data and select the groups
    bar = chart.selectAll("g").data(data).enter().append("g")


    bar.append("rect");

    bar.append("text");


    chart.append("g").attr("class", "x axis")
    chart.append("g").attr("class", "y axis")

    bar.style("fill", "steelblue");

    render();

  }

  function render() {
    pymChild.sendHeight();
    updateDimensions(window.innerWidth);

    x.rangeBands([0, width], 0.1);
    y.range([height, 0]);
    xAxis.scale(x);
    yAxis.scale(y);


    svg
      .attr('width', width + margin.right + margin.left)
      .attr('height', height + margin.top + margin.bottom);


    chart.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    //update the axis and line
    svg.select('g.x.axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

    svg.select('g.y.axis')
      .call(yAxis);


    bar.attr("transform", function(d) {
      return "translate(" + x(d.name) + ",0)";
    });


    
    bar.selectAll("rect")
      .attr("y", function(d) {
        return y(d.value);
      })
      .attr("height", function(d) {
        return height - y(d.value);
      })
      .attr("width", x.rangeBand());

    bar.selectAll("text")
      .attr("x", x.rangeBand() / 2)
      .attr("y", function(d) {
        return y(d.value) + 3;
      })
      .attr("dx", "-1em")
      .attr("dy", ".9em")
      .text(function(d) {
        return d.value;
      });



  }

  function updateDimensions(winWidth) {
    console.log(winWidth);
    margin.top = 20;
    margin.right = 30;
    margin.left = 40;
    margin.bottom = 30;


    if (winWidth > 200) {
      console.log(true);
      width = winWidth - margin.left - margin.right;
    } else {
      width = 200;
    }

    height = 500 - margin.top - margin.bottom;


  }

  return {
    create_chart:create_chart,
    render:render
  }



})(window, d3);


  $(window).on('load resize', function(){
    console.log('load/resize');
    pymChild.sendHeight();
    Chart.render();
  });

$(document).ready(function() {
  
  pymChild.sendMessage('childLoaded', 'ready');

  pymChild.onMessage('updateData', function(message) {
    console.log('----------- received message', message);
    message = JSON.parse(message);
    data = message.data;
    console.log(data);
    Chart.create_chart();
  })

});


