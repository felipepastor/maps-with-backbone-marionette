define(["app",
    "tpl!../../templates/form/form.html",
    'utils/Functions',
    'views/MapView',
    "views/ListLastestView",
    "collections/MainCollections",
    "notFoundView",
    'moment'
], function (App, formTpl, Util, MapView, ListView, Collection, NotFoundView, moment) {
    App.module("Form.View", function (View, App, Backbone, Marionette, $) {
        View.FormItem = Marionette.ItemView.extend({
            template: formTpl,
            tagName: 'div',
            ui: {
                link: '#website_url',
                form: '#form_search',
                alert: '#alert-form'
            },
            events: {
                'submit @ui.form': 'search',
                'keypress @ui.link': 'startSearch'
            },
            onShow: function () {
                this.ui.alert.hide();
            },
            startSearch: function () {
                this.ui.alert.hide();
            },
            search: function (e) {
                e.preventDefault();

                var link_val = this.ui.link.val();

                /*
                 * Validating the URL and showing or not the alert in form
                 * */
                if (!Util.ValidURL(link_val)) {
                    this.ui.alert.show();
                    return false;
                }

                $.ajax({
                    url: 'http://ip-api.com/json/' + link_val,
                    type: 'GET',
                    dataType: 'json',
                    success: function (response) {

                        if(response.status == 'success') {
                            /*
                             * Saving some data in localStorage
                             * */
                            var obj = {
                                st_name: link_val,
                                dt_search: moment().format('DD/MM/YYYY, H:MM:SS'),
                                lat: response.lat,
                                lng: response.lon
                            };

                            /*
                            * Verifying if the obj in localstorage is already created
                            * */
                            if (localStorage.getItem('lastest_search') == null) {
                                // If not, we'll create a new one
                                localStorage.setItem('lastest_search', JSON.stringify([obj]));
                            } else {
                                //If Yes, we'll populate with more information
                                var arrayPush = JSON.parse(localStorage.getItem('lastest_search'));
                                arrayPush.push(obj);
                                localStorage.setItem('lastest_search', JSON.stringify(arrayPush));
                            }

                            //New instance of MapView, for render after a successfull response
                            var newMap = new MapView.MapItem();
                            newMap.onShow = function () {
                                this.loadMap(response);
                            };

                            //Show the View in the region
                            App.body.show(newMap);

                            //New instance of ListView to update the collection and view
                            var lastestSearch = new ListView.Composite();
                            lastestSearch.collection = Collection.collectionList();
                            App.lastest.show(lastestSearch);
                        } else {
                            //Show the View of NotFound in the body region
                            App.body.show(new NotFoundView.NotFoundItem());
                        }
                    },
                    error: function (response) {
                        console.log(response);
                    }
                });
            }
        });
    });

    return App.Form.View
});