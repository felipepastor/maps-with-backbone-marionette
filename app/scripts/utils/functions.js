define(["app"], function (App) {
    App.module("Util", function (Util) {
        Util.Functions = {
            ValidURL: function (str) {
                var myRegExp = /(http(s)?:\\)?([\w-]+\.)+[\w-]+[.com|.in|.org]+(\[\?%&=]*)?/;
                return myRegExp.test(str);
            }
        };
    });

    return App.Util.Functions;
});