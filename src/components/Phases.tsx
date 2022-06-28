import { TaskComponent} from './Tasks'
import { TaskSimple } from '../services/Tasks'
import { useState } from 'react'

export function PhaseComponent(props: any) {
  const client = props.client
  const [phase, setPhase] = useState({id: props.phase.id, name: props.phase.name, done: props.phase.done})
  const handler = (phaseData: any) => setPhase({...phase, ...phaseData})
  return (
    <div id={phase.id}>
      <p>{phase.name} {phase.done ? '\u2714' : null}</p>
      <ul>{props.phase.tasks.map((t: TaskSimple) => <TaskComponent key={t.id} task={t} client={props.client} phaseHandler = {handler}></TaskComponent>)}</ul>
    </div>
  )
}
