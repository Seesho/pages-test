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

    $scope.experience = {
      'ServiceNow Application Developer' : {'title' : 'test', 'date' : '(November 2015 - Current)', 'desc' : ['Developed front-end pages in AngularJS and Bootstrap',
        'Cleaned data and mapped to load in correct fields',
        'Integrated Bomgar using REST and SOAP web services',
        'Analyzed customer requirements and developed features through user stories'
      ]},
      'Training and Documentation Analyst' : {'title' : '', 'date' : '(June 2015 - November 2015)', 'desc' : ['Wrote technical documentation and training scripts for quality assurance',
    'Created training resources and knowledge articles']}
    };

    $scope.skills = {
      'Strong academic background' : 'in Data Structures and Algorithms',
      'Proficient in Object Oriented Programming' : '(C++, Java, Python)',
      'Experienced in stack development' : '(HTML, CSS, Javascript, AngularJS, Bootstrap)',
      'Experienced in version control' : '(Git)',
      'Familiar with' : 'Agile methodlogy and Scrum framework'
    };
});
