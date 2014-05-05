<?php
  // setting cookie
  //$name = $_SERVER["user"];
  $expireTime = "10800 + time()"; // 10800 = 60sec * 60mins * 3hrs
  setcookie("TestCookie", date("h:ia"), $expireTime); // set cookie


    session_start(); // if not logged in redirect back to home page
    if((!(isset($_SESSION["login"])) && ($_SESSION["login"] !== ""))){
      header("Location: home.php");
    }
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <!--
      File: login.php
      Author: Thu A. Tran, UMass Lowell CompSci Student
      Course: GUI Programming 1
      Email: thu_tran2@student.uml.edu
      Description: This page check result of user login and redirect to the appropriate link.
      Updated: May 04, 2014
      (Documentation is a modification of Professor Jesse Heines's work.)
    -->
    
    <title>Book-It</title>
   
  </head>
  
  <body>  
  <?PHP 
    session_start();
    // upon successful login page redirect to link below
    if((isset($_SESSION["login"])) && ($_SESSION["login"] !== "")){
      header("Location: home.php?session=true");
    }
  ?>
  </body>
</html>
