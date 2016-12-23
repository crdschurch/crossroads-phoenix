(function(){
  module.exports = function TimeFilter(){
    return manipulateTime;
  }

  function manipulateTime(input){
    // Split the time into hours, minutes and seconds
    var split = input.split(":");
    var period = "am"; 
    if(split[0] > 11){
      period = "pm";
    }
    if(split[0] > 12){
      split[0] = Number(split[0]) - 12
    }
    if(split[0] < 10){
      split[0] = Number(split[0])
    }
    return split[0] + ":" + split[1] + period;
  }
})()
