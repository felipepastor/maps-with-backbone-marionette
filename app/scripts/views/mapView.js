define(["app",
    "tpl!../../templates/maps/maps.html",
    'async!https://maps.googleapis.com/maps/api/js?key=AIzaSyByKd7nRWzHBc76mGYTup-zzX6pWQlpwH8'
], function (App, mapsTpl, MapsTemp) {
    App.module("Map.View", function (View, App, Backbone, Marionette, $, _) {
        View.MapItem = Marionette.ItemView.extend({
            template: mapsTpl,
            tagName: 'div',
            className: 'clear-height',
            ui: {
                mapContainer: '#map-container'
            }
        });
    });

    return App.Map.View
});