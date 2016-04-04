'use strict';

var ExampleCtrl = ['$rootScope', '$state', '$scope', '$stateParams', function($rootScope, $state, $scope) {
    console.log("initialiseFlag",$state.current.data.initialiseFlag);
     $state.current.data.initialiseFlag = $state.current.data.initialiseFlag || false;
//    $scope.initialiseFlag = $scope.initialiseFlag || false;
    
//    if ($scope.initialiseFlag ){
//     
//        console.log("I am true, Yeah!");
//    }
//    if ($scope.$parent && $scope.$parent.$parent && $scope.$parent.$parent.initialiseFlag){
//        $scope.initialiseFlag = $scope.$parent.$parent.initialiseFlag;
//        console.log("Print parent", $scope.$parent.$parent.initialiseFlag);
//    }
    

    

  $scope.initialise = function() {
      
//      $scope.initialiseFlag = true;
      
      $state.current.data.initialiseFlag = true;


    $scope.go = function(state) {
      $state.go(state);
    };

    //this below data also can come dynamically from backend service.  
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
      
      
   //get the data before we call this below state.go
     
 
//      CASService.fetchPersonelInfo().get().$promise.then(function(data){
//        $scope.propertyModel  = data;
//            $state.go('accounts.personalInfo');
//      });
//   
      
       $state.go('accounts.personalInfo');
      
    
  };
    
//    if (!$scope.initialiseFlag){
        if (!$state.current.data.initialiseFlag){
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
