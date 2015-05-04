var MS_PER_DAY = 86400000;
var JT_VALUE = new Date(2009,00,01).valueOf();

function getFilterObj(filterStr){
  var condition = filterStr.match(/[<=>]/)[0];
  var keyVal = filterStr.split(condition);
  return {
    key: keyVal[0],
    condition: condition,
    value: keyVal[1]
  };
}
function isNum(val){
  return !isNaN(Number(val));
}
function isValidType(type){
  return type === 'instances' || type === 'count' || type === 'sum' || type === 'average';
}
function isValidFilter(filterStr){
  var filterObj = getFilterObj(filterStr);
  return isValidCondition(filterObj['condition'])
    && isValidProp(filterObj['key'], filterObj['value']);
}
function isValidProp(key, val){
  if (key === 'date'){
    var arr = val.split('-');
    if (val.length === 10 && arr.length === 3){
      for (var i = 0; i < 3; i++){
        if (!isNum(arr[i])) return false;
      }
      return true;
    }
    return false;
  }
  if (key === 'value') return isNum(val);
  return false;
}
function isValidCondition(condition){
  return condition === '<' || condition === '=' || condition === '>';
}
function isValid(query){
  return isNum(query.metric_id) 
    && isValidType(query.type) 
    && query.filters.reduce(function(isTrue, filter){
      return isValidFilter(filter) && isTrue;
    }, true);
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
  isValid: isValid,
  getFilterObj: getFilterObj
}