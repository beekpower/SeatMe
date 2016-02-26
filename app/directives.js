angular.module('directives', [])
.directive('cola', function() {
  return {
    restrict: 'E',
    scope: {
      people: '=',
      relationships: '='
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
          .linkDistance(120)
          .avoidOverlaps(true)
          .on("tick", tick)
          .size([width, height]);

      var svg = d3.select("cola").append("svg")
          .attr("width", width)
          .attr("height", height);

      $(elem).find("svg").css("width", "100%")

      var node = svg.selectAll(".node");
      var link = svg.selectAll(".link");
      var link2 = svg.selectAll(".link2");
      var label = svg.selectAll(".label")

      function start() {
        links = d3cola.links();

        linkData = [];
        link2Data = [];

        for (var i = 0; i < links.length; i++) {
          if (links[i].relation == 2) {
            linkData.push(links[i]);
          } else {
            link2Data.push(links[i]);
          }
        }



        link = link.data(linkData);

        link.enter().append("line")
                    .attr("class", "link");

        link.exit().remove();


        link2 = link2.data(link2Data);

        link2.enter().append("line")
                    .attr("class", "link2");

        link2.exit().remove();

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

        link.attr("x1", function (d) { return d.source.x; })
            .attr("y1", function (d) { return d.source.y; })
            .attr("x2", function (d) { return d.target.x; })
            .attr("y2", function (d) { return d.target.y; });

            link2.attr("x1", function (d) { return d.source.x; })
                .attr("y1", function (d) { return d.source.y; })
                .attr("x2", function (d) { return d.target.x; })
                .attr("y2", function (d) { return d.target.y; });
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
        loadNodes();
        loadLinks();
        start();
      });
    }
  };
});
