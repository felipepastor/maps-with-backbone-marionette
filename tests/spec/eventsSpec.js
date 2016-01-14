define(["jquery", "marionette"], function ($, Marionette) {
    describe("events tests", function () {
        var url = 'http://ip-api.com/json/';

        beforeEach(function () {
            jasmine.Ajax.install();
        });

        //it("is the url for search ok?", function () {
        //    //spyOn($, "ajax");
        //    //$.ajax({
        //    //    url: url,
        //    //    complete:function(data){
        //    //        console.log(data);
        //    //    }
        //    //});
        //    //
        //    //console.log($.ajax.mostRecentCall);
        //
        //
        //});

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


