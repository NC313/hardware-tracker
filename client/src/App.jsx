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
    <div style={{ maxWidth: '800px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>Hardware Tracker</h1>
      <AddComponent onAdd={fetchComponents} />
      <ComponentList components={components} onUpdate={fetchComponents} />
    </div>
  )
}

export default App