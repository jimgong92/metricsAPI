var MS_PER_DAY = 86400000;
var JT_VALUE = new Date(2009,00,01).valueOf();

/**
 * @params: dateStr, String - ISO8601 date format 
 * @return: johnTime, Number - JohnTime date format
 */
function convertToJT(dateStr){
  var splitDate = dateStr.split('-');
  var dateObj = new Date(splitDate[0], splitDate[1] - 1, splitDate[2]);
  var johnTime = Math.floor((dateObj.valueOf() - JT_VALUE)/ MS_PER_DAY);
  return johnTime;
}
/**
 * @params: johnTime, Number - JohnTime date format
 * @return: date, String - ISO8601 date format 
 */
function convertFromJT(johnTime){
  johnTime = Number(johnTime);
  var date = (johnTime * MS_PER_DAY + JT_VALUE).toISOString().slice(0, 10);
  return date;
}

/**
 * Gets valid sequelize query object
 */
function getQuery(queryObj){
  var where = {metric_id: queryObj.metric_id};
  var valueFilters = queryObj.filters.join('').match(/value/g);
  if (valueFilters) {
    var isBetweenValue = valueFilters.length > 1;
    var between = [];
  }
  queryObj.filters.forEach(function(filter){
    var memo = getFilterObj(filter);
    if (memo.key === 'date'){
      memo.value = convertToJT(memo.value);
      if (memo.condition === '='){
        where['start_date'] = { gt: memo.value - 1 };
        where['end_date'] = { lt: memo.value + 1 };
      }
      if (memo.condition === '>') where['start_date'] = { gt: memo.value };
      if (memo.condition === '<') where['end_date'] = { lt: memo.value };
    }
    if (memo.key === 'value'){
      if (memo.condition === '=') where['value'] = memo.value;
      if (memo.condition === '>'){
        if (isBetweenValue) between.push(memo.value + 1);
        else where['value'] = { gt: memo.value };
      }
      if (memo.condition === '<'){
        if (isBetweenValue) between.push(memo.value - 1);
        else where['value'] = { lt: memo.value };
      }
    }
  });
  if (isBetweenValue) where['value'] = { between: between};
  return {where: where};
}
function getFilterObj(filterStr){
  var condition = filterStr.match(/[<=>]/)[0];
  var keyVal = filterStr.split(condition);
  return {
    key: keyVal[0],
    condition: condition,
    value: keyVal[1]
  };
}
/**
 * Query Validation
 */
function isValid(query){
  return isNum(query.metric_id) 
    && isValidType(query.type) 
    && query.filters.reduce(function(isTrue, filter){
      return isValidFilter(filter) && isTrue;
    }, true);
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

module.exports = {
  convertToJT: convertToJT,
  convertFromJT: convertFromJT,
  isValid: isValid,
  getQuery: getQuery
}