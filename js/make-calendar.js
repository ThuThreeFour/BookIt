/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var currentDate = new Date(); //Need to always know the current date
var currentCalendarDate = currentDate;//Used to help with previous and next buttons

function buildCalendar( date ){
  var content = "";
  var dayNum = 1; //used for enumerating days on the calendar
  //var current = date;

  //in the case that no date has been passed in, lets use a default
  if ( date !== undefined )
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
  var firstOfMonth = new Date( currentCalendarDate.getFullYear(), currentCalendarDate.getMonth(), 1 );

  //Need to figure out how many days are in February
  //leap year check
  if ( ( year % 100 !== 0 ) && ( year % 4 === 0 ) || ( year % 400 === 0 ) ) {
    totalFeb = 29;
  }
  //Boring normal year
  else {
    totalFeb = 28;
  }
  //Need to know how many days are in the month, initialize this array
  var totalDays = [ 31, totalFeb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
  //Need this so we can label the month on the calendar
  var monthNames = [ "January", "February", "March", "April",
    "May", "June", "July", "August", "September", "October",
    "November", "December" ];

  content += "<div class='ui-widget ui-calendar'>";
  content += "<div class='ui-widget-content ui-corner-all'>";
  content += "<div class='ui-widget-header ui-corner-all'>";
  content += "<h2>"+monthNames[currentCalendarDate.getMonth()] + " " + currentCalendarDate.getFullYear()+"</h2></div>";
  //Start the table
  content += "<table class=\"calendarTable\">";

  //Initialize the row of the table with the name of the month and
  //the next and previous month buttons
  content += "<tr>";
  //The following loop builds the top row of the table with the month name
  //and the next month and previous month buttons
  for ( var i = 0; i < 7; i++ )
  {
    if ( i === 0 ) //This is where we will place the PREVIOUS button for the previous month
    {
      content += "<th class=\"calendarTitleBar\" \n\
                                onmouseover=\"ChangeColor(this, true)\" onmouseout=\"ChangeColor(this, false)\" \n\
                                onclick=\"loadPreviousMonth()\">PREVIOUS</th>";
    }
    else if ( i === 3 ) //This is the column where we will place the month and year
    {
      //content += "<th id=\"calendarMonthName\">";
      //content += monthNames[currentCalendarDate.getMonth()] + " " + currentCalendarDate.getFullYear();
      //content += "</th>";
    }
    else if ( i === 6 ) //This is where we will place the NEXT button for the next month
    {
      content += "<th class=\"calendarTitleBar\" \n\
                                onmouseover=\"ChangeColor(this, true)\" onmouseout=\"ChangeColor(this, false)\" \n\
                                onclick=\"loadNextMonth()\">NEXT</th>";
    }
    else //This is just for placeholders so the month name, and the next and previous buttons are placed correctly
    {
      content += "<th class=\"calendarTitleBar\"></th>";
    }
  }
  content += "</tr>";//End the top row of the table

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
  for ( var weekCounter = 0; weekCounter < 6; weekCounter++ )
  {
    content += "<tr>";//start the current 'week'
    for ( var dayCounter = 0; dayCounter < 7; dayCounter++ )
    {
      //To make sure we get the first day of the month right
      if ( foundFirst === 0 && dayCounter !== firstOfMonth.getDay() )
      {
        content += "<td class=\"calendarDay\" onmouseover=\"ChangeColor(this, true)\" onmouseout=\"ChangeColor(this, false)\"></td>";
        continue;
      }

      //Set the foundFirst boolean to signify we have printed the correct
      //first day of the month
      foundFirst = 1;
      if ( dayNum <= totalDays[month] )
      {
        content += "<td class=\"calendarDay\" onmouseover=\"ChangeColor(this, true)\" onmouseout=\"ChangeColor(this, false)\">" + dayNum + "</td>";
      }
      else if ( ( dayNum > totalDays[month] ) && dayCounter < 7 ) //Makes sure we don't print day numbers that don't exist
      {
        content += "<td class=\"calendarDay\" onmouseover=\"ChangeColor(this, true)\" onmouseout=\"ChangeColor(this, false)\"></td>";
      }
      //Increment the day number for the next day of the week
      dayNum++;
    }
    content += "</tr>";//End the current 'week'

    //Because some months have more weeks than others, we run into a case
    //where we will sometimes have a full row in the table with no numbered
    //days. To avoid this we have a break statement so there is no completely
    //empty rows
    if ( dayNum > totalDays[month] )
    {
      break;
    }
  }

  content += "</table>";//End the table
  content += "</div></div>";
  //Throw our HTML into the calendar div
  jQuery( ".calendarDiv" ).html( content );
}

//This function is used to highlight the day that the user is trying
//to select. Found here:
//http://imar.spaanjaars.com/312/how-do-i-make-a-full-table-row-clickable
function ChangeColor( tableRow, highLight )
{
  if ( highLight )
  {
    //This is the color of the highlighted cell
    tableRow.style.backgroundColor = '#dcfac9';
  }
  else
  {
    //This is what the color returns to when not hovered over
    tableRow.style.backgroundColor = 'lightblue';
  }
}

//This function adds 1 to the month of the current displayed month and reloads the calendar
function loadNextMonth()
{
  var nextMonth = new Date( currentCalendarDate.getFullYear(), currentCalendarDate.getMonth() + 1 );
  buildCalendar( nextMonth );
}

//This function subtracts 1 to the month of the current displayed month and reloads the calendar
function loadPreviousMonth()
{
  var previousMonth = new Date( currentCalendarDate.getFullYear(), currentCalendarDate.getMonth() - 1 );
  buildCalendar( previousMonth );
}