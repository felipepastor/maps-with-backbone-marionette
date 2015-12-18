require.config({
    paths: {
        'jquery': '../vendor/jquery/dist/jquery',
        'underscore': '../vendor/underscore/underscore',
        'backbone': '../vendor/backbone/backbone',
        'backbone.babysitter': '../vendor/backbone.babysitter/lib/backbone.babysitter',
        'backbone.wreqr': '../vendor/backbone.wreqr/lib/backbone.wreqr',
        'marionette': '../vendor/backbone.marionette/lib/core/backbone.marionette',
        'bootstrap': '../vendor/bootstrap/dist/js/bootstrap',
        'material': '../vendor/bootstrap-material-design/dist/js/material'
    },
    shim: {
        'material': {
            'deps': ['bootstrap', 'jquery']
        },
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        marionette: {
            deps: ['backbone'],
            exports: 'Marionette'
        }
    }
});

require(['app', 'material'], function (App) {
    //initialize material design
    $.material.init();

    App.start();
});
