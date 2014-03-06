/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function addHidden(){
  $(".emplyProfile .ui-widget-header").addClass("hidden", 100);
  $(".expertiseList").addClass("hidden", 100);
}

function emplyProfileSwap(){
  $(".emplyProfile").switchClass("emplyProfile", "emply-profile-col", 1000, "linear");
}

function loadEmployeeCal(employeeId) {
  var id = employeeId;
  window.location = "calendar.html"; // take user to employee calendar
//  addHidden();
//  emplyProfileSwap();
//    $("#employeeContent").switchClass("ui-employees", 
//                                    "ui-employees-column", 
//                                    1000, "easeOutQuad");
}

