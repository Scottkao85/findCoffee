$(document).ready(function(){

// initial map setup
  var myMap; 
  //var myLocation;
  var infowindow = new google.maps.InfoWindow();
  var myLatLng = new google.maps.LatLng(37.3228338, -122.01801640000001);
  var initialize = function() {
    
    var mapOptions = {
      center: myLatLng,
      zoom: 14
    };

    myMap = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    
    //setting marker of current location
    var image = {
      url: 'http://i.imgur.com/etjgJ2Db.jpg',
      //size: new google.maps.Size(50, 50),
      scaledSize: new google.maps.Size(50, 50)
    }
    var marker = new google.maps.Marker({
      position: myLatLng,
      animation: google.maps.Animation.DROP,
      title: 'my location',
      icon: image
      
    });
    marker.setMap(myMap);

    var request = {
      location: myLatLng,
      radius: '1500',
      keyword: 'coffee',
      type: ['store'],
      openNow: 'true'
    };
    var service = new google.maps.places.PlacesService(myMap);
    service.nearbySearch(request, callback);

    //below code for list version
  }
  
  google.maps.event.addDomListener(window, 'load', initialize);


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

  function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: myMap,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
      console.log(place)
      infowindow.setContent(place.name + "</br>" + place.vicinity);
      infowindow.open(myMap, this);
    });
  }

  var appendList = function(place){
    var $shopList = $('#shopList');
    var $coffeeStore = $('<div><ul></ul><div>');
    for(name in place){
      $coffeeStore.html(place.name + "--" + place.vicinity);
      $coffeeStore.prependTo(shopList)
    }
  }
  





});




      
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


// var get_location = function() {
//   if (Modernizr.geolocation) {
//     navigator.geolocation.getCurrentPosition(show_map);
//   } else {
//     alert("no GPS")
//   }
// }
// console.log(Modernizr)
