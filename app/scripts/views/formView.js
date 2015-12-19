define(["app",
    "tpl!../../templates/form/form.html",
    'utils/functions',
    'views/mapView',
    "views/listLastestView",
    "collections/mainCollections",
    'moment'
], function (App, formTpl, Util, MapView, ListView, Collection, moment) {
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

                var obj = {
                    st_name: link_val,
                    dt_search: moment().format('DD/MM/YYYY, h:mm:ss a')
                };

                if (localStorage.getItem('lastest_search') == null) {
                    localStorage.setItem('lastest_search', JSON.stringify([obj]));
                } else {
                    var arrayPush = JSON.parse(localStorage.getItem('lastest_search'));
                    arrayPush.push(obj);
                    localStorage.setItem('lastest_search', JSON.stringify(arrayPush));
                }

                $.ajax({
                    url: 'http://ip-api.com/json/' + link_val,
                    type: 'GET',
                    dataType: 'json',
                    success: function (response) {
                        var newMap = new MapView.MapItem();

                        newMap.onShow = function () {
                            var mapOptions = {
                                zoom: 8,
                                center: new google.maps.LatLng(response.lat, response.lon),
                                mapTypeId: google.maps.MapTypeId.ROADMAP
                            };

                            new google.maps.Map(newMap.ui.mapContainer[0], mapOptions);
                        };

                        App.body.show(newMap);

                        var lastestSearch = new ListView.Composite();
                        lastestSearch.collection = Collection.collectionList();
                        App.lastest.show(lastestSearch);
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