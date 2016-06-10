angular.module('loginApp')
    .factory('factory1', function() {
        var factory1 = {};

        factory1.method1 = function () {
            return true;
        };

        factory1.method2 = function () {
            return "hello";
        };

        factory1.test = function (value) {
            return value;
        };

        return factory1;
    }
);