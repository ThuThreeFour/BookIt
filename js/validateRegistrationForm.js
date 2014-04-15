/* 
 * validateRegistrationForm.js
 * Original Author: Christopher Compton
 * Email: christopher.j.compton@gmail.com
 * christopher_compton@student.uml.edu
 * Author: Thu Tran
 * Email: thu_tran2@student.uml.edu
 * Updated: March 22, 2014
 * Undergraduate Students at UMass Lowell
 * 91.462 GUI Programming II
 *
 */

var userLoginInfo;
var sessionName;
var sessionID;

// The ajax call allows for synchronous loading, which is needed
// here so that the JSON file can be completely loaded before
// we continue. On 'success', the callback function is called 
// to store the data into the variable story.
jQuery.ajax({
  async: false,
  dataType: "json",
  url: "clientInformation/ClientInformation.json",
  success: function(data) {
    userLoginInfo = data;
  }
});

function validateRegistrationForm() {

  //console.log("inside registration validate");

  // prevent form submisssion when return key is striked
  $('#registrationform').keypress(function(event) {
    if (event.keyCode === 10 || event.keyCode === 13)
      event.preventDefault();
  });

  $.validator.addMethod("alreadyExist",
          function(value) {
            flag = true;
            console.log(value);
            for (var count = 0; count < userLoginInfo.length; count++) {
              //console.log(userLoginInfo.length);
              if (value === userLoginInfo[count].email) {
                console.log("Value: " + value + "; Email Entered: " + userLoginInfo[count].email);
                flag = false;
                break;
              }
            }
            return flag;
          });

  // Changes to the validator options are based on the documentation
  // found here: http://jqueryvalidation.org/validate#toptions
  $('#registrationform').validate({
    // Change the default container that the error messages are placed
    errorElement: "p",
    rules: {
      fname: {
        required: true
      },
      lname: {
        required: true
      },
      email: {
        alreadyExist: true,
        required: true,
        email: true
      },
      confirmEmail: {
        equalTo: "#email",
        required: true
      },
      password: {
        minlength: 4,
        maxlength: 16,
        required: true
      },
      confirmPassword: {
        // range rule will not properly validate
        minlength: 4,
        maxlength: 16,
        equalTo: "#password",
        required: true
      },
      phoneNum: {
        required: true,
        phoneUS: true
      }
    }, // end rules
    messages: {
      fname: {
        required: "Please provide your first name"
      },
      lname: {
        required: "Please provide your last name"
      },
      email: {
        alreadyExist: "An account with this email already exists.",
        required: "Please provide an email address",
        email: "Please enter in the form of name@domain.com"
      },
      confirmEmail: {
        equalTo: "Email does not match",
        required: "Please provide an email address"
      },
      password: {
        minlength: "Password must be atleast 4 characters",
        maxlength: "Password can not be more than 16 characters",
        required: "Please provide a password"
      },
      confirmPassword: {
        minlength: "Password must be atleast 4 characters",
        maxlength: "Password can not be more than 16 characters",
        equalTo: "Password does not match",
        required: "Please provide a password"
      },
      phoneNum: {
        required: "Please enter a phone number",
        phoneUS: "Please enter valid 10 digit US phone number"
      }
    }, // end messages
    // Modify the default placement of the error
    errorPlacement: function(error, element) {
      error.insertAfter(element); // This might be the default, but including for good measure
      $("<div class='ui-icon ui-icon-alert'></div>").insertAfter(element);
      error.addClass("ui-helper-reset ui-state-error-text");
    }, // end errorPlacement
    // Change the default behavior of highlighting the errors
    highlight: function(element, errorClass, validClass) {
      $(element).addClass(errorClass).removeClass(validClass);
      $(element).parent("div").addClass("ui-state-error");
      $(element).siblings("div").addClass("ui-icon ui-icon-alert");
    }, // end highlight
    // When a field is valid, adjust how it is unhighlighted.
    unhighlight: function(element, errorClass, validClass) {
      $(element).removeClass(errorClass).addClass(validClass);
      $(element).parent("div").removeClass("ui-state-error");
      $(element).siblings("div").removeClass("ui-icon ui-icon-alert");
    } // end unhighlight
  }); // end validate
}


// validate username and password feild on home.html
function validateUserLogin() {
  console.log("inside user login validate");

  $.validator.addMethod("exist",
          function(value) {
            var userEmail;
            //flag = true;
            flag = false;
            console.log(value);
            for (var count = 0; count < userLoginInfo.length; count++) {
              //console.log(userLoginInfo.length);
              if (value === userLoginInfo[count].email) {
                console.log("Value: " + value + "; Email Entered: " + userLoginInfo[count].email);
                //flag = false;
                userEmail = value;
                //console.log("userEmail = " + userEmail);
                var pw = $("#password").val();

                sessionName = userLoginInfo[count]["fname"];
                console.log("first name = " + sessionName);

                if ((pw.length !== 0) && (pw === userLoginInfo[count].password)) {
                  //sessionName = userLoginInfo[count].fname;
                  //console.log(sessionName);
                  sessionID = userLoginInfo[count].fname;
                  flag = true;
                  break;
                }
                console.log("length ==" + $("#password").val().length);
                return (flag = false);
                break;
              }
            }
            return flag;
          });

  $("#loginForm").validate({
    rules: {
      username: {
        exist: true,
        required: true
      },
      password: {
        required: true
      }
    },
    messages: {
      username: {
        exist: "Email or password in incorrect",
        required: "Please provide an email address"
      },
      password: {
        required: "Please provide a password"
      }
    }
  });


} // end validateUserLogin

