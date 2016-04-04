//'use strict';

var app = angular.module('example', [
  'ui.router',
  'ui.bootstrap',
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
     

//     tabRoute[0] = {stateName: 'accounts',url: '/accounts', templateUrl:'example.html',controller: 'ExampleCtrl',abstract: true,data:{
//         initialiseFlag :  false,
//         propertyModel:  undefined,
//        tabData: undefined 
//      },onExit:['$state',function($state){ 
//          console.log('printdata',$state.current); 
//          $state.current.data.initialiseFlag = false;
//      
//      }]
//      };
     
    //configure the route from the application 
    var tabRoute = [];
    tabRoute[0] = {stateName: 'accounts',url: '/accounts', templateUrl:'example.html',controller: 'ExampleCtrl',abstract: true};
    tabRoute[1] = {stateName: 'accounts.personalInfo',url: '/accounts/personalInfo', templateUrl:'user/personalInfo.html',controller: 'ExampleCtrl', parent: 'accounts'};
    tabRoute[2] = {stateName: 'accounts.addressInfo',url: '/accounts/addressInfo',templateUrl:'user/accounts/addressInfo.html',controller: 'ExampleCtrl',parent: 'accounts'};
    tabRoute[3] = {stateName: 'accounts.securityQuestions',url: '/accounts/securityQuestions',templateUrl:'user/accounts/securityQuestions.html',controller:'SecurityCtrl'};
     
     
    uiTabsConfigProvider.setRoute(tabRoute);
  }]);
