//lots of global variables- sorry!

var start_button = document.getElementById("start-button");
var stop_button = document.getElementById("stop-button");
var reset_button = document.getElementById("reset-button");
// var start_button_text = document.getElementById("start-stop-button-text");
// var reset_button_text = document.getElementById("reset-button-text");
var INTERVAL = 5;
var time_display = document.getElementById("time-display");
var interval_id,
	start_time,
	display_time = 0;

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
	display_time += INTERVAL;
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
	update_display();
};

start_button.addEventListener("click", start);
stop_button.addEventListener("click", stop);
reset_button.addEventListener("click", reset);
