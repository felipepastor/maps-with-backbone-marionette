define(['marionette', 'backbone'], function (Marionette, Backbone) {
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

    App.addInitializer(function (options) {
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