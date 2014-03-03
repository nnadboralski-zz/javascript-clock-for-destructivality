/*jslint browser: true*/
/*global $, jQuery*/

UPDATE_SPEED = 55;
EPOCH_ADJUSTMENT_TO_YEAR_2000 = 946684800;

EARTH_SECONDS_PER_DAY = 86400;
EARTH_SECONDS_PER_HOUR = 3600;
EARTH_SECONDS_PER_MINUTE = 60;

EARTH_METRIC_SECOND_MULTIPLIER = 100000;
EARTH_METRIC_SECOND_DIVISOR = 86400;
EARTH_METRIC_SECONDS_PER_HOUR = 10000;
EARTH_METRIC_SECONDS_PER_MINUTE = 100;

GRIGORAN_SECOND_MULTIPLIER = 27.0;
GRIGORAN_SECOND_DIVISOR = 32.0;
GRIGORAN_SECONDS_PER_YEAR = 21233664;
GRIGORAN_SECONDS_PER_MONTH = 1769472;
GRIGORAN_SECONDS_PER_DAY = 55296;
GRIGORAN_SECONDS_PER_HOUR = 2304;
GRIGORAN_SECONDS_PER_MINUTE = 48;

ORIAN_SECONDS_PER_YEAR = 25165824;
ORIAN_SECONDS_PER_SEASON = 6291456;
ORIAN_SECONDS_PER_DAY = 65536;
ORIAN_SECONDS_PER_QUATER = 16384;
ORIAN_SECONDS_PER_HOUR = 4096;
ORIAN_SECONDS_PER_MINUTE = 64;

NIDDLING_SECOND_DIVISOR = 0.65536;
NIDDLING_SECONDS_PER_YEAR = 38400000;
NIDDLING_SECONDS_PER_SEASON = 9600000;
NIDDLING_SECONDS_PER_MONTH = 2400000;
NIDDLING_SECONDS_PER_DAY = 100000;
NIDDLING_SECONDS_PER_HOUR = 10000;
NIDDLING_SECONDS_PER_MINUTE = 100;

VULPINIAN_SECONDS_PER_CYCLE = 25165824;
VULPINIAN_SECONDS_PER_KYUUGON = 3145728;
VULPINIAN_SECONDS_PER_ROTATION = 65536;
VULPINIAN_SECONDS_PER_MAJOR = 256;

UCT_SECONDS_PER_YEAR = 25165824;
UCT_SECONDS_PER_MONTH = 1572864;
UCT_SECONDS_PER_DAY = 65536;
UCT_SECONDS_PER_HOUR = 4096;
UCT_SECONDS_PER_MINUTE = 64;


earth = new earthClock();
earth_metric = new earthMetricClock();
grigoran = new grigoranClock();
orian = new orianClock();
niddling = new niddlingClock();
vulpinian = new vulpinianClock();
uct = new uctClock();

Number.prototype.padLeft = function(len, pad) {
  pad = typeof pad === "undefined" ? "0" : pad + "";
  var str = this + "";
  while(str.length < len) {
      str = pad + str;
  }
  return str;
}

String.prototype.padLeft = function(len, pad) {
  pad = typeof pad === "undefined" ? "0" : pad + "";
  var str = this + "";
  while(str.length < len) {
      str = pad + str;
  }
  return str;
}

function getEpoch() {
  var d = new Date();
  var epoch_milliseconds = d.getTime();
  var epoch_seconds = epoch_milliseconds / 1000;
  epoch_seconds -= EPOCH_ADJUSTMENT_TO_YEAR_2000;
  return epoch_seconds;  
}

function isLeapYear(yr) {
    return !((yr % 4) || (!(yr % 100) && (yr % 400)));  
}

function earthDate(days) {
  days++;
  var year = 2000;
  var month = 1
  var day = 0;
  var leap = 0;

  while (days > 0) {
    if (isLeapYear(year)) {
      days -= 366;
    } else {
      days -= 365;
    }
    year++;
  }

  if (isLeapYear(year - 1)) {
    days += 366;
    leap = 1;
  } else {
    days += 365;
    leap = 0;
  }

  year -= 1;

  while (days > 0) {
    if ((days > 31 && (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12))) {
      days -= 31;
      month++;
    } else if ((days > 30 && (month == 4 || month == 6 || month == 9 || month == 11))) {
      days -= 30;
      month++;
    } else if ((days > (28 + leap) & month == 2)) {
      days -= 28 + leap;
      month++;
    } else {
      this.day = days;
      days = 0;
    }
  }
  this.month = month;
  this.year = year;
}

