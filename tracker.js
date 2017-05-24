angular.module('route').controller('tracker', function($scope, $cookies) {

// VARIABLE DECLARATIONS
  $scope.currencies = ['$', 'euro', 'yen'];
  $scope.categories = ['Food', 'Housing', 'Transportation'];
  $scope.ordering = 'date';
  $scope.orderReverse = false;
  $scope.total = 0;

  $scope.transactions = [{
    date : new Date(),
    selected : true,
    currency : '$',
    amount : 1,
    description : 'Sample',
    category : 'General'
  }];

  $scope.deletedTransactions = [];

  if($cookies.getObject('storage')){
    $scope.transactions = $cookies.getObject('storage');
  }
  if($cookies.getObject('deleted')){
    $scope.deletedTransactions = $cookies.getObject('deleted');
  }

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
    $scope.calcTotal();
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
    $scope.calcTotal();
  };

// CALCULATES RUNNING TOTAL OF ALL THE SELECTED COLUMNS
  $scope.calcTotal = function(){ //using this as kind of an update function at the moment
    $scope.total = 0;
    for (var i = 0; i < $scope.transactions.length; i++) {//don't use for in otherwise it just returns indices
      // console.log($scope.transactions[i].amount);
      if($scope.transactions[i].selected == true){
        $scope.total += $scope.transactions[i].amount;
      }
    }

    var expires = new Date();
    expires.setDate(expires.getDate() + 1);

    $cookies.putObject('storage', $scope.transactions, {'expires': expires});
    $cookies.putObject('deleted', $scope.deletedTransactions, {'expires': expires});
  }

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

  $scope.undoRemove = function(){
    if($scope.deletedTransactions.length > 0){
      var undo = $scope.deletedTransactions.pop();
      for(var i = 0; i < undo.length; i++){
        $scope.transactions.push(undo[i]);
      }
    }

    $scope.calcTotal();
  }


});
