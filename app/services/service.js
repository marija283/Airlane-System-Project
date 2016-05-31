
AirlaneSystem
    .factory('mapService', ['$http' ,function($http){
        return{
            getDatabase:function(callback) {
                $http.get("database.json")
                    .success(function (data) {
                        callback(data);
                        //console.log("Databese ok");
                    })
                    .error(function (data) {
                        console.log("error in getting Database");
                    });
            }

        }
    }]);