import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import ReactSpinner from 'react-spinjs';


export default (props) => {
  return (
    <Grid fluid={true} style={{marginTop: '5em'}}>
      <Row>
        <Col md={12}>
          <ReactSpinner config={{ lines: 13, length: 35, width: 22, radius: 61, scale: 0.25, corners: 0.8, color: '#000', opacity: 0.2, rotate: 0, direction: 1, speed: 0.9, trail: 50, fps: 20, zIndex: 2e9, className: 'spinner', top: '50%', left: '50%', shadow: false, hwaccel: false, position: 'absolute' }} />
        </Col>
      </Row>
    </Grid>
  )
}
