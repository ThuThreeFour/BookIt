<!DOCTYPE html>
<html ng-app="employeeApp">
  <head>
    <meta charset="UTF-8">

    <!--
      File: home.php
      Author: Thu Tran, Chris Compton, Jacob Nappi, UMass Lowell CompSci Students
      Course: GUI Programming 2
      Email: thu_tran2@student.uml.edu, christopher.j.compton@gmail.com, Jacob_Nappi@student.uml.edu
      Description: This page is the home page to Book-It project.
      Updated: May 04, 2014
      (Documentation is a modification of Professor Jesse Heines's work.)
    -->

    <title>Book-It Home</title>

    <!-- Load jQuery library from the Google content Delivery Network (CDN)see
    http://encosia.com/3-reasons-why-you-should-let-google-host-jquery-for-you/
    jQuery can also be downloaded and stored locally from http://jquery.com/download/-->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js" type="text/javascript"></script>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.1/angular.min.js"></script>

    <script src="js/jquery-ui/jquery-ui-1.10.4.custom.min.js" type="text/javascript"></script>
    <script src="js/employeeDatajs.js" type="text/javascript"></script>
    <script src="js/angular/controllers.js" type="text/javascript"></script>
    <!-- DO NOT REMOVE THIS COMMENTED OUT LINE BELOW (sectionOfEmpDatajs.js) T.T. -->
    <!--script src="../sectionOfEmpDatajs.js"></script-->
    <script src="js/jquery-validate/jquery.validate.min.js"></script>
    <script src="js/validateRegistrationForm.js"></script>

    <!-- The lines below link the css files to this page. -->
    <link rel="stylesheet" type="text/css" href="css/cupertino/jquery-ui-1.10.4.custom.min.css">
    <link rel="stylesheet" type="text/css" href="css/calendar.css">
    <link rel="stylesheet" type="text/css" href="css/homeCSS.css">

  </head>
  <body>
    <?php
      //=====================================================
      // PHP code below is adaption of code from
      // http://www.homeandlearn.co.uk/php/php14p1.html
      //=====================================================
      
      // define variables
      global $uname;
      $uname = $pword = ""; // not empty if username and password feild has value
      // error message to display to user
      $displayError = ""; // not empty if there is a validation error
      // set the error message
      $errorMessage = "<div class='ui-state-error'>";
      $errorMessage .= "<span id='errorMsg' class='ui-icon ui-icon-alert'></span>"; // alert icon
      $errorMessage .= "Invalid email or password</div>";
      
      $errorLog = ""; // log error for developing purposes
      $loginMsg = ""; 
      
      
      if ($_SERVER["REQUEST_METHOD"] == "POST"){
        //=====================================================
        // CHECK TO SEE IF username AND password FIELD IS EMPTY
        //=====================================================
        //$errorMessage = "ready validating feilds";
        if(empty($_POST["username"])){
          $displayError = $errorMessage; // if field empty assign message
        } else {
          $originalUname = $_POST["username"];
          $uname = strtolower($originalUname);
          //$errorMessage = "uname = " . $uname;
          $displayError = $errorMessage; // if field empty assign message
        }
        
        if(empty($_POST["password"])){
          $displayError = $errorMessage; // if field empty assign message
        } else {
          $pword = $_POST["password"];
          //$errorMessage = "pw = " . $pword;
        }
        
        //=====================================================
        // VALIDATE IF username AND password EXIST IN JSON FILE
        //=====================================================
        if(($uname !== "") && ($pword !== "")){
          $displayError = $errorMessage;
          
          // path and name of the file containing user information
          $filePath = "clientInformation/ClientInformation.json";
          
          if(file_exists($filePath)){ // check to see if json file exist
            $errorLog .= "json file found";
            
            // gets json-data from file
            $jsondata = file_get_contents($filePath);
            
            // converts json string into PHP array
            $clientData = json_decode($jsondata, TRUE);
            
            // Looping through json file to find credentials 
            foreach($clientData as $key => $val){
              // assigning flag to indicate credential not/not yet found
              $unameFlag = FALSE; 
              $pwFlag = FALSE;
             
              $errorLog .= "<br /> $key | $val <br />";
              foreach($val as $k => $v){
                $errorLog .= "$k | $v <br />";
                if(($k === "email") && ($v === $uname)){
                  $unameFlag = TRUE; // email input matches email in json file
                  $errorLog .= "<br />email found";
                }
                if(($k === "password") && ($v === $pword)){
                  $pwFlag = TRUE; // password input matches password in json file
                  $errorLog .= "<br />password found";
                }
                // $result is assign true only if credentials found in json file
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
              // user found
              session_start();
              $_SESSION["login"] = "1"; 
              $_SESSION["user"] = $uname; // put email in the session to track who is logged in
              $loginMsg = "logged in as " . $_SESSION["user"];
              header("Location: login.php"); // redirected to login php               
            } else {
              // user not found
              $errorLog .= "Invalid login";
              session_start();
              $_SESSION["login"] = "";
              $_SESSION["user"] = ""; // invalid login so user in empty string
              $displayError = $errorMessage;
            }
          } // if json file exist 
        } // if un and pw is not empty
      } // if action === POST
   
    ?> 
    
    <script>
      // testing if browser enable cookie
      var x = "Cookies Enabled: " + navigator.cookieEnabled; 
      console.log(x);  
    </script>
    
    
    <!-- Dialog box to confirm to user status of account registration. -->
    <div id="regstDialog"></div>
    
    <!-- header containing banner, message to user and user login/registration -->
    <div id="header"> 
      <div id="image">
        <a href="<?php echo $_SERVER['HTTP_POST'] . $_SERVER['REQUEST_URI']; ?>">
          <!-- Calendar used banner used from https://www.iconfinder.com/icons/115762/calendar_date_event_month_icon -->
          <img src="images/BookItBanner.png" alt="Book-it"> <!-- Book-It banner image -->
        </a>
      </div>
      
      <!-- Contain user login and creating new account related material -->
      <div id="loginRegister">
        <!-- Form for login credentials: username and password -->
        <form id="loginForm" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
          <div id="login">
            <!-- Contain validation error message to user -->
            <div id="errorContainer"><?php echo $displayError; ?></div>
            <div class="inputField">
              <input type="text" placeholder="email" id="username" name="username"value="<?php if ($uname !== "") {echo $uname;} ?>">
            </div>
            <div class="inputField">
              <input type="password" placeholder="Password" id="password" name="password">
            </div>
            <button class="loginButton" type="submit">Log In</button>
          </div>
          <div id="signUp">
            <!--Line below is for testing purposes-->
            <!--div--><!--?php echo $errorLog; ?--><!--/div-->
            <ul class="nav">
              <li class="formMsg">
                <p id="sessionMsg">Don't have an account with us?</p>
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
      
      <!--  Describe purpose of website to user -->
      <div id="msgTousr">
        <div class="ui-state-highlight ui-corner-all">
          <div  class="ui-icon ui-icon-info"></div>
          <p id="msg">Below are our professional staff. Click on the picture of your
            preferred specialist to book an appointment with them.</p>
        </div>
      </div>
    </div> 
    
    <!-- Contain employee profiles: picture, name, job title, and expertise list -->
    <div ng-controller="EmployeeCtrl" class="ui-widget ui-employees" id="employeeContent">
      <!--  Contain individual employee profile -->
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
