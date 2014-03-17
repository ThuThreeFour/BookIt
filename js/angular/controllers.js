/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var employeeApp = angular.module('employeeApp', []);

employeeApp.controller('EmployeeCtrl', function($scope, $http) {
  $http.get('js/employeeData.json').success(function(data){
    $scope.employees = data;
    console.log("Found employeeData.json");
  });
  
  $scope.loadEmployeeCal = function(employeeId) {
    var id = employeeId;
    window.location = "calendar.html"; // take user to employee calendar
    //  addHidden();
    //  emplyProfileSwap();
    //  $("#employeeContent").switchClass("ui-employees", 
    //                                    "ui-employees-column", 
    //                                    1000, "easeOutQuad");
    };
});
