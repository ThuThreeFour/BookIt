/* 
 * idel-timer.js v1
 * Author: Chris Compton
 * Email : christopher.j.comptond@gmail.com
 * 
 * This file contains simple function to create an idle timer
 * on a web page that will redirect a user who has been idle
 * for a set time.
 * NOTE: Requires the jquery-idletimer.js plugin found at
 * https://github.com/mikesherov/jquery-idletimer
 * 
 * Created : 02-13-2014 CJC
 * Modified: 02-13-2014 CJC
 */

// Global variables
var time_left = 120;
var interval, countdown;

// This function controls the clock that the user sees
// indicating how much time they have left while idling
// Code inspired by the example found at 
// https://mindgrader.com/tutorials/1-how-to-create-a-simple-javascript-countdown-timer
function myTimer(){
  var minutes, seconds;
  minutes = parseInt( time_left / 60 );
  seconds = parseInt( time_left % 60 );

  if ( seconds < 10 ) {
    seconds = ( "0" + seconds );
  }

  // Redirect user back to the index page.
  // Index page will redirect to home.html
  //  in order to prevent the user from using the
  //  back button. 
  if ( time_left <= 0 ) {
    window.location = "index.html";
  }

  time_left--;
  countdown = document.getElementById( "countdown" );
  countdown.innerHTML = minutes + ":" + seconds;
}

// Check if the user is idle. Usage and examples found at 
// https://github.com/mikesherov/jquery-idletimer
function checkIdle(){

  // Initialize the idleTimer to 250 ms ( 0.25 seconds )
  $( document ).idleTimer( 250, {
    startImmediately: true, // Start as soon as the document is ready
    idle: false, // User is initially active
    enabled: true, // idle timer is enabled
    events: 'mousemove keydown DOMMouseScroll mousewheel mousedown touchstart touchmove' // Events indicate user is active
  } );

  // When the user is idle
  $( document ).on( "idle.idleTimer", function(){
    // Set the setInterval function to a global variable so we
    // can turn it off when the user is active with clearInterval()
    interval = setInterval( function(){
      // Call the myTimer() function every 1000 ms (1 second)
      myTimer();
    }, 1000 );
  } );

  // When the user is active
  $( document ).on( "active.idleTimer", function(){
    // I didn't know this was a thing. Thanks http://www.w3schools.com/jsref/met_win_clearinterval.asp
    // Clear the interval so the timer will stop
    clearInterval( interval );
    // reset the global clock to 2 minutes
    time_left = 120;
    countdown = document.getElementById( "countdown" );
    countdown.innerHTML = "2:00";
  } );
}