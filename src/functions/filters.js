function filterLatest(data, unit, conversionFunction, ...keys) {
  if(Array.isArray(data) && data.length > 0) {
    let latest = data[data.length - 1];
    let ret = [];
    for(let k in keys) {
      if(conversionFunction != null) {
        let number = Number(conversionFunction(latest[keys[k]])).toFixed(2)
        ret.push(number+unit);
      } else {
        let number = Number(latest[keys[k]]).toFixed(2)
        ret.push(latest[keys[k]]+unit);
      }
    }

    return ret;
  }
  else if(data.length == 0){
    return []
  }
  else {
    throw "Not an array can't filter";
  }
}

export { filterLatest } 