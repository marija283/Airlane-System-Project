
AirlaneSystem
    .controller('homeController', ['$rootScope','$scope','$state','mapService',
        function($rootScope,$scope,$state,mapService){
            $scope.test = "You are in TEST view";
            $scope.home = "You are in HOME view";
            $scope.database=[];

            $scope.reservation = {
                destinationFrom:"",
                destinationTo: "",
                departure:null,
                return:null,
                isReturn : true,
                travelers : "1"

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
                $scope.minDateReturn = $scope.reservation.departure;
            }

            // Form return or one way
            $scope.changeReturnState = function(val){
                $scope.reservation.isReturn = val;
                $(".btn").removeClass("active");
                if(val==false){
                    $("#oneWayBtn").addClass('active');
                }
                else{
                    $("#returnBtn").addClass('active');
                }
            }

            $scope.searchTickets = function () {
               // console.log($scope.reservation);
                $rootScope.reservation = $scope.reservation;
                $state.go("searchTickets");
            }
        }])
    .controller('searchTicketsController', ['$rootScope','$scope','$state',
        function($rootScope,$scope,$state){
            $scope.reservation = $rootScope.reservation;
            // KOMENTIRAJ GORE...UN COMMENT DOLE ZA TEST
            //$scope.reservation = {
            //    destinationFrom:"Oklahoma",
            //    destinationTo: "Minesota",
            //    departure:"12.12.2015",
            //    return:"10.10.2010",
            //    isReturn : true,
            //    travelers : "1"
            //
            //};


            $scope.tickets = [];
            $scope.ticketsNum = Math.floor((Math.random() * 10) + 1);

            for(i=0; i<$scope.ticketsNum; i++){
                var ticket = {};
                var hoursArray = ["09:00 AM","12:00 PM","15:00 PM","18:00 PM","21:00 PM","23:00 PM"];
                var classArray = ["Economy","Premium","Business","First"];
                ticket.destinationTo = $scope.reservation.destinationTo;
                ticket.destinationFrom = $scope.reservation.destinationFrom;
                ticket.departure = $scope.reservation.departure;
                ticket.return = $scope.reservation.return;
                ticket.travelers=  $scope.reservation.travelers;
                ticket.isReturn = $scope.reservation.isReturn;
                ticket.cost = Math.floor((Math.random() * 1000) + 100);
                ticket.departureHour = hoursArray[Math.floor((Math.random() * 5))];
                ticket.returnHour = hoursArray[Math.floor((Math.random() * 5))];
                ticket.class = classArray[Math.floor((Math.random() * 3))];
                $scope.tickets.push(ticket);
            }
           // console.log($scope.tickets);

            $scope.openModal = function(ticket){
               // console.log(ticket);
                $scope.modalTicket = ticket;
                $("#myModal").modal();
            }

            $scope.selectTicket = function(ticket){
                $rootScope.ticket = ticket;
            }
    }])

    .controller('userInfoController', ['$rootScope','$scope','$state',
        function($rootScope,$scope,$state) {

            $scope.ticket = $rootScope.ticket;
            // KOMENTIRAJ GORE...UN COMMENT DOLE ZA TEST
            //$scope.ticket = {
            //    cost:365,
            //    departure : "12.12.2015",
            //    departureHour :"21:00",
            //    returnHour:"21:00",
            //    destinationFrom:"Oklahoma",
            //    destinationTo:"Minesota",
            //    isReturn :true,
            //    return:"10.10.2010",
            //    travelers:"1"
            //};

            $scope.continuePaymentBtn = function(){
                $rootScope.person = $scope.person;
                console.log($scope.person);
            }

    }])

    .controller('paymentController', ['$rootScope','$scope','$state',
        function($rootScope,$scope,$state){

            $scope.ticket = $rootScope.ticket;
            $scope.person = $rootScope.person;

            // KOMENTIRAJ GORE...UN COMMENT DOLE ZA TEST
            //$scope.ticket = {
            //    cost:365,
            //    departure : "12.12.2015",
            //    departureHour :"21:00",
            //    returnHour:"21:00",
            //    destinationFrom:"Oklahoma",
            //    destinationTo:"Minesota",
            //    isReturn :true,
            //    return:"10.10.2010",
            //    travelers:"1"
            //};
            $scope.continueConfirmBtn = function(){
                $rootScope.person = $scope.person;
                console.log($scope.person);
            }
    }])
    .controller('confirmationController', ['$rootScope','$scope',
        function($rootScope,$scope){
            $scope.ticket = $rootScope.ticket;
            $scope.person = $rootScope.person;
            // KOMENTIRAJ GORE...UN COMMENT DOLE ZA TEST
            //$scope.ticket = {
            //    cost:365,
            //    departure : "12.12.2015",
            //    departureHour :"21:00",
            //    returnHour:"21:00",
            //    destinationFrom:"Oklahoma",
            //    destinationTo:"Minesota",
            //    isReturn :true,
            //    return:"10.10.2010",
            //    travelers:"1"
            //};

            //$scope.person = {
            //    email:'marija283@hotmail.com'
            //};

            $scope.printDiv = function(divName) {
                var printContents = document.getElementById(divName).innerHTML;
                var popupWin = window.open('', '_blank', 'width=700,height=500');
                popupWin.document.open();
                popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="/Airlane-System-Project/bower_components/bootstrap/dist/css/bootstrap.min.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
                popupWin.document.close();
            }

    }])

    .controller('tripSummaryController',['$scope', '$rootScope',
        function($scope, $rootScope){
            $scope.ticket = $rootScope.ticket;
    }]);


