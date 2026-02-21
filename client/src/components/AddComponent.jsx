import { useState } from 'react'
import axios from 'axios'

function AddComponent({ onAdd, username }) {
  const [form, setForm] = useState({ name: '', status: 'prototype', notes: '', updatedBy: username || '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name) return
    await axios.post(`https://hardware-tracker-api.onrender.com/api/components`, form)
    setForm({ name: '', status: 'prototype', notes: '', updatedBy: username || '' })
    onAdd()
  }

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
    color: '#111827',
    background: 'white'
  }

  return (
    <div style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e5e7eb' }}>
      <div style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
        Add Component
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input
          placeholder="Component name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          style={inputStyle}
        />
        <input
          placeholder="Notes"
          value={form.notes}
          onChange={e => setForm({ ...form, notes: e.target.value })}
          style={inputStyle}
        />
        <select
          value={form.status}
          onChange={e => setForm({ ...form, status: e.target.value })}
          style={{ ...inputStyle, width: 'auto' }}
        >
          <option value="prototype">Prototype</option>
          <option value="testing">Testing</option>
          <option value="shipped">Shipped</option>
        </select>
        <div>
          <button type="submit" style={{
            padding: '10px 20px',
            background: '#111827',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer'
          }}>
            Add Component
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddComponent