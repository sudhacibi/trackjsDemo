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

var tabmodule = angular.module('ui.router.tabs', ['ui.router',
  'ui.bootstrap', 'ngAria'
]);

//To configure dynamic route
tabmodule.provider('uiTabsConfig',['$stateProvider', function($stateProvider) {

    this.setRoutes = function (tabRoutes) {
             for (var i = 0; i < tabRoutes.length; i++) {
            $stateProvider.state(tabRoutes[i].stateName, {
                        url: tabRoutes[i].url,
                        templateUrl: tabRoutes[i].templateUrl,
                        controller: tabRoutes[i].controller,
                        abstract: tabRoutes[i].abstract,
                        parent: tabRoutes[i].parent,
                        data: tabRoutes[i].data,
                        onExit: tabRoutes[i].onExit
            });
        } 
    };
    
     this.$get = function () {
      return this;
    };

  }]);

 tabmodule.directive(
  'tabs', ['$rootScope', '$state', function($rootScope, $state) {

    return {
      restrict: 'E',
         require: "^tabsouter",
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
    
    var OVERRIDE_UITAB_TEMPLATE =  '<li ng-class="{active: active, disabled: disabled}">' +
     '<a href ng-click="select()" tabindex="-1" tab-heading-transclude>{{heading}}</a>' +
    '</li>' ;
    
    
    var DEFAULT_TEMPLATE = '<div class="panel panel-default ng-scope" > ' +
        '<div class="panel-heading"> <h3 class="panel-title">{{tabset.heading}}</h3> </div>'+
       '<tabset type="{{type}}"  role="tablist" vertical="{{vertical}}" ' +
      'justified="{{justified}}">' + 
//         '<div class="panel-heading"> <h3 class="panel-title">{{tabset.heading}}</h3> </div>'+
        '<tab role="tab" class="tab" id="tab_{{tab.heading}}" aria-controls="panel_{{tab.heading}}" ng-repeat="tab in tabset.tabs" heading="{{tab.heading}}" ' +
      'active="tab.active" disable="tab.disable" ng-click="go(tab)" aria-selected="{{tab.active}}" template-url="ui-tabs-override-template.html" tabindex="0">' +
      '</tab></tabset></div>';
    

    $templateCache.put('ui-router-tabs-default-template.html', DEFAULT_TEMPLATE);
     $templateCache.put('ui-tabs-override-template.html',OVERRIDE_UITAB_TEMPLATE);
}]
);

 tabmodule.directive(
  'tabsouter', ['$rootScope', '$state', function($rootScope, $state) {
    return {
      restrict: 'E',
      transclude: true,
      scope: true,
      controller: ['$scope', function($scope) {
//        console.log("outter Controller");
//        $scope.allStates = $state.get();
//        console.log("all states", $scope.allStates);
         }],
      templateUrl: function(element, attributes) {
        return attributes.templateUrl || 'ui-router-tabsOuter-default-template.html';
      }
    };
}]
).run(
['$templateCache', function($templateCache) {
    var DEFAULT_TEMPLATE = '<div class="row">' +
  '<div class="col-xs-18 col-md-4">' +
        '<ng-transclude></ng-transclude>'+
//    '<tabs data="tabset" type="type" vertical="vertical"></tabs>' +
  '</div>' +
  '<div class="col-xs-18 col-md-8">' +
    '<ui-view autoscroll></ui-view>' +
  '</div>' +
'</div>';
    

    $templateCache.put('ui-router-tabsOuter-default-template.html', DEFAULT_TEMPLATE);
}]
);

tabmodule.config(['$provide',Decorate]);

//This decorator is only for override the ui bootstrap tab directive. The ng-click() anchor tag is marked with tabindex=-1.
//So that when you tab through the tabs it only tabs once. 
function Decorate($provide) {
  $provide.decorator('tabDirective',['$delegate', function($delegate) {
    var directive = $delegate[0];

    directive.templateUrl = "ui-tabs-override-template.html";
    
   return $delegate;
  }]);
}

//'use strict';

var app = angular.module('example', [
  'ui.router',
  'ui.bootstrap',
//    'ui.bootstrap.tpls',
  'ui.router.tabs',
    'ngAria'
]);

app.config(['$stateProvider','$urlRouterProvider','$provide', function($stateProvider, $urlRouterProvider,$provide) {
    
       // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/outoftab");
    
        // Now set up the states
        $stateProvider
            .state("outoftabs", {
                    url:         '/outoftab',
                    controller: 'OutofTabCtrl',
                    templateUrl: 'outoftabs.html'
            })
        ;
    
//  $stateProvider.state('accounts', {
//    abstract: true,//scope inheritance by view hierarchy only.
//    url:         '',
//    controller: 'ExampleCtrl',
//    templateUrl: 'example.html'
//  }).state('accounts.personalInfo', {
//    url:         '/accounts/personalInfo',
//       controller: 'ExampleCtrl', //sharing the same controller as the parent.
//    templateUrl: 'user/personalInfo.html'
//  }).state('accounts.addressInfo', {
//    url:         '/accounts/addressInfo',
//     controller: 'ExampleCtrl', //sharing the same controller as the parent.
//    templateUrl: 'user/accounts/addressInfo.html'
//  }).state('accounts.securityQuestions', {
//    url:         '/accounts/securityQuestions',
//    controller: 'SecurityCtrl',
//    templateUrl: 'user/accounts/securityQuestions.html'
//  }).state('outoftabs',{
//    url:         '/outoftab',
//       controller: 'OutofTabCtrl',
//    templateUrl: 'outoftabs.html'
//  });
    
}]);

 app.config(['uiTabsConfigProvider',function (uiTabsConfigProvider) {
     
    //configure the route from the application 
    var tabRoutes = [];
    tabRoutes[0] = {stateName: 'accounts',url: '/accounts', templateUrl:'example.html',controller: 'ExampleCtrl',abstract: true};
    tabRoutes[1] = {stateName: 'accounts.personalInfo',url: '/accounts/personalInfo', templateUrl:'user/personalInfo.html',controller: 'ExampleCtrl', parent: 'accounts'};
    tabRoutes[2] = {stateName: 'accounts.addressInfo',url: '/accounts/addressInfo',templateUrl:'user/accounts/addressInfo.html',controller: 'ExampleCtrl',parent: 'accounts'};
    tabRoutes[3] = {stateName: 'accounts.securityQuestions',url: '/accounts/securityQuestions',templateUrl:'user/accounts/securityQuestions.html',controller:'SecurityCtrl'};
     
     
    uiTabsConfigProvider.setRoutes(tabRoutes);
  }]);

(
  function () {
    angular.module('example')
      .controller('ExampleCtrl', ExampleCtrl);
      
      ExampleCtrl.$inject = ['$rootScope', '$state', '$scope', '$stateParams'];

 function ExampleCtrl($rootScope, $state, $scope) {
 'use strict';
    $scope.initialiseFlag = $scope.initialiseFlag || false;
    
    if ($scope.initialiseFlag ){
     
        console.log("I am true, Yeah!");
    }
    

  $scope.initialise = function() {
      
      $scope.initialiseFlag = true;
      
    $scope.go = function(state) {
      $state.go(state);
    };

    //this below data also can come dynamically from backend service.  
     $scope.tabData    = {
        heading: 'AccountSettings',
        tabs: [
      {
        heading: 'Personal',
        route:   'accounts.personalInfo'
      },
      {
        heading: 'Address',
        route:   'accounts.addressInfo'
      },
      {
        heading: 'SecurityQuestions',
        route:   'accounts.securityQuestions'
      } 
    ]};
      
      
   //get the data before we call this below state.go
     
 
//      CASService.fetchPersonelInfo().get().$promise.then(function(data){
//        $scope.propertyModel  = data;
//            $state.go('accounts.personalInfo');
//      });
//   
      $scope.propertyModel = {nameLabel: 'nameLabel',address: { addressLabel: 'Address1'}};
       $state.go('accounts.personalInfo');
      
    
  };
    
 if (!$scope.initialiseFlag){
//        if (!$state.current.data.initialiseFlag){
        console.log("initialise only once");
        $scope.initialise();
                }
     
     
    
   // $scope.tabData =  $state.current.data.tabData;
    
      //labels
     // $scope.propertyModel = $scope.propertyModel || {nameLabel: 'nameLabel',address: { addressLabel: 'Address1'}};
    
    /* jshint ignore:start */

}
  }()
);


//angular.module('example').controller('ExampleCtrl', ExampleCtrl);

'use strict';

var mainCtrl = ['$rootScope', '$state', '$scope', '$stateParams', function($rootScope, $state, $scope) {
    
    $scope.tabData   = {
        heading: 'AccountSettings',
        tabs: [
      {
        heading: 'Personal',
        route:   'accounts.personalInfo'
      },
      {
        heading: 'Address',
        route:   'accounts.addressInfo'
      },
      {
        heading: 'SecurityQuestions',
        route:   'accounts.securityQuestions'
      } 
    ]};
      
//      $scope.tabRoute = [];
//      $scope.tabRoute[0] = {stateName: 'accounts',url: '', templateUrl:'example.html',controller: 'ExampleCtrl'};
//      $scope.tabRoute[1] = {stateName: 'accounts.personalInfo',url: '/accounts/personalInfo', templateUrl:'user/personalInfo.html',controller: 'ExampleCtrl'};
//      $scope.tabRoute[2] = {stateName: 'accounts.addressInfo',url: '/accounts/addressInfo',templateUrl:'user/accounts/addressInfo.html',controller: 'ExampleCtrl'};
//      $scope.tabRoute[3] = {stateName: 'accounts.securityQuestions',url: '/accounts/securityQuestions',templateUrl:'user/accounts/securityQuestions.html',controller:'SecurityCtrl'};
          
     
}];

angular.module('example').controller('mainCtrl', mainCtrl);



'use strict';

var OutofTabCtrl = ['$rootScope', '$scope', '$state', function($rootScope, $scope, $state) {
    $scope.go = function(state) {
                // Then, just add any key/value string combination that you want to track!
        
//        trackJs.addMetadata("user id", "appUserId");
//        trackJs.addMetadata("host ip", "127.0.0.1");
//        trackJs.addMetadata("customerType", "guest");
//
//        // Or, if you don't know the user at page load
//        // You can specify it at any other time with
//        trackJs.configure({ userId: "SUd123"});
//
//        test();
//
//        function test(){
//            throw new error("For test throwing an error");
//        } 
    
        $state.go(state);
    };
    
    $scope.test = function(){
        
                trackJs.addMetadata("user id", "appUserId");
        trackJs.addMetadata("host ip", "127.0.0.1");
        trackJs.addMetadata("customerType", "guest");

        // Or, if you don't know the user at page load
        // You can specify it at any other time with
        trackJs.configure({ userId: "SUd123"});
        throw new error("For test throwing an error");
    };
 
}];

angular.module('example').controller('OutofTabCtrl', OutofTabCtrl);
'use strict';

var SecurityCtrl = ['$rootScope', '$scope', '$stateParams', function($rootScope, $scope) {

  $scope.initialise = function() {
      

      console.log("editLabel empty",$scope.editLabel);
      

   $scope.editLabel=  $scope.editLabel || 'test edit label';
  };

  $scope.initialise();
}];

angular.module('example').controller('SecurityCtrl', SecurityCtrl);
