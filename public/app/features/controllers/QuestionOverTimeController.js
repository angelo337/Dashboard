// Generated by CoffeeScript 1.7.1
(function() {
  define(['d3', 'angular', 'jquery'], function(d3, angular, $) {
    return function($settings) {
      var ChartController;
      ChartController = function($rootScope, $scope, DataService, StateManagementService, $settings) {

        /* STARTUP CODE */
        var data, domain, frame, g, id, line, margin, measure, padding, panel, renderAxis, renderPanel, scale, svg, _points, _translate;
        id = $settings.id;
        $scope.id = id;
        $rootScope[id] = {};
        margin = {
          left: 40,
          right: 15,
          top: 10,
          bottom: 50
        };
        padding = {
          left: 5,
          bottom: 5,
          top: 0,
          bottom: 0
        };
        _translate = function(x, y) {
          return 'translate(' + x + ',' + y + ')';
        };
        _points = function(x, y, w, h) {
          return [[x, y].join(','), [x + w, y].join(','), [x + w, y + h].join(','), [x, y + h].join(',')].join(' ');
        };
        data = [];
        domain = [];
        measure = 'average';
        svg = d3.select("#" + id).append('svg').attr('width', '100%').attr('height', '20%');
        frame = angular.element("#" + id);
        scale = {};
        scale['x'] = d3.time.scale().domain([new Date(2013, 4, 1), new Date(2014, 5, 1)]).range([0, frame.width() - margin.left - margin.right - padding.left]);
        scale['y'] = d3.scale.linear().domain([10, 0]).range([0, frame.height() - margin.top - margin.bottom - padding.bottom], 0.5, 0.25);
        g = {};
        g['x'] = svg.append('g').attr('transform', _translate(margin.left + padding.left, frame.height() - margin.bottom)).attr('class', 'axis vertical');
        g['y'] = svg.append('g').attr('transform', _translate(margin.left, margin.top)).attr('class', 'axis');
        panel = svg.append('g').attr('transform', _translate(margin.left + padding.left, margin.top));
        line = {};
        line['measure'] = d3.svg.line().interpolate("bundle");
        renderPanel = function(value, category, redraw) {
          var category_baseline, category_extrusion, duration, value_baseline, value_extrusion;
          if ((redraw != null) && redraw) {
            panel.selectAll('.lines').data([]).exit().remove();
            duration = 0;
          } else {
            duration = 1000;
          }
          value_baseline = 'y';
          value_extrusion = 'height';
          category_baseline = 'x';
          category_extrusion = 'width';
          line['measure'].x(function(d) {
            return scale[category_baseline](d[category]);
          }).y(function(d) {
            return scale[value_baseline](d[value]);
          });
          panel.selectAll('.lines').data(data).transition().duration(duration).attr('d', function(d) {
            return line['measure'](d);
          });
          panel.selectAll('.lines').data(data).enter().append('path').attr('class', 'lines').attr('stroke', 'black').attr('fill', 'none').attr('d', function(d) {
            return line['measure'](d);
          }).transition().duration(duration).ease('cubic-in-out');
          return panel.selectAll('.lines').data(data).exit().remove();
        };
        renderAxis = function(duration) {
          var x_axis, y_axis;
          if (duration == null) {
            duration = 0;
          }
          x_axis = d3.svg.axis().scale(scale['x']).orient('bottom').ticks(d3.time.months, 1).tickFormat(d3.time.format('%b'));
          g['x'].call(x_axis);
          svg.selectAll(".vertical text").attr('y', 18);
          y_axis = d3.svg.axis().scale(scale['y']).orient('left').ticks(3);
          return g['y'].transition().duration(duration).call(y_axis);
        };

        /* RUNTIME ACTIONS */
        $scope.$watch((function() {
          return StateManagementService.state.measure;
        }), (function(current, last) {
          if (current != null) {
            measure = current;
            switch (current) {
              case 'AVERAGE':
                scale['y'].domain([10, 0]);
                break;
              case 'TOP':
                scale['y'].domain([1, 0]);
                break;
              case 'NPS':
                scale['y'].domain([1, -0.5]);
            }
          }
          if (data.length > 0) {
            renderPanel(measure, 'date');
            renderAxis(1000);
          }
        }), true);
        $scope.$watch((function() {
          return frame.height();
        }), (function(current, last) {
          if (data.length > 0) {
            scale['y'].range([0, current - margin.top - margin.bottom - padding.bottom]);
            g['x'].attr('transform', _translate(margin.left + padding.left, current - margin.bottom));
            renderAxis();
            renderPanel(measure, 'date', true);
          }
        }), true);
        $scope.$watch((function() {
          return frame.width();
        }), (function(current, last) {
          if (data.length > 0) {
            scale['x'].range([0, frame.width() - margin.left - margin.right - padding.left]);
            renderAxis();
            renderPanel(measure, 'date', true);
          }
        }), true);
        $scope.$watch((function() {
          return DataService.dataPoint['question_history'];
        }), (function(current, last) {
          data = [current];

          /*
          domain = []
           */
          scale['y'].range([0, frame.height() - margin.top - margin.bottom - padding.bottom]);
          scale['x'].range([0, frame.width() - margin.left - margin.right - padding.left]);
          renderAxis(1000);
          renderPanel(measure, 'date');
        }), true);
      };
      return ['$rootScope', '$scope', 'DataService', 'StateManagementService', $settings, ChartController];
    };
  });


  /*
  .on("mouseover", (d) ->
      div.transition()
      .duration(200)
      .style("opacity", .9);
      div.html(d[category])
      return
  )
  .on("mousemove", (d) ->
      div .style("left", (d3.event.pageX) + "px")
      .style("top", (d3.event.pageY) + "px")
      return
  )
   */

}).call(this);

//# sourceMappingURL=QuestionOverTimeController.map
