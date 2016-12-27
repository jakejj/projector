DeleteMutation = GraphQL::Relay::Mutation.define do
  name "DeleteMutation"

  input_field :type, !types.String
  input_field :id, !types.ID

  return_field :id, !types.ID
  return_field :type, !types.String

  resolve ->(object, inputs, context) {
    klass = Object.const_get(inputs[:type])
    item = klass.find(inputs[:id].to_i)
    item.destroy()
    {type: inputs[:type], id: inputs[:id]}
  }
end
