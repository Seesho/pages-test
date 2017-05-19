angular.module('route').controller('ctrl', function($scope, $route) {
    $scope.firstName	= 'John';
    $scope.lastName= 'Doe';
    $scope.goob = 'Goob';
    $scope.$route = $route;
});

angular.module('route').controller('redirect', function($scope, $location){
    $location.path('/home');
});

angular.module('route').controller('resume', function($scope){
    $scope.coursework = {
      'Data Structures and Programming':'Designing and analyzing data structures; used C++',
      'Theory of Computation':' Studied formal languages, computability, complexity, reducibility',
      'Algorithm Design and Analysis':'Studied algorithm design techniques: divide-conquer, greedy, dynamic programming',
      'Operating Systems and System Programming':'Built basic operating system using C++',
      'Computer Architecture':'Designed computer systems with Logisim',
      'Programming on Parallel Architectures':'Learned techniques using shared-memory and message-passing APIs such as OpenMP, MPI, and CUDA; primarily used R and C++',
      'Software Engineering':'Documented, fixed errors, and added features for a game code built on C++11',
      'Database Systems':'Studied database models, relational algebra, and query languages; used Python to interact with PostgreSQL',
      'Machine Learning':'Learned to build different statistical models for predicting outputs; used Octave and Python',
    };
});
