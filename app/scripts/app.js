define(['marionette'], function (Marionette) {
    var App = new Marionette.Application();

    App.addRegions({
        header: "#header-region",
        footer: "#footer-region",
        body: "#body-region"
    });

    App.on("before:start", function () {
        console.log('Está para comecar!!!');
    });

    App.on("start", function () {
        console.log('FUNCIONOU!!!')
    });

    return App;
});