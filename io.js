// Declare Click Functions
$(document).ready(function() {
  $("#flow").click(function() {
    updateFlow();
  });
  $("#departing").click(function() {
    updateDepartureRunways();
  });
  $("#status-notes").click(function() {
    updateStatusNotes();
  });
  runClock();
});

/** Wrap a string in an HTML paragraph
 */
function p(content) {
  return "<p>" + content + "</p>";
}

/** Convert single string to array of <br>'d lines via splitting by "*"
 */
function splitLines(lines) {
  lines = lines.split("*");
  for(var i=0; i<lines.length-1; i++) {
    lines[i] = lines[i] + "<br>";
  }
  return lines.join("");
}

/** Prompt user for new flow and update the display
 */
function updateFlow() {
  var flow = prompt("Enter the flow of landing/departing traffic:");
  if(flow) $("#flow").html(p(flow.toUpperCase()));
}

/** Prompt user for new departure runways and update the display
 */
function updateDepartureRunways() {
  var rwys = prompt("Enter the active departure runways:");
  if(rwys) $("#departing").html(p(rwys.toUpperCase()));
}

/** Prompt user for new status notes and update the display
 */
function updateStatusNotes() {
  var notes = prompt("Enter status notes, separated by asterisks (*) :");
  if(notes) $("#status-notes").html(p(splitLines(notes)));
  else if(notes === "") $("#status-notes").html(p("Normal Operations"));
}

/** Update the clock
 */
function runClock() {
    var today = new Date();
    var D = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][today.getDay()];
    var M = ["January","February","March","April","May","June","July","August","September","October","November","December"][today.getMonth()];
    var N = today.getDate();
    var Y = today.getFullYear();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    h = (h<10) ? "0"+h : h;
    m = (m<10) ? "0"+m : m;
    s = (s<10) ? "0"+s : s;
    $("#localtime").html(h + ":" + m + ":" + s);
    $("#zulutime").html((h-4) + "z");
    $("#date").html(D + ", " + M + " " + N + ", " + Y);
    var t = setTimeout(runClock, 100);
}
