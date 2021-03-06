/**
 * @author: Felipe Pastor
 * @date: 20/12/2015
 * @description: Module to render the Form View and your functions.
 * */
define(["app",
    "tpl!../../templates/form/form.html",
    'utils/Functions',
    'views/MapView',
    "views/ListLastestView",
    "collections/MainCollections",
    "views/NotFoundView",
    'moment'
], function (App, formTpl, Util, MapView, ListView, Collection, NotFoundView, moment) {
    App.module("Form.View", function (View, App, Backbone, Marionette, $) {
        View.FormItem = Marionette.ItemView.extend({
            template: formTpl,
            tagName: 'div',
            ui: {
                link: '#website_url',
                form: '#form_search',
                alert: '#alert-form',
                whereAmI: '#where-am-i',
                resetForm: '#reset-form'
            },
            events: {
                'submit @ui.form': 'search',
                'keypress @ui.link': 'startSearch',
                'click @ui.whereAmI': 'searchMe',
                'click @ui.resetForm': 'searchReset'
            },
            isItMe: false,
            isItForget: false,
            url: '',
            BaseUrl: 'http://ip-api.com/json/',
            onShow: function () {
                this.ui.alert.hide();
            },
            startSearch: function () {
                this.ui.alert.hide();
            },
            searchMe: function () {
                this.isItMe = true;
                this.search();
            },
            search: function (e) {
                if (e)
                    e.preventDefault();

                var self = this;
                var link_val = '';
                if (!this.isItMe) {
                    link_val = this.ui.link.val();

                    /*
                     * Validating the URL and showing or not the alert in form
                     * */
                    if (!Util.ValidURL(link_val) || link_val == '') {
                        this.ui.alert.show();
                        return false;
                    }
                }

                this.url = this.BaseUrl + link_val;

                $.ajax({
                    url: this.url,
                    type: 'GET',
                    dataType: 'json',
                    success: function (response) {
                        if (response.status == 'success') {

                            /*
                             * Saving some data in localStorage
                             * */
                            var obj = {
                                st_name: link_val,
                                org: response.org,
                                dt_search: moment().format('DD/MM/YYYY, H:m:s'),
                                city: response.city,
                                country: response.country,
                                lat: response.lat,
                                lon: response.lon
                            };

                            // Only occurs in default search
                            if (!self.isItMe) {
                                /*
                                 * Verifying if the obj in localstorage is already created
                                 * */
                                if (!localStorage.getItem('lastest_search')) {
                                    // If not, we'll create a new one
                                    localStorage.setItem('lastest_search', JSON.stringify([obj]));
                                } else {
                                    //If Yes, we'll populate with more information
                                    var isEqual = false;
                                    var arrayPush = JSON.parse(localStorage.getItem('lastest_search'));

                                    for (var objArray in arrayPush) {
                                        if (arrayPush[objArray].lat == obj.lat && arrayPush[objArray].lon == obj.lon) {
                                            isEqual = true;
                                        }
                                    }

                                    if(!isEqual){
                                        arrayPush.push(obj);
                                        localStorage.setItem('lastest_search', JSON.stringify(arrayPush));
                                    }
                                }

                                var composite = new ListView.Composite();
                                composite.collection.add(obj);

                            } else {
                                localStorage.setItem('me', JSON.stringify({lat: response.lat, lon: response.lon}))
                            }

                            self.loadNewMap(response, false);
                        } else {
                            //Show the View of NotFound in the body region
                            App.body.show(new NotFoundView.NotFoundItem());
                        }
                    },
                    error: function (response) {
                        console.log(response);
                    },
                    complete: function () {
                        self.isItMe = false;
                    }
                });
            },
            searchReset: function () {
                this.loadNewMap(false, true)
            },
            loadNewMap: function (response, reset) {
                var self = this;
                //New instance of MapView, for render after a successfull response
                var newMap = new MapView.MapItem();
                newMap.onShow = function () {
                    if (reset)
                        this.loadUniqueMap();
                    else
                        this.loadMap(response, self.isItMe);
                };

                //newMap.render();

                //Show the View in the region
                App.body.show(newMap);
            }
        });
    });
    return App.Form.View
});