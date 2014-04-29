<?php
  session_start();
      $homeURL = "home.php";
      if(($_SERVER["REQUEST_URI"] == $homeURL) && (session_id() !== "")){
        header("Location: home.php?session=true");
      }
?>
<!DOCTYPE html>
<html ng-app="employeeApp">
  <head>
    <meta charset="UTF-8">

    <!--
      File: home.php
      Author: Thu Tran, Chris Compton, UMass Lowell CompSci Student
      Course: GUI Programming 2
      Email: thu_tran2@student.uml.edu, christopher.j.compton@gmail.com
      Description: This page is the home page to Book-It project.
      Updated: February 22, 2014
      (Documentation is a modification of Professor Jesse Heines's work.)
    -->

    <title>Book-It Home</title>

    <!-- Load jQuery library from the Google content Delivery Network (CDN)see
    http://encosia.com/3-reasons-why-you-should-let-google-host-jquery-for-you/
    jQuery can also be downloaded and stored locally from http://jquery.com/download/-->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js" type="text/javascript"></script>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.1/angular.min.js"></script>

    <script src="js/jquery-ui/jquery-ui-1.10.4.custom.min.js" type="text/javascript"></script>
    <!--script src="js/employeeDatajs.js" type="text/javascript"></script-->
    <script src="js/angular/controllers.js" type="text/javascript"></script>
    <!-- DO NOT REMOVE THIS COMMENTED OUT LINE BELOW (sectionOfEmpDatajs.js) TT -->
    <script src="../sectionOfEmpDatajs.js"></script>
    <script src="js/jquery-validate/jquery.validate.min.js"></script>
    <script src="js/validateRegistrationForm.js"></script>

    <!-- script src="js/make-calendar.js"></script -->

    <!-- The lines below is to link the css to this page. -->
    <link rel="stylesheet" type="text/css" href="css/cupertino/jquery-ui-1.10.4.custom.min.css">
    <link rel="stylesheet" type="text/css" href="css/calendar.css">
    <link rel="stylesheet" type="text/css" href="css/homeCSS.css">

  </head>
  <body>
    <?php
      // define variables and set to empty values
      $uname = $pword = ""; // not empty if username and password feild has value
      $errorMessage = ""; // error message to display to user
      $errorLog = ""; // logg error for developing purposes
      $loginMsg = ""; 
      
      
      if ($_SERVER["REQUEST_METHOD"] == "POST"){
        //=====================================================
        // CHECK TO SEE IF username AND password FIELD IS EMPTY
        //=====================================================
        //$errorMessage = "ready validating feilds";
        if(empty($_POST["username"])){
          $errorMessage = "Invalid username";
        } else {
          $originalUname = $_POST["username"];
          $uname = strtolower($originalUname);
          //$errorMessage = "uname = " . $uname;
        }
        
        if(empty($_POST["password"])){
          $errorMessage = "Invalid password";
        } else {
          $pword = $_POST["password"];
          //$errorMessage = "pw = " . $pword;
        }
        
        //=====================================================
        // VALIDATE IF username AND password EXIST IN JSON FILE
        //=====================================================
        if(($uname !== "") && ($pword !== "")){
          $errorMessage = "un and pw has value";
          
          // path and name of the file containing user information
          $filePath = "clientInformation/ClientInformation.json";
          
          if(file_exists($filePath)){ // check to see if json file exist
            $errorLog .= "json file found";
            
            // gets json-data from file
            $jsondata = file_get_contents($filePath);
            
            // converts json string into PHP array
            $clientData = json_decode($jsondata, TRUE);
            
            foreach($clientData as $key => $val){
              $unameFlag = FALSE;
              $pwFlag = FALSE;
             
              $errorLog .= "<br /> $key | $val <br />";
              foreach($val as $k => $v){
                $errorLog .= "$k | $v <br />";
                if(($k === "email") && ($v === $uname)){
                  $unameFlag = TRUE;
                  $errorLog .= "<br />email found";
                }
                if(($k === "password") && ($v === $pword)){
                  $pwFlag = TRUE;
                  $errorLog .= "<br />password found";
                }
                
                if((int)$unameFlag && (int)$pwFlag){
                  $errorLog .= "unameflag = " . (int)$unameFlag . "pwordflag = " . (int)$pwFlag;
                  // username and password exist in json so assign TRUE to result
                  $result = (int)$unameFlag && (int)$pwFlag;
                  $errorLog .= "<br />un and pw match";
                  break 2; // exit inner and outer foreach loop
                } 
              } // inner foreach
            } // outer foreach
            
            //=====================================================
            // INIT LOGIN SESSION
            //=====================================================
            if($result){ 
              $errorLog .= "< br/>username and password match, result = " . $result;
              // BEGIN LOGIN SESSION
              session_start();
              $_SESSION["login"] = "1"; 
              $_SESSION["user"] = $uname; // put email in the session to track who is logged in
              //$expireTime = "10800 + time()"; // 10800 = 60sec * 60mins * 3hrs
              //setcookie($_SESSION["user"], date("h:ia"), $expireTime); // setting cookie
              $loginMsg = "logged in as " . $_SESSION["user"];
              header("Location: login.php"); // redirected to login php 
              
            } else {
              $errorLog .= "Invalid login";
              session_start();
              $_SESSION["login"] = "";
              $_SESSION["user"] = ""; // invalid login so user in empty string
              $errorMessage = "Invalid email or password.";
            }
          } // if jason file exist 
        } // if un and pw is not empty
      } // if action === POST
   
    ?> 
    
    

    <script>
      var x = "Cookies Enabled: " + navigator.cookieEnabled; 
      console.log(x); 
    </script>
  <!-- Dialog box to confirm to user status of account registration. -->
      <div id="regstDialog"></div>

    <div id="header"> 
      <div id="image">
        <a href="home.html"><img src="images/BookItBanner.png" alt="Book-it"></a>
      </div>
      

      <div id="loginRegister">
        <form id="loginForm" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method="post">
          <div id="login">
            <div id="errorContainer"><?php echo $errorMessage?></div>
            <div class="inputField">
              <input type="text" placeholder="email" id="username" name="username"value="<?php if($uname !== ""){ echo $uname;}?>">
            </div>
            <div class="inputField">
              <input type="password" placeholder="Password" id="password" name="password">
            </div>
            <button class="loginButton" type="submit">Log In</button>
          </div>
          <div id="signUp">
            <!--Line below is for testing purposes-->
            <!--div--><!--?php echo $errorLog--><!--/div-->
            <ul class="nav">
              <li class="formMsg">
                <span id="sessionMsg">
                  <?php echo $errorLog;?>
                  <i>Don't have an account with us?</i>
                </span>
              </li>
              <li class="registerButton">
                <!--a class="userButton" href="home.html" id="registerButton"></a-->
                <a id="sessionLink" href="registrationForm.html">
                  <span id="sessionLabel">Create New Account</span>
                </a>
              </li> 
          </ul>
          </div>
          
        </form>
      </div>
      

      <div id="msgTousr">
        <div class="ui-state-highlight ui-corner-all" >
          <div  class="ui-icon ui-icon-info"></div>
          <p id="msg">Below are our professional staff. Click on the picture of your
            preferred specialist to book an appointment with them.</p>
        </div>
      </div>
    </div> 

    <div ng-controller="EmployeeCtrl" class="ui-widget ui-employees" id="employeeContent">
      
      
    
      <div ng-repeat="employee in employees" id="{{employee.firstName}}" class="{{employee.firstName}}A emplyProfile ui-widget-content ui-corner-all">
        <img ng-src="{{employee.img}}"  ng-click="loadEmployeeCal($event, '{{employee.firstName}}')" class="pic ui-corner-all">
        <div class="ui-widget-header ui-corner-all empl-name-title">
          <h1>{{employee.firstName}}</h1>
          <h2>{{employee.jobTitle}}</h2>
        </div>
        <ul class="expertiseList">
          <lh class="expertiseBullet">Expertise</lh>
          <li ng-repeat="expertise in employee.expertiseList">{{expertise}}</li>
        </ul>
      </div>
    </div>
    
    
    <div id="reservationDialog"></div>
    
    <div id="calendarDiv" style="display: none"></div>
    <div class="daySelector"></div>
    


    <!-- footer -->
    <!-- Removing dead buttons for beta
    <div id="footer">
      <ul class="nav">
        <li class="empLoginButton">
          Employee Login <!-- Will be implemented if there is time.
        </li>
        <li class="homePageButton">
          <a href="home.html">Home</a>
        </li>
      </ul>
    </div>
    -->
  </body>
</html>
