/**
 * @author: Felipe Pastor
 * @date: 20/12/2015
 * @description: Definitions of the main app, routes and initializers.
 **/

define(['marionette', 'backbone', 'material'], function (Marionette, Backbone) {
    $(document).ready( function() {
        $.material.init();
        $.material.ripples();
    });

    var App = new Marionette.Application();

    App.addRegions({
        search: "#search-region",
        lastest: "#lastest-search-region",
        body: "#body-region"
    });

    var RouterController = {
        mainAction: function () {
            require(["controllers/MainCtrl"], function (MainController) {
                MainController.mainActionView();
            });
        }
    };

    var appRouter = Marionette.AppRouter.extend({
        appRoutes: {
            "": 'mainAction'
        }
    });

    App.addInitializer(function () {
        // initialize the router
        new appRouter({
            controller: RouterController
        });
    });

    App.on("start", function () {
        if (Backbone.history) {
            Backbone.history.start();
        }
    });

    return App;
});