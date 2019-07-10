var width = 500,
    height = 300

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var force = d3.layout.force()
    .gravity(.05)
    .distance(100)
    .charge(-100)
    .size([width, height]);

var json = {
  "Nodes": [
    {
      "Id": "338",
      "Name": "TEST NODE ONE",
      "Url": "http://www.google.com"
    },
    {
      "Id": "340",
      "Name": "TEST NODE TWO",
      "Url": "http://www.yahoo.com"
    },
    {
      "Id": "341",
      "Name": "TEST NODE THREE",
      "Url": "http://www.stackoverflow.com"
    },
    {
      "Id": "342",
      "Name": "TEST NODE FOUR",
      "Url": "http://www.reddit.com"
    }
  ],
  "Links": [
    {
      "Source": "338",
      "Target": "338",
      "Value": "0"
    },
    {
      "Source": "338",
      "Target": "340",
      "Value": "0"
    },
    {
      "Source": "340",
      "Target": "341",
      "Value": "0"
    },
    {
      "Source": "342",
      "Target": "341",
      "Value": "0"
    }
  ]
};

// d3.json("/test_example.json", function(error, json) {
  var edges = [];
    json.Links.forEach(function(e) { 
    var sourceNode = json.Nodes.filter(function(n) { return n.Id === e.Source; })[0],
    targetNode = json.Nodes.filter(function(n) { return n.Id === e.Target; })[0];
    	
    edges.push({source: sourceNode, target: targetNode, value: e.Value});
    });
    
  force
      .nodes(json.Nodes)
      .links(edges)
      .start();

  var link = svg.selectAll(".link")
      .data(edges)
    .enter().append("line")
      .attr("class", "link");

  var node = svg.selectAll(".node")
      .data(json.Nodes)
    .enter().append("g")
      .attr("class", "node")
      .call(force.drag);

  node.append("circle")
      .attr("class", "node")
      .attr("r", 5);

  node.append("svg:a")
      .attr("xlink:href", function(d){return d.Url;})
      .append("text")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .text(function(d) { return d.Name})

  
  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  });
// });