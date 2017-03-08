//import "phoenix_html"

// include all svg files in icons directory in the body of the document
//var files = require.context('../icons', false, /.svg$/);
//files.keys().forEach(files);

// import socket from "./socket"

export var App = {
  run: function(){
    var pastoralCare = document.getElementById("pastoralCare");
    pastoralCare.addEventListener("click", function() { alert("Hello from Phoenix JavaScript!"); });
  }
}
