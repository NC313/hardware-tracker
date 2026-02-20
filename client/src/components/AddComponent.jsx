import { useState } from 'react'
import axios from 'axios'

function AddComponent({ onAdd }) {
  const [form, setForm] = useState({ name: '', status: 'prototype', notes: '', updatedBy: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name) return
    await axios.post('http://localhost:5000/api/components', form)
    setForm({ name: '', status: 'prototype', notes: '', updatedBy: '' })
    onAdd()
  }

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', marginBottom: '24px' }}>
      <h2>Add Component</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Component name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={{ display: 'block', marginBottom: '8px', padding: '8px', width: '100%' }} />
        <input placeholder="Your name" value={form.updatedBy} onChange={e => setForm({...form, updatedBy: e.target.value})} style={{ display: 'block', marginBottom: '8px', padding: '8px', width: '100%' }} />
        <input placeholder="Notes" value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} style={{ display: 'block', marginBottom: '8px', padding: '8px', width: '100%' }} />
        <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} style={{ display: 'block', marginBottom: '8px', padding: '8px' }}>
          <option value="prototype">Prototype</option>
          <option value="testing">Testing</option>
          <option value="shipped">Shipped</option>
        </select>
        <button type="submit" style={{ padding: '8px 16px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Add Component</button>
      </form>
    </div>
  )
}

export default AddComponent