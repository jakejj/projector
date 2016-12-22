import React from 'react'
import Tree from './Tree'


class StateViewerBranch extends React.Component {
  render(){
    return(
      <div>Branch</div>
    )
  }
}


class StateViewer extends React.Component {

  constructor(props) {
    super(props)
    this.uiStore = null
  }


  render(){
    return(
      <Tree items={this.props.viewModel.props.app}
            onExpand={this.props.viewModel.onExpand}
            onContract={this.props.viewModel.onContract}
            branchComponent={StateViewerBranch}
            expandedItems={this.props.viewModel.expandedItems}
            loadingChildrenItems={this.props.viewModel.loadingChildrenItems}
            uiStore={this.props.viewModel.uiStore} />
    )
  }
}

export default StateViewer