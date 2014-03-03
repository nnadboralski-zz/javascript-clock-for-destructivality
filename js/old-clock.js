/*jslint browser: true*/
/*global $, jQuery*/

var UPDATE_SPEED = 50;
var YEAR2K = 946684800;

function updateTime() {
    var d = new Date();
    var epoch_milliseconds = d.getTime();
    var epoch_seconds = epoch_milliseconds / 1000;
    epoch_seconds -= YEAR2K;
    $("#epoch_seconds").html(Math.floor(epoch_seconds));
    earthTime(epoch_seconds);
    grigoranTime(epoch_seconds);
    orianTime(epoch_seconds);
    niddlingTime(epoch_seconds);
    vulpinianTime(epoch_seconds);
  
}

function niddlingTime(seconds) {
  	seconds = seconds / 0.65536;
	year = Math.floor(seconds / 38400000);
	seconds -= year * 38400000;
	season = Math.floor(seconds / 9600000);
	seconds -= season * 9600000;
	month = Math.floor(seconds / 2400000);
	seconds -= month * 2400000;
	day = Math.floor(seconds / 100000);
	seconds -= day * 100000;
	hour = Math.floor(seconds / 10000);
	seconds -= hour * 10000;
	min = Math.floor(seconds / 100);
	seconds -= min * 100;
	sec = Math.floor(seconds);

	year += 100000;
	season++;
	month++;
	day++;
  
    $("#niddling_year").html(year);
    $("#niddling_season").html(season);
    $("#niddling_month").html(month);
    $("#niddling_day").html(day);
    $("#niddling_hour").html(hour);
    $("#niddling_minute").html(min);
    $("#niddling_second").html(sec);
}

function vulpinianTime(seconds) {
	cycle = Math.floor(seconds / 25165824);
	seconds -= cycle * 25165824;
	kyuugon = Math.floor(seconds / 3145728);
	seconds -= kyuugon * 3145728;
	rotation = Math.floor(seconds / 65536);
	seconds -= rotation * 65536;
	major = Math.floor(seconds / 256);
	seconds -= major * 256;
	minor = Math.floor(seconds);

	cycle += 50;
	kyuugon++;
	rotation++;

    cycle_hex = cycle.toString(16);
    kyuugon_hex = kyuugon.toString(16);
    rotation_hex = rotation.toString(16);
    major_hex = major.toString(16);
    minor_hex = minor.toString(16);

    $("#vulpinian_cycle").html(cycle);
    $("#vulpinian_hex_cycle").html(cycle_hex);
    $("#vulpinian_kyuugon").html(kyuugon);
    $("#vulpinian_hex_kyuugon").html(kyuugon_hex);
    $("#vulpinian_rotation").html(rotation);
    $("#vulpinian_hex_rotation").html(rotation_hex);
    $("#vulpinian_major").html(major);
    $("#vulpinian_hex_major").html(major_hex);
    $("#vulpinian_minor").html(minor);
    $("#vulpinian_hex_minor").html(minor_hex);

}

function grigoranTime(seconds) {
  seconds = 27.0 * seconds / 32.0;
  var year = Math.floor(seconds / 21233664);
  seconds -= year * 21233664;
  var month = Math.floor(seconds / 1769472);
  seconds -= month * 1769472;
  var day = Math.floor(seconds / 55296);
  seconds -= day * 55296;
  var hour = Math.floor(seconds / 2304);
  seconds -= hour * 2304;
  var minutes = Math.floor(seconds / 48);
  seconds -= minutes * 48;
  secs = Math.floor(seconds);
  
  year += 100000;
  month++;
  day++;
  
  $("#grigoran_year").html(year);
  $("#grigoran_month").html(month);
  $("#grigoran_day").html(day);
  $("#grigoran_second").html(secs);
  $("#grigoran_minute").html(minutes);
  $("#grigoran_hour").html(hour);
}

function orianTime(seconds) {
  year = Math.floor(seconds / 25165824);
  seconds -= year * 25165824;
  season = Math.floor(seconds / 6291456);
  seconds -= season * 6291456;
  day = Math.floor(seconds / 65536);
  seconds -= day * 65536;
  quater = Math.floor(seconds / 16384);
  seconds -= quater * 16384;
  hour = Math.floor(seconds / 4096);
  seconds -= hour * 4096;
  minutes = Math.floor(seconds / 64);
  seconds -= minutes * 64;
  beat = Math.floor(seconds);
  
  year += 100000;
  season++;
  day++;
  
  $("#orian_year").html(year);
  $("#orian_season").html(season);
  $("#orian_day").html(day);
  $("#orian_quater").html(quater);
  $("#orian_hour").html(hour);
  $("#orian_minute").html(minutes);
  $("#orian_beat").html(beat);
  
  
}

function earthTime(seconds) {
    var days = Math.floor(seconds / 86400);
    seconds -= (days * 86400);
    var hours = Math.floor(seconds / 3600);
    seconds -= (hours * 3600);
    var minutes = Math.floor(seconds / 60);
    seconds -= (minutes * 60);
    secs = Math.floor(seconds);
    days += 1;
    var year = 2000;
    month = 1;
    day = 0;
    var leap;
  
    while (days > 0) {
        if (isLeapYear(year)) {
            days -= 366
        } else {
            days -= 365
        }
        year += 1;
    }
    
    if (days <= 0) {
        if (isLeapYear(year - 1)) {
            days += 366;
        } else {
            days += 365;
        }
        year -= 1;
    }
    if (isLeapYear(year)) {
      leap = 1;
    } else {
      leap = 0;
    }
      
    while (days > 0) {
	if ((days > 31 && (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12)) || (days > 30 && (month == 4 || month == 6 || month == 9 || month == 11)) || (days > (28 + leap) && month == 2)) {
        if ((days > 31 && (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12))) {
          days -= 31;
        } 
        if ((days > 30 && (month == 4 || month == 8 || month == 9 || month == 11))) {
          days -= 30;
        }
        if ((days > (28 + leap) & month == 2)) {
          days -= 28 + leap;
        }
        month++;
      }
      else {
        day = days;
        days = 0
      }
    }
  
    $("#earth_year").html(year);
    $("#earth_month").html(month);
    $("#earth_day").html(day);
    $("#earth_second").html(secs);
    $("#earth_minute").html(minutes);
    $("#earth_hour").html(hours);
}

function isLeapYear(yr) {
    return !((yr % 4) || (!(yr % 100) && (yr % 400)));  
}

$(document).ready(function() {
    updateTime();
    window.setInterval(function() { updateTime(); }, UPDATE_SPEED);
});


