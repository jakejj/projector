class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :name
      t.integer :project_id
      t.integer :projected_time
      t.datetime :completed_at

      t.timestamps null: false
    end
  end
end
