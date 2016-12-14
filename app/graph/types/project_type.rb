ProjectType = GraphQL::ObjectType.define do
  name "Project"
  description "A project"
  # `!` marks a field as "non-null"
  field :id, !types.ID
  field :name, !types.String
  field :createdAt, !types.String, "Date it was created", property: :created_at
  field :updatedAt, !types.String, "Date it was updated", property: :updated_at
  field :tasks, !types[TaskType]
end