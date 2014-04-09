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

function validateRegistrationForm(){
  /* // validate if email already associate with known account
  var email = getParameter("email");
  //var email = "t@gmail.com";
  if(email === null ){
    console.log("email is null");
  } else{
  for(var count = 0; count < userLoginInfo.length; count++){
    if(email === userLoginInfo[count].email){
      console.log(userLoginInfo[count].email);
      $(this).html("This email already exists");
      //$('input[name=email]').attr('disabled', true);
      break;
      //console.log("email is found");
    } 
    else {
      $(this).html("This email already exists");
      $('input[name=email]').attr('disabled', false);
    }
  } 
  }*/
  $('#registrationform').keypress(function(event){
    if(event.keyCode === 10 || event.keyCode === 13) event.preventDefault();
  });
  
  $.validator.addMethod("alreadyExist", 
    function(value){
      flag = true;
      console.log(value);
      for(var count = 0; count < userLoginInfo.length; count++){
        //console.log(userLoginInfo.length);
        if(value === userLoginInfo[count].email){
          console.log( "Value: " + value + "; Email Entered: " + userLoginInfo[count].email );
          flag = false;
          break;
        }
      }
      return flag;    
  });
  
  // Changes to the validator options are based on the documentation
  // found here: http://jqueryvalidation.org/validate#toptions
  $( '#registrationform' ).validate( {
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
        minlength: 8,
        maxlength: 16,
        required: true
      },
      confirmPassword: {
        // range rule will not properly validate
        minlength: 8,
        maxlength: 16,
        equalTo: "#password"
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
      password:{ 
        minlength: "length too short",
        maxlength: "length too long",
        required: "Please provide a password"
      },
      confirmPassword: {
        minlength: "length too short",
        maxlength: "length too long",
        equalTo: "Password does not match"
      },
      phoneNum: {
        required: "Please enter a phone number",
        phoneUS: "Please enter valid 10 digit US phone number"
      }
    }, // end messages
    // Modify the default placement of the error
    errorPlacement: function( error, element ){
      error.insertAfter( element ); // This might be the default, but including for good measure
      $( "<div class='ui-icon ui-icon-alert'></div>" ).insertAfter( element );
      error.addClass( "ui-helper-reset ui-state-error-text" );
    }, // end errorPlacement
    // Change the default behavior of highlighting the errors
    highlight: function( element, errorClass, validClass ){
      $( element ).addClass( errorClass ).removeClass( validClass );
      $( element ).parent( "div" ).addClass( "ui-state-error" );
      $( element ).siblings( "div" ).addClass( "ui-icon ui-icon-alert" );
    }, // end highlight
    // When a field is valid, adjust how it is unhighlighted.
    unhighlight: function( element, errorClass, validClass ){
      $( element ).removeClass( errorClass ).addClass( validClass );
      $( element ).parent( "div" ).removeClass( "ui-state-error" );
      $( element ).siblings( "div" ).removeClass( "ui-icon ui-icon-alert" );
    } // end unhighlight
  } ); // end validate
}

