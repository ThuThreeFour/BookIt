/* 
 * validateForm.js
 * Christopher Compton
 * christopher.j.compton@gmail.com
 * christopher_compton@student.uml.edu
 * Undergraduate Student at UMass Lowell
 * 91.462 GUI Programming II
 *
 * Created on 02-22-2014 CJC
 */

function validate(){
        // Changes to the validator options are based on the documentation
        // found here: http://jqueryvalidation.org/validate#toptions
        $( 'form' ).validate( {
          // Change the default container that the error messages are placed
          errorElement: "p",
          rules: {
            fname: {
              required: true
            },
            lname: {
              required: true
            },
            phoneNum: {
              required: true
            },
            email: {
              required: true,
              email: true
            }
          }, // end rules
          messages: {
            fname: {
              required: "Please provide your first name"
            },
            lname: {
              required: "Please provide your last name"
            },
            phoneNum: {
              required: "Please enter a phone number"
            },
            email: {
              required: "Please provide an email address",
              email: "Please enter in the form of name@domain.com"
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