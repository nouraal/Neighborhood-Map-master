var map;
var markers = ko.observableArray();

//----------------------the data 'Location'----------------------
var locations = [{
    title: 'Kingdom Centre',
    description: 'Kingdom Centre (Arabic: \u0628\u0631\u062c \u0627\u0644\u0645\u0645\u0644\u0643\u0629\u200e\u200e), is a 99-storey, 302.3 m (992 ft) skyscraper in Riyadh, Saudi Arabia.',
    location: {
        lat: 24.711534,
        lng: 46.674345
    }
}, {
    title: 'King Abdullah Financial District',
    description: 'The King Abdullah Financial District (KAFD) is a new development under construction near King Fahad Road in the Al Aqeeq area of Riyadh, Saudi Arabia being undertaken by the Rayadah Investment Corporation on behalf of the Pension Authority of the Kingdom of Saudi Arabia, consisting of 59 towers in an area of 1.6 million square metres.',
    location: {
        lat: 24.7635063,
        lng: 46.6408155
    }
}, {
    title: 'Deera Square',
    description: '"Deera Square (Arabic: \u0633\u0627\u062d\u0629 \u0627\u0644\u0635\u0641\u0627\u0629\u200e\u200e) is a public space in Riyadh, Saudi Arabia, in which public executions (usually by beheading) take place.',
    location: {
        lat: 24.6308575,
        lng: 46.7118404
    }
}, {
    title: 'Al Faisaliyah Center',
    description: 'The Al Faisaliyah Centre (or Al Faisaliah Centre, Arabic: \u0628\u0631\u062c \u0627\u0644\u0641\u064a\u0635\u0644\u064a\u0629\u200e\u200e) is a commercial skyscraper located in the business district of Riyadh, Saudi Arabia.',
    location: {
        lat: 24.6905765,
        lng: 46.685097
    }
}, {
    title: 'Princess Nora bint Abdul Rahman University',
    description: 'Princess Nourah Bint Abdulrahman University PNU (Arabic: \u062c\u0627\u0645\u0639\u0629 \u0627\u0644\u0623\u0645\u064a\u0631\u0629 \u0646\u0648\u0631\u0629 \u0628\u0646\u062a \u0639\u0628\u062f \u0627\u0644\u0631\u062d\u0645\u0646\u200e\u200e) is a public women\u2019s university located in Riyadh, the capital of Saudi Arabia.',
    location: {
        lat: 24.8464613,
        lng: 46.7247308
    }
}, {
    title: 'Jenadriyah',
    description: 'Al-Jenadriyah (Arabic: \u0645\u0647\u0631\u062c\u0627\u0646 \u0627\u0644\u062c\u0646\u0627\u062f\u0631\u064a\u0629) is a cultural and heritage festival held in Jenadriyah (or Janadriyah) near Riyadh in Saudi Arabia each year, lasting for two weeks.',
    location: {
        lat: 24.961509,
        lng: 46.792472
    }
}, ];
//----------------------------------------------------------------

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
    var highlightedIcon = makeMarkerIcon('e67300');
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

        // Two event listeners - one for mouseover, one for mouseout,
        // to change the colors back and forth.
        marker.addListener('mouseover', mouseover);
        marker.addListener('mouseout', mouseout);
    }

    function addListener() {
        populateInfoWindow(this, largeInfowindow);
        map.setZoom(14);
    }
    //-------------- markers Colour -------------------
    function mouseover() {
        this.setIcon(highlightedIcon);
    }

    function mouseout() {
        this.setIcon(defaultIcon);
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
            console.log(response);
            for (var i = 0; i < articleList.length; i++) {
                var articeSet = articleList[i];
            }

            clearTimeout(wikiRequestTimeout);
        }
    });
    if (infowindow.marker != marker) {
        infowindow.marker = marker;
        infowindow.setContent(data);
        infowindow.open(map, marker);
        infowindow.addListener('closeclick', function() {
            // infowindow.setMarker(null);
            map.setZoom(11);
            map.setCenter(new google.maps.LatLng(24.799171, 46.738380));
        });
    }
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