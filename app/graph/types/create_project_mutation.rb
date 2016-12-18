CreateProjectMutation = GraphQL::Relay::Mutation.define do
  name "CreateProject"

  input_field :name, !types.String


  return_field :project, ProjectType

  resolve ->(object, inputs, context) {
    project = Project.create({name: inputs[:name]})
    { project: project }
  }
end
