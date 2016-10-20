import camelCase from 'camelCase'
import decamelize from 'decamelize'
import R from 'Ramda'


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

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
