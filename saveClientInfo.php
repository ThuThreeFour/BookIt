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
      Updated: April 8, 2014
      (Documentation is a modification of Professor Jesse Heines's work.)
    -->
    
    <title>Book-It</title>
   
    <!-- Load dependencies -->

  
    
    <!-- Block of code below was taken from Jesse Heines and used For testing purposes only. TT -->
    <!--
    <script type="text/javascript">
      document.writeln("<p class ='body_text'><i>Page loaded:&nbsp;</i> " + new Date() + "</p>");
    </script>
    -->
  </head>
  
  <body>  
    <?php
      // Append new form data in json string saved in json file
      // adds form data into an array
        $formdata = array(
          'fname' => $_POST['fname'],
          'password'=> $_POST['password'],
          'lname' => $_POST['lname'],
          'email' => $_POST['email'],
          'phoneNum' => $_POST['phoneNum'],
            'sessionId' => '', // initially has no value until user is successfully injected into json
        ); 
        
        header('saveClientInfo.php');
    
                
      // path and name of the file
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
        $usrId = generateRandID();
        
        
        
   //iterate thru json file  
        $jsonIterator = new RecursiveIteratorIterator(
    new RecursiveArrayIterator(json_decode($jsondata, TRUE)),
    RecursiveIteratorIterator::SELF_FIRST);

foreach ($jsonIterator as $key => $val) {
  if($val === $usrId){
    //console.log("$usrId exist ");
    $newUsrId = generateRandID();
    $formdata['sessionId'] = $newUsrId;
    break;
  }else {
    $formdata['sessionId'] = $usrId;
  }
}
        
      
        // converts json string into array
        $clientData = json_decode($jsondata, true);
        
        // appends the array with new form data
        $clientData[] = $formdata;
        
        // encodes the array into a string in JSON format (JSON_PRETTY_PRINT - uses whitespace in json-string, for human readable)
        $jsondata = json_encode($clientData, JSON_PRETTY_PRINT);
        
        if(file_put_contents('clientInformation/ClientInformation.json', $jsondata)){
          // echo 'Data successfully saved';
          echo '<p> Thank you for registering. Your account was successfully created. 
            A confirmation email has been sent to your email ' . $formdata['email'] . '</p>';
          //echo md5(uniqid(rand(), true));
     
        } else {
          echo '<p>An error occured, account was not successfully created. Please try again.</p>';
        }
     
     }else {
       echo 'Error with opening ClientInformation.json file.';
     }
    ?>
    
    
  </body>
</html>
