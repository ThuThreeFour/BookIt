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
  
  $scope.loadEmployeeCal = function(event, employeeId) {
    var id = employeeId;
    
    if( $("#calendarDiv").css("display") === "block"){
      $("#calendarDiv").toggle("scale", { "percent": 0, "duration": 1000, "queue": false});
    }
    //window.location = "calendar.html"; // take user to employee calendar
    $(".empl-name-title").addClass("hidden", {"duration": 500, "queue":true});
    $(".expertiseList").addClass("hidden", {"duration": 500,"queue": true});
    
    $(".emplyProfile").switchClass( "emplyProfile", "emplyProfileB", {
      "duration": 500,
      "queue": true
    });
    
    $(".primary").removeClass("primary", {"duration": 1000, "queue": true});
    $(event.target).parent().addClass("primary", 
      {"duration": 1000, "queue": true, 
        "complete": function(){$("#calendarDiv").toggle("scale", { "percent": 0, "duration": 1000, "queue": false});} });
       
    $(".ChrisA").switchClass("ChrisA", "ChrisB",{
      "duration": 2000,
      "queue": true
    });
    
    $(".ThuA").switchClass("ThuA", "ThuB",{
      "duration": 2000,
      "queue": true
    });
    
    $(".JacobA").switchClass("JacobA", "JacobB",{
      "duration": 2000,
      "queue": true
    });
  };
});
