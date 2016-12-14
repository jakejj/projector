import camelCase from 'camelCase'
import decamelize from 'decamelize'
import R from 'Ramda'
import pluralizeLib from 'pluralize'
window.p = pluralizeLib

export const camelizeObject = (object) => {
  return Object.keys(object).reduce((newObject, key) => {
    newObject[camelCase(key)] = object[key]
    return newObject
  }, {})
}

export const decamelizeObject = (object) => {
  return Object.keys(object).reduce((newObject, key) => {
    newObject[decamelize(key)] = object[key]
    return newObject
  }, {})
}

export const isPromise = (object) => {
  return typeof object.then == 'function'
}

export const pluralize = (str)=>{ return pluralizeLib.plural(str) }
export const singularize = (str)=>{ return pluralizeLib(str, 1) }


export const inGroupsOf = function(array, number, fillWith=null) {
   var index = -number, slices = [];

   if (number < 1) return array;

   while ((index += number) < array.length) {
       var s = array.slice(index, index + number);
       while(s.length < number)
           s.push(fillWith);
       slices.push(s);
   }
   return slices;
};



export function compareObjects(o, p){
  var i,
      keysO = Object.keys(o).sort(),
      keysP = Object.keys(p).sort();
  if (keysO.length !== keysP.length)
      return false;//not the same nr of keys
  if (keysO.join('') !== keysP.join(''))
      return false;//different keys
  for (i=0;i<keysO.length;++i){
    if (o[keysO[i]] instanceof Array){
      if (!(p[keysO[i]] instanceof Array))
        return false;
      //if (compareObjects(o[keysO[i]], p[keysO[i]] === false) return false
      //would work, too, and perhaps is a better fit, still, this is easy, too
      if (p[keysO[i]].sort().join('') !== o[keysO[i]].sort().join(''))
        return false;
    } else if (o[keysO[i]] instanceof Date){
      if (!(p[keysO[i]] instanceof Date))
        return false;
      if ((''+o[keysO[i]]) !== (''+p[keysO[i]]))
        return false;
    } else if (o[keysO[i]] instanceof Function){
      if (!(p[keysO[i]] instanceof Function))
        return false;
        //ignore functions, or check them regardless?
    } else if (o[keysO[i]] instanceof Object){
      if (!(p[keysO[i]] instanceof Object))
        return false;
      if (o[keysO[i]] === o){//self reference?
        if (p[keysO[i]] !== p)
          return false;
        } else if (compareObjects(o[keysO[i]], p[keysO[i]]) === false)
            return false;//WARNING: does not deal with circular refs other than ^^
    }
    if(o[keysO[i]] !== p[keysO[i]])//change !== to != for loose comparison
      return false;//not the same value
  }
  return true;
}




export function compareArrays(array1, array2) {
  var still_matches, _fail,
    _this = this;
  if (!((_.isArray(array1) && _.isArray(array2)) || (_.isObject(array1) && _.isObject(array2)))) {
    return false;
  }
  if (array1.length !== array2.length) {
    return false;
  }
  still_matches = true;
  _fail = function() {
    still_matches = false;
  };
  _.each(array1, function(prop1, n) {
    var prop2;
    prop2 = array2[n];
    if (prop1 !== prop2 && !compareArrays(prop1, prop2)) {
      _fail();
    }
  });
  return still_matches;
}


