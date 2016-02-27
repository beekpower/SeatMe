angular.module('directives', [])
.directive('cola', function() {
  return {
    restrict: 'E',
    scope: {
      people: '=',
      relationships: '=',
      relationshipCodes: '='
    },
    link: function(scope, elem, attrs) {
      var nodes = [];
      var links = [];

      function getPersonIndex(name) {
        for (var i=0; i < scope.people.length; i++) {
          if (name == scope.people[i]) {
            return i;
          }
        }
      }

      function loadNodes() {
        for (var i=0; i < scope.people.length; i++) {
          nodes.push({ name: scope.people[i], width: 120, height: 40});
        }
      }

      function loadLinks() {
        for (var i=0; i < scope.relationships.length; i++) {
          links.push({ source: getPersonIndex(scope.relationships[i].source), target: getPersonIndex(scope.relationships[i].target), relation: scope.relationships[i].relation });
        }
      }

      var width = 960, height = 500;
      var color = d3.scale.category20();
      var d3cola = cola.d3adaptor()
          .nodes(nodes)
          .links(links)
          .linkDistance(150)
          .avoidOverlaps(true)
          .on("tick", tick)
          .size([width, height]);

      var svg = d3.select("cola").append("svg")
          .attr("width", width)
          .attr("height", height);

      $(elem).find("svg").css("width", "100%")

      var node = svg.selectAll(".node");


      var link = {};
      for (var relationCode in scope.relationshipCodes) {
        link[relationCode] = svg.selectAll(".link");
      }

      var label = svg.selectAll(".label")

      function start() {
        links = d3cola.links();

        var linkData = {};
        for (var relationCode in scope.relationshipCodes) {
          linkData[relationCode] = [];
        }

        for (var i = 0; i < links.length; i++) {
          linkData[links[i].relation].push(links[i]);
        }

        for (var relationCode in scope.relationshipCodes) {
          link[relationCode] = link[relationCode].data(linkData[relationCode]);
          link[relationCode].enter().append("line")
                      .attr("class", "link")
                      .style("stroke", scope.relationshipCodes[relationCode].color);
          link[relationCode].exit().remove();
        }

        node = node.data(d3cola.nodes());

        node.enter().append("rect")
            .attr("class", "node")
            .attr("width", function (d) { return d.width; })
            .attr("height", function (d) { return d.height; })
            .attr("rx", 5).attr("ry", 5)
            .style("fill", function (d) { return color(1); })
            .call(d3cola.drag);

        node.exit().remove();

        label = label.data(d3cola.nodes());

        label.enter().append("text")
                     .attr("class", "label")
                     .text(function (d) { return d.name; })
                     .call(d3cola.drag);


        label.exit().remove();

        node.append("title")
            .text(function (d) { return d.name; });

        d3cola.start();
      }

      function tick() {

        for (var relationCode in scope.relationshipCodes) {
          link[relationCode].attr("x1", function (d) { return d.source.x; })
                            .attr("y1", function (d) { return d.source.y; })
                            .attr("x2", function (d) { return d.target.x; })
                            .attr("y2", function (d) { return d.target.y; });
        }

        node.attr("x", function (d) { return d.x - d.width / 2; })
            .attr("y", function (d) { return d.y - d.height / 2; });
        label.attr("x", function (d) { return d.x; })
             .attr("y", function (d) {
                 var h = this.getBBox().height;
                 return d.y + h/4;
             });
      }


      loadNodes();
      loadLinks();
      start();

      scope.$watch('people.length + relationships.length', function() {
        links.splice(0, links.length);
        nodes.splice(0, nodes.length);
        start();
        loadNodes();
        loadLinks();
        start();
      });
    }
  };
});
