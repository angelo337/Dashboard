// Generated by CoffeeScript 1.7.1
(function() {
  define(['d3', 'angular', 'jquery'], function(d3, angular, $) {
    return function($settings) {
      var ChartController;
      ChartController = function($scope, DataService, StateManagementService, $settings) {

        /* STARTUP CODE */
        var data, domain, frame, g, id, isActive, margin, measure, padding, panel, position, renderAxis, renderPanel, scale, selectItem, svg, tooltip, _points, _translate;
        id = $settings.id;
        margin = {
          left: 40,
          right: 0,
          top: 10,
          bottom: 50
        };
        padding = {
          left: 0,
          bottom: 0,
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
        measure = '';
        svg = d3.select("#" + id).append('svg').attr('width', '100%').attr('height', '20%');
        frame = angular.element("#" + id);
        scale = {};
        scale['x'] = d3.scale.ordinal();
        scale['y'] = d3.scale.linear();
        g = {};
        g['x'] = svg.append('g').attr('transform', _translate(margin.left + padding.left, frame.height() - margin.bottom)).attr('class', 'axis');
        g['y'] = svg.append('g').attr('transform', _translate(margin.left, margin.top)).attr('class', 'axis');
        panel = svg.append('g').attr('transform', _translate(margin.left + padding.left, margin.top));
        isActive = 0;
        selectItem = function(i) {
          isActive = i;
          return renderPanel(measure, 'item', true);
        };
        tooltip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);
        renderPanel = function(value, category, redraw) {
          var category_baseline, category_extrusion, duration, value_baseline, value_extrusion;
          if ((redraw != null) && redraw) {
            panel.selectAll('.bars').data([]).exit().remove();
            duration = 0;
          } else {
            duration = 1000;
          }
          value_baseline = 'y';
          value_extrusion = 'height';
          category_baseline = 'x';
          category_extrusion = 'width';
          panel.selectAll('.bars').data(data, function(d) {
            return d[category];
          }).select('polygon').transition().duration(duration).attr('points', function(d) {
            return _points(scale[category_baseline](d[category]), Math.min(scale[value_baseline].range()[1], scale[value_baseline](0)), Math.min(scale[category_baseline].rangeBand(), 32), scale[value_baseline](d[value]) - scale[value_baseline](0));
          });
          panel.selectAll('.bars').data(data, function(d) {
            return d[category];
          }).enter().append('a').attr('xlink:href', function(d) {
            return '#/questionByItem/' + d[category];
          }).attr('class', 'bars').append('polygon').on("mouseover", function(d) {
            tooltip.transition().duration(200).style("opacity", 0.9);
            tooltip.html(d[category]).style("left", (d3.event.pageX - 28) + "px").style("top", (d3.event.pageY - 28) + "px");
          }).on("mousemove", function(d) {
            return tooltip.style("left", (d3.event.pageX - 28) + "px").style("top", (d3.event.pageY - 28) + "px");
          }).on("mouseout", function(d) {
            tooltip.transition().duration(500).style("opacity", 0);
          }).attr('points', function(d) {
            return _points(scale[category_baseline](d[category]), Math.min(scale[value_baseline].range()[1], scale[value_baseline](0)), Math.min(scale[category_baseline].rangeBand(), 32), 0);
          }).transition().duration(duration).ease('cubic-in-out').attr('class', function(d, i) {
            if (isActive === i) {
              return 'isActive';
            } else {
              return '';
            }
          }).attr('points', function(d) {
            return _points(scale[category_baseline](d[category]), Math.min(scale[value_baseline].range()[1], scale[value_baseline](0)), Math.min(scale[category_baseline].rangeBand(), 32), scale[value_baseline](d[value]) - scale[value_baseline](0));
          });
          return panel.selectAll('.bars').data(data, function(d) {
            return d[category];
          }).exit().remove();
        };
        renderAxis = function(duration) {
          var y_axis;
          if (duration == null) {
            duration = 0;
          }
          y_axis = d3.svg.axis().scale(scale['y']).orient('left').ticks(3);
          return g['y'].transition().duration(duration).call(y_axis);
        };
        position = null;

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
            renderPanel(measure, 'item');
            renderAxis(1000);
          }
        }), true);
        $scope.$watch((function() {
          return StateManagementService.state.item;
        }), (function(current, last) {
          var i, item, _i, _len, _ref;
          if (!position) {
            position = {};
            i = 0;
            _ref = DataService.dataPoint['items_distinct'];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              item = _ref[_i];
              position[item.key] = i;
              i += 1;
            }
          }
          selectItem(position[current]);
          renderPanel(measure, 'item', true);
        }), true);
        $scope.$watch((function() {
          return frame.height();
        }), (function(current, last) {
          if (data.length > 0) {
            scale['y'].range([0, current - margin.top - margin.bottom - padding.bottom]);
            g['x'].attr('transform', _translate(margin.left + padding.left, current - margin.bottom));
            renderAxis();
            renderPanel(measure, 'item', true);
          }
        }), true);
        $scope.$watch((function() {
          return frame.width();
        }), (function(current, last) {
          if (data.length > 0) {
            scale['x'].rangeRoundBands([0, Math.min(frame.width() - margin.left - margin.right - padding.left, domain.length * 60)], 0, 0.5);
            renderAxis();
            renderPanel(measure, 'item', true);
          }
        }), true);
        $scope.$watch((function() {
          return DataService.dataPoint['questionByItem'];
        }), (function(current, last) {
          data = current;
          domain = [];
          angular.forEach(DataService.dataPoint['items_distinct'], function(d) {
            if (d.value > 0) {
              return domain.push(d.key);
            }
          });
          scale['y'].range([0, frame.height() - margin.top - margin.bottom - padding.bottom]);
          scale['x'].domain(domain).rangeRoundBands([0, Math.min(frame.width() - margin.left - margin.right - padding.left, domain.length * 60)], 0, 0.5);
          renderAxis(1000);
          renderPanel(measure, 'item');
        }), true);
      };
      return ['$scope', 'DataService', 'StateManagementService', $settings, ChartController];
    };
  });

}).call(this);

//# sourceMappingURL=QuestionByItemController.map
