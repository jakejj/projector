UpdateProjectMutation = GraphQL::Relay::Mutation.define do
  name "UpdateProject"

  input_field :name, !types.String
  input_field :id, !types.ID

  return_field :project, ProjectType

  resolve ->(object, inputs, context) {
    project = Project.find(inputs[:id].to_i)
    project.update({name: inputs[:name]})
    { project: project }
  }
end
