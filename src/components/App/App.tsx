import { useState } from 'react'
import css from './App.module.css'

import SearchBar from '../SearchBar/SearchBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className={css.app}>
        <SearchBar />
      </div>
    </>
  )
}

export default App
