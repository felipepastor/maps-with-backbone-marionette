/**
 * @author: Felipe Pastor
 * @date: 20/12/2015
 * @description: Configurations of requireJS
 **/

require.config({
    //baseUrl: '/app',
    paths: {
        jquery: '../vendor/jquery/dist/jquery',
        underscore: '../vendor/underscore/underscore',
        backbone: '../vendor/backbone/backbone',
        'backbone.babysitter': '../vendor/backbone.babysitter/lib/backbone.babysitter',
        'backbone.wreqr': '../vendor/backbone.wreqr/lib/backbone.wreqr',
        marionette: '../vendor/backbone.marionette/lib/core/backbone.marionette',
        bootstrap: '../vendor/bootstrap/dist/js/bootstrap',
        material: '../vendor/bootstrap-material-design/dist/js/material',
        ripples: '../vendor/bootstrap-material-design/dist/js/ripples',
        text: "../vendor/require.text/require.text",
        tpl: "../vendor/underscore_tpl/underscore.tpl",
        async: '../vendor/requirejs-plugins/src/async',
        moment: '../vendor/moment/min/moment.min',
        jasmine: '../vendor/jasmine-core/lib/jasmine-core/jasmine',
        'jasmine-html': '../vendor/jasmine-core/lib/jasmine-core/jasmine-html',
        'jasmine-boot': '../vendor/jasmine-core/lib/jasmine-core/boot',
        'jasmine-ajax': '../vendor/jasmine-ajax/lib/mock-ajax'
    },
    shim: {
        bootstrap: {
            deps: ['jquery']
        },
        ripples: {
            deps: ['jquery']
        },
        material: {
            deps: ['ripples', 'bootstrap']
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
        },
        jasmine: {
            exports: 'jasmine'
        },
        'jasmine-html': {
            deps: ['jasmine']
        },
        'jasmine-boot': {
            deps: ['jasmine', 'jasmine-html']
        },
        'jasmine-ajax': {
            deps: ["jasmine-boot"],
            exports: "jasmine"
        }
    }
});
