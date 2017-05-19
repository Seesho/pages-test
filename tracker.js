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

  $scope.calcTotal = function(){
    $scope.total = 0;
    for (var i = 0; i < $scope.transactions.length; i++) {//don't use for in otherwise it just returns indices
      // console.log($scope.transactions[i].amount);
      if($scope.transactions[i].selected == true){
        $scope.total += $scope.transactions[i].amount;
      }
    }
  }
  $scope.calcTotal();


});
