define(["jquery", "marionette", "views/FormView"], function ($, Marionette, FormView) {
    describe("events tests", function () {
        var url = 'http://ip-api.com/json/',
            form,
            elementsStr,
            elementsObj;

        beforeEach(function () {
            jasmine.Ajax.install();

            elementsStr = '<div id="mockhtml"><input id="link" type="text" value="avenuecode.com"/><div id="alert-form"></div></div>';
            elementsObj = $(elementsStr);

            form = new FormView.FormItem();

            form.ui.link = elementsObj.find('#link');
            form.ui.alert = elementsObj.find('#alert-form');
        });

        it("is the url for search ok?", function () {
            //var expectedData = {};

            form.search();

            var request = jasmine.Ajax.requests.mostRecent();

            expect(request.url).toBe(url + form.ui.link.val());
            //expect(request.data()).toEqual(expectedData);
        });

        it("should return false if the url is not correct", function () {
            form.ui.link = elementsObj.find('#link').val('#!#@#@.com');

            var search = form.search();

            expect(search).not.toBe(true);
        });

        //it("submit a form to search on the map", function () {
        //
        //});

        //it("find me on the map", function () {
        //
        //});

        //it("forget me on the map", function () {
        //
        //});

        afterEach(function () {
            jasmine.Ajax.uninstall();
        })
    });
});


