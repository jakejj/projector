json.extract! task, :id, :name, :project_id, :projected_time, :completed_at, :created_at, :updated_at
json.url task_url(task, format: :json)