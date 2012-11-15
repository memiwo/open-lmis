'use strict';

/* App Module */
angular.module('openlmis', ['openlmis.services'], function ($routeProvider, $locationProvider, $httpProvider) {

    var interceptor = ['$rootScope', '$q', function (scope, $q) {

        function success(response) {
            return response;
        }

        function error(response) {
            switch (response.status) {
                case 403:
                    window.location = "/public/pages/access-denied.html";
                    break;
                case 401:
                    console.log("login model");
                    break;
                default:
                    console.log(response.status);
                    break;
            }
            return $q.reject(response);
        }

        return function (promise) {
            return promise.then(success, error);
        }

    }];
    $httpProvider.responseInterceptors.push(interceptor);
});
