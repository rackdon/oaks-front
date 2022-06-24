import React from 'react';
import './App.css';
import { ProgressComponent } from './components/ProgressComponent'

const items = [
  {id: '1', name: 'name1'},
  {id: '2', name: 'name2'},
  {id: '3', name: 'name3'},
]
function App() {
  return (
    <div className="App">
      <h1>My startup progress</h1>
      <ProgressComponent></ProgressComponent>
    </div>
  );
}

export default App;
