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
    <?php
     echo 'inside login.php';
     $pageToRedirectTo = 'home.html?session=';
     $sessionFlag = 'true'; // set flag to true
     // redirect to homepage with proper flag
     header('location: ' . $pageToRedirectTo . $sessionFlag);
    ?>
    
    
  </body>
</html>
