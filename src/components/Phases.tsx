import { TaskComponent} from './Tasks'
import { TaskSimple } from '../services/Tasks'

export function PhaseComponent(props: any) {
  return (
    <div id={props.phase.id}>
      <p>{props.phase.name}</p>
      <ul>{props.phase.tasks.map((t: TaskSimple) => <li key={t.id}><TaskComponent task={t}></TaskComponent></li>)}</ul>
    </div>
  )
}
