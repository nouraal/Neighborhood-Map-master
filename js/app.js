var map;
var markers = ko.observableArray();

function initMap() {
    // Create a new StyledMapType object, passing it an array of styles,
    // and the name to be displayed on the map type control.
    var styledMapType = new google.maps.StyledMapType(
        [{
            elementType: 'geometry',
            stylers: [{
                color: '#ebe3cd'
            }]
        }, {
            elementType: 'labels.text.fill',
            stylers: [{
                color: '#523735'
            }]
        }, {
            elementType: 'labels.text.stroke',
            stylers: [{
                color: '#f5f1e6'
            }]
        }, {
            featureType: 'administrative',
            elementType: 'geometry.stroke',
            stylers: [{
                color: '#c9b2a6'
            }]
        }, {
            featureType: 'administrative.land_parcel',
            elementType: 'geometry.stroke',
            stylers: [{
                color: '#dcd2be'
            }]
        }, {
            featureType: 'administrative.land_parcel',
            elementType: 'labels.text.fill',
            stylers: [{
                color: '#ae9e90'
            }]
        }, {
            featureType: 'landscape.natural',
            elementType: 'geometry',
            stylers: [{
                color: '#dfd2ae'
            }]
        }, {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [{
                color: '#dfd2ae'
            }]
        }, {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{
                color: '#93817c'
            }]
        }, {
            featureType: 'poi.park',
            elementType: 'geometry.fill',
            stylers: [{
                color: '#a5b076'
            }]
        }, {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{
                color: '#447530'
            }]
        }, {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{
                color: '#f5f1e6'
            }]
        }, {
            featureType: 'road.arterial',
            elementType: 'geometry',
            stylers: [{
                color: '#fdfcf8'
            }]
        }, {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{
                color: '#f8c967'
            }]
        }, {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{
                color: '#e9bc62'
            }]
        }, {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry',
            stylers: [{
                color: '#e98d58'
            }]
        }, {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry.stroke',
            stylers: [{
                color: '#db8555'
            }]
        }, {
            featureType: 'road.local',
            elementType: 'labels.text.fill',
            stylers: [{
                color: '#806b63'
            }]
        }, {
            featureType: 'transit.line',
            elementType: 'geometry',
            stylers: [{
                color: '#dfd2ae'
            }]
        }, {
            featureType: 'transit.line',
            elementType: 'labels.text.fill',
            stylers: [{
                color: '#8f7d77'
            }]
        }, {
            featureType: 'transit.line',
            elementType: 'labels.text.stroke',
            stylers: [{
                color: '#ebe3cd'
            }]
        }, {
            featureType: 'transit.station',
            elementType: 'geometry',
            stylers: [{
                color: '#dfd2ae'
            }]
        }, {
            featureType: 'water',
            elementType: 'geometry.fill',
            stylers: [{
                color: '#b9d3c2'
            }]
        }, {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{
                color: '#92998d'
            }]
        }], {
            name: 'Styled Map'
        });
    //--------------------------------------------------------------------
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 24.799171,
            lng: 46.738380
        },
        zoom: 11,
        mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                'styled_map'
            ]
        }
    });

    //Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');

    var defaultIcon = makeMarkerIcon('66cc00');
    var largeInfowindow = new google.maps.InfoWindow();
    var bounds = new google.maps.LatLngBounds();
    //------------the View Model part ------------------------------
    var viewModel = {
        locations: ko.observableArray(locations),
        query: ko.observable(''),

        search: function(value) {
            viewModel.locations([]); //.removeAll();

            for (var x = 0; x < locations.length; x++) {
                var doesMatch = locations[x].title.toLowerCase().indexOf(value.toLowerCase()) >= 0; // true or false

                if (doesMatch) viewModel.locations.push(locations[x]);

                locations[x].marker.setVisible(doesMatch); // true or false

                // if (locations[x].title.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                //   viewModel.locations.push(locations[x]);
                //    locations[x].marker.setVisible(true); 
                // } else {
                //    locations[x].marker.setVisible(false); 
                // }
            }
        },
        //click event on list to show InfoWindow 
        infoWindow: function(loc) {
            google.maps.event.trigger(loc.marker, 'click');
            // console.log(loc);
        }
    };
    viewModel.query.subscribe(viewModel.search);
    ko.applyBindings(viewModel);


    //------- create array of markers on the map -----------
    for (var i = 0; i < locations.length; i++) {
        var position = locations[i].location;
        var title = locations[i].title;
        var description = locations[i].description;
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            description: description,
            icon: defaultIcon,
            animation: google.maps.Animation.DROP,
            id: i
        });
        //-------------------------------------------------
        locations[i].marker = marker;
        markers.push(marker);
        bounds.extend(marker.position);
        //------ when click on the marker happen ----------

        marker.addListener('click', addListener);
    }

    function addListener() {
        populateInfoWindow(this, largeInfowindow);
        map.setZoom(14);
    }
}
//-------------------------------------------------
populateInfoWindow = function(marker, infowindow) {
    //----------- wikipedia AJAX request -------------
    // Set a timeout of 8 seconds to get the Wikipedia articles
    var wikiRequestTimeout = setTimeout(function() {
        alert('failed to get wikipedia resources');
    }, 8000);

    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + marker.title + '&format=json&callback=wikiCallback';
    var url = 'http://en.wikipedia.org/wiki/' + marker.title;
    var data = '<h4>' + marker.title + '</h4><hr><p>' + marker.description + '</p><a href=\"' + url + '\"> For more information</a>';

    // Using jQuery
    $.ajax({
        url: wikiUrl,
        dataType: 'jsonp',
        jsonp: "callback",
        success: function(response) {
            var articleList = response[1];
            // console.log(response);
            for (var i = 0; i < articleList.length; i++) {
                var articeSet = articleList[i];
            }

            clearTimeout(wikiRequestTimeout);

            if (infowindow.marker != marker) {
                infowindow.marker = marker;
                infowindow.setContent(data);
                infowindow.open(map, marker);
                marker.setAnimation(google.maps.Animation.BOUNCE);
                infowindow.addListener('closeclick', function() {
                    map.setZoom(11);
                    map.setCenter(new google.maps.LatLng(24.799171, 46.738380));
                    marker.setAnimation(null);
                });
            }
        }
    });
};

// This function takes in a COLOR, and then creates a new marker
// icon of that color. The icon will be 21 px wide by 34 high, have an origin
// of 0, 0 and be anchored at 10, 34).
function makeMarkerIcon(markerColor) {
    var markerImage = new google.maps.MarkerImage(
        'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +
        '|40|_|%E2%80%A2',
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34),
        new google.maps.Size(21, 34));
    return markerImage;
}

function onError() {
    alert("Oops! Google Map has failed to load. Please check your internet connection and try again.");
}