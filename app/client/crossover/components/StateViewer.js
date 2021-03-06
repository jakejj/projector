import React from 'react'
import mobx from 'mobx'
import { observer } from 'mobx-react'
import Tree from './Tree'
import UIStateViewerStore from '../stores/ui-stateviewer-store'

@observer
class StateViewerBranch extends React.Component {
  render(){
    let {branch, item, parent, ...other} = this.props

    return(
      <li>
        <a onClick={branch.toggle.bind(branch, item)}>
          { branch.getIcon(item) }
          {item.name || item}
        </a>
        {
          branch.renderChildren(item, item.children, other)
        }
      </li>
    )
  }
}

@observer
class StateViewer extends React.Component {

  constructor(props) {
    super(props)
    //Passes global variable app into UIStateViewerStore
    this.viewModel = new UIStateViewerStore(app)
  }

  render(){
    return(
      <div style={{position: "fixed", right: 0, width: "300px", height: '100%', zIndex: '1000', overflow: 'auto'}}>
        <Tree items={this.viewModel.appState}
             onExpand={this.viewModel.onExpand}
             onContract={this.viewModel.onContract}
             branchComponent={StateViewerBranch}
             expandedItems={this.viewModel.expandedItems}
             loadingChildrenItems={this.viewModel.loadingChildrenItems}
             uiStore={this.viewModel} />
      </div>
    )
  }
}

export default StateViewer
