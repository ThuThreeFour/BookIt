<?php
  // setting cookie
  //$name = $_SERVER["user"];
  $expireTime = "10800 + time()"; // 10800 = 60sec * 60mins * 3hrs
  setcookie("TestCookie", date("h:ia"), $expireTime);


    session_start(); // if not logged in redirect back to home pages
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
      Description: This page saves the client's data from the registration form into
      ClientInformation.json.
      Original source of the code and logic used to save information into JSON was used from :
      http://coursesweb.net/php-mysql/add-form-data-text-file-json-format_t
      Updated: April 9, 2014
      (Documentation is a modification of Professor Jesse Heines's work.)
    -->
    
    <title>Book-It</title>
   
  </head>
  
  <body>  
  <?PHP 
    session_start();
    if((isset($_SESSION["login"])) && ($_SESSION["login"] !== "")){
      header("Location: home.php?session=true");
    }
  ?>
  </body>
</html>
