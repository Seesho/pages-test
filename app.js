var app = angular.module("route", ["ngRoute", "ngCookies"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "main.html",
        controller : "redirect"
    })
    .when("/home", {
        templateUrl : "main.html",
        activetab : "home"
    })
    .when("/blog", {
        templateUrl : "blog.html",
        activetab : "blog"
    })
    .when("/about", {
        templateUrl : "about.html",
        activetab : "about"
    })
    .when("/resume", {
        templateUrl : "resume.html",
        controller : "resume",
        activetab : "resume"
    })
    .when("/projects", {
        templateUrl : "projects.html",
        activetab : "projects"
    })
    .when("/tracker", {
        templateUrl : "tracker.html",
        controller : "tracker",
        activetab : "tracker"
    })
    .otherwise( {
      templateUrl: "main.html",
      controller : "redirect"
    } );

});
