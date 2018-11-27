// Initialize Firebase
var config = {
    apiKey: "AIzaSyBWwt231IvfYwnYlxvdw2RmP-P1wX9GECk",
    authDomain: "train-schedule-5a42b.firebaseapp.com",
    databaseURL: "https://train-schedule-5a42b.firebaseio.com",
    projectId: "train-schedule-5a42b",
    storageBucket: "",
    messagingSenderId: "51394944717"
};
firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Trains
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var destinationInput = $("#destination-input").val().trim();
    var firstTrainInput = $("#first-train-input").val().trim();
    var frequencyInput = $("#frequency-input").val().trim();

    // Creates local "temporary" object for holding train data
    var newTrain = {
        name: trainName,
        destination: destinationInput,
        firstTrain: firstTrainInput,
        frequency: frequencyInput
    };

    // Uploads train data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    // console.log(newTrain.name);
    // console.log(newTrain.destination);
    // console.log(newTrain.firstTrain);
    // console.log(newTrain.frequency);

    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
    // console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destinationInput = childSnapshot.val().destination;
    var firstTrainInput = childSnapshot.val().firstTrain;
    var frequencyInput = childSnapshot.val().frequency;

    // Train Info
    // console.log(trainName);
    // console.log(destinationInput);
    // console.log(firstTrainInput);
    // console.log(frequencyInput);

    var today = new Date();
    console.log('Date (d): ' +today);

var momFormat = moment(today, 'MM/DD/YYYY');
var formattedD = momFormat.format('YYYY-MM-DD');
// console.log('Moment: ' + momFormat);
// console.log('formattedD: ' +formattedD);
var firstTrainTime = (formattedD + ' ' + firstTrainInput);

console.log('First Train: ' +firstTrainTime);
console.log('Current: ' +moment().format('YYYY-MM-DD HH:mm'));
var timeDiff = (moment().diff(firstTrainTime, 'minutes'));

console.log(timeDiff);
var minutesAway = Math.abs(timeDiff % frequencyInput);
console.log('minutes away: ' + minutesAway);  

var nextArrival = (moment().add(minutesAway, 'minutes').format('hh:mm'));
console.log('next arrival: ' + nextArrival);



    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destinationInput),
        $("<td>").text(frequencyInput),
        $("<td>").text(nextArrival),
        $("<td>").text(minutesAway),
    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
});