//remove parameters from the URL so refreshing the page doesn't keep showing
//a dialog message
//Courtesy of: 
//http://stackoverflow.com/questions/16941104/remove-a-parameter-to-the-url-with-javascript
function removeParam(parameter)
{
  var url = document.location.href;
  var urlparts = url.split('?');
  console.log("inside removeParam");

  if (urlparts.length >= 2)
  {
    var urlBase = urlparts.shift();
    var queryString = urlparts.join("?");

    var prefix = encodeURIComponent(parameter) + '=';
    var pars = queryString.split(/[&;]/g);
    for (var i = pars.length; i-- > 0; )
      if (pars[i].lastIndexOf(prefix, 0) !== -1)
        pars.splice(i, 1);
    url = urlBase + '?' + pars.join('&');
  }
  return url;
}

// get the url
function getURL() {
  var status = false;
  var href = window.location.search;
  console.log(href);

  var regstSuccess = "?register=true"; // account successfully created
  var regstfail = "?register=false"; // account unsuccessfully created

  var loginSuccess = "?session=true";

  //check for successful appointment reservation and popup dialog
  if (href === "?reserve=success") {
    displayReserveSuccessDialog();
    return;
  }

  if (href === regstSuccess) {
    //console.log("success");
    status = true;
    displayDialog(status);
    return;
  }

  if (href === regstfail) {
    //console.log("fail");
    displayDialog(status);
    return;
  }

  if (href === loginSuccess) {
    loginSession();
  }
}

function loginSession() {
  console.log("disable form");
  document.getElementById('login').style.display = "none";
  //document.getElementById('wrapper').style.display = "none";

  var msg = "logged in as " + sessionName;
  $("#sessionMsg").html(msg);

  $("li.registerButton").removeClass("registerButton").addClass("logoutButton");
  document.getElementById('sessionLink').href = "home.html";

  var content = "Log out";
  $("#sessionLabel").html(content);



  /*
   content += "<div id='red'>"; 
   content += "<ul>";
   content += "<li class='formMsg'><p><i>logged in as </i></li>";
   content += "<li id='logoutButton'>";           
   content += "<a href='home.html'>Log out</a>";             
   content += "</li></ul></div>";  
   //content += "<button class='logoutButton' onlclick='window.open(\"home.html\",_self);'>click mes</button>";
   
   //content += "</div>"; */


}

//Display a dialog upon successful appointment reservation
function displayReserveSuccessDialog() {
  var content = "<p>Thank you for reserving an appointment, reservation successful.</p>";

  console.log("Inside displayReserveSuccessDialog()");
  console.log(content);

  $("#reservationDialog").html(content);

  $("#reservationDialog").dialog({minWidth: 200, minHeight: 200,
    show: {
      effect: "fade",
      duration: 500
    },
    hide: {
      effect: "fade",
      duration: 500
    }});

  //Will make it so when the user refreshes the page, the dialog doesnt keep showing up
  //Courtesy of:
  // http://stackoverflow.com/questions/16941104/remove-a-parameter-to-the-url-with-javascript
  // http://stackoverflow.com/questions/12832317/window-history-replacestate-example
  history.pushState({}, "New Title", removeParam("reserve"));
  
}

// Dialog box to let user know status of account registation.
function displayDialog(status) {
  var content = "";

  if (status === true) {
    content += "<p>Thank you for registering, your acccount was successfully created.</p>";
  }
  else {
    content += "<p>There was an error creating the account. Please try again.</p>";
  }

  content += "</div></div>";

  //The following is from:
  //https://jqueryui.com/dialog/#default
  $("#regstDialog").html(content);

  //Using a dialog will pop up the day view in a dialog box.
  //Setting the min height and width found here:
  //http://api.jqueryui.com/dialog/#option-minHeight
  //Setting the UI effects for open/close here:
  //http://api.jqueryui.com/category/effects/
  //http://api.jqueryui.com/dialog/#option-hide
  $("#regstDialog").dialog({minWidth: 200, minHeight: 200,
    show: {
      effect: "fade",
      duration: 500
    },
    hide: {
      effect: "fade",
      duration: 500
    }});
  
  //Will make it so when the user refreshes the page, the dialog doesnt keep showing up
  //Courtesy of:
  // http://stackoverflow.com/questions/16941104/remove-a-parameter-to-the-url-with-javascript
  // http://stackoverflow.com/questions/12832317/window-history-replacestate-example
  history.pushState({}, "New Title", removeParam("register"));

}