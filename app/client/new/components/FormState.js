import React from 'react'

//FormState's container must pass itself as prop called container and must have a getViewModel function.
export class FormState extends React.Component {

  componentWillUnmount(){
    //TODO: Create flag to tell viewModel to destroy itself
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.viewModel.save()
  }

  handleChange(e){
    this.props.viewModel[e.target.name] = e.target.value
  }

  render(){
    return React.cloneElement(this.props.children, {
      handleChange: this.handleChange.bind(this),
      handleSubmit: this.handleSubmit.bind(this),
      viewModel: this.props.viewModel
    })
  }

}

export default FormState
