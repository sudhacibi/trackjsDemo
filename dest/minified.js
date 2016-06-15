"use strict";function Decorate(a){a.decorator("tabDirective",["$delegate",function(a){var b=a[0];return b.templateUrl="ui-tabs-override-template.html",a}])}var tabmodule=angular.module("ui.router.tabs",["ui.router","ui.bootstrap","ngAria"]);tabmodule.provider("uiTabsConfig",["$stateProvider",function(a){this.setRoutes=function(b){for(var c=0;c<b.length;c++)a.state(b[c].stateName,{url:b[c].url,templateUrl:b[c].templateUrl,controller:b[c].controller,"abstract":b[c]["abstract"],parent:b[c].parent,data:b[c].data,onExit:b[c].onExit})},this.$get=function(){return this}}]),tabmodule.directive("tabs",["$rootScope","$state",function(a,b){return{restrict:"E",require:"^tabsouter",scope:{tabset:"=data",type:"@",justified:"@",vertical:"@"},link:function(b){var c=function(){b.update_tabs()},d=a.$on("$stateChangeSuccess",c),e=a.$on("$stateChangeError",c),f=a.$on("$stateChangeCancel",c),g=a.$on("$stateNotFound",c);b.$on("$destroy",d),b.$on("$destroy",e),b.$on("$destroy",f),b.$on("$destroy",g)},controller:["$scope",function(a){if(!a.tabset)throw new Error("UI Router Tabs: 'data' attribute not defined, please check documentation for how to use this directive.");if(!angular.isArray(a.tabset.tabs))throw new Error("UI Router Tabs: 'data' attribute must be an array of tab data with at least one tab defined.");var c=function(a){var c=b.is(a.route,a.params,a.options);return c};a.go=function(a){c(a)||a.disable||b.go(a.route,a.params,a.options)},a.active=function(a){var c=b.includes(a.route,a.params,a.options);return c},a.update_tabs=function(){angular.forEach(a.tabset.tabs,function(b){b.params=b.params||{},b.options=b.options||{},b.active=a.active(b)})},a.update_tabs()}],templateUrl:function(a,b){return b.templateUrl||"ui-router-tabs-default-template.html"}}}]).run(["$templateCache",function(a){var b='<li ng-class="{active: active, disabled: disabled}"><a href ng-click="select()" tabindex="-1" tab-heading-transclude>{{heading}}</a></li>',c='<div class="panel panel-default ng-scope" > <div class="panel-heading"> <h3 class="panel-title">{{tabset.heading}}</h3> </div><tabset type="{{type}}"  role="tablist" vertical="{{vertical}}" justified="{{justified}}"><tab role="tab" class="tab" id="tab_{{tab.heading}}" aria-controls="panel_{{tab.heading}}" ng-repeat="tab in tabset.tabs" heading="{{tab.heading}}" active="tab.active" disable="tab.disable" ng-click="go(tab)" aria-selected="{{tab.active}}" template-url="ui-tabs-override-template.html" tabindex="0"></tab></tabset></div>';a.put("ui-router-tabs-default-template.html",c),a.put("ui-tabs-override-template.html",b)}]),tabmodule.directive("tabsouter",["$rootScope","$state",function(a,b){return{restrict:"E",transclude:!0,scope:!0,controller:["$scope",function(a){}],templateUrl:function(a,b){return b.templateUrl||"ui-router-tabsOuter-default-template.html"}}}]).run(["$templateCache",function(a){var b='<div class="row"><div class="col-xs-18 col-md-4"><ng-transclude></ng-transclude></div><div class="col-xs-18 col-md-8"><ui-view autoscroll></ui-view></div></div>';a.put("ui-router-tabsOuter-default-template.html",b)}]),tabmodule.config(["$provide",Decorate]);var app=angular.module("example",["ui.router","ui.bootstrap","ui.router.tabs","ngAria"]);app.config(["$stateProvider","$urlRouterProvider","$provide",function(a,b,c){b.otherwise("/outoftab"),a.state("outoftabs",{url:"/outoftab",controller:"OutofTabCtrl",templateUrl:"outoftabs.html"})}]),app.config(["uiTabsConfigProvider",function(a){var b=[];b[0]={stateName:"accounts",url:"/accounts",templateUrl:"example.html",controller:"ExampleCtrl","abstract":!0},b[1]={stateName:"accounts.personalInfo",url:"/accounts/personalInfo",templateUrl:"user/personalInfo.html",controller:"ExampleCtrl",parent:"accounts"},b[2]={stateName:"accounts.addressInfo",url:"/accounts/addressInfo",templateUrl:"user/accounts/addressInfo.html",controller:"ExampleCtrl",parent:"accounts"},b[3]={stateName:"accounts.securityQuestions",url:"/accounts/securityQuestions",templateUrl:"user/accounts/securityQuestions.html",controller:"SecurityCtrl"},a.setRoutes(b)}]),function(){function a(a,b,c){c.initialiseFlag=c.initialiseFlag||!1,c.initialiseFlag&&console.log("I am true, Yeah!"),c.initialise=function(){c.initialiseFlag=!0,c.go=function(a){b.go(a)},c.tabData={heading:"AccountSettings",tabs:[{heading:"Personal",route:"accounts.personalInfo"},{heading:"Address",route:"accounts.addressInfo"},{heading:"SecurityQuestions",route:"accounts.securityQuestions"}]},c.propertyModel={nameLabel:"nameLabel",address:{addressLabel:"Address1"}},b.go("accounts.personalInfo")},c.initialiseFlag||(console.log("initialise only once"),c.initialise())}angular.module("example").controller("ExampleCtrl",a),a.$inject=["$rootScope","$state","$scope","$stateParams"]}();var mainCtrl=["$rootScope","$state","$scope","$stateParams",function(a,b,c){c.tabData={heading:"AccountSettings",tabs:[{heading:"Personal",route:"accounts.personalInfo"},{heading:"Address",route:"accounts.addressInfo"},{heading:"SecurityQuestions",route:"accounts.securityQuestions"}]}}];angular.module("example").controller("mainCtrl",mainCtrl);var OutofTabCtrl=["$rootScope","$scope","$state",function(a,b,c){b.go=function(a){c.go(a)},b.test=function(){throw trackJs.addMetadata("user id","appUserId"),trackJs.addMetadata("host ip","127.0.0.1"),trackJs.addMetadata("customerType","guest"),trackJs.configure({userId:"SUd123"}),new error("For test throwing an error")}}];angular.module("example").controller("OutofTabCtrl",OutofTabCtrl);var SecurityCtrl=["$rootScope","$scope","$stateParams",function(a,b){b.initialise=function(){console.log("editLabel empty",b.editLabel),b.editLabel=b.editLabel||"test edit label"},b.initialise()}];angular.module("example").controller("SecurityCtrl",SecurityCtrl);
//# sourceMappingURL=minified.js.map