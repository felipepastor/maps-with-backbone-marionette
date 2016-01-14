define(['jasmine-boot', 'jasmine-ajax'], function (boot, jasmine) {
    require([
        '../../tests/spec/eventsSpec',
        '../../tests/spec/viewsSpec',
        '../../tests/spec/collectionSpec'
    ], function () {
        //trigger Jasmine
        window.onload();
    });
});