function updateTime() {
  epoch_seconds = getEpoch();
  $("#epoch_seconds").html(Math.floor(epoch_seconds));

  earth.update();
  earthDisplay(earth);

  earth_metric.update();
  earthMetricDisplay(earth_metric);

  grigoran.update();
  grigoranDisplay(grigoran);

  orian.update();
  orianDisplay(orian);

  niddling.update();
  niddlingDisplay(niddling);

  vulpinian.update();
  vulpinianDisplay(vulpinian);

  uct.update();
  uctDisplay(uct);
}

function earthDisplay(earth) {
  $("#earth_year").html(earth.year.padLeft(4));
  $("#earth_month").html(earth.month.padLeft(2));
  $("#earth_day").html(earth.day.padLeft(2));
  $("#earth_hour").html(earth.hour.padLeft(2));
  $("#earth_minute").html(earth.minute.padLeft(2));
  $("#earth_second").html(earth.second.padLeft(2));
}

function earthMetricDisplay(earth_metric) {
  $("#earth_metric_year").html(earth_metric.year.padLeft(4));
  $("#earth_metric_month").html(earth_metric.month.padLeft(2));
  $("#earth_metric_day").html(earth_metric.day.padLeft(2));
  $("#earth_metric_hour").html(earth_metric.hour);
  $("#earth_metric_minute").html(earth_metric.minute.padLeft(2));
  $("#earth_metric_second").html(earth_metric.second.padLeft(2));
}

function grigoranDisplay(grigoran) {
  $("#grigoran_year").html(grigoran.year.padLeft(6));
  $("#grigoran_month").html(grigoran.month.padLeft(2));
  $("#grigoran_day").html(grigoran.day.padLeft(2));
  $("#grigoran_hour").html(grigoran.hour.padLeft(2)); 
  $("#grigoran_minute").html(grigoran.minute.padLeft(2));
  $("#grigoran_second").html(grigoran.second.padLeft(2));
}

function orianDisplay(orian) {
  $("#orian_year").html(orian.year.padLeft(6));
  $("#orian_season").html(orian.season);
  $("#orian_day").html(orian.day.padLeft(2));
  $("#orian_quater").html(orian.quater);
  $("#orian_hour").html(orian.hour);
  $("#orian_minute").html(orian.minute.padLeft(2));
  $("#orian_beat").html(orian.beat.padLeft(2));
}

function niddlingDisplay(niddling) {
  $("#niddling_year").html(niddling.year.padLeft(6));
  $("#niddling_season").html(niddling.season);
  $("#niddling_month").html(niddling.month);
  $("#niddling_day").html(niddling.day.padLeft(2));
  $("#niddling_hour").html(niddling.hour);
  $("#niddling_minute").html(niddling.minute.padLeft(2));
  $("#niddling_second").html(niddling.second.padLeft(2));
}

function vulpinianDisplay(vulpinian) {
  $("#vulpinian_cycle").html(vulpinian.cycle.padLeft(5));
  $("#vulpinian_kyuugon").html(vulpinian.kyuugon);
  $("#vulpinian_rotation").html(vulpinian.rotation.padLeft(2));
  $("#vulpinian_major").html(vulpinian.major.padLeft(3));
  $("#vulpinian_minor").html(vulpinian.minor.padLeft(3));

  $("#vulpinian_hex_cycle").html(vulpinian.cycle_hex.padLeft(4));
  $("#vulpinian_hex_kyuugon").html(vulpinian.kyuugon_hex);
  $("#vulpinian_hex_rotation").html(vulpinian.rotation_hex.padLeft(2));
  $("#vulpinian_hex_major").html(vulpinian.major_hex.padLeft(2));
  $("#vulpinian_hex_minor").html(vulpinian.minor_hex.padLeft(2));
}


function uctDisplay(uct) {
  $("#uct_year").html(uct.year.padLeft(6));
  $("#uct_month").html(uct.month.padLeft(2));
  $("#uct_day").html(uct.day.padLeft(2));
  $("#uct_hour").html(uct.hour.padLeft(2));
  $("#uct_minute").html(uct.minute.padLeft(2));
  $("#uct_second").html(uct.second.padLeft(2));
}


function earthClock(seconds) {
  var days = Math.floor(seconds / EARTH_SECONDS_PER_DAY);
  var date = new earthDate(days);

  year = date.year;
  month = date.month;
  day = date.day;

  seconds -= (days * EARTH_SECONDS_PER_DAY);
  hour = Math.floor(seconds / EARTH_SECONDS_PER_HOUR);
  seconds -= (hour * EARTH_SECONDS_PER_HOUR);
  minute = Math.floor(seconds / EARTH_SECONDS_PER_MINUTE);
  seconds -= (minute * EARTH_SECONDS_PER_MINUTE);
  second = Math.floor(seconds);

  this.year = year;
  this.month = month;
  this.day = day;

  this.hour = hour;
  this.minute = minute;
  this.second = second;
}

