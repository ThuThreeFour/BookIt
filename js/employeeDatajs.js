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
var tableBackgroundColor;
var availableDays;

// The ajax call allows for synchronous loading, which is needed
// here so that the JSON file can be completely loaded before
// we continue. On 'success', the callback function is called 
// to store the data into the variable employeeData. 
/*jQuery.ajax({
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
 employeeId = employeeData.employees[empl].firstName;
 
 strContent += "<div id='" + employeeId + "' class='emplyProfile ui-widget-content ui-corner-all'>";
 //strContent += '<img src="' + employeeData.employees[empl].img + '"' + 'class="' + 'pic' + '" >';
 //strContent += '<img src=' + employeeData.employees[empl].img + " " + 'class=' + 'pic' + " " + 'id="' + employeeId + '" ' + "onclick=loadEmployeeCal(" + '"' + employeeId + '"' + ')' + '>';
 // sets corresponding id to employee image  
 strContent += "<img src='" + employeeData.employees[empl].img + "' class='pic ui-corner-all' "
 ;    strContent += "onclick='loadEmployeeCal(\"" + employeeId + "\")'>";
 //document.getElementById()
 strContent += "<div class='ui-widget-header ui-corner-all empl-name-title'>";
 strContent += "<h1>" + employeeId + "</h1>";
 strContent += "<h2>" + employeeData.employees[empl].jobTitle + "</h2>";
 strContent += "</div>";
 strContent += "<ul class=" + "expertiseList" + ">";
 strContent += "<lh class=" + "expertiseBullet" + ">" + "Expertise" + "</lh>";
 // loop through employee's expertise list
 for (var exprt = 0; exprt < employeeData.employees[empl].expertiseList.expertise.length; exprt++) {
 strContent += "<li>" + employeeData.employees[empl].expertiseList.expertise[exprt] + "</li>";
 }
 strContent += "</ul></div>";
 }
 
 // Place dynamic content on the page
 jQuery("#employeeContent").html(strContent);
 } */

