import React from 'react'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { observer, inject } from 'mobx-react'


@inject('uiRouteStore') @observer
export default class RouteMonitor extends React.Component {

  constructor(props) {
    super(props)
    this.props.uiRouteStore.setLocation(props.location)
  }

  componentWillReceiveProps(nextProps){
    this.props.uiRouteStore.setLocation(nextProps.location)
  }
  
  render(){
    return null
  }
}