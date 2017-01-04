import { action, computed, observable } from 'mobx'
import { validate } from 'validate.js'

/////////////////////////////////////////////////
// Usage:
// 
/////////////////////////////////////////////////

let SerializableModelMixin = (superclass) => class extends superclass {

  deserialize(values){
    _.forIn(values, (value, key)=>{
      this[key] = castType(value, ProjectModel.propTypes[key])
    })
  }

}


function castType(value, type='string'){
  switch(type){
    case 'int':
      return parseInt(value)
    case 'integer':
      return parseInt(value)
    case 'float':
      return parseFloat(value)
    default:
      return value
  }
}


export default SerializableModelMixin