import React from 'react'
import Tree from './Tree'
import UIStateViewerStore from '../stores/ui-stateviewer-store'
import mobx from 'mobx'

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
    
    
    mobx.autorun(()=>{
      let json = JSON.parse(JSON.stringify(this.viewModel.convertStateToTree(this.props.state)))
      console.log(json)
    })
  }

  render(){
//    console.log("this.viewModel.convertStateToTree(this.props.state)", this.viewModel.convertStateToTree(this.props.state));
    
    
    
    return(
      <div style={{position: "absolute", right: 0, width: "100px", height: '100%'}}>Test</div>
    )
  }
}

export default StateViewer

//<Tree items={this.viewModel.convertStateToTree(this.props.state)}
//      onExpand={this.viewModel.onExpand}
//      onContract={this.viewModel.onContract}
//      branchComponent={StateViewerBranch}
//      expandedItems={this.viewModel.expandedItems}
//      loadingChildrenItems={this.viewModel.loadingChildrenItems}
//      uiStore={this.viewModel} />