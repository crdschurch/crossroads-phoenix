import Handlebars from "handlebars"
//import "phoenix_html"
// include all svg files in icons directory in the body of the document
//var files = require.context('../icons', false, /.svg$/);
//files.keys().forEach(files);

// import socket from "./socket"
function run() {
    test1();
    alertCMS();
}

function test1() {
    var test1 = document.getElementById("test1");
    test1.addEventListener("click", function (event) {
        event.preventDefault();
        alert("Hello from Phoenix JavaScript!");
    });
}

window.onload = run;


// This could be used to replace {{ }} variables in the nav menu
// FWIW I don't like it!
var source = document.getElementById("nav-menu").innerHTML;
var template = Handlebars.compile(source);
var html = template({ "base_href": "http://localhost:4000" }) // replace localhost with real base url
document.getElementById("nav-menu").innerHTML = html
