'use strict';

/**
 * Permits declarative (and dynamic) definitions of tab links with full routes.
 *
 * requires 'ui.router' and 'ui.bootstrap'
 * (uses tabset and tab directives in ui.bootstrap and route changes in ui.router)
 *
 * You can define (for styling) the attributes type="pills" and vertical="true | false" and justified="true | false"
 *
 * Watches the $stateChangeXX events so it can update the parent tab(s) when using $state.go or ui-sref anchors.
 *
 * See ui-router-tabs.spec.js for tests.
 *
 */

/* Common.js package manager support (e.g. ComponentJS, WebPack) */
//if (typeof module !== 'undefined' && typeof exports !== 'undefined' && module.exports === exports) {
//  module.exports = 'ui.router.tabs';
//}

angular.module('ui.router.tabs', []);
angular.module('ui.router.tabs').directive(
  'tabsOuter', ['$rootScope', '$state', function($rootScope, $state) {

    return {
      restrict: 'E',
      scope: {
        tabsOuterData: '=data',
        tabsOuterRouteConfig: '=route',
      },
      link: function(scope) {
      }
      controller: ['$scope','$stateProvider', function($scope,$stateProvider) {
         }],
      templateUrl: function(element, attributes) {
        return attributes.templateUrl || 'ui-router-tabsOuter-default-template.html';
      }
    };
}]
).run(
['$templateCache', function($templateCache) {
    var DEFAULT_TEMPLATE = '<div> ' +
       '<tabset class="panel panel-default ng-scope" type="{{type}}"  role="tablist" vertical="{{vertical}}" ' +
      'justified="{{justified}}">' + 
         '<div class="panel-heading"> <h3 class="panel-title">{{tabset.heading}}</h3> </div>'+
        '<tab role="tab" class="tab" id="tab_{{tab.heading}}" aria-controls="panel_{{tab.heading}}" ng-repeat="tab in tabset.tabs" heading="{{tab.heading}}" ' +
      'active="tab.active" disable="tab.disable" ng-click="go(tab)" aria-selected="{{tab.active}}" tabindex="0">' +
      '</tab></tabset></div>';
    

    $templateCache.put('ui-router-tabsOuter-default-template.html', DEFAULT_TEMPLATE);
}]
);
angular.module('ui.router.tabs').directive(
  'tabs', ['$rootScope', '$state', function($rootScope, $state) {

    return {
      restrict: 'E',
      scope: {
        tabset: '=data',
        type: '@',
        justified: '@',
        vertical: '@'
      },
      link: function(scope) {

        var updateTabs = function() {
          scope.update_tabs();
        };

        var unbindStateChangeSuccess = $rootScope.$on('$stateChangeSuccess', updateTabs);
        var unbindStateChangeError = $rootScope.$on('$stateChangeError', updateTabs);
        var unbindStateChangeCancel = $rootScope.$on('$stateChangeCancel', updateTabs);
        var unbindStateNotFound = $rootScope.$on('$stateNotFound', updateTabs);

        scope.$on('$destroy', unbindStateChangeSuccess);
        scope.$on('$destroy', unbindStateChangeError);
        scope.$on('$destroy', unbindStateChangeCancel);
        scope.$on('$destroy', unbindStateNotFound);
      },
      controller: ['$scope', function($scope) {

        if (!$scope.tabset) {
          throw new Error('UI Router Tabs: \'data\' attribute not defined, please check documentation for how to use this directive.');
        }

        if (!angular.isArray($scope.tabset.tabs)) {
          throw new Error('UI Router Tabs: \'data\' attribute must be an array of tab data with at least one tab defined.');
        }

        var currentStateEqualTo = function(tab) {

          var isEqual = $state.is(tab.route, tab.params, tab.options);
          return isEqual;
        };

        $scope.go = function(tab) {

          if (!currentStateEqualTo(tab) && !tab.disable) {
            $state.go(tab.route, tab.params, tab.options);
          }
        };

        /* whether to highlight given route as part of the current state */
        $scope.active = function(tab) {

          var isAncestorOfCurrentRoute = $state.includes(tab.route, tab.params, tab.options);
          return isAncestorOfCurrentRoute;
        };

        $scope.update_tabs = function() {

          // sets which tab is active (used for highlighting)
          angular.forEach($scope.tabset.tabs, function(tab) {
            tab.params = tab.params || {};
            tab.options = tab.options || {};
            tab.active = $scope.active(tab);
          });
        };

        $scope.update_tabs();
    }],
      templateUrl: function(element, attributes) {
        return attributes.templateUrl || 'ui-router-tabs-default-template.html';
      }
    };
}]
).run(
['$templateCache', function($templateCache) {
    var DEFAULT_TEMPLATE = '<div> ' +
       '<tabset class="panel panel-default ng-scope" type="{{type}}"  role="tablist" vertical="{{vertical}}" ' +
      'justified="{{justified}}">' + 
         '<div class="panel-heading"> <h3 class="panel-title">{{tabset.heading}}</h3> </div>'+
        '<tab role="tab" class="tab" id="tab_{{tab.heading}}" aria-controls="panel_{{tab.heading}}" ng-repeat="tab in tabset.tabs" heading="{{tab.heading}}" ' +
      'active="tab.active" disable="tab.disable" ng-click="go(tab)" aria-selected="{{tab.active}}" tabindex="0">' +
      '</tab></tabset></div>';
    

    $templateCache.put('ui-router-tabs-default-template.html', DEFAULT_TEMPLATE);
}]
);
