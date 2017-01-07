import React from 'react'

//FormState must receive viewModel, which must implement a save function and it must
//have properties matching the name property of the form inputs.
export class FormState extends React.Component {

  constructor(props) {
    super(props)
    this.viewModel = props.getViewModel()
  }

  componentWillReceiveProps(props) {
    this.viewModel = props.getViewModel()
  }

  componentWillUnmount(){
    //TODO: Create flag to tell viewModel to destroy itself
  }


  handleChange(e){
    this.viewModel.fields[e.target.name] = e.target.value
    this.viewModel.changedField(e.target.name)
  }


  handleSubmit(e){
    e.preventDefault()
    this.viewModel.save()
  }


  handleReset(e){
    e.preventDefault()
    this.viewModel.reset()
  }


  render(){
    return React.cloneElement(this.props.children, {
      handleChange: this.handleChange.bind(this),
      handleSubmit: this.handleSubmit.bind(this),
      handleReset: this.handleReset.bind(this),
      viewModel: this.viewModel
    })
  }

}

export default FormState
