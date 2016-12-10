QueryType = GraphQL::ObjectType.define do
  name "Query"
  description "The query root of this schema"

  field :project do
    type ProjectType
    argument :id, !types.ID
    description "Find a Post by ID"
    resolve ->(obj, args, ctx) { Project.find(args["id"]) }
  end
  
#  field :task do
#    type TaskType
#    #argument :id, !types.ID
#    argument :project_id, !types.ID
#    description "Find a project by id project_id"
#    resolve ->(obj, args, ctx) { 
#      Task.where(project_id: args["project_id"])
#      #if args["id"]
#      #  return Task.find(args["id"]) 
#      #else
#      #  return Task.where(project_id: args["project_id"])
#      #end
#    }
#  end

  field :projects do
    type types[ProjectType]
    #argument :id, !types.ID
    argument :name, types.String
    description "Find projects"
    resolve ->(obj, args, ctx) { 
      if args['name']
        Project.where(name: args['name']).all
      else
        Project.all
      end
    }
  end

  #connection :projects, ProjectType.connection_type do
  #  description 'Project connection to fetch all projects.'
  #  resolve ->(object, args, ctx){
  #    Project.first
  #  }
  #end
  
  field :task do
    type TaskType
    argument :project_id, types.ID
    description "Find a project by id project_id"
    resolve ->(obj, args, ctx) { 
      Task.find(args["project_id"])
      #Task.where(project_id: args["project_id"])
    }
  end

  field :tasks do
    type types[TaskType]
    argument :id, types.ID
    argument :projectId, types.ID
    description "Find a project by id projectId"
    resolve ->(obj, args, ctx) { 
      if args["projectId"]
        Task.where(project_id: args["projectId"]).all
      elsif args["id"]
        Task.where(id: args["id"]).all
      else
        []
      end
      #Task.where(project_id: args["project_id"])
    }
  end



end