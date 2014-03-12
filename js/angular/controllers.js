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
});
