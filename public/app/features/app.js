// Generated by CoffeeScript 1.7.1
(function() {
  define(['angular', 'services/StorageService', 'services/StateManagementService', 'services/DataService', 'controllers/TabController', 'controllers/TabController', 'controllers/TabController', 'controllers/TableController', 'controllers/QuestionsController', 'controllers/QuestionByItemController', 'controllers/QuestionOverTimeController', 'controllers/StateTextController', 'angular-ui-router', 'angular-ng-grid'], function(angular, StorageService, StateManagementService, DataService, SelectionController, ModuleController, MeasureController, ItemTableController, QuestionsController, QuestionByItemController, QuestionOverTimeController, StateTextController) {
    var app;
    app = angular.module('Dashboard', ['ui.router', 'ngGrid']);
    app.constant('DataSettings', {
      hello: "world"
    }).constant('Dummy', {
      hello: "world"
    }).constant('SelectionSettings', {
      id: 'selections',
      ui: {
        nav_type: 'nav-tabs'
      }
    }).constant('ModuleSettings', {
      id: 'modules',
      ui: {
        nav_type: 'nav-tabs'
      }
    }).constant('MeasureSettings', {
      id: 'measures',
      ui: {
        nav_type: 'nav-pills'
      }
    }).constant('ItemTableSettings', {
      id: 'items'
    }).constant('QuestionsSettings', {
      id: 'questions'
    }).constant('QuestionByItemSettings', {
      id: 'questionByItem'
    }).constant('QuestionOverTimeSettings', {
      id: 'questionOverTime'
    });
    app.factory('DataService', DataService('DataSettings')).factory('StateManagementService', StateManagementService('Dummy')).factory('StorageService', StorageService('StateSettings'));
    app.controller('SelectionController', SelectionController('SelectionSettings')).controller('ModuleController', ModuleController('ModuleSettings')).controller('MeasureController', MeasureController('MeasureSettings')).controller('ItemTableController', ItemTableController('ItemTableSettings')).controller('Dummy', ['StateManagementService', function(StateManagementService) {}]).controller('QuestionsController', QuestionsController('QuestionsSettings')).controller('QuestionByItemController', QuestionByItemController('QuestionByItemSettings')).controller('QuestionOverTimeController', QuestionOverTimeController('QuestionOverTimeSettings')).controller('StateTextController', StateTextController());
    app.config([
      '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('base', {
          url: '/{view}/{selection}',
          views: {
            'selection': {
              templateUrl: 'views/TabView.html',
              controller: 'SelectionController'
            },
            'itemTable': {
              templateUrl: 'views/TableView.html',
              controller: 'ItemTableController'
            },
            'module': {
              templateUrl: 'views/TabView.html',
              controller: 'ModuleController'
            },
            'state': {
              templateUrl: 'views/StateView.html',
              controller: 'StateTextController'
            },
            'questions': {
              templateUrl: 'views/ChartView.html',
              controller: 'QuestionsController'
            },
            'measure': {
              templateUrl: 'views/TabView.html',
              controller: 'MeasureController'
            },
            'questionByItem': {
              templateUrl: 'views/ChartView.html',
              controller: 'QuestionByItemController'
            },
            'questionOverTime': {
              templateUrl: 'views/ChartView.html',
              controller: 'QuestionOverTimeController'
            }
          },
          reloadOnSearch: false
        });
      }
    ]);
    return app;
  });

}).call(this);

//# sourceMappingURL=app.map
