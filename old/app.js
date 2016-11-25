var app = angular.module("app", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/home", {
        templateUrl : "main.html"
    })
    .when("/about", {
        templateUrl : "about.html"
    })
    .when("/resume", {
        templateUrl : "resume.html"
    })
    .when("/projects", {
        templateUrl : "projects.html"
    });
});
