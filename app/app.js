var AirlaneSystem = angular.module('airlane-system',[
    'ui.router'
    ]);

AirlaneSystem
    .config(['$stateProvider','$urlRouterProvider','$locationProvider',
    function($stateProvider,$urlRouterProvider,$locationProvider){
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home',{
                url:'/',
                templateUrl:'app/views/home.html',
                controller:'homeController'
            })
            .state('test',{
                url:'/test',
                templateUrl:'app/views/test.html',
                controller:'homeController'
            })
    }]);


AirlaneSystem
    .controller('homeController', ['$rootScope','$scope','$state',
    function($rootScope,$scope,$state){
        $scope.test = "You are in TEST view";
        $scope.home = "You are in HOME view";
    }]);
