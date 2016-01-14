var definition = [
    "jquery",
    "app",
    "views/ListLastestView",
    "views/FormView",
    "views/MapView",
    "collections/MainCollections"
];

define(definition, function ($, App, ListLastestView, FormView, MapView, Collection) {
    describe("views tests", function () {
        var listLastest,
            form,
            map,
            collection = null,
            items = [{
                "st_name": "avenuecode.com",
                "org": "Amazon.com",
                "dt_search": "14/01/2016, 19:45:59",
                "city": "San Jose",
                "country": "United States",
                "lat": 37.3394,
                "lon": -121.895
            }, {
                "st_name": "terra.com.br",
                "org": "Terra Networks Operations",
                "dt_search": "14/01/2016, 18:03:14",
                "city": "Coral Gables",
                "country": "United States",
                "lat": 25.7541,
                "lon": -80.271
            }, {
                "st_name": "uol.com.br",
                "org": "Universo Online S.A.",
                "dt_search": "14/01/2016, 15:01:03",
                "city": "Sao Paulo",
                "country": "Brazil",
                "lat": -23.5701,
                "lon": -46.6915
            }];


        beforeEach(function () {
            collection = Collection.collectionList();
            collection.reset();

            //adding some items
            collection.add(items);
        });

        it("should layout view object and regions render as expected", function () {
            expect(App._regionManager.length).toEqual(3);
        });

        it("is lastest search view object render as expected?", function () {
            listLastest = new ListLastestView.Composite();
            listLastest.collection = collection;
            listLastest.render();

            var rendered = $(listLastest.el).html();
            expect(rendered).not.toBe("");
        });

        it("is form view object render as expected?", function () {
            form = new FormView.FormItem();
            form.render();

            var rendered = $(form.el).html();
            expect(rendered).not.toBe("");
        });

        it("is map view object render as expected?", function () {
            map = new MapView.MapItem();

            map.onShow = function () {
                console.log(this.loadMap({lat: 0, lon: 0}, false));
            };

            //var rendered = map.render();
            //console.log(map);
        });
    });
});


