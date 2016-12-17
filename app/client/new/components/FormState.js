import React from 'react'

//FormState's container must pass itself as prop called container and must have a getViewModel function.
export class FormState extends React.Component {

  constructor(props) {
    super(props)
    this.viewModel = this.props.container.getViewModel()
  }

  componentWillUnmount(){
    this.viewModel = null
  }

  handleSubmit(e){
    e.preventDefault()
    this.viewModel.save()
  }

  handleChange(e){
    this.viewModel[e.target.name] = e.target.value
  }

  render(){
    return React.cloneElement(this.props.children, {
      handleChange: this.handleChange.bind(this),
      handleSubmit: this.handleSubmit.bind(this),
      viewModel: this.viewModel
    })
  }

}

export default FormState
