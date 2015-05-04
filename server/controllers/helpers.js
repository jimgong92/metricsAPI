var MS_PER_DAY = 86400000;
var JT_VALUE = new Date(2009,00,01).valueOf();

function isValid(query){

}

module.exports = {
  /**
   * @params: dateStr, String - ISO8601 date format 
   * @return: johnTime, Number - JohnTime date format
   */
  convertToJT: function(dateStr){
    var splitDate = dateStr.split('-');
    var dateObj = new Date(splitDate[0], splitDate[1] - 1, splitDate[2]);
    var johnTime = Math.floor((dateObj.valueOf() - JT_VALUE)/ MS_PER_DAY);
    return johnTime;
  },
  /**
   * @params: johnTime, Number - JohnTime date format
   * @return: date, String - ISO8601 date format 
   */
  convertFromJT: function(johnTime){
    johnTime = Number(johnTime);
    var date = (johnTime * MS_PER_DAY + JT_VALUE).toISOString().slice(0, 10);
    return date;
  },
  isValid: isValid
}