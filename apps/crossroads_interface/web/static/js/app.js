function run() {
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

window.onload = run;