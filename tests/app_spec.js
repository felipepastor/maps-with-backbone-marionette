define(['jasmine-boot', 'backbone'], function (jasmineBoot, Backbone) {
    require([
        '../../tests/spec/eventsSpec',
        '../../tests/spec/viewsSpec',
        '../../tests/spec/collectionSpec'
    ], function() {
        //trigger Jasmine
        window.onload();
    });
});