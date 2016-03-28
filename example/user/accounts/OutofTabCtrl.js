'use strict';

var OutofTabCtrl = ['$rootScope', '$scope', '$state', function($rootScope, $scope, $state) {
    $scope.go = function(state) {
      $state.go(state);
    };
 
}];

angular.module('example').controller('OutofTabCtrl', OutofTabCtrl);