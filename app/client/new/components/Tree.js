import React from 'react'
import { observer, inject } from 'mobx-react'


@observer
export class Branch extends React.Component {

  constructor(props){
    super(props)
    this.expandedIcon = '\u25BC '
    this.contractedIcon = '\u25B6 '
  }

  isExpanded(item){
    if(this.props.expandedItems && (this.props.expandedItems.indexOf(item) > -1)){return true} else {return false}
  }

  getIcon(item){
    if(this.isExpanded(item)){
      return this.props.expandedIcon || this.expandedIcon
    } else {
      return this.props.contractedIcon || this.contractedIcon
    }
  }

  toggle(item){
    if(this.isExpanded(item)){
      this.props.onContract(item)
    } else {
      this.props.onExpand(item)
    }
  }

  renderChildren(item, children, otherProps){
    return this.isExpanded(item) && children && children.length > 0 ? <Tree {...otherProps} items={children} parent={item} /> : undefined 
  }

  render() {
    var {items, ...other} = this.props
    
    if(this.props.branchComponent){
      return(React.createElement(this.props.branchComponent, {...other, branch: this, item: this.props.item, parent: this.props.parent}))
    } else {
      return(<BranchComponent {...other} branch={this} item={this.props.item} parent={this.props.parent}></BranchComponent>)
      
    }
  }
}


@observer
class BranchComponent extends React.Component {
  
  isLoadingChildren(item){
    if(this.props.loadingChildrenItems && (this.props.loadingChildrenItems.indexOf(item) !== -1)){return true} else {return false}
  }
  
  render(){
    let {branch, item, parent, ...other} = this.props

    return(
      <li>
        <a onClick={branch.toggle.bind(branch, item)}>
          { branch.getIcon(item) }
          {item.name}
        </a>
        { 
          this.isLoadingChildren(item) ? <div>"Loading children..."</div> : branch.renderChildren(item, item.children(), other)
        }
      </li>
    )
  }
}


@observer
export class Tree extends React.Component {

  template(children, parent){
    var {...other} = this.props
    return(
      <ul className="tree" style={{listStyleType: 'none'}}>{children.map((child)=>{
        return(
          <Branch {...other} key={child.id} item={child} parent={parent} />
        )})}
      </ul>
    )
  }

  render() {
    //if(this.props.treeTemplate){
    //  return this.props.treeTemplate.call(this, this.props.items, this.props.parent)
    //} else {
    //  return this.template(this.props.items, this.props.parent)
    //}
    <div>Test</div>
  }
}
