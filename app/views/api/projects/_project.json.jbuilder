json.extract! project, :id, :name, :created_at, :updated_at
json.url project_url(project, format: :json)
json.tasks project.tasks do |task|
  json.id task.id
  json.name task.name
  json.completed_at task.completed_at
end