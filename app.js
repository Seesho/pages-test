var app = angular.module("app", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "main.html"
    })
    .when("/info", {
        templateUrl : "info.html"
    })
    .when("/resume", {
        templateUrl : "resume.html"
    })
    .when("/projects", {
        templateUrl : "projects.html"
    });
});
