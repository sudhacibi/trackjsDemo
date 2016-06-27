'use strict';

var OutofTabCtrl = ['$rootScope', '$scope', '$state','$window', function($rootScope, $scope, $state,$window) {
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
    
        $scope.test1 = function($window){
        
        function CustomError(message) {
                Error.captureStackTrace(this);
                this.message = message;
                this.name = "SomeCustomError";
            }
            CustomError.prototype = Object.create(Error.prototype);

            $window.CustomError = CustomError;
    };
 
}];

angular.module('example').controller('OutofTabCtrl', OutofTabCtrl);