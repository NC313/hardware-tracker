import axios from 'axios'

function ComponentList({ components, onUpdate }) {
  const handleStatusChange = async (id, newStatus, updatedBy) => {
    await axios.patch(`http://localhost:5000/api/components/${id}`, {
      status: newStatus,
      updatedBy: updatedBy || 'anonymous'
    })
    onUpdate()
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this component?')) return
    await axios.delete(`http://localhost:5000/api/components/${id}`)
    onUpdate()
  }

  return (
    <div>
      <h2>Components</h2>
      {components.length === 0 && <p>No components yet. Add one above!</p>}
      {components.map(c => (
        <div key={c._id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', marginBottom: '12px' }}>
          <h3 style={{ marginTop: 0 }}>{c.name}</h3>
          <p><strong>Status:</strong> {c.status}</p>
          <p><strong>Notes:</strong> {c.notes}</p>
          <p><strong>Last updated by:</strong> {c.updatedBy}</p>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '10px' }}>
            <select
              value={c.status}
              onChange={e => handleStatusChange(c._id, e.target.value, c.updatedBy)}
              style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #ccc', cursor: 'pointer' }}
            >
              <option value="prototype">Prototype</option>
              <option value="testing">Testing</option>
              <option value="shipped">Shipped</option>
            </select>
            <button
              onClick={() => handleDelete(c._id)}
              style={{ padding: '6px 12px', background: '#e53e3e', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Delete
            </button>
          </div>
          <div style={{ marginTop: '12px' }}>
            <strong>Activity Log:</strong>
            {c.activityLog.length === 0 && <p style={{ color: '#999', margin: '4px 0' }}>No changes yet</p>}
            {c.activityLog.map(log => (
              <p key={log._id} style={{ fontSize: '12px', color: '#666', margin: '4px 0' }}>
                {log.changedBy} changed to <strong>{log.changedTo}</strong> at {new Date(log.changedAt).toLocaleString()}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ComponentList