earthClock.prototype.update = function () {
  var seconds = getEpoch();
  update = new earthClock(seconds);

  this.year = update.year;
  this.month = update.month;
  this.day = update.day;
  this.hour = update.hour;
  this.minute = update.minute;
  this.second = update.second;

  update = null;
}

function earthMetricClock(seconds) { 
  var days = Math.floor(seconds / EARTH_SECONDS_PER_DAY);
  var date = new earthDate(days);

  year = date.year;
  month = date.month;
  day = date.day;

  seconds -= (days * EARTH_SECONDS_PER_DAY);
  seconds = EARTH_METRIC_SECOND_MULTIPLIER * seconds / EARTH_METRIC_SECOND_DIVISOR;
  hour = Math.floor(seconds / EARTH_METRIC_SECONDS_PER_HOUR);
  seconds -= (hour * EARTH_METRIC_SECONDS_PER_HOUR);
  minute = Math.floor(seconds / EARTH_METRIC_SECONDS_PER_MINUTE);
  seconds -= (minute * EARTH_METRIC_SECONDS_PER_MINUTE);
  second = Math.floor(seconds);

  this.year = year;
  this.month = month;
  this.day = day;

  this.hour = hour;
  this.minute = minute;
  this.second = second;
}

earthMetricClock.prototype.update = function () {
  var seconds = getEpoch();
  update = new earthMetricClock(seconds);

  this.year = update.year;
  this.month = update.month;
  this.day = update.day;
  this.hour = update.hour;
  this.minute = update.minute;
  this.second = update.second;

  update = null;
}


function grigoranClock(seconds) {
  var seconds = GRIGORAN_SECOND_MULTIPLIER * seconds / GRIGORAN_SECOND_DIVISOR;
  
  var year = Math.floor(seconds / GRIGORAN_SECONDS_PER_YEAR);
  seconds -= year * GRIGORAN_SECONDS_PER_YEAR;
  var month = Math.floor(seconds / GRIGORAN_SECONDS_PER_MONTH);
  seconds -= month * GRIGORAN_SECONDS_PER_MONTH;
  var day = Math.floor(seconds / GRIGORAN_SECONDS_PER_DAY);
  seconds -= day * GRIGORAN_SECONDS_PER_DAY;
  var hour = Math.floor(seconds / GRIGORAN_SECONDS_PER_HOUR);
  seconds -= hour * GRIGORAN_SECONDS_PER_HOUR;
  var minute = Math.floor(seconds / GRIGORAN_SECONDS_PER_MINUTE);
  seconds -= minute * GRIGORAN_SECONDS_PER_MINUTE;
  
  year += 100000;
  month++;
  day++;
  
  this.year = year;
  this.month = month;
  this.day = day;

  this.hour = hour;
  this.minute = minute;
  this.second = Math.floor(seconds);

}

grigoranClock.prototype.update = function () {
  var seconds = getEpoch();
  var update = new grigoranClock(seconds);

  this.year = update.year;
  this.month = update.month;
  this.day = update.day;

  this.hour = update.hour;
  this.minute = update.minute;
  this.second = update.second;

  update = null;
}

function orianClock(seconds) {
  year = Math.floor(seconds / ORIAN_SECONDS_PER_YEAR);
  seconds -= year * ORIAN_SECONDS_PER_YEAR;
  season = Math.floor(seconds / ORIAN_SECONDS_PER_SEASON);
  seconds -= season * ORIAN_SECONDS_PER_SEASON;
  day = Math.floor(seconds / ORIAN_SECONDS_PER_DAY);
  seconds -= day * ORIAN_SECONDS_PER_DAY;
  quater = Math.floor(seconds / ORIAN_SECONDS_PER_QUATER);
  seconds -= quater * ORIAN_SECONDS_PER_QUATER;
  hour = Math.floor(seconds / ORIAN_SECONDS_PER_HOUR);
  seconds -= hour * ORIAN_SECONDS_PER_HOUR;
  minute = Math.floor(seconds / ORIAN_SECONDS_PER_MINUTE);
  seconds -= minute * ORIAN_SECONDS_PER_MINUTE;
  beat = Math.floor(seconds);
  
  year += 100000;
  season++;
  day++;

  this.year = year;
  this.season = season;
  this.day = day;
  this.quater = quater;
  this.hour = hour;
  this.minute = minute;
  this.beat = beat;
}

orianClock.prototype.update = function() {
  var seconds = getEpoch();
  update = new orianClock(seconds);

  this.year = update.year;
  this.season = update.season;
  this.day = update.day;
  this.quater = update.quater;
  this.hour = update.hour;
  this.minute = update.minute;
  this.beat = update.beat;

  update = null;
}

