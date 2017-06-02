angular.module('route').controller('tracker', function($scope, $cookies) {

  // VARIABLE DECLARATIONS
  $scope.currencies = ['$', 'euro', 'yen'];
  $scope.categories = ['General', 'Food', 'Housing', 'Transportation'];
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
      selected : true,
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
    $scope.drawChart();
    var expires = new Date();
    expires.setDate(expires.getDate() + 30);
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

  $scope.setModal = function(i, o){
    // $scope.currIndex = i;
    $scope.currTransaction = angular.copy(o);
    $scope.index = $scope.transactions.indexOf(o);
    $scope.currTransaction.date = new Date($scope.currTransaction.date);
  }

  $scope.saveChanges = function(){
    if($scope.currTransaction.amount){
      $scope.transactions[$scope.index].amount = $scope.currTransaction.amount;
    }
    else{
      $scope.transactions[$scope.index].amount = 0;
    }
    $scope.transactions[$scope.index].category = $scope.currTransaction.category;
    $scope.transactions[$scope.index].description = $scope.currTransaction.description;
    $scope.transactions[$scope.index].date = $scope.currTransaction.date;
    $scope.calcTotal();
  }

  $scope.checkKeyPress = function($event){
    var keyPress = $event.which || $event.keyCode;
    if(keyPress === 13){
      $scope.addTransaction($scope.currency, $scope.amount, $scope.description, $scope.category);
    }
  }

  $scope.modalSaveChanges = function($event){
    // alert('enter');
    var keyPress = $event.which || $event.keyCode;
    if(keyPress === 13){
      $scope.saveChanges();
    }
  }

  $scope.importData = function(){
    alert("IMPORTING");
  }

  $scope.exportData = function(){
    var exp = "sep=,\n";
    // alert(JSON.stringify($scope.transactions));
    for(var i = 0; i < $scope.transactions.length; i++){
      // alert(JSON.stringify($scope.transactions[i]));
      exp += JSON.stringify($scope.transactions[i]) + "\n";
    }
    // alert(exp);
    location.href = 'data:text/csv;charset=UTF-8,' + encodeURIComponent(exp);
  }

  //D3 CODE

  $scope.drawChart = function(){
    d3.select("svg").remove(); //deletes previous graph

    //DECLARING VARIABLES
    var width = 360;
    var height = 360;
    var radius = Math.min(width, height) / 2;
    var color = d3.scaleOrdinal(['purple', 'pink', 'skyblue', 'maroon']);
    var legendRectSize = 18;
    var legendSpacing = 4;

    // ADDING PIE CHART
    var svg = d3.select('#chart')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + (width / 2) +
    ',' + (height / 2) + ')');

    var arc = d3.arc()
    .innerRadius(radius-50)
    .outerRadius(radius);

    var pie = d3.pie()
    .value(function(d) { if(d.selected) return d.amount; })
    .sort(function(a,b){
      return a.category.localeCompare(b.category);
    });

    var path = svg.selectAll('path')
    .data(pie($scope.transactions))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', function(d) {
      return color(d.data.category);
    });

    //ADDING LEGEND

    var legend = svg.selectAll('.legend')
    .data(color.domain())
    .enter()
    .append('g')
    .attr('class', 'legend')
    .attr('transform', function(d, i) {
      var height = legendRectSize + legendSpacing;
      var offset =  height * color.domain().length / 2;
      var horz = -2 * legendRectSize;
      var vert = i * height - offset;
      return 'translate(' + horz + ',' + vert + ')';
    });
    legend.append('rect')
    .attr('width', legendRectSize)
    .attr('height', legendRectSize)
    .style('fill', color)
    .style('stroke', color);

    legend.append('text')
    .attr('x', legendRectSize + legendSpacing)
    .attr('y', legendRectSize - legendSpacing)
    .text(function(d) { return d; });

    //TOOL TIP SECTION

    var tooltip = d3.select('#chart')
    .append('div')
    .attr('id', 'tt');
    tooltip.append('div')
    .attr('id', 'ttamount');
    tooltip.append('div')
    .attr('id', 'ttcategory');
    tooltip.append('div')
    .attr('id', 'ttdescription');

    path.on('mouseover', function(d) {
      tooltip.select('#ttamount').html(d.data.currency+d.data.amount);
      tooltip.select('#ttcategory').html(d.data.category);
      tooltip.select('#ttdescription').html(d.data.description);
      tooltip.style('display', 'block');
    });
    path.on('mouseout', function() {
      tooltip.style('display', 'none');
    });
    path.on('mousemove', function(d) {
      tooltip.style('top', (d3.event.layerY + 10) + 'px')
      .style('left', (d3.event.layerX + 10) + 'px');
    });
  }

  $scope.drawChart();
});
