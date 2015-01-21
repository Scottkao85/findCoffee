$(document).ready(function(){

  google.maps.event.addDomListener(window, 'load', geoInit);

  var directionsService;
  var directionsDisplay;


  function geoInit () {
    var userLocation = {};
    navigator.geolocation.getCurrentPosition(function(position){

              userLocation['lat'] = position.coords.latitude; 
              userLocation['lng'] = position.coords.longitude;
    // initial map setup
      var myMap; 
      //var myLocation;
      var infowindow = new google.maps.InfoWindow();
      var myLatLng = new google.maps.LatLng(userLocation['lat'], userLocation['lng']);
      var initialize = function() {
        
        var mapOptions = {
          center: myLatLng,
          zoom: 14
        };

        myMap = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

        window.myMap = myMap;

        directionsService = new google.maps.DirectionsService(myMap);
        directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(myMap);
        
        //setting marker of current location
        var image = {
          url: 'http://www.survivingcollege.com/wp-content/uploads/2014/10/grumpycat.jpg',
          //size: new google.maps.Size(50, 50),
          scaledSize: new google.maps.Size(60, 60)
        }
        var marker = new google.maps.Marker({
          position: myLatLng,
          animation: google.maps.Animation.BOUNCE,
          title: 'my location',
          icon: image
          
        });
        marker.setMap(myMap);

        var request = {
          location: myLatLng,
          radius: '1800',
          keyword: 'coffee',
          type: ['store'],
          openNow: 'true'
        };
        var service = new google.maps.places.PlacesService(myMap);
        service.nearbySearch(request, callback);

        //below code for list version
      }
      


        //setting markers for nearby coffee

        //var infowindow = new google.maps.Infowindow();
        
      var callback = function(result, status){
        if(status == google.maps.places.PlacesServiceStatus.OK){
          for(var i = 0; i < result.length; i++){
            var coffee = result[i];
            createMarker(coffee);
            appendList(coffee)
          }
        }
      }

      var markersAddress = {};
      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: myMap,
          position: place.geometry.location
        });

      
        markersAddress[place.name] = place.vicinity;
        

        google.maps.event.addListener(marker, 'click', function() {
          
          infowindow.setContent(place.name + "</br>" + place.vicinity);
          infowindow.open(myMap, this); 
          calcRoute(place);
          
        });
      }
      // {greg: 'something'}

      var appendList = function(place){
        var $shopList = $('#shopList');
        var $coffeeStore = $('<li></li>');

        // $coffeeStore.html('<dl>' + '<dt>' + '<u>' + place.name + '</u>' + '</dt>'  + "<dd>" + place.vicinity + '</dd>' + '</dl>');
        $coffeeStore.html('<p class="placeName">' + place.name + '</p>' + '<p class="placeAddress">' +  place.vicinity + '</p>');

        $coffeeStore.prependTo($shopList);
      };

      $('#shopList').on("click", 'li' ,function(){
        console.log("inner text: ", this.innerText);
        calcRoute(this.innerText);
      });

      initialize();

      // calcRoute gets information for EACH place AND renders as well
      function calcRoute(place){

        var start = myLatLng;
        var end = typeof place === 'string' ? place : place.vicinity;

        var request = {
          origin: start,
          destination: end,
          travelMode: google.maps.TravelMode.DRIVING
        }

        directionsService.route(request, function(response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            console.log("directions set!")
          }
        });
      }

    }); // getting location
  }; // geoInit
});//document.ready




      
  //callback for service
     


   


// other stuff...

// $('.search').on("click", function(){
//   $('.location').val()//do something to the value in the "location" class


// });
  // var x = document.getElementById("demo");
  // function getLocation() {
  //     if (navigator.geolocation) {
  //         navigator.geolocation.getCurrentPosition(showPosition);
  //     } else {
  //         x.innerHTML = "Geolocation is not supported by this browser.";
  //     }
  // }
  // function showPosition(position) {
  //     x.innerHTML = "Latitude: " + 37.3228338 + 
  //     "<br>Longitude: " + -122.01801640000001;
  // }
  // showPosition()



