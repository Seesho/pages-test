var app = angular.module("app", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "main.html"
    })
    .when("/info", {
        templateUrl : "info.htm"
    })
    // .when("/resume", {
    //     templateUrl : "resume.htm"
    // })
    // .when("/projects", {
    //     templateUrl : "projects.htm"
    // });
});
