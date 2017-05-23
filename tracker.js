angular.module('route').controller('tracker', function($scope) {

// VARIABLE DECLARATIONS
  $scope.currencies = ['$', 'euro', 'yen'];
  $scope.categories = ['Food', 'Housing', 'Transportation']
  $scope.ordering =

  $scope.transactions = [{
    date : new Date(),
    selected : true,
    currency : '$',
    amount : 1,
    description : 'Sample',
    category : 'General'
  }];

  $scope.deletedTransactions = [];

// FUNCTION DECLARATIONS

// PUSHES TRANSACTIONS TO RUNNING TOTAL LIST OF TRANSACTIONS
  $scope.addTransaction = function(curType, amt, desc, cat){
    $scope.amount = '';
    $scope.description = '';
    $scope.transactions.push({
        date : new Date(),
        selected : false,
        currency : curType,
        amount : (amt ? amt : 0),
        description : (desc ? desc : 'N/A'),
        category : cat});
  };

// HANDLES THE ORDERBY VALUE OF THE TABLE
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

// CALCULATES RUNNING TOTAL OF ALL THE SELECTED COLUMNS
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

  $scope.selectAll = function(){
    for(var i = 0; i < $scope.transactions.length; i++){
      $scope.transactions[i].selected = true;
    }
    $scope.calcTotal();

  }

  $scope.deselectAll = function(){
    for(var i = 0; i < $scope.transactions.length; i++){
      $scope.transactions[i].selected = false;
    }
    $scope.calcTotal();

  }

  $scope.removeSelected = function(){
    $scope.deletedTransactions.push($scope.transactions.filter( function(t){
      return t.selected == true;
    }));

    $scope.transactions = $scope.transactions.filter( function(t){
      return t.selected == false;
    });
    $scope.calcTotal();
  }


});
