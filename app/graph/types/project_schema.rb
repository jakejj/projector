ProjectSchema = GraphQL::Schema.define do
  query QueryType
  mutation MutationType
end



#query={ 
#	project(id: 1){ 
#		id,
#		name, 
#		createdAt,
#		updated_at,
#		tasks {
#			id,
#			name,
#		},
#	},
#    projects(name: "Test"){
#    	name
#    },
#	tasks(project_id: 1){
#		id,
#		name,
#        project_id,
#	}
#}

#mutation myMutation{createProject(name: "Test 2"){ id }}

#mutation myMutation{createProject(input: {name: "Test 2"}){ project{ id } }}