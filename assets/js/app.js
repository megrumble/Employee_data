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
/*
var name = "";
var start = "";
var rate = 0;
var role = "";
*/

function Employee(name, role, start, rate) {
    this.name = name;
    this.role = role;
    this.startDate = start;
    this.monthlyRate = rate;
    this.dateAdded = firebase.database.ServerValue.TIMESTAMP
}

database.ref().on("child_added", function(snapshot){ 
    var display = $("#employee-display");
    var tr = $("<tr>")
        .append(`<td>${ snapshot.val().name }</td>`)
        .append(`<td>${ snapshot.val().role }</td>`)
        .append(`<td>${ snapshot.val().startDate }</td>`)
        .append(`<td></td>`)
        .append(`<td>$${snapshot.val().monthlyRate }</td>`)
        .append(`<td></td>`);

        
    display.append(tr);
});

$("#add-employee-btn").on('click', function(e) {
    e.preventDefault();
    var name = $("#employee-name-input").val().trim();
    var start = $("#start-input").val().trim();
    var rate = $("#rate-input").val().trim();
    var role = $("#role-input").val().trim();
    
    database.ref().push(new Employee(name, role, start, rate));

});
