<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <!--
      File: saveClientInfo.php
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
      // link to redirect to based on success of user data injection
      $pageToRedirectTo = 'home.php?register=';
      $registerFlag = 'false'; // registration data not yet injected so false
      
      // Append new form data in json string saved in json file
      // adds form data into an array
      $formdata = array(
        'fname' => $_POST['fname'],
        'lname' => $_POST['lname'],
        'email' => $_POST['email'],
        'password'=> $_POST['password'],
        'phoneNum' => $_POST['phoneNum'],
        'sessionId' => '', // initially has no value until user is successfully injected into json
      ); 
              
      // path and name of the file to write into
      $filetxt = 'clientInformation/ClientInformation.json';
      
      $clientData = array(); // to store all form data
      
           
      // check if the file exists
      if(file_exists($filetxt)) {
        // gets json-data from file
        $jsondata = file_get_contents($filetxt);
 
        
        //genrate random num as session id for each user 
        function generateRandID(){
          $randomNum = md5(uniqid(rand(), true));
          return $randomNum;
        }
        $usrId = generateRandID(); // initial session id generated

        //iterate thru json file to assign session id to client
        $jsonIterator = new RecursiveIteratorIterator(
          new RecursiveArrayIterator(json_decode($jsondata, TRUE)),
          RecursiveIteratorIterator::SELF_FIRST);
        foreach ($jsonIterator as $key => $val) {
          if($val === $usrId){ // if session id geenrated already exist
            //console.log("$usrId exist ");
            $newUsrId = generateRandID(); // then generate a new one
            $formdata['sessionId'] = $newUsrId; // assign it to client
            break;
          }else { // else assign initial session id
            $formdata['sessionId'] = $usrId; 
          }
        }
              
        // converts json string into array
        $clientData = json_decode($jsondata, true);
        
        // appends the array with new form data
        $clientData[] = $formdata;
        
        // Now you can use the array $arr_data with json-data saved in text file
        var_export($clientData);        // Test to see the array
        

        // encodes the array into a string in JSON format (JSON_PRETTY_PRINT - uses whitespace in json-string, for human readable)
        //$jsondata = json_encode($clientData, JSON_PRETTY_PRINT);
        $jsondata = json_encode($clientData);
        
        // check if registration data was successfully injected into json file
        if(file_put_contents('clientInformation/ClientInformation.json', $jsondata)){
          // injection successful:
          $registerFlag = 'true'; // set flag to true
          // redirect to homepage with proper flag
          header('location: ' . $pageToRedirectTo . $registerFlag); 
          exit; // ensure code below do not execute when redirected
        } else {
          // injection unsuccessful:
          header('location: ' . $pageToRedirectTo . $registerFlag); // flag == false
          exit;
        }
        
     }else {
       // error with opening ClientInformation.json file
       header('location: ' . $pageToRedirectTo . $registerFlag); // flag == false
       exit;
     }
    ?>
    
    
  </body>
</html>
