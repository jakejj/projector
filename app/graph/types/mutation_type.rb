MutationType = GraphQL::ObjectType.define do
  name "Mutation"
  description "The mutation root of this schema"

  #field :createProject, Project do
  #  type ProjectType
  #  argument :name, types.String
  #  resolve ->(obj, args, ctx) {
  #    project = Project.create({name: args[:name]})
  #    project
  #  }
  #end

  field :createProject, field: CreateProjectMutation.field
  field :updateProject, field: UpdateProjectMutation.field
end