// Once the document is ready, we can place the content.
jQuery(document).ready(function() {

  // Setting properties to Log In button 
  $("#loginButton").button({
    label: "Log In", // give label to login button 
    icons: {
      primary: "ui-icon-person" // person icon 
    }
  });

  $("#registerButton").button({
    label: "Register",
    icons: {
      primary: "ui-icon-pencil"
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



  //courtesy of http://stackoverflow.com/questions/887696/jquery-datepicker-onselect-wont-work
  $(function() {
    $("#calendarDiv").datepicker({
      onSelect: function(date) {
        console.log(date);
        buildDay(date);
      },
      //Courtesy of:
      //http://forum.jquery.com/topic/making-past-dates-unselectable-unclickable
      minDate : 0,
      beforeShowDay : dayFree
    }

    //{
    // changeMonth: true,
    // changeYear: true
    //}
    );
  });
});

//This function will populate a jQuery dialog box with all times for the selected day
function buildDay(date) {
  var content = "";
  var monthNames = { //http://stackoverflow.com/questions/1168807/how-can-i-add-a-key-value-pair-to-a-javascript-object-literal
    1 : "January",
    2 : "February",
    3 : "March",
    4 : "April",
    5 : "May",
    5 : "June",
    7 : "July",
    8 : "August",
    9 : "September",
    10 : "October",
    11 : "November",
    12 : "December"
  };
  var timeStrings = {
    0 : "0800",
    1 : "0900",
    2 : "1000",
    3 : "1100",
    4 : "1200",
    5 : "1300",
    6 : "1400",
    7 : "1500",
    8 : "1600",
    9 : "1700"
  };
  var monthConversions = {
    "01" : 1,
    "02" : 2,
    "03" : 3,
    "04" : 4,
    "05" : 5,
    "06" : 6,
    "07" : 7,
    "08" : 8,
    "09" : 9,
    "10" : 10,
    "11" : 11,
    "12" : 12
  };
  var dateSplit = date.split("/");
  var month = parseInt(dateSplit[0]);
  var dayNum = parseInt(dateSplit[1]); //http://www.w3schools.com/jsref/jsref_parseint.asp
  var year = dateSplit[2];
  var monthName = monthNames[month];
  
  //Load the json file so we can see what timeslots are available
  jQuery.ajax({
        async: false,
        dataType: "json",
        url: "json/" + month + "_" + year + ".json",
        success: function(data) {
          availableDays = data;
          console.log("Loading " + "json/" + month + "_" + year + ".json" + " Day : " + dayNum);
        },
        error: function(data) {
          //http://stackoverflow.com/questions/6371857/how-to-call-a-specific-function-in-a-php-script-via-ajax
          //Will create a json file for the current month
          jQuery.ajax({
            method : "post",
            url : "writeJson.php",
            data : "function=writeDefaultMonth&month=" + month +"&year="+year
          });
        }
      });

  content += "<div class='ui-widget ui-calendar-day'>";
  //This is the div that contains all widget content
  content += "<div class='ui-widget-content ui-corner-all'>";
  //This is the header div
  content += "<div class='ui-widget-header ui-corner-all'>";

  //Time to populate the day popup header
  content += "<h2>";
  content += monthNames[month] + " " + dayNum + ", " + year;
  //content += dayNum + " " + monthNames[month] + " " + year;
  content += "</h2>";
  content += "</div>";

  //Lets begin our unordered list
  //To make the onclick act as a submit:
  //https://forums.digitalpoint.com/threads/html-checkbox-onclick-submit.1271195/
  content += "<ul class=\"timeList\">"; //onclick=\"this.form.submit();\">";
  //This loop will create a list item for every hour of the day between 0800-1700
  for (var i = 8; i < 18; i++)
  {
    //Lets make sure the day is free before we make it clickable
    if(availableDays[dayNum.toString()][timeStrings[i-8]] === "Empty")
    {
      content += "<li class=\"timeListItem\" onmouseover=\"ChangeColor(this, true)\"";
      content += "onmouseout=\"ChangeColor(this, false)\"";
      content += "onclick=\"loadInfoForm(" + year + ", " + month + ", " + dayNum + ", " + i + "00)\">";
    }
    else
    {
      content += "<li class=\"timeListItem\"\>";
    }
    
    //content += "<li class=\"timeListItem\" onmouseover=\"ChangeColor(this, true)\"";

    //Lets make the time in civilian format
    //To avoid 0 showing up as a time, we check to see if i == 12
    if (i === 12)
    {
      content += 12;
    }
    else
    {
      content += i % 12;
    }
    if (i >= 12)
    {
      content += " pm"; //Because civilians can't subtract 12 from military time
    }
    else
    {
      content += " am"; //Because civilians can't subtract 12 from military time
    }

    //end the list item
    content += "</li>";

  }
  content += "</ul>";
  content += "</div></div>";

  //The following is from:
  //https://jqueryui.com/dialog/#default
  jQuery(".daySelector").html(content);

  //Using a dialog will pop up the day view in a dialog box.
  //Setting the min height and width found here:
  //http://api.jqueryui.com/dialog/#option-minHeight
  //Setting the UI effects for open/close here:
  //http://api.jqueryui.com/category/effects/
  //http://api.jqueryui.com/dialog/#option-hide
  jQuery(".daySelector").dialog({minWidth: 500, minHeight: 500,
    show: {
      effect: "slide",
      duration: 500
    },
    hide: {
      effect: "slide",
      duration: 500
    }});

}

//idea courtesy of http://stackoverflow.com/questions/3682805/javascript-load-a-page-on-button-click
//This function will call the form.html page and pass the desired appointment information
function loadInfoForm(year, month, dayNum, time) {
  window.location.href = "form.html?year=" + year + "&month=" + month + "&dayNum=" + dayNum + "&time=" + time;
}

//This was particularly useful here:
//http://stackoverflow.com/questions/677976/jquery-ui-datepicker-disable-specific-days
function dayFree(date)
{
  var day = date.getDate();
  var month = date.getMonth() + 1; //This will probably cause an off by one error at some point
  var year = date.getFullYear();
  var free = false;
  var timeStrings = {
    0 : "0800",
    1 : "0900",
    2 : "1000",
    3 : "1100",
    4 : "1200",
    5 : "1300",
    6 : "1400",
    7 : "1500",
    8 : "1600",
    9 : "1700"
  };
  
  //console.log("date: " + date + " Month: " + date.getMonth());
  
  jQuery.ajax({
        async: false,
        dataType: "json",
        url: "json/" + month + "_" + year + ".json",
        success: function(data) {
          availableDays = data;
          //console.log("Loading " + "json/" + month + "_" + year + ".json" + " Day : " + day);
        },
        error: function(data) {
          //http://stackoverflow.com/questions/6371857/how-to-call-a-specific-function-in-a-php-script-via-ajax
          //Will create a json file for the current month
          jQuery.ajax({
            method : "post",
            url : "writeJson.php",
            data : "function=writeDefaultMonth&month=" + month +"&year="+year
          });
        }
      });
      
      //Loop through the time entries int he JSON file and make sure atleast
      //one timeslot says Empty, otherwise the day is booked
      for(var i = 0; i <= 9; i++)
      {
        if(availableDays[day][timeStrings[i]] === "Empty")
        {
          free = true;
        }
      }
      if(free === false)
      {
        //console.log("month: " + date.getMonth() + " Day: " + day + " is booked" );
        return {0 : false, 2: "Day booked"}; //Day can't be booked
      }
      else
      {
        return {0 : true, 2: "Available appointment times"}; //Day can still be booked
      }
}

//This function is used to highlight the day that the user is trying
//to select. Found here:
//http://imar.spaanjaars.com/312/how-do-i-make-a-full-table-row-clickable
function ChangeColor(tableRow, highLight)
{
  //Since we might decide to use different CSS stylings later, this will dynamically
  //store the table background color so that when we highlight the cells they can 
  //return to the color they were before being highlighted
  if (tableBackgroundColor === undefined)
  {
    tableBackgroundColor = tableRow.style.backgroundColor;
  }
  if (highLight)
  {
    //This is the color of the highlighted cell
    tableRow.style.backgroundColor = '#e4f1fb';
  }
  else
  {
    //This is what the color returns to when not hovered over
    tableRow.style.backgroundColor = tableBackgroundColor;
  }
}