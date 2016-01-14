define(['jasmine-boot'], function () {
    require([
        '../../tests/spec/eventsSpec',
        '../../tests/spec/viewsSpec'], function() {
        //trigger Jasmine
        window.onload();
    });
});