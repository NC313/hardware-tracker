import { useState, useEffect } from 'react'
import axios from 'axios'
import ComponentList from './components/ComponentList'
import AddComponent from './components/AddComponent'

function App() {
  const [components, setComponents] = useState([])

  const fetchComponents = async () => {
    const res = await axios.get('http://localhost:5000/api/components')
    setComponents(res.data)
  }

  useEffect(() => {
    fetchComponents()
  }, [])

  return (
    <div style={{ maxWidth: '800px', width: '100%', margin: '40px auto', padding: '0 20px', fontFamily: 'sans-serif', boxSizing: 'border-box' }}>
      <h1>Hardware Tracker</h1>
      <AddComponent onAdd={fetchComponents} />
      <ComponentList components={components} onUpdate={fetchComponents} />
    </div>
  )
}

export default App