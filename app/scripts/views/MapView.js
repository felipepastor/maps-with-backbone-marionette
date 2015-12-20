/**
 * @author: Felipe Pastor
 * @date: 20/12/2015
 * @description: Module to render the Map View and your functions.
 * */

define(["app",
    "tpl!../../templates/maps/maps.html",
    'async!https://maps.googleapis.com/maps/api/js?key=AIzaSyByKd7nRWzHBc76mGYTup-zzX6pWQlpwH8'
], function (App, mapsTpl) {
    App.module("Map.View", function (View, App, Backbone, Marionette) {
        View.MapItem = Marionette.ItemView.extend({
            template: mapsTpl,
            tagName: 'div',
            className: 'clear-height',
            ui: {
                mapContainer: '#map-container'
            },
            locations: JSON.parse(localStorage.getItem('lastest_search')),
            loadMap: function (response, isItMe) {
                var myLatLng = {
                    lat: response.lat,
                    lng: response.lon
                };

                var mapOptions = {
                    zoom: 8,
                    center: new google.maps.LatLng(myLatLng),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                var map = new google.maps.Map(
                    this.ui.mapContainer[0],
                    mapOptions
                );

                var infowindow = new google.maps.InfoWindow();
                var bounds = new google.maps.LatLngBounds();

                var marker = new google.maps.Marker({
                    animation: google.maps.Animation.DROP,
                    position: myLatLng,
                    map: map
                });

                bounds.extend(marker.position);

                this.setInfoWindowMarker(marker, map, infowindow, response, isItMe);

                if (isItMe)
                    this.loadMultiplesMarks(map, infowindow, bounds)
            },
            loadMultiplesMarks: function (map, infowindow, bounds) {
                var self = this;

                if (this.locations) {
                    this.locations.forEach(function (obj) {
                        var marker = new google.maps.Marker({
                            position: {
                                lat: obj.lat,
                                lng: obj.lon
                            },
                            map: map
                        });

                        bounds.extend(marker.position);

                        self.setInfoWindowMarker(marker, map, infowindow, obj, false);
                    });

                    map.fitBounds(bounds);
                }
            },
            setInfoWindowMarker: function (marker, map, infowindow, obj, isItMe) {
                google.maps.event.addListener(marker, 'click', (function (marker) {
                    return function () {
                        if (isItMe)
                            obj.org = 'Its me!';

                        infowindow.setContent(obj.org + ' - ' + obj.city + '/' + obj.country);
                        infowindow.open(map, marker);
                    }
                })(marker));
            },
            loadUniqueMap: function () {
                var mapOptions = {
                    zoom: 1,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                if (this.locations == null)
                    mapOptions.center = {lat: 0, lng: 0};

                var map = new google.maps.Map(
                    this.ui.mapContainer[0],
                    mapOptions
                );

                var infowindow = new google.maps.InfoWindow();
                var bounds = new google.maps.LatLngBounds();

                this.loadMultiplesMarks(map, infowindow, bounds);
            }
        });
    });

    return App.Map.View
});