var backendUrl = "https://stacklight.herokuapp.com";

$(function () {
    console.log("On page load for all projects page");
    //gapi.load('auth2', function() { // Ready. });
    $('.project').click(goToProject);
    $('#loginBar').hide();
    $('.row').hide();
    $('.navbar').click(signOut);
    $(".abcRioButtonContentWrapper").css("left", "75%");
});

function goToProject() {
    location.href = "index.html";
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    $('.g-signin2').show();
    $('#loginBar').hide();
    $('.row').hide();
    $('#loginBar').text("Login");
  }

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  $.ajax({
                   type: "POST",
                   url: backendUrl + "/users",
                   data: JSON.stringify({mFirstName: profile.getGivenName(), mLastName: profile.getFamilyName()
                        , mEmail: profile.getEmail()}),
                  //data: params,
                  success: function (result) {
                      console.log("User check sent");
                  },
              }
      );
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  $('#loginBar').text(profile.getEmail());
  $('#loginBar').show();
  $('.row').show();
  $('.g-signin2').hide();

}