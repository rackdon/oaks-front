import React, { Component } from 'react'
import { PhaseComponent } from './Phases'
import getClient from '../services/restClient'
import { createPhase, getPhases, PhaseWithTasks } from '../services/Phases'

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

  createPhase = async (e: any) => {
    const phaseName = e.target[0].value
    e.preventDefault()
    const {errors, data} = await createPhase(this.phasesClient, phaseName)
    if (errors) {
      alert(errors[0].message)
    } else {
      const newPhase = data.createPhase
      newPhase.tasks = []
      const phases = this.state.phases
      phases.push(newPhase)
      this.setState({phases: phases})
      e.target[0].value = null
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.createPhase}>
          <input type='text' required={true} placeholder='New phase'></input>
          <button type='submit'>Create</button>
        </form>
        <br></br>
        <div className='fullList'>
          {this.state.phases.map((i: PhaseWithTasks) => <div key={i.id}><PhaseComponent phase={i} client={this.phasesClient}></PhaseComponent></div>)}
        </div>
      </div>
      )
  }

}