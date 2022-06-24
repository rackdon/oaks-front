import React, { Component } from 'react'
import { PhaseComponent } from './Phases'
import getClient from '../services/restClient'
import { getPhases, PhaseWithTasks } from '../services/Phases'

export class ProgressComponent extends Component<any, any>{
  readonly phasesClient
  constructor(props: any) {
    super(props)
    this.phasesClient = getClient(process.env.REACT_APP_CLIENT_HOST || "", 3000)
    this.state = {phases: []}
  }
  componentDidMount() {
    getPhases(this.phasesClient).then(data => this.setState({phases: data}))
  }

  render() {
    return (
      <ol>
        {this.state.phases.map((i: PhaseWithTasks) => <li key={i.id}><PhaseComponent phase={i}></PhaseComponent></li>)}
      </ol>

      )
  }

}