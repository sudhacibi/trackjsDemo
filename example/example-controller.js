'use strict';

var ExampleCtrl = ['$rootScope', '$state', '$scope', '$stateParams', function($rootScope, $state, $scope) {
    
    $scope.initialiseFlag = $scope.initialiseFlag || false;

  $scope.initialise = function() {
      
      $scope.initialiseFlag = true;


    $scope.go = function(state) {
      $state.go(state);
    };

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
      
      $scope.tabRoute = [];
      $scope.tabRoute[0] = {stateName: 'accounts',url: '', templateUrl:'example.html',controller: 'ExampleCtrl'};
      $scope.tabRoute[1] = {stateName: 'accounts.personalInfo',url: '/accounts/personalInfo', templateUrl:'user/personalInfo.html',controller: 'ExampleCtrl'};
      $scope.tabRoute[2] = {stateName: 'accounts.addressInfo',url: '/accounts/addressInfo',templateUrl:'user/accounts/addressInfo.html',controller: 'ExampleCtrl'};
      $scope.tabRoute[2] = {stateName: 'accounts.securityQuestions',url: '/accounts/securityQuestions',templateUrl:'user/accounts/securityQuestions.html',controller:'SecurityCtrl'};
          
   
      
       $state.go('accounts.personalInfo');
      
    
  };
    
    if (!$scope.initialiseFlag){
        console.log("initialise only once");
        $scope.initialise();
    }
    
      //labels
      $scope.propertyModel = $scope.propertyModel || {nameLabel: 'nameLabel',address: { addressLabel: 'Address1'}};
    
}];

angular.module('example').controller('ExampleCtrl', ExampleCtrl);

//'use strict';
//
//var ExampleCtrl = ['$rootScope', '$state', '$scope', '$stateParams', function($rootScope, $state, $scope) {
//
//  $scope.initialise = function() {
//
//    $scope.go = function(state) {
//      $state.go(state);
//    };
//
//    $scope.tabData   = {
//        heading: 'AccountSettings',
//        tabs: [
//      {
//        heading: 'Personal',
//        route:   'accounts.personalInfo'
//      },
//      {
//        heading: 'Address',
//        route:   'accounts.addressInfo'
//      }
//    ]};
//  };
//
//  $scope.initialise();
//}];
//
//angular.module('example').controller('ExampleCtrl', ExampleCtrl);
