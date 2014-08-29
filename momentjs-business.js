/**
 * momentjs-business.js
 * businessDiff (mStartDate)
 * businessAdd (numberOfDays)
 */
(function () {
  var moment;
  moment = (typeof require !== "undefined" && require !== null) &&
           !require.amd ? require("moment") : this.moment;

  moment.fn.businessDiff = function (start) {
    start = moment(start);
    var end = this.clone();
    var start_offset = start.day() - 7;
    var end_offset = end.day();

    var end_sunday = end.clone().subtract(end_offset, 'days').startOf('day');
    var start_sunday = start.clone().subtract(start_offset, 'days').startOf('day');
    var weeks = end_sunday.diff(start_sunday, 'days') / 7;

    start_offset = Math.abs(start_offset);
    if(start_offset == 7)
      start_offset = 5;
    else if(start_offset == 1)
      start_offset = 0;
    else
      start_offset -= 2;


    if(end_offset == 6)
      end_offset--;

    return weeks * 5 + start_offset + end_offset;
  };

  moment.fn.businessAdd = function (days) {
    var d = this.clone().add(Math.floor(days / 5) * 7, 'days');
    var remaining = days % 5;
    while(remaining){
      d.add(1, 'days');
      if(d.day() !== 0 && d.day() !== 6)
        remaining--;
    }
    return d;
  };

}).call(this);
