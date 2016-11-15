// TODO- make it modular

var start_button = document.getElementById("start-button");
var stop_button = document.getElementById("stop-button");
var reset_button = document.getElementById("reset-button");
var lap_button = document.getElementById("lap-button");
// var start_button_text = document.getElementById("start-stop-button-text");
// var reset_button_text = document.getElementById("reset-button-text");
var INTERVAL = 10;

var time_display = document.getElementById("time-display");
var curr_lap_display = document.getElementById("curr-lap-display");
var lap_times_display = document.getElementById("lap-times-display");

var laps = [],
    most_recent_lap,
    lapHTML;
    
var interval_id,
    start_time,
    display_time = 0,
    curr_lap_time = 0;

var format_time = function(t) {
    var cs = Math.floor((t/10)%100);
    if (cs < 10) {
        cs = "0" + cs;
    }
    var s = Math.floor((t/1000) % 60)  ;
    if (s < 10) {
        s = "0" + s;
    }
    var m = Math.floor((t/60000) % 60);
    if (m < 10) {
        m = "0" + m;
    }
    return m + ":" + s + ":" + cs;
};


var update_display = function() {
    time_display.innerHTML = format_time(display_time);
    curr_lap_display.innerHTML = format_time(curr_lap_time);
    display_time += INTERVAL;
    curr_lap_time += INTERVAL;
};

var start = function() {
    // to stop multiple starts
    if (!interval_id) {
        interval_id = window.setInterval(update_display, INTERVAL);
    } else {
        // maybe button glow red or something.
    };
};

var stop = function() {
    clearInterval(interval_id);
    interval_id = null;
};

var reset = function() {
    display_time = 0;
    curr_lap_time = 0;
    update_display();
    laps = [];
    clear_laps();
};

var clear_laps = function() {
    lap_times_display.innerHTML = ""
}

var write_lap = function(l) {
    if (l.length == 1) {    
        most_recent_lap = l[0];
    }
    else {
        most_recent_lap = l[l.length - 1] - l[l.length - 2];
    }
    lapHTML = "<div id='lap'>Lap " + l.length +": " + format_time(most_recent_lap) +"</div>"
    lap_times_display.innerHTML += lapHTML
}

var lap = function() {
    // TODO- implement laps when clock stopped?
    if (interval_id) {
    // if clock running
        laps.push(display_time);
        write_lap(laps);
        curr_lap_time = 0;
    }
};

start_button.addEventListener("click", start);
stop_button.addEventListener("click", stop);
reset_button.addEventListener("click", reset);
lap_button.addEventListener("click", lap);



