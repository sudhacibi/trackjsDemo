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
    
     
    
}
  }()
);


//angular.module('example').controller('ExampleCtrl', ExampleCtrl);
