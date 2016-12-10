TaskType = GraphQL::ObjectType.define do
  name "Task"
  description "A task for a project"
  # `!` marks a field as "non-null"
  field :id, !types.ID
  field :projectId, !types.ID, "ID of the owning project", property: :project_id
  field :name, !types.String
  field :createdAt, !types.String, "Date it was created", property: :created_at
  field :updatedAt, !types.String, "Date it was updated", property: :updated_at
  field :completedAt, !types.String, "Date it was completed", property: :completed_at
end