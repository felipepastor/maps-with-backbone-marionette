define(["app", "models/MainModels"], function (App) {
    App.module("Collections", function (Collections, App, Backbone) {
        Collections.ObjectsCollections = {
            collectionList: function () {
                return new Backbone.Collection(
                    localStorage.getItem('lastest_search') ? JSON.parse(localStorage.getItem('lastest_search')) : []
                );
            }
        };
    });

    return App.Collections.ObjectsCollections;
});

