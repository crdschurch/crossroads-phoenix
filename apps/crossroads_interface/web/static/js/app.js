import "phoenix_html"
import Handlebars from "handlebars"
// include all svg files in icons directory in the body of the document
//var files = require.context('../icons', false, /.svg$/);
//files.keys().forEach(files);

// import socket from "./socket"


// This could be used to replace {{ }} variables in the nav menu
// FWIW I don't like it!
var source   = document.getElementById("nav-menu").innerHTML;
var template = Handlebars.compile(source);
var html     = template({"base_href": "http://localhost:4000"}) // replace localhost with real base url
document.getElementById("nav-menu").innerHTML = html
