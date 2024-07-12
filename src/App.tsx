import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { DefaultButton } from './components/ui/Button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p><DefaultButton>ボタン</DefaultButton></p>
      <p><DefaultButton variant='outlined'>ボタン</DefaultButton></p>
      <p><DefaultButton size='sm'>ボタン</DefaultButton></p>
      <p><DefaultButton size='sm' variant='outlined'>ボタン</DefaultButton></p>

      <p><DefaultButton color='redorange'>ボタン</DefaultButton></p>
      <p><DefaultButton color='redorange' variant='outlined'>ボタン</DefaultButton></p>
      <p><DefaultButton color='redorange' size='sm'>ボタン</DefaultButton></p>
      <p><DefaultButton color='redorange' size='sm' variant='outlined'>ボタン</DefaultButton></p>

      <p><DefaultButton color='yellow'>ボタン</DefaultButton></p>
      <p><DefaultButton color='yellow' variant='outlined'>ボタン</DefaultButton></p>
      <p><DefaultButton color='yellow' size='sm'>ボタン</DefaultButton></p>
      <p><DefaultButton color='yellow' size='sm' variant='outlined'>ボタン</DefaultButton></p>

      <p><DefaultButton color='green'>ボタン</DefaultButton></p>
      <p><DefaultButton color='green' variant='outlined'>ボタン</DefaultButton></p>
      <p><DefaultButton color='green' size='sm'>ボタン</DefaultButton></p>
      <p><DefaultButton color='green' size='sm' variant='outlined'>ボタン</DefaultButton></p>

      <p><DefaultButton color='brown'>ボタン</DefaultButton></p>
      <p><DefaultButton color='brown' variant='outlined'>ボタン</DefaultButton></p>
      <p><DefaultButton color='brown' size='sm'>ボタン</DefaultButton></p>
      <p><DefaultButton color='brown' size='sm' variant='outlined'>ボタン</DefaultButton></p>

      <p><DefaultButton disabled color='brown'>ボタン</DefaultButton></p>
      <p><DefaultButton disabled color='brown' variant='outlined'>ボタン</DefaultButton></p>
      <p><DefaultButton disabled color='brown' size='sm'>ボタン</DefaultButton></p>
      <p><DefaultButton disabled color='brown' size='sm' variant='outlined'>ボタン</DefaultButton></p>
    </>
  )
}

export default App
