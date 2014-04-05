<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
  <head>
    <title>TODO supply a title</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
  </head>
  <body>
  </body>
</html>

<?php
$loggerOutput = "COOL DUDE IN THE LOG";
file_put_contents("json/log.out", $loggerOutput);


if ($_POST['function'] == "writeDefaultMonth") {
  $loggerOutput .= "months: " . $_POST['month'] . " year: " . $_POST['year'] . "\n";
  file_put_contents("json/log.out", $loggerOutput);
  writeDefaultMonth($_POST['month'], $_POST['year']);
}
$loggerOutput .= "function: " . $_POST['function'] . " month: " . $_POST['month'] . " year: " . $_POST['year'] . "\n";
file_put_contents("json/log.out", $loggerOutput);
reserveAppointment();

function reserveAppointment() {
  //Grab all of the appointment info from $_POST superglobal
  $year = $_POST['year'];
  $month = $_POST['month'];
  $day = $_POST['day'];
  $time = $_POST['time'];
  $name = $_POST['fname'] . " " . $_POST['lname'];
  $phone = $_POST['phoneNum'];
  $email = $_POST['email'];


  //Following based off of : 
  //http://stackoverflow.com/questions/8858848/php-read-and-write-json-from-file
  $file = "$month" . "_" . "$year.json";

  //If the file we want to write to doesn't exist, we should probably create it
  if (file_exists("json/$file")) {
    //To avoid a fatal error
    //http://stackoverflow.com/questions/6815520/cannot-use-object-of-type-stdclass-as-array
    //This will decode existing JSON files to be edited
    $json = json_decode(file_get_contents("json/$file"), true);

    //Store the person's name in the JSON file to reserve the appointment
    $json[$day][$time] = array("name" => $name, "phoneNum" => $phone, "email" => $email);

    //Rewrite changes to disk
    //Pretty printing from: http://stackoverflow.com/questions/7097374/php-pretty-print-json-encode
    //Due to file permissions on weblab, we have to create the file in /tmp
    //and move it to the json folder
    file_put_contents("/tmp/$file", json_encode($json));
    exec("mv /tmp/$file json/");
  } else {
    //The month file doesn't exist, lets create it
    //Because of file permissions on weblab, we have to create the file
    //in tmp and then move it to the json folder
    file_put_contents("/tmp/$file", json_encode(buildDefaultMonth()));
    exec("mv /tmp/$file json/");
    //Do the same thing as up above

    $json = json_decode(file_get_contents($file), true);
    $json[$day][$time] = array("name" => $name, "phoneNum" => $phone, "email" => $email);
    file_put_contents($file, json_encode($json, JSON_PRETTY_PRINT));
  }

  //Since we are done lets go home
  //http://us2.php.net/manual/en/function.header.php
  header('Location: home.html');
}

//Builds a default month json file
function buildDefaultMonth() {
  $dayObject = array("0800" => "Empty", "0900" => "Empty", "1000" => "Empty",
      "1100" => "Empty", "1200" => "Empty", "1300" => "Empty", "1400" => "Empty",
      "1500" => "Empty", "1600" => "Empty", "1700" => "Empty");
  $json = array();

  //We assume there are 31 days in every month because the calendar correctly
  //limits the number of selectable days in a month. For example if the user is
  //selecting a day in February, they can not select February 31st because it
  //doesn't exist on the calendar. No need to restrict the JSON file to a certain
  //number of day entries
  for ($i = 1; $i <= 32; $i++) {
    array_push($json, $dayObject);
  }
  return $json;
}

function writeDefaultMonth($month, $year) {
  $file = "$month" . "_" . "$year.json";
  file_put_contents("json/log.out", "writing Default Month");
  //because of file permissions on weblab we have to create the file in /tmp
  //and then move it to the json folder
  file_put_contents("/tmp/$file", json_encode(buildDefaultMonth(), JSON_PRETTY_PRINT));
  exec("mv /tmp/$file json");
  return;
  //header('Location: home.html');
}
?>
