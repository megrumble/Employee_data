'use strict'


// Initialize Firebase
var config = {
    apiKey: "AIzaSyDHYPSOVl1kepVUMSyVyFg68ny5Yj5DBl4",
    authDomain: "employeetimesheet-58aae.firebaseapp.com",
    databaseURL: "https://employeetimesheet-58aae.firebaseio.com",
    projectId: "employeetimesheet-58aae",
    storageBucket: "",
    messagingSenderId: "887508912266"
};

firebase.initializeApp(config);



var database = firebase.database();

moment(new Date()).format("DD/MM/YY");

function Employee(name, role, start, rate) {
    this.name = name;
    this.role = role;
    this.startDate = start;
    this.monthlyRate = rate;
    this.dateAdded = firebase.database.ServerValue.TIMESTAMP
}

database.ref().on("child_added", function(snapshot){ 
    var display = $("#employee-display");
    var startDate = snapshot.val().startDate;
    var monthsWorked = moment(startDate).diff(moment(), 'months', false) * -1;
    var rate = snapshot.val().monthlyRate;
    var totalBilled = rate * monthsWorked;
    var tr = $("<tr>")
        .append(`<td>${ snapshot.val().name }</td>`)
        .append(`<td>${ snapshot.val().role }</td>`)
        .append(`<td>${ startDate }</td>`)
        .append(`<td>${ monthsWorked }</td>`)
        .append(`<td>$${ rate }</td>`)
        .append(`<td>$${ totalBilled }</td>`);

        
    display.prepend(tr);
});

$("#add-employee-btn").on('click', function(e) {

    e.preventDefault();

    var name = $("#employee-name-input").val().trim();
    var date = $("#start-input").val().trim();
    
    var start = moment(date, "DD/MM/YY").format("MM/DD/YY");
    
    var rate = $("#rate-input").val().trim();
    var role = $("#role-input").val().trim();
    
    if(!moment(start).isValid()) {
        alert("Enter a proper date!");
        return;
    }
    database.ref().push(new Employee(name, role, start, rate));
    
    $("#employee-name-input").val("").focus();
    $("#start-input").val("");
    $("#rate-input").val("");
    $("#role-input").val("");
});
