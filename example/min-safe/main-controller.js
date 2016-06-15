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


