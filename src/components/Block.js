import React, { Component } from 'react'

export default class Block extends Component {
  renderChilds() {
    if(!this.props.block.children) return;

    const { getInput } = this.props
    return(
      <ul className="child-blocks">
        {this.props.block.children.map((block) => {
          return <Block block={ block } key={block.id} getInput={ getInput }/>
        })}
      </ul>
    );
  }

  renderInput() {
    this.props.getInput(+this.props.block.isInput)
  }

  render() {
    const { block } = this.props
    return <li className="block">
      {block.isInput ? <input autoFocus type="text" onBlur={::this.renderInput}/> : <div className="text" onClick={::this.renderInput}>{block.text}</div>}
      {this.renderChilds()}
    </li>
  }
}
