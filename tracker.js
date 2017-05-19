angular.module('route').controller('tracker', function($scope) {

  $scope.currencies = ['$', 'euro', 'yen'];
  $scope.categories = ['Food', 'Housing', 'Transportation']

  $scope.transactions = [{
    selected : true,
    currency : '$',
    amount : 1,
    description : 'Sample',
    category : 'General'
  }];

  $scope.addTransaction = function(curType, amt, desc, cat){
    $scope.amount = '';
    $scope.description = '';
    $scope.transactions.push({
        selected : false,
        currency : curType,
        amount : (amt ? amt : 0),
        description : (desc ? desc : 'N/A'),
        category : cat});
  };

  $scope.selectOrder = function(col){
    if($scope.ordering == col){
      $scope.orderReverse = !$scope.orderReverse;
    }
    else{
      $scope.ordering = col;
      if(col == 'amount'){
        $scope.ordering = ('amount.length', 'amount');
      }
      $scope.orderReverse = false;
    }
  };


});
