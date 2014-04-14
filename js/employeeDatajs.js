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

var tableBackgroundColor;
var availableDays;

// Initialize to current date so that we can immediately grab the appropriate
// JSON file.
var date;
var tempDate = date = new Date();
var currDay = date.getDate();
var currMonth = date.getMonth() + 1; //This will probably cause an off by one error at some point
var currYear = date.getFullYear();

//console.log("=================");
//console.log("INITIAL PAGE LOAD");
//console.log("=================");

//console.log("Day : " + currDay);
//console.log("Month: " + currMonth);
//console.log("Year: " + currYear);

//Load the json file so we can see what timeslots are available
availableDays = getJsonFile(currYear, currMonth);

//This function will populate a jQuery dialog box with all times for the selected day
function buildDay(date) {
  var content = "";
  //http://stackoverflow.com/questions/1168807/how-can-i-add-a-key-value-pair-to-a-javascript-object-literal
  var monthNames = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December"
  };
  var timeStrings = {
    0: "0800",
    1: "0900",
    2: "1000",
    3: "1100",
    4: "1200",
    5: "1300",
    6: "1400",
    7: "1500",
    8: "1600",
    9: "1700"
  };
  var monthConversions = {
    "01": 1,
    "02": 2,
    "03": 3,
    "04": 4,
    "05": 5,
    "06": 6,
    "07": 7,
    "08": 8,
    "09": 9,
    "10": 10,
    "11": 11,
    "12": 12
  };
  var dateSplit = date.split("/");
  var month = parseInt(dateSplit[0]);
  var dayNum = parseInt(dateSplit[1]); //http://www.w3schools.com/jsref/jsref_parseint.asp
  var year = dateSplit[2];
  var monthName = monthNames[month];

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
  availableDays = getJsonFile( year, month );
  for (var i = 8; i < 18; i++)
  {
    //Lets make sure the day is free before we make it clickable
    if (availableDays[dayNum.toString()][timeStrings[i - 8]] === "Empty")
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
function dayFree(fDate)
{
  var curDate = new Date();
  var curD = curDate.getDate();
  var curM = curDate.getMonth() + 1;
  var curY = curDate.getFullYear();
  var d = fDate.getDate();
  var m = fDate.getMonth() + 1;
  var y = fDate.getFullYear();
  var td = tempDate.getDate();
  var tm = tempDate.getMonth() + 1;
  var ty = tempDate.getFullYear();
  
  var free = false;

  //console.log("==================");
  //console.log("Inside dayFree");
  //console.log("==================");

  //console.log("Date Passed to Function: " + fDate);
  //console.log("Day : " + d);
  //console.log("Month: " + m);
  //console.log("Year: " + y);
  //console.log("====================================");
  //console.log("Current or Tempt Date: " + tempDate);
  //console.log("Day : " + td);
  //console.log("Month: " + tm);
  //console.log("Year: " + ty);

  if (fDate < curDate) {
    //console.log("Date being checked is prior to current date");
    return [false,
      "",
      "Cannot book appointments before " + curM + "/" + (curD + 1) + "/" + curY];
  }
  
  // Double check that the availableDays variable is defined!
  if (typeof availableDays === 'undefined') {
    //console.log("=============================");
    //console.log("Available Days variable is undefined");
    //console.log("=============================");
    availableDays = getJsonFile(y, m);
  }

  // jQuery datepicker showBeforeDay option behaves in a way that I do
  // not understand and seems to check previous or next months first.
  // If that is the case, we need to load the appropriate JSON file.
  if ( (m !== tm) || (y !== ty)) {
    //console.log('fDate !== tempDate');
    //console.log('fDate:    ' + fDate);
    //console.log('tempDate: ' + tempDate);
    tempDate = fDate;
    //console.log('new tempDate: ' + tempDate);
    availableDays = getJsonFile(y, m);
  }

  var timeStrings = {
    0: "0800",
    1: "0900",
    2: "1000",
    3: "1100",
    4: "1200",
    5: "1300",
    6: "1400",
    7: "1500",
    8: "1600",
    9: "1700"
  };

  //Loop through the time entries int he JSON file and make sure atleast
  //one timeslot says Empty, otherwise the day is booked
  for (var i = 0; i <= 9; i++)
  {
    //console.log("dayFree LOOP: " + availableDays[d][timeStrings[i]]);
    if (availableDays[d][timeStrings[i]] === "Empty")
    {
      //console.log("Setting free to true for " + m + "/" + d);
      free = true;
      break;
    }
  }
  if (free === false)
  {
    //console.log("month: " + m + " Day: " + d + " is booked");
    return [false, "", "Day booked"]; //Day can't be booked
  }
  else
  {
    //console.log("month: " + m + " Day: " + d + " is free");
    return [true, "", "Available appointment times"]; //Day can still be booked
  }
  
  //console.log("==========================");
  //console.log("Exit dayFree funciton");
  //console.log("==========================");
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

// Initiates the AJAX call to grab the JSON file from the server.
// Takes the year and month and finds the file named based on
// those values. It will create the file if it does not exist.
// 
// Inputs  : y - Year, m - Month
// Returns : A JSON object containing the data from the requested JSON file.
function getJsonFile(y, m)
{
  var jsonData;
  //console.log("===============================");
  //console.log("In getJsonFile : Y=" + y + " M="+ m);
  //console.log("===============================");

  jQuery.ajax({
    async: false,
    dataType: "json",
    url: "json/" + m + "_" + y + ".json",
    success: function(data) {
      jsonData = data;
      //console.log("Loading " + "json/" + m + "_" + y + ".json");
    },
    error: function(data) {
      //http://stackoverflow.com/questions/6371857/how-to-call-a-specific-function-in-a-php-script-via-ajax
      //Will create a json file for the current month
      //console.log("Error encountered opening file month: " + m + " year: " + y);
      jQuery.ajax({
        async: false,
        method: "post",
        url: "writeJson.php",
        data: "function=writeDefaultMonth&month=" + m + "&year=" + y,
        success: function() {
          //console.log("RECURSIVE CALL TO getJsonFile");
          // Now that the file exists, we can attempt to return the data.
          jsonData = getJsonFile(y, m);
        }
      });
    }
  });
  //console.log("==================================");
  //console.log("Exit getjsonFile");
  //console.log("==================================");
  return jsonData;
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
    //var date = new Date();

    $("#calendarDiv").datepicker({
      //setDate: date,
      onSelect: buildDay,
      /*onSelect: function(date) {
        //console.log("============================");
        //console.log("datePicker.onSelect");
        //console.log("============================");
        //console.log("Date: " + date);
        buildDay(date);
      },*/
      //Courtesy of:
      //http://forum.jquery.com/topic/making-past-dates-unselectable-unclickable
      minDate: 0,
      beforeShowDay: dayFree
    }
    //{
    // changeMonth: true,
    // changeYear: true
    //}
    );
  });
});