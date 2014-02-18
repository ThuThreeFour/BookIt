/* 
 * File: BookIt/js/employeeData.js
 * Author: Thu A. Tran, UMass Lowell CompSci Student
 * Course: GUI Programming 1
 * Email: thu_tran2@student.uml.edu
 * Description: This page fill the Book-It homepage with employees' data.
 * Code and comments from this page is a either a modification or original work 
 * of Jesse M. Heines's.
 * Updated: February 16, 2014
 * (Documentation is a modification of Jesse M. Heines's (JMH) work.)
 */

var employeeData;

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


function placeEmployeeData() {
  var strContent = " ";
  // create dynamic content of employees' data from employeeData.json
  // loop through all employees
  for (var empl = 0; empl < employeeData.employees.length; empl++) {
    strContent += "<div class=" + "emplyProfile" + ">";
    // only exception to using single quote for string for ease of use 
    strContent += '<img src="' + employeeData.employees[empl].img + '"' + 'class="' + 'pic' + '">';
    strContent += "<h1>" + employeeData.employees[empl].firstName + "</h1>";
    strContent += "<h2>" + employeeData.employees[empl].jobTitle + "</h2>";
    strContent += "<ul class="+ "expertiseList" +">";
    strContent += "<lh class=" + "expertiseBullet" +">" + "Expertise" + "</lh>";
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
  placeEmployeeData();
});





