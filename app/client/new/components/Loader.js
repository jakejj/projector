import React from 'react'


export default class Loader extends React.Component {

  constructor(props) {
    super(props)
    this.fetchData(props)
  }

  componentWillReceiveProps(nextProps){
    if(this.props.params !== nextProps.params){
      this.fetchData(nextProps)
    }
  }

  fetchData(){
    return this.props.container.props.projectStore.fetch(
      ...this.props.query(),
      {option: 'First Option'}
    )
  }

  render(){ return(this.props.children) }
}