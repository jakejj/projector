class Api::GqlController < ApplicationController
  def create
    query_string = params[:query]
    #query_variables = JSON.parse(params[:variables]) || {}
    query_variables = params[:variables] || {}
    result = ProjectSchema.execute(query_string, variables: query_variables)
    render json: result
  end
end


#def create
#  result = RelaySchema.execute(
#    params[:query],
#    debug: true,
#    variables: params[:variables],
#    context: {
#      current_user: set_current_user
#    }
#  )
#  render json: result
#end