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
    <meta name="viewport" content="width=device-width">
  </head>
  <body>
    <?php
      // redirect to homepage since user logged out
      header("Location: home.php");
      
      // display a dialog box to confirm logout
    ?>
  </body>
</html>