var flows = ["NORTH FLOW", "SOUTH FLOW", "WEST FLOW", "EAST FLOW"];
var rwys = ["1L", "1C", "1R", "19L", "19C", "19R", "12", "30"];
var current = {flow:1, rwys:[3,7]};

// Declare Click Functions
$(document).ready(function() {
  $("*").contextmenu(function(){
    return false;
  });
  $("#flow").mousedown(function(e) {
    setFlow(e.button - 1);
  });
  $("#departing").click(function() {
    setDepartureRunways();
  });
  $("#status-notes").click(function() {
    setStatusNotes();
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
 ** @param {number} change - whether to increment (+1) or decrement (-1) the value
 */
function setFlow(change) {
  current.flow += change;
  if(current.flow < 0) current.flow += flows.length;
  if(current.flow >= flows.length) current.flow -= flows.length;
  $("#flow").html(p(flows[current.flow]));
}

/** Prompt user for new departure runways and update the display
 */
function setDepartureRunways() {
  var input = prompt("Enter the flow of landing/departing traffic:");
  if(input) current.rwys = input.split(",");
  var runways = [];
  for(var i in current.rwys) runways.push(rwys[current.rwys[i]]);
  $("#departing").html(p(runways.join(' / ')));
}

/** Prompt user for new status notes and update the display
 */
function setStatusNotes() {
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
    var z = today.getUTCHours();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    z = (z<10) ? "0"+z : z;
    h = (h<10) ? "0"+h : h;
    m = (m<10) ? "0"+m : m;
    s = (s<10) ? "0"+s : s;
    $("#localtime").html(h + ":" + m + ":" + s);
    $("#zulutime").html(z + "z");
    $("#date").html(D + ", " + M + " " + N + ", " + Y);
    var t = setTimeout(runClock, 100);
}
