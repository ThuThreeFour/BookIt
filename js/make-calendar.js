/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var currentDate = new Date(); //Need to always know the current date
var currentCalendarDate = currentDate;//Used to help with previous and next buttons
var tableBackgroundColor; //Used so our table highlighting doesn't break if we change styles in the future
//Need this so we can label the month on the calendar and on the dialog popup for the day
var monthNames = ["January", "February", "March", "April",
  "May", "June", "July", "August", "September", "October",
  "November", "December"];

//This function will populate a jQuery dialog box with all times for the selected day
function buildDay(year, month, dayNum) {
  var content = "";
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
  for (var i = 8; i < 18; i++)
  {
    content += "<li class=\"timeListItem\" onmouseover=\"ChangeColor(this, true)\"";
    content += "onmouseout=\"ChangeColor(this, false)\"";
    content += "onclick=\"loadInfoForm(" + year + ", " + month + ", " + dayNum + ", " + i + "00)\">";

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

//This function takes a javascript date object and will populate a calendar based
//on that date. Should no date be supplied then it will assume todays date is the
//appropriate date to build off of
function buildCalendar(date) {
  var content = "";
  var dayNum = 1; //used for enumerating days on the calendar
  //var current = date;

  //in the case that no date has been passed in, lets use a default
  if (date !== undefined)
  {
    currentCalendarDate = date;
  }
  var month = currentCalendarDate.getMonth(); //returns month from 0-11
  var day = currentCalendarDate.getDate(); //returns day from 1-31
  var weekDay = currentCalendarDate.getDay();//returns a day num from 0-6
  var year = currentCalendarDate.getFullYear(); //returns four digit year
  var foundFirst = 0;//boolean used for correct day printing on calendar

  //We need certain information about the first of the month
  //  Found this site especially helpful:
  //  http://stackoverflow.com/questions/13571700/get-first-and-last-date-of-current-month-with-javascript-or-jquery
  //  And this: http://www.w3schools.com/jsref/jsref_obj_date.asp
  var firstOfMonth = new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth(), 1);

  //Need to figure out how many days are in February
  //leap year check
  if ((year % 100 !== 0) && (year % 4 === 0) || (year % 400 === 0)) {
    totalFeb = 29;
  }
  //Boring normal year
  else {
    totalFeb = 28;
  }
  //Need to know how many days are in the month, initialize this array
  var totalDays = [31, totalFeb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  //This is the whole widget div
  content += "<div class='ui-widget ui-calendar'>";
  //This is the div that contains all widget content
  content += "<div class='ui-widget-content ui-corner-all'>";
  //This is the header div
  content += "<div class='ui-widget-header ui-corner-all'>";
  content += "<h2>";
  content += "<button id=\"prev-button\" onclick=\"loadPreviousMonth()\"></button>";
  content += "<div id=\"calendarTitle\">" + monthNames[currentCalendarDate.getMonth()] + " " + currentCalendarDate.getFullYear() + "</div>";
  content += "<button id=\"next-button\" onclick=\"loadNextMonth()\"></button>";
  content += "</h2></div>";
  //Start the table
  content += "<table class=\"calendarTable\">";

  //Build the row of the table that lists the days of the week
  content += "<tr>";
  content += "<th class=\"calendarHeading\">" + "SUNDAY" + "</th>";
  content += "<th class=\"calendarHeading\">" + "MONDAY" + "</th>";
  content += "<th class=\"calendarHeading\">" + "TUESDAY" + "</th>";
  content += "<th class=\"calendarHeading\">" + "WEDNESDAY" + "</th>";
  content += "<th class=\"calendarHeading\">" + "THURSDAY" + "</th>";
  content += "<th class=\"calendarHeading\">" + "FRIDAY" + "</th>";
  content += "<th class=\"calendarHeading\">" + "SATURDAY" + "</th>";
  content += "</tr>";

  //Time to start placing days. Numbered days should match an actual calendar
  //The following loop will loop through each week of the month and place the
  //numbered days in the correct placeholders in the table
  for (var weekCounter = 0; weekCounter < 6; weekCounter++)
  {
    content += "<tr>";//start the current 'week'
    for (var dayCounter = 0; dayCounter < 7; dayCounter++)
    {
      //To make sure we get the first day of the month right
      if (foundFirst === 0 && dayCounter !== firstOfMonth.getDay())
      {
        //These will be the unnumbered days at the start of the month
        content += "<td class=\"calendarDay\"></td>";
        continue;
      }

      //Set the foundFirst boolean to signify we have printed the correct
      //first day of the month
      foundFirst = 1;
      if (dayNum <= totalDays[month])
      {
        //Check to see if it is today's date so we can have special styling
        if (dayNum === currentDate.getDate() && currentCalendarDate.getMonth() === currentDate.getMonth() && currentCalendarDate.getFullYear() === currentDate.getFullYear())
        {
          console.log(currentDate.getDate());
          content += "<td class=\"currentDate\" onmouseover=\"ChangeColor(this, true)\" onmouseout=\"ChangeColor(this, false)\" onclick=\"buildDay(" + currentCalendarDate.getFullYear() + ", " + currentCalendarDate.getMonth() + ", " + dayNum + ")\">" + dayNum + "</td>";
        }
        //Checks for days of this month that have already past so we can style them as inactive
        else if (dayNum < currentDate.getDate() && currentCalendarDate.getMonth() === currentDate.getMonth() && currentCalendarDate.getFullYear() === currentDate.getFullYear())
        {
          content += "<td class=\"calendarDay\">" + dayNum + "</td>";
        }
        //Makes every day that we have passed in previous months/years unclickable
        else if (currentCalendarDate.getMonth() < currentDate.getMonth() || currentCalendarDate.getFullYear() < currentDate.getFullYear())
        {
          content += "<td class=\"calendarDay\">" + dayNum + "</td>";
        }
        else
        {
          content += "<td class=\"calendarDay\" onmouseover=\"ChangeColor(this, true)\" onmouseout=\"ChangeColor(this, false)\" onclick=\"buildDay(" + currentCalendarDate.getFullYear() + ", " + currentCalendarDate.getMonth() + ", " + dayNum + ")\">" + dayNum + "</td>";
        }
      }
      else if ((dayNum > totalDays[month]) && dayCounter < 7) //Makes sure we don't print day numbers that don't exist
      {
        //This is one of the unnumbered, unclickable cells after the last numbered day of the month
        content += "<td class=\"calendarDay\"></td>";
      }
      //Increment the day number for the next day of the week
      dayNum++;
    }
    content += "</tr>";//End the current 'week'

    //Because some months have more weeks than others, we run into a case
    //where we will sometimes have a full row in the table with no numbered
    //days. To avoid this we have a break statement so there is no completely
    //empty rows
    if (dayNum > totalDays[month])
    {
      break;
    }
  }

  content += "</table>";//End the table
  content += "</div></div>";
  //Throw our HTML into the calendar div, which is a placeholder of the widget
  jQuery(".calendarDiv").html(content);
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

//This function adds 1 to the month of the current displayed month and reloads the calendar
function loadNextMonth()
{
  var nextMonth = new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth() + 1);
  buildCalendar(nextMonth);
}

//This function subtracts 1 to the month of the current displayed month and reloads the calendar
function loadPreviousMonth()
{
  var previousMonth = new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth() - 1);
  buildCalendar(previousMonth);
}