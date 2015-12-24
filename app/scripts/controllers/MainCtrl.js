/**
 * @author: Felipe Pastor
 * @date: 20/12/2015
 * @description: Module responsible to render the views and bootstrap the app.
 **/

define(["app",
    "views/ListLastestView",
    "views/FormView",
    "collections/MainCollections"], function (App, ListView, FormView) {
    App.module("Main", function (Main, App) {
        Main.Controller = {
            mainActionView: function () {

                /*
                * Show the lastest search region with CompositeView
                * */
                App.lastest.show(new ListView.Composite());

                /*
                 * Show the FormItemView
                 * */
                App.search.show(new FormView.FormItem());
            }
        };
    });

    return App.Main.Controller;
});