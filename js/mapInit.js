var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 37.99616,
            lng: -97.910
        },
        zoom: 4
    });

    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow;

    google.maps.event.addListener(map, 'click', function(event) {

        var latlng = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        };
        //console.log(event.latLng.lat(),event.latLng.lng());
        geocodeLatLng(geocoder, map, infowindow, latlng);

    });
}

var allMarkers= [null,null];
var allStates = ["",""];
var counter = 0;
var labelsObj = {};

function geocodeLatLng(geocoder, map, infowindow, latlng) {

    geocoder.geocode({'location': latlng}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            if (results[1]) {
                map.setZoom(4);

                counterAndLabels();

                var state = getState(results[1]);
                //console.log(state);

                var marker = new google.maps.Marker({
                    position: latlng,
                    map: map,
                    label:labelsObj.label,
                    animation: google.maps.Animation.DROP,
                    title: labelsObj.title
                });

                allMarkers[labelsObj.position] = marker;
                allStates[labelsObj.position] = state;

                connectWithAngularScope();

                infowindow.setContent(labelsObj.title + ":<br>"+
                    results[1].formatted_address +
                    "<br> The state is: <b>" + state + "</b>");

                infowindow.open(map, marker);
            } else {
                console.log('No results found');
            }
        } else {
            console.log('Geocoder failed due to: ' + status);
        }
    });
}

function counterAndLabels(){
    if(counter==2){
        removeMarkers();
    }

    if(counter==0){
        counter++;
        removeMarkerAt(0);
        labelsObj = {
            label:"A",
            title:"Flying from",
            position:0
        }
    }
    else if(counter==1){
        counter++;
        removeMarkerAt(1);
        labelsObj = {
            label:"B",
            title:"Flying to",
            position:1
        }
    }
}

function getState(obj){
    var arrayForState = obj.address_components;
    var state="";

    $(arrayForState).each(function(index,element){

        if(element.types[0] == "administrative_area_level_1"){
            state = element.long_name;
            return true;  //vaka se izleguva od .each
        }
    });

    return state;
}

function removeMarkers(){
    counter=0;
    $(allMarkers).each(function(index,item){
        item.setMap(null);
    });
    allMarkers= [null,null];
    allStates = ["",""];

}

function removeMarkerAt(position){
    if(allMarkers[position] != null)
        allMarkers[position].setMap(null);
    allStates[position]="";
}

function changeMarker(latlng , state, label,title,id){

    removeMarkerAt(id);

    allMarkers[id] = new google.maps.Marker({
        position: latlng,
        map: map,
        label:label,
        animation: google.maps.Animation.DROP,
        title: title
    });
    map.setZoom(4);
    map.panTo( allMarkers[id].position);

    allStates[id] = state;

}

function connectWithAngularScope(){
    angular.element($("#destinationFromInput")).scope().changeModel(allStates);
}


