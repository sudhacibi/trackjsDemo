'use strict';

var SecurityCtrl = ['$rootScope', '$scope', '$stateParams', function($rootScope, $scope) {

  $scope.initialise = function() {
      

      console.log("editLabel empty",$scope.editLabel);
      

   $scope.editLabel=  $scope.editLabel || 'test edit label';
  };

  $scope.initialise();
}];

angular.module('example').controller('SecurityCtrl', SecurityCtrl);
