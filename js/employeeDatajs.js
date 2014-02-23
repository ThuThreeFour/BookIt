/* 
 *  File: BookIt/js/employeeData.js
 *  Author: Thu A. Tran, UMass Lowell CompSci Student
 *  Course: GUI Programming 1
 *  Email: thu_tran2@student.uml.edu
 *  Description: This page fill the Book-It homepage with employees' data.
 *  Code and comments from this page is a either a modification or original work 
 *  of Jesse M. Heines's.
 *  Updated: February 22, 2014
 *  (Documentation is a modification of Jesse M. Heines's (JMH) work.)
 */

var employeeData;
var employeeId;

// The ajax call allows for synchronous loading, which is needed
// here so that the JSON file can be completely loaded before
// we continue. On 'success', the callback function is called 
// to store the data into the variable employeeData. 
jQuery.ajax({
  async: false,
  dataType: "json",
  url: "js/employeeData.json",
  success: function(data) {
    employeeData = data;
  }
});

function loadEmployeeCal(employeeId) {
  var id = employeeId;
  window.location = "calendar.html"; // take user to employee calendar
}

function placeEmployeeData() {


  var strContent = " ";
  // create dynamic content of employees' data from employeeData.json
  // loop through all employees
  for (var empl = 0; empl < employeeData.employees.length; empl++) {
    strContent += "<div class='emplyProfile ui-widget-content ui-corner-all'>";
    //strContent += '<img src="' + employeeData.employees[empl].img + '"' + 'class="' + 'pic' + '" >';
    employeeId = employeeData.employees[empl].firstName;
    //strContent += '<img src=' + employeeData.employees[empl].img + " " + 'class=' + 'pic' + " " + 'id="' + employeeId + '" ' + "onclick=loadEmployeeCal(" + '"' + employeeId + '"' + ')' + '>';
    // sets corresponding id to employee image  
    strContent += "<img src='" + employeeData.employees[empl].img + "' class='pic' id='" + employeeId + "' ";
    strContent += "onclick='loadEmployeeCal(\"" + employeeId + "\")'>";
    //document.getElementById()
    strContent += "<div class='ui-widget-header ui-corner-all'>";
    strContent += "<h1>" + employeeId + "</h1>";
    strContent += "<h2>" + employeeData.employees[empl].jobTitle + "</h2>";
    strContent += "</div>";
    strContent += "<ul id=" + "expertiseList" + ">";
    strContent += "<lh class=" + "expertiseBullet" + ">" + "Expertise" + "</lh>";
    // loop through employee's expertise list
    for (var exprt = 0; exprt < employeeData.employees[empl].expertiseList.expertise.length; exprt++) {
      strContent += "<li>" + employeeData.employees[empl].expertiseList.expertise[exprt] + "</li>";
    }
    strContent += "</ul></div>";
  }

  // Place dynamic content on the page
  jQuery("#employeeContent").html(strContent);
}

// Once the document is ready, we can place the content.
jQuery(document).ready(function() {

  // Setting properties to Log In button 
  $("#loginButton").button({
    label: "Log In", // give label to login button 
    icons: {
      primary: "ui-icon-person" // person icon 
    }
  });

  // Setting properties to employee Log In button
  $("#nav1").button({
    icons: {
      primary: "ui-icon-person"
    }
  });

  // Setting property to Home button
  $("#nav2").button({
    icons: {
      primary: "ui-icon-home"
    }
  });

  // Dynamic placement of employee content 
  placeEmployeeData();
});





