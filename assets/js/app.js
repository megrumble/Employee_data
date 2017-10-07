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

function Employee(name, role, startDate, monthlyRate) {
    this.name = name;
    this.role = role;
    this.startDate = startDate;
    this.monthlyRate = monthlyRate;
    this.dateAdded = firebase.database.ServerValue.TIMESTAMP;
}


database.ref().push(new Employee("Mike", "Front End Designer", "9/20/17", "45000"));

