define(["app",
    "tpl!../../templates/maps/maps.html",
    'async!https://maps.googleapis.com/maps/api/js?key=AIzaSyByKd7nRWzHBc76mGYTup-zzX6pWQlpwH8'
], function (App, mapsTpl) {
    App.module("Map.View", function (View, App, Backbone, Marionette, $, _) {
        View.MapItem = Marionette.ItemView.extend({
            template: mapsTpl,
            tagName: 'div',
            className: 'clear-height',
            ui: {
                mapContainer: '#map-container'
            },
            loadMap: function(response) {
                var myLatLng = {
                    lat: response.lat,
                    lng: response.lon
                };

                var mapOptions = {
                    zoom: 8,
                    center: new google.maps.LatLng(myLatLng),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                var myMap = new google.maps.Map(
                    this.ui.mapContainer[0],
                    mapOptions
                );

                var marker = new google.maps.Marker({
                    animation: google.maps.Animation.DROP,
                    position: myLatLng,
                    map: myMap,
                    title: 'Hello World!'
                });
            }
        });
    });

    return App.Map.View
});