function niddlingClock(seconds) {
  seconds = seconds / NIDDLING_SECOND_DIVISOR;
  year = Math.floor(seconds / NIDDLING_SECONDS_PER_YEAR);
  seconds -= year * NIDDLING_SECONDS_PER_YEAR;
  season = Math.floor(seconds / NIDDLING_SECONDS_PER_SEASON);
  seconds -= season * NIDDLING_SECONDS_PER_SEASON;
  month = Math.floor(seconds / NIDDLING_SECONDS_PER_MONTH);
  seconds -= month * NIDDLING_SECONDS_PER_MONTH;
  day = Math.floor(seconds / NIDDLING_SECONDS_PER_DAY);
  seconds -= day * NIDDLING_SECONDS_PER_DAY;
  hour = Math.floor(seconds / NIDDLING_SECONDS_PER_HOUR);
  seconds -= hour * NIDDLING_SECONDS_PER_HOUR;
  minute = Math.floor(seconds / NIDDLING_SECONDS_PER_MINUTE);
  seconds -= minute * NIDDLING_SECONDS_PER_MINUTE;
  second = Math.floor(seconds);

  year += 100000;
  season++;
  month++;
  day++;

  this.year = year;
  this.season = season;
  this.month = month;
  this.day = day;
  this.hour = hour;
  this.minute = minute;
  this.second = second;
}

niddlingClock.prototype.update = function() {
  var seconds = getEpoch();
  update = new niddlingClock(seconds);

  this.year = update.year;
  this.season = update.season;
  this.month = update.month;
  this.day = update.day;
  this.hour = update.hour;
  this.minute = update.minute;
  this.second = update.second;

  update = null;
}

function vulpinianClock(seconds) {
  cycle = Math.floor(seconds / VULPINIAN_SECONDS_PER_CYCLE);
  seconds -= cycle * VULPINIAN_SECONDS_PER_CYCLE;
  kyuugon = Math.floor(seconds / VULPINIAN_SECONDS_PER_KYUUGON);
  seconds -= kyuugon * VULPINIAN_SECONDS_PER_KYUUGON;
  rotation = Math.floor(seconds / VULPINIAN_SECONDS_PER_ROTATION);
  seconds -= rotation * VULPINIAN_SECONDS_PER_ROTATION;
  major = Math.floor(seconds / VULPINIAN_SECONDS_PER_MAJOR);
  seconds -= major * VULPINIAN_SECONDS_PER_MAJOR;
  minor = Math.floor(seconds);

  cycle += 50;
  kyuugon++;
  rotation++;

  this.cycle = cycle;
  this.kyuugon = kyuugon;
  this.rotation = rotation;
  this.major = major;
  this.minor = minor;

  this.cycle_hex = cycle.toString(16);
  this.kyuugon_hex = kyuugon.toString(16);
  this.rotation_hex = rotation.toString(16);
  this.major_hex = major.toString(16);
  this.minor_hex = minor.toString(16);
}

vulpinianClock.prototype.update = function () {
  var seconds = getEpoch();
  update = new vulpinianClock(seconds);

  this.cycle = update.cycle;
  this.kyuugon = update.kyuugon;
  this.rotation = update.rotation;
  this.major = update.major;
  this.minor = update.minor;

  this.cycle_hex = update.cycle_hex;
  this.kyuugon_hex = update.kyuugon_hex;
  this.rotation_hex = update.rotation_hex;
  this.major_hex = update.major_hex;
  this.minor_hex = update.minor_hex;  
}

function uctClock(seconds) {
  year = Math.floor(seconds / 25165824);
  seconds -= year * 25165824;
  month = Math.floor(seconds / 1572864);
  seconds -= month * 1572864;
  day = Math.floor(seconds / 65536);
  seconds -= day * 65536;
  hour = Math.floor(seconds / 4096);
  seconds -= hour * 4096;
  min = Math.floor(seconds / 64);
  seconds -= min * 64;
  second = Math.floor(seconds);

  year += 100000;
  month ++;
  day ++;

  this.year = year;
  this.month = month;
  this.day = day;
  this.hour = hour;
  this.minute = minute;
  this.second = second;
}

uctClock.prototype.update = function () {
  var seconds = getEpoch();
  update = new uctClock(seconds);

  this.year = update.year;
  this.month = update.month;
  this.day = update.day;
  this.hour = update.hour;
  this.minute = update.minute;
  this.second = update.second;
}

$(document).ready(function() {
    updateTime();
    window.setInterval(function() { updateTime(); }, UPDATE_SPEED);
});
