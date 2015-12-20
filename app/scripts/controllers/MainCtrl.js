/**
 * @author: Felipe Pastor
 * @date: 20/12/2015
 * @description: Module responsible to render the views and bootstrap the app.
 **/

define(["app",
    "views/ListLastestView",
    "views/FormView",
    "collections/MainCollections"], function (App, ListView, FormView, Collection) {
    App.module("Main", function (Main, App) {
        Main.Controller = {
            mainActionView: function () {
                /*
                * Instance of collectionList for later usage
                * */
                var compositeList = new ListView.Composite();
                compositeList.collection = Collection.collectionList();

                /*
                * Show the lastest search region with CompositeView
                * */
                App.lastest.show(compositeList);

                App.search.show(new FormView.FormItem());
            }
        };
    });

    return App.Main.Controller;
});