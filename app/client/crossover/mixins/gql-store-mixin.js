import { inGroupsOf } from '../utils/in-groups-of'


let GqlStoreMixin = (superclass) => class extends superclass {

  get(...args){
    if(args.length < 3){ throw('At least 3 arguments are required for get: model type, params, fields.') }
    let options
    if(args.length % 3 != 0){ options = args.pop() }
    let requests = inGroupsOf(args, 3)

    let cached = this.app.gqlStore.checkQueryCache(requests)
    if(!cached){ return null }

    if(requests.length > 1){
      return processGetRequests(this.models, requests)
    } else {
      return processGetRequest(this.models, requests[0])
    }
  }


  load(...args){
    if(args.length < 3){ throw('At least 3 arguments are required for load: model type, params, fields.') }
    let options
    if(args.length % 3 != 0){ options = args.pop() }
    let requests = inGroupsOf(args, 3)

    app.gqlStore.loadData(app, requests)
  }


  fetch(...args){
    let found = this.get(...args)
    if(!found){ found = this.load(...args) }
    return found
  }


  create({name} = {}){
    let gql = this.createGql
    return app.gqlStore.mutateData(this.app, gql, {name: name})
  }


  update({name, id} = {}){
    let gql = this.updateGql
    return app.gqlStore.mutateData(this.app, gql, {name: name, id: id})
  }


  delete({id} = {}){
    let gql = 'mutation delete($id: ID!, $type: String!){delete(input: {id: $id, type: $type}){ type, id }}'
    return app.gqlStore.deleteData(this.app, gql, {id: id, type: this.modelTypeName})
  }


  _delete(id) {
    this.models.delete(id)
  }

}

export default GqlStoreMixin




function hasAllProperties(model, fields){
  return _.every(fields, (field)=>{ return model[field] !== undefined })
}


function processGetRequests(collection, requests){
  responses = null
  requests.forEach((request)=>{
    response = processGetRequest(collection, request)

    if(response){
      if(responses === null){ responses = [] }
      responses.push(response)
    }

    return responses
  })
}


function processGetRequest(collection, request){
  let modelName = request[0].toLowerCase()
  let params = request[1]
  let fields = request[2]

  if(params.id){
    let found = collection.get(params.id)
    return (found && hasAllProperties(found, fields)) ? found : null
  } else {
    return find(collection, params, fields)
  }
}


function find(collection, params, fields=[]){
  let found = []
  collection.forEach((value, key)=>{
    let match = _.every(Object.keys(params), (paramKey)=>{
      return value[paramKey] === params[paramKey]
    })
    if(match && hasAllProperties(value, fields)){ found.push(value) }
  })
  return found
}
