import React, { Component } from 'react'


export class TaskComponent extends Component<any, any>{
  state = this.props.task

  render() {
    console.log(this.state)
    return (
      <div id={this.state.id}>
        <input type='checkbox' checked={this.state.done} onChange={(e) => {
          if (e.target.checked) {
            this.setState({done: true})
          }}}/>
        <p>{this.state.name}</p>
      </div>
    )
  }

}
