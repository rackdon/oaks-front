import { TaskComponent} from './Tasks'
import { TaskSimple } from '../services/Tasks'
import React, { useState } from 'react'
import { deletePhase } from '../services/Phases'

export function PhaseComponent(props: any) {
  const client = props.client
  const [phase, setPhase] = useState(props.phase)
  const handler = (phaseData: any) => setPhase({...phase, ...phaseData})
  const deleteButton = () => {
    if(phase.tasks.length === 0) {
      return <button onClick={async (e) => {
        await deletePhase(client, phase.id)
        setPhase(null)
      }}>Delete</button>
    }
  }
  if(phase) {
    return (
      <div className='phase' id={phase.id}>
        <label>{phase.name} {phase.done ? '\u2714' : null}</label>
        {deleteButton()}
        <ul>{props.phase.tasks.map((t: TaskSimple) => <TaskComponent key={t.id} task={t} client={props.client} phaseHandler = {handler}></TaskComponent>)}</ul>
      </div>
    )}
  else {
      return <div></div>
    }

}
