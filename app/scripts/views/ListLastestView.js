/**
 * @author: Felipe Pastor
 * @date: 20/12/2015
 * @description: Module to render lastest views
 **/

define(["app",
    "tpl!../../templates/list/list.html",
    "tpl!../../templates/list/list_item.html",
    "tpl!../../templates/list/none.html",
    "../models/MainModels",
    "../collections/MainCollections"
], function (App, listTpl, listItemTpl, noneTpl, Models, Collection) {
    App.module("List.View", function (View, App, Backbone, Marionette) {
        View.ListItem = Marionette.ItemView.extend({
            template: listItemTpl,
            tagName: 'tr',
            model: Models.listModel,
            ui: {
                link: 'a.link'
            },
            events: {
                'click @ui.link': 'searchAgain'
            },
            searchAgain: function () {
                console.log('clicando')
            }
        });

        View.NoItem = Marionette.ItemView.extend({
            template: noneTpl,
            tagName: 'tr'
        });

        View.Composite = Marionette.CompositeView.extend({
            template: listTpl,
            tagName: 'div',
            childView: View.ListItem,
            emptyView: View.NoItem,
            childViewContainer: "tbody",
            collection: new Collection.collectionList()
        });
    });

    return App.List.View
});