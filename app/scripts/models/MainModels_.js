define(["app"], function (App) {
    App.module("Models", function (Models, App, Backbone) {
        Models.ObjectsModels = {
            listModel: function () {
                return Backbone.Model.extend({
                    defaults: {
                        st_name: '',
                        org: '',
                        dt_search: ''
                    }
                });
            }
        };
    });

    return App.Models.ObjectsModels;
});
