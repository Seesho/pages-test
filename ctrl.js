angular.module('route').controller('ctrl', function($scope) {
    $scope.firstName	= 'John';
    $scope.lastName= 'Doe';
    $scope.goob = 'Goob';
});

angular.module('route').controller('tracker', function($scope) {

  $scope.currencies = ['$', 'euro', 'yen'];
  $scope.categories = ['Food', 'Housing', 'Transportation']

  $scope.transactions = [{
    checked : true,
    amount : 1,
    description : 'Sample',
    category : 'General'
  }];

  $scope.addTransaction = function(curType, amt, desc, cat){
    $scope.amount = '';
    $scope.description = '';
    $scope.transactions.push({
        checked : false,
        amount : curType + (amt ? amt : 0),
        description : (desc ? desc : 'N/A'),
        category : cat});
  };

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
