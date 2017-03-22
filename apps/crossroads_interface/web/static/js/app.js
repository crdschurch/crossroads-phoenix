import Handlebars from "handlebars"
//import "phoenix_html"
// include all svg files in icons directory in the body of the document
//var files = require.context('../icons', false, /.svg$/);
//files.keys().forEach(files);

// import socket from "./socket"
function run() {
    translateBaseHref();
    test1();
    invokeAlertCms();
}

function invokeAlertCms() {
    if(typeof alertCms !== 'undefined'){
        alertCms();
    }
}

function test1() {
    var test1 = document.getElementById("test1");
    if (test1 !== undefined && test1 !== null) {
        test1.addEventListener("click", function (event) {
            event.preventDefault();
            alert("Hello from Phoenix JavaScript!");
        });
    }
}

function translateBaseHref() {
    // This could be used to replace {{ }} variables in the nav menu
    // FWIW I don't like it!
    var source = document.getElementById("nav-menu");
    if (source) {
        var sourceHtml = source.innerHTML;
        var template = Handlebars.compile(sourceHtml);
        var html = template({ "base_href": "http://localhost:4000" }) // replace localhost with real base url
        document.getElementById("nav-menu").innerHTML = html
    }

}

window.onload = run;