import { useState, useEffect } from 'react'
import axios from 'axios'
import ComponentList from './components/ComponentList'
import AddComponent from './components/AddComponent'
import Dashboard from './components/Dashboard'

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
    <div style={{ maxWidth: '1100px', margin: '40px auto', fontFamily: 'sans-serif', padding: '0 24px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ margin: 0, color: '#2d3748', fontSize: '24px', fontWeight: '700' }}>Hardware Tracker</h1>
        <p style={{ margin: '4px 0 0 0', color: '#718096', fontSize: '14px' }}>Component pipeline management</p>
      </div>
      <Dashboard components={components} />
      <AddComponent onAdd={fetchComponents} />
      <ComponentList components={components} onUpdate={fetchComponents} />
    </div>
  )
}

export default App