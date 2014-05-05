<?php 
  session_start(); // begin the session
  session_unset(); // unset all session variable
  //destroy cookie
  $past = "time - 10"; // 10 seconds ago
  setcookie("TestCookie", date("h:ia"), $past);
  
  session_destroy(); // destroy the session
?>

<html>
  <head>
    <title>Book-It</title>
    <meta charset="UTF-8">
    <!--
      File: logout.php
      Author: Thu A. Tran, UMass Lowell CompSci Student
      Course: GUI Programming 1
      Email: thu_tran2@student.uml.edu
      Description: This page logs user out.
      Code was modified from original source at http://www.homeandlearn.co.uk/php/php14p1.html.
      Updated: May 04, 2014
      (Documentation is a modification of Professor Jesse Heines's work.)
    -->
  </head>
  <body>
    <?php
      // redirect to homepage since user logged out
      header("Location: home.php");
    ?>
  </body>
</html>