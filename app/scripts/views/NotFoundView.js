define(["app",
    "tpl!../templates/not_found/notFound.html"
], function (App, notFountTpl) {
    App.module("NotFound.View", function (View, App, Backbone, Marionette) {
        View.NotFoundItem = Marionette.ItemView.extend({
            template: notFountTpl,
            tagName: 'div',
            className: 'clear-height'
        });
    });

    return App.NotFound.View
});
