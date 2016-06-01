
AirlaneSystem
    .controller('homeController', ['$rootScope','$scope','$state','mapService',
        function($rootScope,$scope,$state,mapService){
            $scope.test = "You are in TEST view";
            $scope.home = "You are in HOME view";
            $scope.database=[];

            $scope.reservation = {
                destinationFrom:"",
                destinationTo: ""
            };

            $scope.changeModel = function(states){
                $scope.$apply(function(){
                    $scope.reservation.destinationFrom = states[0];
                    $scope.reservation.destinationTo = states[1];
                });

            }

            mapService.getDatabase(function(data){
                $scope.database = data["airports"];
                $scope.databaseStates=[];

                angular.forEach($scope.database,function(item,index){
                    $scope.databaseStates.push(item.state);
                });
            });


            $scope.changeMap = function(id){
                var LatLng={};
                var state="";
                var label="";
                var title="";

                if(id==0){
                    LatLng = {};
                    state = $scope.reservation.destinationFrom;
                    label="A";
                    title="Flying From";
                }
                else if(id==1)
                {
                    LatLng = {};
                    state = $scope.reservation.destinationTo;
                    label="B";
                    title="Flying To";
                }

                angular.forEach($scope.database, function(item,index){
                    if(item.state == state){
                        LatLng.lat = item.lat;
                        LatLng.lng = item.lng;
                        return true;
                    }
                });

              //  console.log(LatLng);

                if(LatLng.lat == null){
                    removeMarkerAt(id);
                }
                else{
                    changeMarker(LatLng,state,label,title,id);
                }

            }

            // Form dateTime picker
           // $scope.departure = new Date();
           // $scope.return = new Date();
            $scope.myDate = new Date();
            $scope.minDate = new Date(
                $scope.myDate.getFullYear(),
                $scope.myDate.getMonth(),
                $scope.myDate.getDate());
            $scope.maxDate = new Date(
                $scope.myDate.getFullYear(),
                $scope.myDate.getMonth() + 12,
                $scope.myDate.getDate());

            $scope.setMinReturn = function(){
                $scope.minDateReturn = $scope.departure;
            }



            // Form return or one way
            $scope.makeFalse = function(val, event){
                $scope.isReturn = val;
                $(".btn").removeClass("active");
                $(event.target).addClass('active');
            }

        }]);

