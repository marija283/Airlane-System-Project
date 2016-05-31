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
    .controller('homeController', ['$rootScope','$scope','$state','$http',
    function($rootScope,$scope,$state,$http){
        $scope.test = "You are in TEST view";
        $scope.home = "You are in HOME view";
        $scope.database=[];

        $scope.reservation = {
            destinationFrom:"struga",
            destinationTo: "skopje"
        };

        $scope.changeModel = function(states){
           $scope.$apply(function(){
               $scope.reservation.destinationFrom = states[0];
               $scope.reservation.destinationTo = states[1];
            });

        }

        $http.get("database.json")
            .success(function(data){
                $scope.database = data["airports"];
                //console.log($scope.database);
             })
            .error(function(data){
                console.log("error in getting Database");
            });


            //raboti samo za Destinaton FROM
        $scope.changeMap = function(){

            var LatLng = {};
            var state = $scope.reservation.destinationFrom;


            angular.forEach($scope.database, function(item,index){
                if(item.state == state){
                    LatLng.lat = item.lat;
                    LatLng.lng = item.lng;
                    return true;
                }
            });

            console.log(LatLng);

            if(LatLng.lat == null){
                removeMarkers();
            }
            else{

                var geocoder = new google.maps.Geocoder;
                var infowindow = new google.maps.InfoWindow;

                geocodeLatLng(geocoder, map, infowindow, LatLng);
            }

        }


    }]);

