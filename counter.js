
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBoWD99dNXjOfM6IwJrGmPIEc0VYOSQo8M",
    authDomain: "portfoliopageticker.firebaseapp.com",
    databaseURL: "https://portfoliopageticker.firebaseio.com",
    projectId: "portfoliopageticker",
    storageBucket: "",
    messagingSenderId: "597891833983"
  };
  firebase.initializeApp(config);

  // Get a reference to the database service
  var database = firebase.database();

  // Setting initial value of our click counter variable to 0
  var clickCounter = 0;

  // FUNCTIONS + EVENTS
  // --------------------------------------------------------------------------------

  // On Click of Button
  $("#click-button").on("click", function() {

    // Add to clickCounter
    clickCounter++;

    //  Store Click Data to Firebase in a JSON property called clickCount
    // Note how we are using the Firebase .set() method
    database.ref().set({
      clickCount: clickCounter
    });
  });

  // MAIN PROCESS + INITIAL CODE
  // --------------------------------------------------------------------------------

  // Using .on("value", function(snapshot)) syntax will retrieve the data
  // from the database (both initially and every time something changes)
  // This will then store the data inside the variable "snapshot". We could rename "snapshot" to anything.
  database.ref().on("value", function(snapshot) {

    // Then we console.log the value of snapshot
    console.log(snapshot.val());

    // Then we change the html associated with the number.
    $("#click-value").text(snapshot.val().clickCount);

    // Then update the clickCounter variable with data from the database.
    clickCounter = snapshot.val().clickCount;

    // If there is an error that Firebase runs into -- it will be stored in the "errorObject"
    // Again we could have named errorObject anything we wanted.
  }, function(errorObject) {

    // In case of error this will print the error
    console.log("The read failed: " + errorObject.code);
  });