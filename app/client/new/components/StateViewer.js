import React from 'react'
import Tree from './Tree'
import UIStateViewerStore from '../stores/ui-stateviewer-store'

class StateViewerBranch extends React.Component {
  render(){
    let {branch, item, parent, ...other} = this.props

    return(
      <li>
        <a onClick={branch.toggle.bind(branch, item)}>
          { branch.getIcon(item) }
          {item}
        </a>
        {
          branch.renderChildren(item, item.all(), other)
        }
      </li>
    )
  }
}


class StateViewer extends React.Component {

  constructor(props) {
    super(props)
    this.viewModel = new UIStateViewerStore()
  }

  render(){
    console.log("this.viewModel.convertStateToTree(this.props.state)", this.viewModel.convertStateToTree(this.props.state));
    return(
      <Tree items={this.viewModel.convertStateToTree(this.props.state)}
            onExpand={this.viewModel.onExpand}
            onContract={this.viewModel.onContract}
            branchComponent={StateViewerBranch}
            expandedItems={this.viewModel.expandedItems}
            loadingChildrenItems={this.viewModel.loadingChildrenItems}
            uiStore={this.viewModel} />
    )
  }
}

export default StateViewer
